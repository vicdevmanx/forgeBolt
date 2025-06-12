import './App'
import { Outlet } from "react-router-dom";
import Header from './blocks/Header';
import Footer from './blocks/Footer';
import { Toaster } from 'sonner';
import AuthModal from './blocks/authModal';
import MobileNavModal from './blocks/mobileNav';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { useState } from 'react';
import ResetPassword from './pages/resetPassword';
import ForgotPassword from './pages/forgotPassword';



const LoginModalWrapper = () => {
  const isOpen = useAuthStore((s) => s.loginModalOpen);
  const close = useAuthStore((s) => s.closeLoginModal);
  const openSignupModal = useAuthStore(s => s.openSignupModal)

  const switchtosignup = () => {
    close()
    openSignupModal()
  }

  const [forgotPassword, setForgotPassword] = useState(false)
  const freshMail = useAuthStore(s => s.freshMail)

  return (
    <AuthModal isOpen={isOpen} onClose={close} title={forgotPassword ? "Reset Password" : "Login to Your Account"}>
      {forgotPassword ? <ForgotPassword freshMail={freshMail}/> : <Login />}
      {forgotPassword ? 
       <p onClick={() => setForgotPassword(false)}  className='text-sm my-4 mb-6 underline text-[var(--color-primary)] cursor-pointer'>Back to Login</p>
        : <p onClick={() => setForgotPassword(true)} className='text-sm my-4 mb-6 underline text-[var(--color-primary)] cursor-pointer'>Forget Password?</p>}
        <p className='text-center my-4 text-sm'>Don't have an Account? <span className='underline text-[var(--color-secondary)]' onClick={switchtosignup}>Signup</span></p>
        
    </AuthModal>
  );
};

const SignupModalWrapper = () => {
  const isOpen = useAuthStore((s) => s.signupModalOpen);
  const close = useAuthStore((s) => s.closeSignupModal);
  const openLoginModal = useAuthStore(s => s.openLoginModal)

  const switchtoLogin = () => {
    close()
    openLoginModal()
  }

  return (
    <AuthModal isOpen={isOpen} onClose={close} title="Create a New Account">
      <Register/>
      <p className='text-center my-4 text-sm'>Already have an Account? <span className='underline text-[var(--color-secondary)]' onClick={switchtoLogin}>Login</span></p>
    
    </AuthModal>
  );
};


function App() {
  const isLoggedIn = useAuthStore(s => !!s.token)
  const fetchUser = useAuthStore(s => s.fetchUser)
  const fetchProducts = useAuthStore(s => s.fetchProducts)
  useEffect(() => {
    fetchProducts()
    isLoggedIn ? fetchUser() : null
  }, [])

  return (
    <div className=' font-[poppins] bg-[var(--bg-color)] text-[var(--text-primary)] flex flex-col min-h-screen'>
    <Header/>
    <Toaster position='top-center'/>
    <LoginModalWrapper/>
    <SignupModalWrapper/>
    <Outlet />
    <MobileNavModal/>
    <Footer/>
    </div>
  )
}

export default App
