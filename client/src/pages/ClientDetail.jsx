import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ShotCard } from '../components/ShotCard.jsx';

export function ClientDetail() {
  const { clientId } = useParams();
  const { users, deleteClient } = useAuth();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";

  useEffect(() => {
    fetch(`${API_URL}/clients/${clientId}`)
      .then(r => r.json())
      .then(setClient);
  }, [clientId]);

  const onDeleteClick = async () => {
    if (window.confirm("Delete this client and all their photos?")) {
      const result = await deleteClient(client.id);
      if (result.success) navigate('/');
    }
  };

  if (!client) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      {/* Header Info */}
      <div className="header-section">
        <h1>{client.name}</h1>
        <p>{client.city}, {client.state}</p>
      </div>

      {/* Primary Action Area */}
      <div className="action-area">
        <button 
          className="btn-primary" 
          onClick={() => navigate(`/clients/${clientId}/shots/new`)}
        >
          + Add New Photo
        </button>
        
        <button 
          className="btn-secondary" 
          onClick={() => navigate(`/clients/${client.id}/edit`)}
        >
          Edit Client Info
        </button>
      </div>

      <hr style={{border: 'none', borderTop: '1px solid #E5E7EB', margin: '30px 0'}} />

      {/* Feed */}
      <h2>Photo History ({client.shots.length})</h2>
      <div className="shots-grid">
        {client.shots.map(shot => (
            <ShotCard key={shot.id} shot={shot} users={users} />
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button className="btn-danger" onClick={onDeleteClick}>Delete Client Record</button>
      </div>
    </div>
  );
}