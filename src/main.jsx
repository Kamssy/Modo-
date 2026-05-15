import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TransactionProvider } from './context/TransactionContext'
import { AppProvider } from './context/AppContext'
import { BudgetProvider } from './context/BudgetContext'
import { GoalProvider } from './context/GoalContext'
import { CardProvider } from './context/CardContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <TransactionProvider>
          <BudgetProvider>
            <GoalProvider>
              <CardProvider>
                <App />
              </CardProvider>
            </GoalProvider>
          </BudgetProvider>
        </TransactionProvider>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
