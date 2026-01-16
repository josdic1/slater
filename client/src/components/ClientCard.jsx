import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export function ClientCard({ client, users }) {
  const { fetchClient, fetchUsers } = useAuth();
  const navigate = useNavigate();

  const onClientClick = (id) => {
    navigate(`/clients/${id}`);    
    fetchClient(id)
  }

  const onUserClick = (id) => { 
    fetchUsers(id)
  }

  return (
    <div className="client-card">
      <h2>{client.name}</h2>
      <p style={{fontWeight: 500}}>{client.address}</p>
      <p style={{color: '#666'}}>{client.city}, {client.state} {client.zip_code}</p>
      
      <button className="btn-primary" onClick={() => onClientClick(client.id)}>
        View Profile
      </button>
    </div>
  );
}