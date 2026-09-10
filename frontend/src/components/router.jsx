import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../App";
import Body from "./Body";
import About from "./About";
import Cart from "./Cart";
import BookDetails from "./BookDetails";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Register from "./Register";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Body />,
      },
      {
        path: "books/:bookId",
        element: <BookDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default appRouter;