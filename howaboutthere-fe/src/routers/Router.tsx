import AISchedulePage from "@/pages/ai-schedule/AISchedulePage";
import SignInPage from "@/pages/sign-in/SignInPage";
import SignUpPage from "@/pages/sign-up/SignUpPage";
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
  {
    path: "/ai-schedule",
    element: <AISchedulePage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
