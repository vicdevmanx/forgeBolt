import API from "@/components/functional/axios"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { Loader } from "lucide-react"
import { Mail } from "lucide-react"
import { Lock } from "lucide-react"
import { Info } from "lucide-react"
import { User } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "sonner"



export const ProfileCard = () => {
    const setUser = useAuthStore(s => s.setUser)
    const [role, setRole] = useState(useAuthStore(s => s?.user?.role))
    const [name, setName] = useState(useAuthStore(s => s?.user?.name))
    const [email, setEmail] = useState(useAuthStore(s => s?.user?.email))
    const fetchUser = useAuthStore(s => s.fetchUser)


    useEffect(() => {
        fetchUser().then(() => {
            const user = useAuthStore.getState().user;
            setRole(user?.role);
            setName(user?.name);
            setEmail(user?.email);
        });
    }, []);

    const [form, setForm] = useState({
        name: '',
        email: '',
    })
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!email || !name) {
            toast('Please fill out all fields')
            return
        }

        try {
            setLoading(true)
            const res = await API.put('/auth/profile', form)
            toast.success('Profile Updated Successfully!')
            setUser(res.data)
            setEditMode(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('there was an error!')
            setLoading(false)
        }

    }
    const [reseting, setReseting] = useState(false)
    const forgotPassword = async () => {
        try {
            if (!form.email) {
                toast('Enter Mail!')
                return
            }
            setReseting(true)
            const res = await API.post('/auth/forgot-password', { email: form.email })
            toast.success('Email sent!')
            setReseting(false)
            console.log(res)
        } catch (e) {
            console.error(e)
            setReseting(false)
        }
    }

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            name: name || 'Loading Name...',
            email: email || 'Loading Email...'
        }))
    }, [name, email])
    return (
        <div className="flex flex-col items-center justify-center flex-1 w-full min-h-[80dvh]">
            <div className="w-full flex flex-col md:flex-row md:items-stretch md:justify-center gap-4 text-[var(--text-secondary)] max-w-[900px] mx-auto">
                {/* profile Info */}
                <div className="flex-1 w-full min-w-0 max-w-full md:min-w-90 md:max-w-100 flex flex-col gap-5 bg-[var(--bg-secondary)] rounded-lg p-4 h-auto md:h-90 border-1 border-[var(--bg-tertiary)] max-md:mx-auto"
                    style={{ minWidth: "0" }}>
                    <span className="flex gap-2 text-xl font-[poppins-semibold] items-center text-[var(--text-secondary)]"> <Info className="size-5" /> Profile Information</span>
                    <label className="flex flex-col gap-1">
                        <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Name</p>
                        <input type="text"
                            placeholder="Enter your name"
                            name='name'
                            disabled={!editMode}
                            value={form.name}
                            onChange={handleChange}
                            className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]" />
                    </label>

                    <label className="flex flex-col gap-1">
                        <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Email</p>
                        <input type="text"
                            placeholder="Enter your name"
                            name='email'
                            disabled={!editMode}
                            value={form.email}
                            onChange={handleChange}
                            className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]" />
                    </label>

                    <label className="flex flex-col gap-1">
                        <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Account Type</p>
                        <input type="text"
                            name='role'
                            value={role || 'Loading Role...'}
                            disabled={true}
                            className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]" />
                    </label>
                    <div className="">
                        {!editMode ?
                            <Button onClick={() => setEditMode(true)} className='bg-[var(--color-primary)] text-white font-[poppins-medium]'>Edit Profile</Button>
                            : <>
                                <Button className='transition mr-2 bg-[var(--color-primary)] text-white font-[poppins-medium]' onClick={handleSubmit}>

                                    {loading ?
                                        <> <Loader size='16px' /> <p>Update Profile...</p></>
                                        :
                                        <p> Update Profile </p>
                                    }
                                </Button>
                                <Button onClick={() => setEditMode(false)}>cancel</Button>
                            </>
                        }
                    </div>
                </div>
                {/* security */}
                <div className="flex-1 w-full min-w-0 max-w-full md:min-w-90 md:max-w-100 h-auto md:h-90 border-1 border-[var(--bg-tertiary)] flex flex-col gap-5 bg-[var(--bg-secondary)] rounded-lg p-4 max-md:mx-auto"
                    style={{ minWidth: "0" }}>
                    <span className="flex gap-2 text-xl font-[poppins-semibold] items-center text-[var(--text-secondary)]">
                        <Lock className="size-5" /> Security Settings</span>
                    <span className="flex flex-col gap-2 text-[var(--text-tertiary)] font-[poppins-medium] text-xs">
                        <span className="text-sm font-[poppins-semibold] text-[var(--text-secondary)]">Reset Password</span>
                        Enter your email address to receive <br /> password reset instructions.</span>
                    <label className="flex flex-col gap-1">
                        <p className="font-[poppins-semibold] text-[var(--text-tertiary)] text-sm">Email</p>
                        <input type="text"
                            placeholder="Enter your Email"
                            name='email'
                            disabled={true}
                            value={form.email}
                            onChange={handleChange}
                            className="disabled:opacity-50 font-[poppins-medium] disabled:cursor-not-allowed w-full p-1.5 rounded-lg border-3 transition outline-0 text-sm bg-[var(--bg-tertiary)] border-transparent focus:border-[var(--color-primary)]" />
                    </label>
                    <Button onClick={forgotPassword} disabled={reseting} className='disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 justify-center w-full py-5 bg-[var(--color-primary)] text-white font-[poppins-medium]'>
                        {reseting ?
                            <> <Loader size='16px' /> <p>Sending Mail...</p></>
                            :
                            <>
                                <Mail className="size-4.5" />
                                Send Mail
                            </>}
                    </Button>
                </div>
            </div>
            {/* account status */}
        </div>
    )
}