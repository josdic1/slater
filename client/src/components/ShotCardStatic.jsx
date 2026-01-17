import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "./ShareButton";

export function ShotCardStatic({ shot, users }) {
  const { API_URL, deleteShot } = useAuth();
  const navigate = useNavigate();

  // If path starts with / or http, use as-is. Otherwise prepend uploads path.
  let imageUrl = shot.image_path;
  if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http') && !imageUrl.startsWith('blob:')) {
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
console.log('imageUrl:', imageUrl, 'shot.image_path:', shot.image_path);
  return (
    <div className="card shot-card">
    <img 
  className="shot-image"
  src={imageUrl} 
  alt={shot.description}
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
