import ToolsCarousel from "@/blocks/imageCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import ProductCard from "@/blocks/ProductCard";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import ProductCardSkeleton from "@/skeleton/productCard.skeleton";


export default function Home() {
    const navigate = useNavigate()
    const products = useAuthStore(s => s.products)
    const getCart = useAuthStore(s => s.getCart)
    const setTotal = useAuthStore(s => s.setTotal)
    const cart = useAuthStore(s => s.cart)
    const isLoggedIn = useAuthStore(s => s.token)
    const fetchProducts = useAuthStore(s => s.fetchProducts)
    const [recentProducts, setRecentProducts] = useState(null)
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    useEffect(() => {
        cart?.length ?
            setTotal(cart.length)
            :
           isLoggedIn && getCart().then(() => {
                const cart = useAuthStore.getState().cart
                setTotal(cart.length)
            })
        if (products) {
            setRecentProducts(products?.slice(0, 3))
        } else {
            fetchProducts().then(() => {
                const products = useAuthStore.getState().products
                setRecentProducts(products?.slice(0, 3))
            })
        }
    }, [products, fetchProducts])

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4 px-8 max-lg:p-2 justify-center items-center min-h-[90vh] bg-gradient-to-br from-[var(--color-primary)]/15 via-[var(--bg-color)] to-[var(--color-primary)]/15">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="min-lg:text-6xl min-sm:text-5xl text-4xl max-[415px]:text-3xl max-[355px]:text-2xl font-[poppins-bold] mb-3 text-center">
                            Professional Tools for
                            <br /><span className="text-[var(--color-primary)]">Every Project</span>
                        </h1>
                        <p className="text-md max-md:text-sm font-[poppins-medium] text-center max-w-xl text-[var(--text-tertiary)]">
                            Discover premium hardware tools trusted by professionals and DIY enthusiasts worldwide, Quality and durability guaranteed.</p>
                    </div>
                    <div className="flex gap-2 justify-center mt-4 mb-8">
                        <Button className='bg-[var(--color-primary)] text-white rounded-xl py-5' onClick={() => navigate('/products')}><ShoppingCart className="" /> Shop Now <ChevronRight /></Button>
                    </div>
                    {/* <ToolsCarousel /> */}
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="flex flex-col gap-4 mt-12 items-center">
                    <h1 className=" text-3xl font-[poppins-bold]">Popular Products</h1>
                    <p className="text-sm font-[poppins-medium] max-w-md text-center text-[var(--text-tertiary)] -mt-2 mb-8 p-2 py-0">Hand-picked tools from top brands, loved by professionals</p>
                    <div className="w-full flex justify-center">
                        <div className="flex flex-wrap gap-6 items-center justify-center max-w-6xl mb-8 -mt-4">
                            {recentProducts ? recentProducts.map((product, i) =>
                                <ProductCard product={product} key={i} />
                            ) : [1,2,3].map((_,i) => <ProductCardSkeleton key={i}/>)}
                        </div>
                    </div>


                </div>
                <div className="py-6 p-2 bg-[var(--color-primary)] flex flex-col gap-2 items-center w-full text-white mt-4">
                    <h1 className="min-lg:text-3xl min-sm:text-2xl text-xl font-[poppins-bold] text-center">Stay Updated With Forge&Bolt</h1>
                    <p className="text-sm pb-2 font-[poppins-medium] max-w-lg text-center">Get the latest deals, new arrivals, and expert tips delivered to your inbox</p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center items-center">
                        <Input
                            type="email"
                            placeholder="Enter your email to subscribe"
                            className="flex-1 rounded-md bg-transparent outline-0 border-2 text-white border-emerald-500 placeholder:text-gray-200 py-2.5"
                        />
                        <Button className="bg-emerald-500 text-white rounded-md px-6 py-5 font-[poppins-bold]">
                            Subscribe
                        </Button>
                    </div>

                </div>
            </motion.div>
        </div >

    )
}

