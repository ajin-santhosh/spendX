import React from 'react'
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from './components/Loaders/PageLoader';
const Login = lazy(()=> import("@/Features/auth/LoginPage"))
const Register = lazy(() => import("@/Features/auth/RegisterPage"))
export default function App() {
  return (
    <div>

       {/* <LoginPage /> */}
       {/* <RegisterPage /> */}
       {/* <ForgetPassword /> */}
       <PageLoader />
    </div>
  )
}
