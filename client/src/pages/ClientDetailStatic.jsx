import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ShotCardStatic } from "../components/ShotCardStatic.jsx";
import { ShareButton } from "../components/ShareButton.jsx";
import { SearchInput } from "../components/SearchInput.jsx";
import { HelpModal } from "../components/HelpModal.jsx";

export function ClientDetailStatic() {
  const { clientId } = useParams();
  const { users, fetchClient, deleteClient } = useAuth();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // Use the static provider's fetchClient instead of raw fetch
  useEffect(() => {
    const loadClient = async () => {
      const data = await fetchClient(clientId);
      setClient(data);
    };
    loadClient();
  }, [clientId, fetchClient]);

  const onDeleteClick = async () => {
    if (window.confirm("Delete this client and all their photos?")) {
      const result = await deleteClient(client.id);
      if (result.success) navigate("/");
    }
  };

  if (!client) return <div className="page-container">Loading...</div>;

  const filteredShots = client.shots.filter((shot) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const desc = shot.description ? shot.description.toLowerCase() : "";
    const date = new Date(shot.date).toLocaleDateString().toLowerCase();
    return desc.includes(term) || date.includes(term);
  });

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>{client.name}</h1>
        <p>
          {client.city}, {client.state}
        </p>
      </div>

      <div className="action-area">
        <button
          className="btn-primary"
          onClick={() => navigate(`/clients/${clientId}/shots/new`)}
        >
          + Add New Photo
        </button>

        <ShareButton
          title={`Photos for ${client.name}`}
          text={`Here are the roof photos for ${client.name} at ${client.address}.`}
          url={window.location.href}
        />

        <button
          className="btn-secondary"
          onClick={() => navigate(`/clients/${client.id}/edit`)}
        >
          Edit Client Info
        </button>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #E5E7EB",
          margin: "30px 0",
        }}
      />

      <h2>Photo History ({client.shots.length})</h2>

      {client.shots.length > 0 && (
        <SearchInput
          placeholder="🔍 Find photos (e.g. 'roof', 'damage')..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      )}

      <div className="shots-grid">
        {filteredShots.length > 0 ? (
          filteredShots.map((shot) => (
            <ShotCardStatic key={shot.id} shot={shot} users={users} />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>
            No photos match "{searchTerm}"
          </p>
        )}
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button className="btn-danger" onClick={onDeleteClick}>
          Delete Client Record
        </button>
      </div>

      {/* Floating Help Button */}
      <button
        className="help-fab"
        onClick={() => setShowHelp(true)}
        aria-label="Help"
      >
        ?
      </button>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}