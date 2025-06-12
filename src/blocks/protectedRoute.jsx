import { useAuthStore } from "@/store/authStore"
import { useEffect } from "react"
import { toast } from "sonner"

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useAuthStore(s => !!s.token)
  const openLoginModal = useAuthStore(s => s.openLoginModal)

  useEffect(() => {
    if (!isLoggedIn) {
      toast.warning("Please login to access this page")
      openLoginModal()
    }
  }, [isLoggedIn, openLoginModal])

  if (!isLoggedIn) return null

  return children
}
