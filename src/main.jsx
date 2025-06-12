import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { routes } from './components/functional/routes'
import { RouterProvider } from 'react-router-dom'
import GlobalState from './components/functional/context'


createRoot(document.getElementById('root')).render(
  <GlobalState>
    <RouterProvider router={routes} />
  </GlobalState>
)
