import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useState } from "react";

export default function AdminOverview() {
  const [userLength, setUserLength] = useState(0)
  const [orderLength, setOrderLength] = useState(0)
  const [productsLength, setProductsLength] = useState(0)
  const getAllUsers = useAuthStore(s => s.getAllUsers)
  const fetchProducts = useAuthStore(s => s.fetchProducts)

  useEffect(() => {
    fetchProducts().then(() => {
      const products = useAuthStore.getState().products
      setProductsLength(products.length)
    })
    getAllUsers().then(() => {
      const allUsers = useAuthStore.getState().allUsers
      setUserLength(allUsers.length)
    })

  }, [])

  return (
    <div className="min-h-[80vh] p-2 my-6 flex flex-col items-center">
      <h2 className="mb-4 font-[poppins-bold] text-2xl">
        Admin Overview
      </h2>
      <p className="text-md max-md:text-sm font-[poppins-medium] max-w-xl text-[var(--text-tertiary)]">Manage Your Store Products, Orders and Users </p>

      <div className="flex flex-col md:flex-row gap-4 mt-10 w-full max-w-4xl">
        <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg p-8 flex flex-col items-center gap-2">
          <span className="flex items-center justify-center rounded-full text-xl font-[poppins-bold] text-white w-16 h-16 bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-300">
            {productsLength}</span>
          <span className="text-xl font-[poppins-semibold]">Total Products</span>
        </div>

        <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg p-6 flex flex-col items-center gap-2">
          <span className="flex items-center justify-center rounded-full text-xl font-[poppins-bold] text-white w-16 h-16 bg-gradient-to-r from-indigo-700 via-violet-500 to-fuchsia-300">
            {orderLength}
          </span>
          <span className="text-xl font-[poppins-semibold]">Total Orders</span>
        </div>

        <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg p-6 flex flex-col items-center gap-2">
          <span className="flex items-center justify-center rounded-full text-xl font-[poppins-bold] text-white w-16 h-16 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400">
            {userLength}</span>
          <span className="text-xl font-[poppins-semibold]">Total Users</span>
        </div>
      </div>
    </div>
  );
}
