import { Outlet } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { NavBar } from "./components/NavBar.jsx";

function App() {
  return (
    <>

      <AuthProvider>
    <header>
      <NavBar />
    </header>
    <main>
      <Outlet />
    </main>
     </AuthProvider>
    </>
  );
}

export default App;