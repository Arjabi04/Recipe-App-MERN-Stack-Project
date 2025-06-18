// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import Home from './pages/home/Home.jsx';

// import './index.css'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children:[
//       {
//         path:"/", 
//         element: <Home/>
//       }
//     ]
//   },
// ]);
// createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


