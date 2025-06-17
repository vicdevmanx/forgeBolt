import ProductCard from "@/blocks/ProductCard";
import { Button } from "@/components/ui/button";
import ProductCardSkeleton from "@/skeleton/productCard.skeleton";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import API from "@/components/functional/axios";

export default function Products() {
  const allProducts = useAuthStore(s => s.products);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(allProducts || []);
  const totalPages = useAuthStore(s => s.totalPages)
  const fetchProducts = useAuthStore(s => s.fetchProducts)
  const currentPage = useAuthStore(s => s.currentPage)
  const setCurrentPage = useAuthStore(s => s.setCurrentPage)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setLoading(true);
    setProducts([]); // Clear products to show skeleton
    scrollToTop();
    fetchProducts().finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setProducts(allProducts || []);
      return;
    }
    let filtered = null
    API.get(`/products?limit=100`)
      .then(res => {
        filtered = (res.data.items || []).filter(product =>
          product.name?.toLowerCase().includes(value.toLowerCase())
        );
        setProducts(filtered);
      })

  };

  useEffect(() => {
    setProducts(allProducts || []);
  }, [allProducts]);



  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col gap-6 mt-16 items-center flex-1">
      <h1 className=" text-3xl font-[poppins-bold]">All Products</h1>

      <p className="text-sm font-[poppins-medium] max-w-md text-center text-[var(--text-tertiary)] -mt-4 mb-0 p-2 py-0">Hand-picked tools by top Expert, loved by professionals</p>
      <div className="flex gap-1 px-2  w-full mx-auto max-w-lg mb-8">
        <input placeholder="Search Product..." type='text'
          value={search}
          name='search'
          onChange={(e) => setSearch(e.target.value)}
          onInput={handleSearch}
          className='p-2.5 bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg text-sm w-full outline-0 focus:border-[var(--color-primary)]/50 ' />
        <Button className='bg-[var(--color-primary)] text-white text-sm h-auto px-6 rounded-lg border border-[var(--bg-primary)]'>Filter</Button>
      </div>
      {search && <p>Search Result for: {search}</p>}
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-4 items-center justify-center max-w-6xl mb-8 -mt-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : (products.length > 0
              ? products.map((product, i) =>
                <ProductCard product={product} key={i} />
              )
              : Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            )
          }
        </div>
      </div>
      <div className="flex items-center select-none gap-2 ml-4 mb-8 -mt-4">
        <Button
          disabled={currentPage === 1 || loading}
          onClick={() => {
            setLoading(true);
            setCurrentPage(currentPage - 1);
          }}
          size="icon"
          variant="outline"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages || loading}
          onClick={() => {
            setLoading(true);
            setCurrentPage(currentPage + 1);
          }}
          size="icon"
          variant="outline"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
}