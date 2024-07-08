import React from 'react'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {PageDashboard} from "./page/PageDashboard.tsx";
import {PageLogin} from "./page/PageLogin.tsx";

import {ChakraProvider} from '@chakra-ui/react'
import {PageConnect} from "./page/PageConnect.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLogin></PageLogin>,
    },
    {
        path: "/dashboard",
        element: <PageDashboard></PageDashboard>
    },
    {
        path: "/connect/:target",
        element: <PageConnect></PageConnect>
    },
])

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
