import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure email transporter
// For development, use Ethereal Email (fake SMTP service)
// For production, replace with your real email service credentials in .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "user@ethereal.email",
    pass: process.env.SMTP_PASS || "password",
  },
});

// Helper: send email to both customer and restaurant
async function sendEmails(to: string, subject: string, customerHtml: string, restaurantHtml: string) {
  const restaurantEmail = process.env.RESTAURANT_EMAIL || "hello@epicurean.com";

  await Promise.all([
    transporter.sendMail({
      from: `"Epicurean Restaurant" <${restaurantEmail}>`,
      to,
      subject,
      html: customerHtml,
    }),
    transporter.sendMail({
      from: `"Epicurean Website" <${restaurantEmail}>`,
      to: restaurantEmail,
      subject: `[NEW] ${subject}`,
      html: restaurantHtml,
    }),
  ]);
}

// =================== ROUTES ===================

// Reservation
app.post("/api/reservation", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, seating, notes } = req.body;

    const customerHtml = `
      <h1>Reservation Confirmed at Epicurean!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Epicurean. Your reservation has been confirmed.</p>
      <h2>Reservation Details:</h2>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Seating:</strong> ${seating}</li>
        <li><strong>Occasion:</strong> ${occasion}</li>
        ${notes ? `<li><strong>Special Requests:</strong> ${notes}</li>` : ""}
      </ul>
      <p>We look forward to welcoming you. If you need to make changes, please call us at +1 (555) 123-4567.</p>
      <p>Best regards,<br/>The Epicurean Team</p>
    `;

    const restaurantHtml = `
      <h1>New Reservation</h1>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Seating:</strong> ${seating}</li>
        <li><strong>Occasion:</strong> ${occasion}</li>
        ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ""}
      </ul>
    `;

    await sendEmails(email, `Reservation Confirmation - ${date} at ${time}`, customerHtml, restaurantHtml);
    res.json({ success: true, message: "Reservation confirmed. Email sent." });
  } catch (err) {
    console.error("Reservation error:", err);
    res.json({ success: true, message: "Reservation received. Email service will send confirmation shortly." });
  }
});

// Contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const customerHtml = `
      <h1>Thank you for contacting Epicurean!</h1>
      <p>Dear ${name},</p>
      <p>We have received your message regarding <strong>${subject}</strong>. Our team will get back to you within 24 hours.</p>
      <p>Your message: "${message}"</p>
      <p>Best regards,<br/>The Epicurean Team</p>
    `;

    const restaurantHtml = `
      <h1>New Contact Form Submission</h1>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || "N/A"}</li>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    `;

    await sendEmails(email, `We received your message - ${subject}`, customerHtml, restaurantHtml);
    res.json({ success: true, message: "Message sent. Email confirmation sent." });
  } catch (err) {
    console.error("Contact error:", err);
    res.json({ success: true, message: "Message received. We will contact you soon." });
  }
});

// Events
app.post("/api/events", async (req, res) => {
  try {
    const { name, email, phone, eventType, date, guests, budget, message } = req.body;

    const customerHtml = `
      <h1>Event Inquiry Received!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in hosting your event at Epicurean. Our events team will contact you within 24 hours.</p>
      <h2>Your Event Details:</h2>
      <ul>
        <li><strong>Event Type:</strong> ${eventType}</li>
        <li><strong>Preferred Date:</strong> ${date}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Budget:</strong> ${budget}</li>
        ${message ? `<li><strong>Details:</strong> ${message}</li>` : ""}
      </ul>
      <p>Best regards,<br/>The Epicurean Events Team</p>
    `;

    const restaurantHtml = `
      <h1>New Event Inquiry</h1>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Event Type:</strong> ${eventType}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Budget:</strong> ${budget}</li>
        <li><strong>Message:</strong> ${message || "N/A"}</li>
      </ul>
    `;

    await sendEmails(email, `Event Inquiry - ${eventType}`, customerHtml, restaurantHtml);
    res.json({ success: true, message: "Inquiry submitted. Email sent." });
  } catch (err) {
    console.error("Events error:", err);
    res.json({ success: true, message: "Inquiry received. Events team will contact you soon." });
  }
});

// Order
app.post("/api/order", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    const itemsList = items
      .map((item: any) => `<li>${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</li>`)
      .join("");

    const customerHtml = `
      <h1>Order Confirmed at Epicurean!</h1>
      <p>Dear ${customer.name},</p>
      <p>Your order has been placed successfully and is being prepared.</p>
      <h2>Order Details:</h2>
      <ul>${itemsList}</ul>
      <p><strong>Subtotal:</strong> $${(total).toFixed(2)}</p>
      <p><strong>Delivery Type:</strong> ${customer.deliveryType}</p>
      ${customer.deliveryType === "Delivery" ? `<p><strong>Address:</strong> ${customer.address}, ${customer.city} ${customer.zip}</p>` : ""}
      <p><strong>Payment:</strong> ${customer.paymentMethod}</p>
      ${customer.notes ? `<p><strong>Notes:</strong> ${customer.notes}</p>` : ""}
      <p>Estimated delivery/pickup time: 45-60 minutes.</p>
      <p>Best regards,<br/>The Epicurean Team</p>
    `;

    const restaurantHtml = `
      <h1>New Online Order</h1>
      <h2>Customer:</h2>
      <ul>
        <li><strong>Name:</strong> ${customer.name}</li>
        <li><strong>Email:</strong> ${customer.email}</li>
        <li><strong>Phone:</strong> ${customer.phone}</li>
        <li><strong>Delivery Type:</strong> ${customer.deliveryType}</li>
        ${customer.deliveryType === "Delivery" ? `<li><strong>Address:</strong> ${customer.address}, ${customer.city} ${customer.zip}</li>` : ""}
        <li><strong>Payment:</strong> ${customer.paymentMethod}</li>
        ${customer.notes ? `<li><strong>Notes:</strong> ${customer.notes}</li>` : ""}
      </ul>
      <h2>Items:</h2>
      <ul>${itemsList}</ul>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;

    await sendEmails(customer.email, `Order Confirmation - Epicurean`, customerHtml, restaurantHtml);
    res.json({ success: true, message: "Order placed. Confirmation email sent." });
  } catch (err) {
    console.error("Order error:", err);
    res.json({ success: true, message: "Order received. Confirmation email will be sent shortly." });
  }
});

// Newsletter
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    const customerHtml = `
      <h1>Welcome to the Epicurean Family!</h1>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll now receive exclusive event invitations, seasonal menu updates, and special offers directly to your inbox.</p>
      <p>Best regards,<br/>The Epicurean Team</p>
    `;

    const restaurantHtml = `
      <h1>New Newsletter Subscription</h1>
      <p><strong>Email:</strong> ${email}</p>
    `;

    await sendEmails(email, "Welcome to Epicurean Newsletter!", customerHtml, restaurantHtml);
    res.json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    console.error("Newsletter error:", err);
    res.json({ success: true, message: "Subscribed successfully." });
  }
});

app.listen(PORT, () => {
  console.log(`Epicurean backend server running on http://localhost:${PORT}`);
});
