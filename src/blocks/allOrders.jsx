import API from "@/components/functional/axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";


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
                            <th className="px-2 py-3 font-[poppins-medium]">user id</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Price</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Status</th>
                              <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Set status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders && allOrders.map((order) => (
                            <tr key={order.id} className="border-b border-[var(--bg-tertiary)]">
                                <td className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">#{order.user_id  || 'loading...'}</td>
                                <td className="px-2 py-3 whitespace-nowrap font-[poppins-medium]">{order.total_amount  || 'loading...'}</td>
                                <td className="px-2 py-3 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-xl font-[poppins-medium] ${order.status == 'shipped' && 'bg-[var(--color-primary)]/30 text-[var(--text-secondary)]'} ${order.status == 'Paid' ? 'bg-orange-400/30 text-[var(--text-secondary)] px-6' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'} font-medium  text-xs whitespace-nowrap`}>
                                    {order.status || 'loading...'}
                                </span></td>
                                <td className="px-2 py-3 text-[var(--text-secondary)] whitespace-nowrap">
                                    <select
                                        value={order.status}
                                        onChange={async e => {
                                            const newStatus = e.target.value;
                                            setAllOrders(prev =>
                                                prev.map(o =>
                                                    o.id === order.id ? { ...o, status: newStatus } : o
                                                )
                                            );
                                            // Update status in backend
                                            try {
                                                const tId = toast.loading('status Updated!')
                                                await API.put(`/orders/${order.id}/status`, {
                                                    status: newStatus
                                                });
                                                toast.success('status Updated!', {
                                                    id: tId
                                                })
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }}
                                        className="border rounded-md px-2 py-1 text-xs font-[poppins-medium] bg-[var(--bg-secondary)] border-[var(--bg-tertiary)]"
                                    >
                                        <option value="Paid">Paid</option>
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                    </select>
                                </td>
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
        </div >
    );
}
