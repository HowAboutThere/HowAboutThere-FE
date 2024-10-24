import Layout from "@/components/Layout/Layout";
import AISchedulePage from "@/pages/ai-schedule/AISchedulePage";
import MainPage from "@/pages/main/MainPage";
import SignInPage from "@/pages/sign-in/SignInPage";
import SignUpPage from "@/pages/sign-up/SignUpPage";
import UIComponents from "@/pages/ui-components/UIComponents";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "ui-components",
        element: <UIComponents />,
      },
      {
        path: "ai-schedule",
        element: <AISchedulePage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);
