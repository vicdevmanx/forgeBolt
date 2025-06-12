import ProductCard from "@/blocks/ProductCard";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";

export default function Products() {
  const products = useAuthStore(s => s.products)
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col gap-4 mt-16 items-center flex-1">
      <h1 className=" text-3xl font-[poppins-bold]">All Products</h1>
      <p className="text-sm font-[poppins-medium] max-w-md text-center text-[var(--text-tertiary)] -mt-4 mb-8 p-2 py-0">Hand-picked tools by top Expert, loved by professionals</p>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-4 items-center justify-center max-w-6xl mb-8 -mt-4">
          {products && products.map((product, i) =>
            <ProductCard product={product} key={i} />
          )}
        </div>
      </div>

    </motion.div>
  );
}
