import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function ShotCard({ shot, users }) {
  const { API_URL, deleteShot } = useAuth();
  const navigate = useNavigate();

  // Helper for clean dates
  const dateStr = new Date(shot.date).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  
  const uploaderName = users?.find(u => u.id === shot.user_id)?.name || 'Unknown';

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      const result = await deleteShot(shot.id);
      if (result.success) navigate('/');
    }
  };

  return (
    <div className="card shot-card">
      <img 
        className="shot-image"
        src={`${API_URL.replace('/api', '')}/uploads/${shot.image_path}`} 
        alt={shot.description} 
      />
      <div className="shot-content">
        <div className="shot-meta">
          {dateStr} • {uploaderName}
        </div>
        
        {shot.description && (
          <p style={{fontSize: '18px', marginBottom: '16px'}}>{shot.description}</p>
        )}

        <button type="button" className="btn-danger" onClick={handleDelete}>
          Delete Photo
        </button>
      </div>
    </div>
  );
}