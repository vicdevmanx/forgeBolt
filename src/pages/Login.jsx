import API from "@/components/functional/axios";
import Loader from "@/devKit/loader/loader";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";



export default function Login() {
  const [loading, setLoading] = useState(false)
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
      const res = await API.post('/auth/login', form)
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('logged in successfully')
      close()
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.error + ', try again!' || 'Invalid email or password, try again!', {
        richColors: true
      })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-[poppins] flex flex-col gap-2">
      <input type="text" placeholder='Enter your email'
        name='email'
        value={form.email}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full border p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        disabled={loading}
        onChange={handleChange} />

      <input type="password" placeholder='Enter password'
        name='password'
        value={form.password}
        className=" disabled:opacity-50 disabled:cursor-not-allowed w-full p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        onChange={handleChange}
        disabled={loading} />

      <button type="submit" disabled={loading} className="cursor-pointer py-3 bg-[var(--color-primary)] w-full rounded-lg p-3 mt-2 text-sm font-[poppins-semibold] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white" >
        {loading ?
          <> <Loader size='16px' /> <p>Logging in...</p></>
          :
          <p> Login </p>
        }
      </button>
    </form>
  );
}
