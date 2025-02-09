import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Routing from './route/Routing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
)
