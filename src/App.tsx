import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./componentes/layout";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { CartDetail } from "./pages/detail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/cartdetail/:id",
        element: <CartDetail/>
      }
    ]
  }
])

export {router};