import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ModalsProvider from "./components/ModalsProvider";
import MainLayout from "./layouts/MainLayout";
import Progress from "./components/Progress/Progress";
import NotFoundView from "./components/NotFound";

import { lazy } from "react";
import { Suspense } from "react";
import GuestLayout from "./layouts/GuestLayout/GuestLayout";

const RoutesProvider = () => {
  const HomeView = lazy(() => import("./views/Home"));
  const AboutView = lazy(() => import("./views/About"));
  const LoginView = lazy(() => import("./views/authentification/Login"));
  const RegisterView = lazy(() => import("./views/authentification/Register"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route path="/auth" element={<GuestLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
          </Route>
          {/* Users Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomeView />} />
            <Route path="about" element={<AboutView />} />
          </Route>
          {/* Uncreated Routes */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
      <ModalsProvider />
    </BrowserRouter>
  );
};

export default RoutesProvider;
