import React from 'react'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {PageDashboard} from "./page/PageDashboard.tsx";

import {ChakraProvider} from '@chakra-ui/react'
import {PageConnect} from "./page/PageConnect.tsx";

const router = createBrowserRouter([
    {
        path: "/connect/:target",
        element: <PageConnect></PageConnect>
    },
    {
        path: "/",
        element: <PageDashboard></PageDashboard>
    },
])

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
