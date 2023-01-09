import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { CycleCotextProvider } from './contexts/CycleContexts'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleCotextProvider>
          <Router />
        </CycleCotextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
