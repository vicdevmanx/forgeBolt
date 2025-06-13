import API from "@/components/functional/axios";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Loader, Mail, Lock } from "lucide-react"; // Fix: Import Lock here
import React, { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = ({ freshMail='', email ='', classes='flex flex-col gap-2 ' }) => {
  const [resetting, setResetting] = useState(false); // Fix: spelling
  const setFreshMail = useAuthStore(s => s.setFreshMail)
  // Fix: Add form object or use email prop directly
  const forgotPassword = async () => {
    try {
      if (!email && !freshMail) {
        toast('Enter Mail!');
        return;
      }
      setResetting(true);
      const res = await API.post('/auth/forgot-password', { email: email || freshMail  });
      toast.success('Email sent!, Kindly Check your Email');
      setResetting(false);
      console.log(res);
    } catch (e) {
      console.log(e);
      setResetting(false);
    }
  };

  return (
   <div className={classes} style={{ minWidth: "0" }}>
           {email &&  <span className="flex gap-2 text-xl font-[poppins-semibold] items-center text-[var(--text-secondary)]">
  <Lock className="size-5" /> Security Settings</span>}
      <span className={`flex flex-col gap-2 text-[var(--text-tertiary)] font-[poppins-medium] text-xs ${!email && '-mt-4 mb-4 text-center'}`} >
        {email &&<span className="text-sm font-[poppins-semibold] text-[var(--text-secondary)]"> Reset Password</span>}
        {!email && 'Enter your email address to receive password reset instructions.'}</span>
      <label className="flex flex-col gap-1">
        {email && <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Email</p>}
        <input type="text"
          placeholder="Enter your Email"
          name='email'
          disabled={email}
          value={email || freshMail}
          onChange={(e) => setFreshMail(e.target.value)}
          className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-2 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]" />
      </label>
      <Button onClick={forgotPassword} disabled={resetting} className='disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 justify-center w-full py-5 bg-[var(--color-primary)] text-white font-[poppins-medium]'>
        {resetting ?
          <> <Loader size='16px' /> <p>Sending Mail...</p></>
          :
          <>
            <Mail className="size-4.5" />
            Send Mail
          </>}
      </Button>
      </div>
  );
};

export default ForgotPassword;