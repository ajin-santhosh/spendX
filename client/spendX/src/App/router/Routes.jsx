import AuthLayout from "../Layoutes/AuthLayout";
// import Login from "../pages/Login";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("@/Features/auth/LoginPage"));
const Register = lazy(() => import("@/Features/auth/RegisterPage"));

export default [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      // PUBLIC ROUTES
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // PROTECTED AREA
      //   {
      //     path: "dashboard",
      //     element: <DashboardLayout />,
      //     children: [
      //       {
      //         index: true,
      //         element: <Dashboard />,
      //       },
      //       {
      //         path: "analytics",
      //         element: <Analytics />,
      //       },
      //     ],
      //   },
    ],
  },
];
