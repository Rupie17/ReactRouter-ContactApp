import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root.jsx'
import ErrorPage from './error-page'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact'
import EditContact, {loader as editLoader, action as editAction } from './routes/edit'
import {action as destroyAction } from './routes/destroy'
import Index from './routes/index.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        /* pathless route so they can participate in the root ui layout without new segments for each path */
        errorElement: <ErrorPage />,    
        children: [
          {
            index: true, 
            element: <Index />,
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ]   
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </React.StrictMode>,
)
