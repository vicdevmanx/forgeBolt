import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useState } from "react";


export default function Orders() {
  const [allOrders, setAllOrders] = useState([
    {
      id: 1,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
    {
      id: 2,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
    {
      id: 3,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
  ]);
  const fetchOrders = useAuthStore(s => s.fetchOrders)

  useEffect(() => {
    fetchOrders().then(() => {
      const allOrders = useAuthStore.getState().allOrders
      setAllOrders(allOrders)
    })

  }, [])


  return (
    <div className="w-full max-w-4xl my-6 p-2 box-border min-h-[80vh]">
      <h2 className="mb-6 font-[poppins-bold] text-2xl">All orders</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--bg-tertiary)]">
              <th className="px-2 py-3 font-[poppins-medium]">id</th>
              <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Name</th>
            </tr>
          </thead>
          <tbody>
            {allOrders && allOrders.map((order) => (
              <tr key={order.id} className="border-b border-[var(--bg-tertiary)]">
                <td className="px-2 py-3 font-medium whitespace-nowrap">{order.total_amount}</td>
                <td className="px-2 py-3 text-[var(--text-secondary)] whitespace-nowrap">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 600px) {
          table {
            min-width: 0 !important;
            font-size: 14px;
          }
          th, td {
            padding-left: 6px !important;
            padding-right: 6px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
