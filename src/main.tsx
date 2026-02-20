import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { initGsap } from '@/lib/gsapInit'
import { ThemeProvider } from '@/hooks/useTheme'

initGsap()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </ThemeProvider>
  </StrictMode>,
)
