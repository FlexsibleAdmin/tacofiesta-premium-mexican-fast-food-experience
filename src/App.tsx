import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { Toaster } from "@/components/ui/sonner";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { CartDrawer } from "@/components/cart/CartDrawer";
// Layout wrapper for the main app
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster richColors closeButton position="top-center" />
      <ScrollRestoration />
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
    ],
  },
]);
export function App() {
  return <RouterProvider router={router} />;
}