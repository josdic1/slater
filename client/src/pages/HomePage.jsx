import { useAuth } from "../hooks/useAuth.jsx";
import { ClientList } from "../components/ClientList.jsx";
// Import the new Logo component
import { Logo } from "../components/Logo.jsx";

export function HomePage() {
    const { loading, clients, users } = useAuth();

    if (loading) return <div className="page-container">Loading...</div>;
    
    return (
        <div className="page-container">
           <div className="header-section" style={{borderBottom: 'none', paddingBottom: 0}}>
             
             {/* Use the new component here */}
             <Logo />
             
      
           </div>
           
           <ClientList clients={clients} users={users} />
        </div>
    );
}