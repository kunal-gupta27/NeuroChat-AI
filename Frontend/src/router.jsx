import About from "./components/About.jsx";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ChatWindow from "./ChatWindow.jsx";
import Login from "./components/Login.jsx";
import Protected from "./components/Protected.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            <ChatWindow />
          </Protected>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
