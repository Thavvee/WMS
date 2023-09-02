import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'

import './index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
  <RecoilRoot>
       <ChakraProvider>
      <App />
    </ChakraProvider>
    </RecoilRoot>
    </BrowserRouter>
  // </React.StrictMode>,
)
