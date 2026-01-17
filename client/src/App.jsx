import { Outlet } from "react-router-dom";
import { AuthProviderStatic } from "./providers/AuthProviderStatic.jsx";
import { NavBar } from "./components/NavBar.jsx";

function App() {
  return (
    <>

      <AuthProviderStatic>
    <header>
      <NavBar />
    </header>
    <main>
      <Outlet />
    </main>
     </AuthProviderStatic>
    </>
  );
}

export default App;