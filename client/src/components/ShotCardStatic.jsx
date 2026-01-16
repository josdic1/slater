import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "./ShareButton";

export function ShotCard({ shot, users }) {
  const { API_URL, deleteShot } = useAuth();
  const navigate = useNavigate();

  // --- THE FIX IS HERE ---
  let imageUrl = shot.image_path;

  // Check if it is NOT a full web link (Unsplash) AND NOT a temporary blob (New Upload)
  const isExternal = imageUrl.startsWith('http') || imageUrl.startsWith('blob:');

  if (!isExternal) {
    // If it's just a filename (like "roof.jpg"), prep it for the server
    // We remove '/api' just in case your API_URL includes it
    const cleanBase = API_URL ? API_URL.replace('/api', '') : '';
    imageUrl = `${cleanBase}/uploads/${shot.image_path}`;
  }
  // -----------------------

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
        src={imageUrl} 
        alt={shot.description}
        onError={(e) => {
             // Fallback if image fails to load
             e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found"; 
        }}
      />
      <div className="shot-content">
        <div className="shot-meta">
          {dateStr} • {uploaderName}
        </div>
        
        {shot.description && (
          <p style={{fontSize: '18px', marginBottom: '16px'}}>{shot.description}</p>
        )}

        <div style={{ marginBottom: '12px' }}>
            <ShareButton 
                title="Roof Photo"
                text={`Check out this photo from ${dateStr}:`}
                url={imageUrl} 
            />
        </div>

        <button type="button" className="btn-danger" onClick={handleDelete}>
          Delete Photo
        </button>
      </div>
    </div>
  );
}