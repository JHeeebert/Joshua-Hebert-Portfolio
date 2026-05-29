import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')

if (!container) {
  throw new Error(
    '[Portfolio] Root element #root not found. Check index.html — the <div id="root"> is missing.'
  )
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
