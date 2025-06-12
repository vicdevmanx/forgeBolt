import API from "@/components/functional/axios";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Loader, Mail, Lock, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {
    const [resetting, setResetting] = useState(false)
    const [form, setForm] = useState({ password: "", confirm: "" });
    const location = useLocation();
    const [err, setErr] = useState(null)
    const resetPassword = async () => {
        try {
            if (!form.password || !form.confirm) {
                toast.error('fill out all fields!')
                return
            }

            if (err) {
                toast.error('password should be not be less than 6 characters')
                return}

            if (form.password != form.confirm) {
                toast.error(`Passwords Don't match`)
                return
            }
            setResetting(true)

            const queryParams = new URLSearchParams(location.search)
            const token = queryParams.get('token') || 'NoTokenFound!'
            const res = await API.post('/auth/reset-password', { token:token , newPassword: form.password })
            toast.success('Password has been reset!')
            setResetting(false)
            console.log(res)
        } catch (e) {
            console.log(e)
            setResetting(false)
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="flex-1 w-full min-w-0 max-w-100 md:min-w-90 md:max-w-100 h-auto border-1 border-[var(--bg-tertiary)] flex flex-col gap-5 bg-[var(--bg-secondary)] rounded-lg p-4 max-md:mx-auto"
                style={{ minWidth: "0" }}>
                <span className="flex gap-2 text-xl font-[poppins-semibold] items-center text-[var(--text-secondary)]">
                    <Lock className="size-5" /> Security Settings</span>

                <span className="text-sm font-[poppins-semibold] text-[var(--text-secondary)]">
                    Reset Password</span>
                <label className="flex flex-col gap-1 relative">
                    <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">New Password</p>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your New Password"
                        name='password'
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        onInput={e => {
                            if(e.target.value.length < 6){
                                setErr('Password must be not be less than 6 Characters')
                            }else{
                                  setErr(null)
                            }
                        
                        }}
                        className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]"
                    />
                    <span
                        className="absolute right-3 top-9 cursor-pointer text-[var(--text-tertiary)]"
                        onClick={() => setShowPassword(v => !v)}
                        tabIndex={0}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword
                            ? <EyeOff className="size-4" />
                            : <Eye className="size-4" />}
                    </span>
                </label>
                {err && <p className="text-yellow-500 text-xs -mt-4">{err}</p>}
                <label className="flex flex-col gap-1 relative">
                    <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Confirm Password</p>
                    <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm Password"
                        name='confirm'
                        value={form.confirm}
                        onChange={e => setForm({ ...form, confirm: e.target.value })}
                        className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]"
                    />
                    <span
                        className="absolute right-3 top-9 cursor-pointer text-[var(--text-tertiary)]"
                        onClick={() => setShowConfirm(v => !v)}
                        tabIndex={0}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                        {showConfirm
                            ? <EyeOff className="size-4" />
                            : <Eye className="size-4" />}
                    </span>
                </label>
                <Button onClick={resetPassword} disabled={resetting} className='disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 justify-center w-full py-5 bg-[var(--color-primary)] text-white font-[poppins-medium]'>
                    {resetting ?
                        <> <Loader size='16px' /> <p>Resetting Password...</p></>
                        :
                        <>
                            <Send className="size-4.5" />
                            Reset Password
                        </>}
                </Button>
            </div>
        </div>
    )
};

export default ResetPassword;