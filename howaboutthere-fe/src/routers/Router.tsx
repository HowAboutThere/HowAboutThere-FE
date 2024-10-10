import UIComponents from "@/pages/ui-components/UIComponents";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <Hero/>
    children: [],
  },
  {
    path: "/ui-components",
    element: <UIComponents />,
  },
]);
