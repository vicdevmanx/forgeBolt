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



const LoginModalWrapper = () => {
  const isOpen = useAuthStore((s) => s.loginModalOpen);
  const close = useAuthStore((s) => s.closeLoginModal);
  const openSignupModal = useAuthStore(s => s.openSignupModal)

  const switchtosignup = () => {
    close()
    openSignupModal()
  }

  return (
    <AuthModal isOpen={isOpen} onClose={close} title="Login to Your Account">
      <Login />
        <p className='text-center my-4'>Don't have an Account? <span className='underline text-[var(--color-secondary)]' onClick={switchtosignup}>Signup</span></p>
        
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
      <p className='text-center my-4'>Already have an Account? <span className='underline text-[var(--color-secondary)]' onClick={switchtoLogin}>Login</span></p>
    
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
