import API from "@/components/functional/axios";
import { Button } from "@/components/ui/button";
import CartItemSkeleton from "@/skeleton/cartItemSkeleton";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom'
import { ArrowDownLeft } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { formControlLabelClasses } from "@mui/material";
import { Loader } from "lucide-react";
import { ShoppingBasket } from "lucide-react";


export default function Cart() {
  // const cartProducts = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 29.99,
  //     quantity: 2,
  //     image_url: "https://via.placeholder.com/80",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     price: 49.99,
  //     quantity: 1,
  //     image_url: "https://via.placeholder.com/80",
  //   },
  // ];
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const navigate = useNavigate()


  const getCart = useAuthStore(s => s.getCart);
  const total = useAuthStore(s => s.total);
  const [tax, setTax] = useState(0)
  const setTotal = useAuthStore(s => s.setTotal);
  const [fullPrice, setFullPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loadingCart, setLoadingCart] = useState(false)
  const [cartProducts, setCartProduct] = useState(null);
  const [loading, setLoading] = useState(false)

  const [removingId, setRemovingId] = useState(null);

  const removeProduct = async (id) => {
    if (removingId === id) return; // Prevent multiple calls for the same item
    setRemovingId(id);
    try {
      const toastId = toast.loading('Removing Item...');
      await API.delete(`/cart/${id}`);
      toast.success('Item Removed From Cart!', { id: toastId });
      // Refresh cart from server after successful removal
      await getCart();
      setCartProduct(useAuthStore.getState().cart);
      setTotal(useAuthStore.getState().cart.length);
    } catch (e) {
      toast.error('Failed to remove item');
      // Optionally refresh cart to ensure UI is in sync
      await getCart();
      setCartProduct(useAuthStore.getState().cart);
      setTotal(useAuthStore.getState().cart.length);
    } finally {
      setRemovingId(null);
    }
  }


  useEffect(() => {
    getCart()
      .then(() => {
        const cartItems = useAuthStore.getState().cart;
        setCartProduct(cartItems);
        setTotal(cartItems.length)
        // Calculate the total price of all items in the cart
        const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);
        // const tax = ((totalPrice * 6) / 100).toFixed(2);
        const tax = 0;
        const fullPrice = (Number(totalPrice) + Number(tax)).toFixed(2)
        setTotalPrice(totalPrice.toFixed(2));
        setTax(tax)
        setFullPrice(fullPrice)
      })
      .catch((err) => {
        toast.error('Failed to fetch product details');
        setProduct(null);
      });
  }, [getCart, removeProduct]);

  return (
    <>
      <h1 className="text-2xl font-[poppins-bold] p-2 pt-8 pb-4 min-lg:px-10">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row min-h-screen p-2 gap-4 min-lg:px-8">
        {/* Cart Items List */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 min-md:p-2  pl-0"
        >
          <div className="space-y-4">
            {cartProducts === null ? (
              Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)
            ) : cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <>
                  <motion.div
                    key={item.products.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative flex items-center bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg p-2 gap-2"
                  >
                    {/* Cancel Button */}
                    <button
                      className="absolute top-2 right-2 text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-500/20 active:bg-red-500/20  transition-colors rounded-full p-1"
                      aria-label="Remove item"
                      onClick={() => removeProduct(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-[poppins-semibold] text-[var(--text-primary)]">{item.products.name}</div>
                      {/* Quantity Text */}
                      <div className="mt-2 text-xs text-[var(--text-tertiary)] font-[poppins-medium]">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    {/* Price & Counter to the right */}
                    <div className="flex flex-col items-end gap-2 min-w-[90px] pt-8">
                      <div className="font-[poppins-bold] text-[var(--text-secondary)]">${item.total_price}</div>
                      {/* Small Counter */}
                      <div className="flex items-center bg-[var(--bg-tertiary)] rounded-md gap-1 shadow-inner">
                        <button
                          className="text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/10 p-1.5 rounded-md transition-colors"
                          aria-label="Decrease quantity"
                          onClick={async () => {
                            if (item.quantity > 1) {
                              try {
                                const toastId = toast.loading('Updating Quantity...')
                                await API.put(`/cart/${item.id}`, { quantity: item.quantity - 1 });
                                toast.success('Quantity Updated!', {
                                  id: toastId
                                })
                                // Refresh cart
                                getCart().then(() => {
                                  const cartItems = useAuthStore.getState().cart;
                                  setCartProduct(cartItems);
                                });
                              } catch (e) {
                                toast.error('Failed to decrease quantity');
                                
                              }
                            }
                          }}
                          disabled={item.quantity <= 1}
                        >
                          <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="font-[poppins-medium] text-[var(--text-primary)] min-w-[1.5ch] text-center text-sm">{item.quantity}</span>
                        <button
                          className="text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/10 rounded-md p-1.5 transition-colors"
                          aria-label="Increase quantity"
                          onClick={async () => {
                            try {
                              const toastId = toast.loading('Updating Quantity...')
                              await API.put(`/cart/${item.id}`, { quantity: item.quantity + 1 });
                              toast.success('Quantity Updated!', {
                                id: toastId
                              })
                              // Refresh cart
                              getCart().then(() => {
                                const cartItems = useAuthStore.getState().cart;
                                setCartProduct(cartItems);
                              });
                            } catch (e) {
                              toast.error('Failed to increase quantity');
                            
                            }
                          }}
                        >
                          <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              ))
            ) : (<div className=' flex flex-col gap-4 items-start pt-4 font-[poppins-medium] bg-[var(--bg-secondary)] text-[var(--color-primary)]  p-4 rounded-lg'>
              <p className="font-[poppins-bold] text-lg">Your Cart is Empty</p>
              <ShoppingBasket className="size-12"/>
              <Button className='bg-[var(--color-primary)] text-white' onClick={() => navigate('/products')}>Shop for Products</Button>
            </div>
            )}
          </div>
        </motion.section>
        <motion.aside
          initial={{ x: +50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="md:w-1/3 w-full min-md:sticky top-10 h-fit bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] min-md:mt-2 p-6 rounded-lg flex flex-col justify-between"
          style={{ zIndex: 10 }}
        >
          <div>
            <h2 className="text-xl font-[poppins-semibold] mb-4">Order Summary</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center justify-between text-md font-[poppins-medium] text-[var(--text-secondary)]">
                <span>Sub Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex gap-2 items-center justify-between text-md font-[poppins-medium] text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className='text-green-500'>Free</span>
              </div>
              <div className="flex gap-2 items-center justify-between text-md font-[poppins-medium] text-[var(--text-secondary)]">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
            </div>
            <div className="border-t border-[var(--bg-tertiary)] mt-4 pt-4 flex justify-between font-[poppins-bold] text-lg">
              <span>Total:</span>
              <span>${fullPrice}</span>
            </div>
          </div>
          <button onClick={async () => {
            try {
              if(cartProducts != null && cartProducts.length == 0) {
                toast.info('Theres no Item in your cart')
                return
              }
              const toastId = toast.loading('Checking Out')
              setLoading(true)
              const res = await API.post('/orders')
              toast.success('Check Out Successful', {
                id: toastId
              })
              navigate('/my-order')
              setLoading(false)
              console.log(res.data)
            } catch (e) {
              console.log(e)
              setLoading(false)
            }
          }} disabled={loading}
            className="mt-8 w-full bg-[var(--color-primary)] hover:bg-emerald-650 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-[poppins-semibold] transition-colors duration-200">
            {loading ?
              <> <Loader size='16px' /> <p>Checking Out...</p></>
              :
              <p> Check Out </p>
            }
          </button>
          {cartProducts != null && cartProducts.length > 0 && <button className='bg-[var(--bg-tertiary)] w-full hover:bg-emerald-650 flex items-center font-[poppins-semibold] justify-center gap-2 text-[var(--text-tertiary)] py-3 rounded-lg font-semibold transition-colors duration-200 mt-2 text-sm' onClick={() => navigate('/products')}
          ><ArrowLeft /> Continue Shoppings</button>}

        </motion.aside>
      </div>
    </>
  );
}
