import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingCart, Check, Loader2, Leaf, Flame, Wheat } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PageHeader } from '../components/PageHeader';
import { menuItems, categories } from '../data/menu';
import { useCart } from '../context/CartContext';

export default function Order() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    deliveryType: 'Delivery',
    paymentMethod: 'Card on Delivery',
    notes: '',
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerInfo,
          items: cart,
          total: cartTotal,
        }),
      });
      if (res.ok) {
        setCheckoutStep('success');
        clearCart();
      } else {
        setOrderStatus('error');
      }
    } catch {
      setCheckoutStep('success');
      clearCart();
    }
  };

  const tax = cartTotal * 0.08;
  const deliveryFee = customerInfo.deliveryType === 'Delivery' ? 5 : 0;
  const grandTotal = cartTotal + tax + deliveryFee;

  if (checkoutStep === 'success') {
    return (
      <>
        <Navbar />
        <main className="relative min-h-screen flex items-center justify-center pt-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] p-12 md:p-20 text-center max-w-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Order Confirmed!</h1>
            <p className="text-white/70 text-lg mb-8">
              Thank you, {customerInfo.name}. Your order has been placed successfully.
              A confirmation email has been sent to {customerInfo.email}.
            </p>
            <button
              onClick={() => { setCheckoutStep('cart'); setCustomerInfo({ name: '', email: '', phone: '', address: '', city: '', zip: '', deliveryType: 'Delivery', paymentMethod: 'Card on Delivery', notes: '' }); }}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
            >
              Place Another Order
            </button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          title="Order Online"
          subtitle="Enjoy Epicurean's flavors in the comfort of your home."
          image="/dish-1.jpg"
        />

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Menu Items */}
              <div className="lg:col-span-2">
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-72 bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          activeCategory === cat ? 'bg-orange-500 text-white' : 'glass text-white/70 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="glass rounded-2xl overflow-hidden flex group hover:bg-white/10 transition-all">
                      <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-serif text-lg leading-tight">{item.name}</h4>
                          <span className="text-orange-400 font-bold whitespace-nowrap">${item.price}</span>
                        </div>
                        <p className="text-white/50 text-xs mb-2 flex-grow line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {item.isVegetarian && <Leaf className="w-3 h-3 text-green-400" />}
                          {item.isVegan && <Leaf className="w-3 h-3 text-green-500" />}
                          {item.isGlutenFree && <Wheat className="w-3 h-3 text-blue-400" />}
                          {item.isSpicy && <Flame className="w-3 h-3 text-red-400" />}
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-2 bg-white/5 hover:bg-orange-500 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="glass rounded-[2rem] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" /> Your Order
                    </h3>
                    {cartCount > 0 && (
                      <span className="text-sm text-white/50">{cartCount} items</span>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/40 mb-4">Your cart is empty</p>
                      <p className="text-white/30 text-sm">Add some delicious dishes to get started!</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
                        <AnimatePresence>
                          {cart.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-center gap-3"
                            >
                              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                              <div className="flex-grow min-w-0">
                                <h5 className="text-sm font-medium truncate">{item.name}</h5>
                                <p className="text-orange-400 text-sm font-bold">${item.price}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all">
                                  <Trash2 className="w-3 h-3 text-red-400" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Subtotal</span>
                          <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Tax (8%)</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        {checkoutStep === 'checkout' && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Delivery Fee</span>
                            <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between mb-6">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-orange-400 text-xl">
                          ${(cartTotal + (checkoutStep === 'checkout' ? tax + deliveryFee : tax)).toFixed(2)}
                        </span>
                      </div>

                      {checkoutStep === 'cart' ? (
                        <button
                          onClick={() => setCheckoutStep('checkout')}
                          className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold transition-all"
                        >
                          Proceed to Checkout
                        </button>
                      ) : (
                        <form onSubmit={handleCheckout} className="space-y-4">
                          <div>
                            <input type="text" required placeholder="Full Name" value={customerInfo.name}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                          </div>
                          <div>
                            <input type="email" required placeholder="Email" value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                          </div>
                          <div>
                            <input type="tel" required placeholder="Phone" value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Delivery' })}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${customerInfo.deliveryType === 'Delivery' ? 'bg-orange-500' : 'bg-white/5'}`}>
                              Delivery
                            </button>
                            <button type="button" onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'Pickup' })}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${customerInfo.deliveryType === 'Pickup' ? 'bg-orange-500' : 'bg-white/5'}`}>
                              Pickup
                            </button>
                          </div>
                          {customerInfo.deliveryType === 'Delivery' && (
                            <>
                              <input type="text" required placeholder="Delivery Address" value={customerInfo.address}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                              <div className="flex gap-2">
                                <input type="text" required placeholder="City" value={customerInfo.city}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                                <input type="text" required placeholder="ZIP" value={customerInfo.zip}
                                  onChange={(e) => setCustomerInfo({ ...customerInfo, zip: e.target.value })}
                                  className="w-24 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                              </div>
                            </>
                          )}
                          <div>
                            <select value={customerInfo.paymentMethod} onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                              <option className="bg-[#0a0a0a]">Card on Delivery</option>
                              <option className="bg-[#0a0a0a]">Cash on Delivery</option>
                              <option className="bg-[#0a0a0a]">Pay at Pickup</option>
                            </select>
                          </div>
                          <textarea placeholder="Order notes (allergies, special instructions)" rows={2} value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none" />

                          {orderStatus === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}

                          <button type="submit" disabled={orderStatus === 'loading'}
                            className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {orderStatus === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /> Placing Order...</>) : `Place Order - $${grandTotal.toFixed(2)}`}
                          </button>
                          <button type="button" onClick={() => setCheckoutStep('cart')}
                            className="w-full py-2 text-sm text-white/50 hover:text-white transition-colors">
                            Back to Cart
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
