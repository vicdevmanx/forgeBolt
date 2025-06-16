import API from "@/components/functional/axios";
import Loader from "@/devKit/loader/loader";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";



export default function Login() {
  const [loading, setLoading] = useState(false)
    const setDisableAll = useAuthStore(s => s.setDisableAll)
      const disableAll = useAuthStore(s => s.disableAll)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const setUser = useAuthStore(s => s.setUser)
  const setToken = useAuthStore(s => s.setToken)
  const close = useAuthStore((s) => s.closeLoginModal);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form
    if (!email || !password) {
      toast.warning('Please fill Out all fields')
      return
    }
    try {
      setLoading(true)
      setDisableAll(true)
      const res = await API.post('/auth/login', form)
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('logged in successfully')
      close()
      setLoading(false)
      setDisableAll(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.error + ', try again!' || 'Invalid email or password, try again!', {
        richColors: true
      })
      setLoading(false)
      setDisableAll(false)
      console.log(disableAll)
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="font-[poppins] flex flex-col gap-2">
      <input
        type="text"
        placeholder="Enter your email"
        name="email"
        value={form.email}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        disabled={loading}
        onChange={handleChange}
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          name="password"
          value={form.password}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)] pr-10"
          onChange={handleChange}
          disabled={loading}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            // Eye open SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ) : (
            // Eye closed SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18M10.7 10.7A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M9.53 9.53A3 3 0 0 1 15 12c0 .53-.14 1.03-.38 1.47M6.53 6.53C4.07 8.36 2 12 2 12s4 7 10 7c2.21 0 4.21-.72 5.87-1.93M17.47 17.47C19.93 15.64 22 12 22 12s-4-7-10-7c-1.61 0-3.13.31-4.47.87"/>
            </svg>
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer py-3 bg-[var(--color-primary)] w-full rounded-lg p-3 mt-2 text-sm font-[poppins-semibold] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        {loading ? (
          <>
            <Loader size="16px" /> <p>Logging in...</p>
          </>
        ) : (
          <p> Login </p>
        )}
      </button>
    </form>
  );
}
