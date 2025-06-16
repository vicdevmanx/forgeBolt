import API from "@/components/functional/axios";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { CreditCard } from "lucide-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";


export default function MyOrder() {
    const [myOrders, setMyOrders] = useState(null);
    const [loading, setLoading] = useState(false)
    const fetchMyOrders = useAuthStore(s => s.fetchMyOrders)
    const user = useAuthStore(s => s.user)
    const fetchUser = useAuthStore(s => s.fetchUser)

    useEffect(() => {

        fetchMyOrders().then(() => {
            const myOrders = useAuthStore.getState().myOrders
            setMyOrders(myOrders)
        })
        fetchUser()
    }, [])


    return (
        <div className="w-full max-w-3xl my-6 mx-auto p-2 box-border min-h-[80vh]">
            <h2 className="mb-6 font-[poppins-bold] text-2xl">My Orders</h2>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[var(--bg-tertiary)]">

                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Image</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Name</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Qty</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Price</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Id</th>
                            <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    {myOrders && myOrders.map((order) => (
                        <tbody key={order.id}>
                            {order.order_items.map((product, idx) => (
                                <tr key={order.id + '-' + idx} className="border-b border-[var(--bg-tertiary)]">

                                    <td className="px-2 py-3">
                                        {product?.products?.image_url ? (
                                            <img
                                                src={product?.products?.image_url}
                                                alt={product?.products?.name}
                                                className="w-10 h-10 rounded-lg object-cover bg-gray-100 block"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-400">
                                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="8" r="4" fill="#bdbdbd" />
                                                    <rect x="6" y="14" width="12" height="6" rx="3" fill="#bdbdbd" />
                                                </svg>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-2 py-3 font-medium whitespace-nowrap">{product?.products?.name}</td>
                                    <td className="px-2 py-3 text-[var(--text-secondary)] whitespace-nowrap">{product?.quantity}</td>
                                    <td className="px-2 py-3 text-[var(--text-secondary)] whitespace-nowrap">{product?.products?.price}</td>
                                    <td className="px-2 py-3 font-medium whitespace-nowrap">{order?.id}</td>
                                    <td className="px-2 py-3">
                                        <span className={`px-3 py-1 rounded-xl font-[poppins-medium] ${order?.status == 'shipped' && 'bg-[var(--color-primary)]/30 text-[var(--color-primary)]'} ${order.status == 'payed' ? 'bg-orange-400/30' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'} font-medium  text-xs whitespace-nowrap`}>
                                            {order?.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr>
                                <td className="px-2 py-2 font-bold whitespace-nowrap">
                                    <Button
                                        className={`${order.status == 'pending' ? 'flex' : 'hidden'} bg-[var(--color-primary)] text-white text-xs p-3 px-4 rounded-lg 
                                         justify-center items-center gap-2 disabled:opacity-50 
                                        disabled:cursor-not-allowed `}
                                        onClick={async () => {
                                            const form = {
                                                amount: order.total_amount,
                                                email: user.email,
                                                order_id: order.id
                                            }
                                            try {
                                                if (!user) {
                                                    toast.error('User not found!')
                                                }
                                                const tId = toast.loading('Redirecting...')
                                                setLoading(true)
                                                const res = await API.post('/payments/initiate', form)
                                                console.log(res.data)
                                                window.location.href = res.data.authorization_url; // my url
                                                setLoading(false)
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }}
                                    >
                                        {loading ?
                                            <> <Loader size='16px' /> <p>Redirecting...</p></>
                                            : <> <CreditCard size='16px' />
                                                <p> Pay Now </p></>
                                        }
                                    </Button>
                                </td>
                                <td colSpan={1}></td>
                                <td className="px-2 py-3 font-bold whitespace-nowrap">Total:</td>
                                <td className="px-2 py-3 font-bold whitespace-nowrap">{order.total_amount}</td>

                                <td></td>
                            </tr>
                        </tbody>
                    ))}
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
