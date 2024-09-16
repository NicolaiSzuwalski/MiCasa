import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'
import { SupabaseProvider } from './providers/SupabaseProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SupabaseProvider>
  </StrictMode>,
)