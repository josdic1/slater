import App from "./App.jsx";
import { ClientDetailStatic } from "./pages/ClientDetailStatic.jsx";
import { ClientForm } from "./components/ClientForm.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { ShotForm } from "./components/ShotForm.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,  
    errorElement: <ErrorPage />,
children: [
  {
    index: true,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "clients/new",  // <-- specific route first
    element: (
      <ProtectedRoute>
        <ClientForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "clients/:clientId",  // <-- parameterized route after
    element: (
      <ProtectedRoute>
        <ClientDetailStatic />
      </ProtectedRoute>
    ),
  },
  {
    path: "clients/:clientId/edit",
    element: (
      <ProtectedRoute>
        <ClientForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "clients/:clientId/shots/new",
    element: (
      <ProtectedRoute>
        <ShotForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "clients/:clientId/shots/:shotId/edit",
    element: (
      <ProtectedRoute>
        <ShotForm/>
      </ProtectedRoute>
    ),
  }
],
  },
];