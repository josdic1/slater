import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ShotCardStatic } from "../components/ShotCardStatic.jsx";
import { ShareButton } from "../components/ShareButton.jsx";
import { SearchInput } from "../components/SearchInput.jsx";

export function ClientDetail() {
  const { clientId } = useParams();
  const { users, deleteClient } = useAuth();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";

  useEffect(() => {
    fetch(`${API_URL}/clients/${clientId}`)
      .then((r) => r.json())
      .then(setClient);
  }, [clientId]);

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

        {/* NEW: Share Button */}
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

      {/* Only show search if they actually have photos */}
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
    </div>
  );
}
