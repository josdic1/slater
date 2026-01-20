import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { ClientList } from "../components/ClientList.jsx";
import { Logo } from "../components/Logo.jsx";
import { SearchInput } from "../components/SearchInput.jsx";
import { HelpModal } from "../components/HelpModal.jsx";

export function HomePage() {
  const { loading, clients, users } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  if (loading) return <div className="page-container">Loading...</div>;

  const filteredClients = clients.filter((client) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.city.toLowerCase().includes(term) ||
      client.address.toLowerCase().includes(term)
    );
  });

  return (
    <div className="page-container">
      <div
        className="header-section"
        style={{ borderBottom: "none", paddingBottom: 0 }}
      >
        <Logo />
      </div>

      <SearchInput
        placeholder="🔍 Search clients by name or city..."
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {searchTerm && (
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Found {filteredClients.length} result(s)
        </p>
      )}

      <ClientList clients={filteredClients} users={users} />

      {/* Floating Help Button */}
      <button
        className="help-fab"
        onClick={() => setShowHelp(true)}
        aria-label="Help"
      >
        ?
      </button>

      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
        screen="home"
      />
    </div>
  );
}