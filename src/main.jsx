import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css'
import Routing from './route/Routing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
)
