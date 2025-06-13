import ProductCard from "@/blocks/ProductCard";
import { Button } from "@/components/ui/button";
import ProductCardSkeleton from "@/skeleton/productCard.skeleton";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function Products() {
  const allProducts = useAuthStore(s => s.products);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(allProducts || []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setProducts(allProducts || []);
      return;
    }
    const filtered = (allProducts || []).filter(product =>
      product.name?.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
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
      className="flex flex-col gap-4 mt-16 items-center flex-1">
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
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-4 items-center justify-center max-w-6xl mb-8 -mt-4">
          {ProductCardSkeleton ? products.map((product, i) =>
            <ProductCard product={product} key={i} />

          ) : [1, 2, 3].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>

    </motion.div>
  );
}
