import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/register";
import ItemDetail from "../pages/item-detail";
import Cart from "../pages/cart";
import Order from "../pages/order";
import OrderDetail from "../pages/order-detail";
import Login from "../pages/login";
import Item from "../pages/item";
import ItemAdd from "../pages/item-add";
import UserRoute from "../outlets/UserRoute";
import AdminRoute from "../outlets/AdminRoute";
import AuthRoute from "../outlets/AuthRoute";
import ErrorPage from "../error-page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/item/:id',
        element: <ItemDetail />,
    },
    {
        path: '/',
        element: <UserRoute />,
        children: [
            {
                path: '/cart',
                element: <Cart />,
            },
        ]
    },
    {
        path: '/',
        element: <AdminRoute />,
        children: [
            {
                path: '/item',
                element: <Item />,
            },
            {
                path: '/item/add',
                element: <ItemAdd />,
            },
            {
                path: '/item/edit/:id',
                element: <ItemAdd />,
            },
        ]
    },
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            {
                path: '/order',
                element: <Order />,
            },
            {
                path: '/order/:id',
                element: <OrderDetail />,
            },
        ]
    },
])



const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes