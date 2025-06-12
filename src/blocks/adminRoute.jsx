import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"

export default function AdminRoute({ children }) {
  const isLoggedIn = useAuthStore(s => !!s.token)
  const user = useAuthStore(s => s.user)

  const isAdmin = user?.role === "admin"

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Access denied. Admins only!")
    }
  }, [isAdmin])

  if (!isLoggedIn || !isAdmin) return null

  return children
}
