import { createRoot } from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'

import App from './components/app/App.jsx'
import { NoInternetConnect } from './components/app-common/app-common.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <NoInternetConnect />
    </Offline>
  </>
)
