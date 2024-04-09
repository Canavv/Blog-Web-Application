import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./assets/components/Home";
import Form from "./assets/components/Form";
import Post from "./assets/components/Post";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <Form />,
    },
    {
      path: "/edit/:id",
      element: <Form />,
    },
    {
      path: "/post/:id",
      element: <Post />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
