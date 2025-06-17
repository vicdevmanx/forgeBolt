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
    const setDisableAll = useAuthStore(s => s.setDisableAll)

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
      setDisableAll(true)
      const res = await API.post('/register', form)
      console.log(res)
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('Signed up sucessfully')
      close()
      setLoading(false)
      setDisableAll(FontFaceSetLoadEvent)
    } catch (err) {
      console.log(err)
      toast.error('Account already Exists, try logging in!', {
        richColors: true
      })
      setLoading(false)
      setDisableAll(false)
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
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder='Enter password'
          name='password'
          value={form.password}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full border p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-secondary)] border-transparent focus:border-[var(--color-primary)] pr-10"
          onChange={handleChange}
          disabled={loading}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
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
              <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18M10.7 10.7A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M9.88 9.88A3 3 0 0 1 15 12c0 .53-.14 1.03-.38 1.46M21 21L3 3"/>
              <path stroke="currentColor" strokeWidth="2" d="M1 12s4-7 11-7c2.21 0 4.21.72 5.93 1.93M23 12s-4 7-11 7c-2.21 0-4.21-.72-5.93-1.93"/>
            </svg>
          )}
        </button>
      </div>
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
