import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFormValidation from "@/devKit/useFormValidation";
import { useState } from "react";
import Loader from "@/devKit/loader/loader";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import API from "@/components/functional/axios";



export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const setUser = useAuthStore(s => s.setUser)
  const setToken = useAuthStore(s => s.setToken)
  const close = useAuthStore((s) => s.closeSignupModal);

  const validate = (name, value) => {
    if (name === "name" && value.length < 3) return "Too short";
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
    if (name === "password" && value.length < 6) return "Weak password";
    return null;
  };

  const [loading, setLoading] = useState(false)
  const handleFormSubmit = async (formData) => {
    console.log("Submitted:", formData);
    try {
      setLoading(true)
      const res = await API.post('/register', form)
      console.log(res)
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('Signed up sucessfully')
      close()
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Account already Exists, try logging in!', {
        richColors: true
      })
      setLoading(false)
    }
  };

  const {
    form,
    errors,
    imagePreview,
    handleChange,
    handleSubmit,
    imageInputRef,
    triggerImageInput,
  } = useFormValidation(initialValues, validate, handleFormSubmit);
  return (
    <form onSubmit={handleSubmit} className="font-[poppins] flex flex-col gap-2">
      <input type="text" placeholder='Enter your name'
        name='name'
        value={form.name}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full border p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        disabled={loading}
        onChange={handleChange}
      />  {errors.name && <p className="text-red-500">{errors.name}</p>}
      <input type="text" placeholder='Enter your email'
        name='email'
        value={form.email}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full border p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        disabled={loading}
        onChange={handleChange} />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input type="password" placeholder='Enter password'
        name='password'
        value={form.password}
        className=" disabled:opacity-50 disabled:cursor-not-allowed w-full border p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)]"
        onChange={handleChange}
        disabled={loading} />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <button type="submit" disabled={Object.values(errors).some(Boolean) || loading} className="cursor-pointer py-3 bg-[var(--color-primary)] w-full rounded-lg p-3 mt-2 text-sm font-[poppins-semibold] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white" >
        {loading ?
          <> <Loader size='16px' /> <p>Signing up...</p></>
          :
          <p> Signup </p>
        }
      </button>
    </form>
  );
}
