import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ShotForm() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { createShot, users } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('client_id', clientId);
    formData.append('user_id', userId);
    formData.append('description', description);
    
    const result = await createShot(formData);
    
    if (result.success) {
      navigate(`/clients/${clientId}`);
    } else {
      console.error("Failed:", result.error);
    }
  };

  return (
    <div className="page-container">
        <div className="header-section">
            <h3>Upload New Photo</h3>
        </div>

        <form onSubmit={handleSubmit}>
          
          <p style={{marginBottom: '8px', fontWeight: '600'}}>1. Choose Photo</p>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={(e) => setSelectedFile(e.target.files[0])} 
            required 
          />
          
          <p style={{marginBottom: '8px', fontWeight: '600'}}>2. Who is uploading?</p>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User...</option>
            {users?.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
      
          <p style={{marginBottom: '8px', fontWeight: '600'}}>3. Notes (Optional)</p>
          <input 
            type="text" 
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <button type="submit" className="btn-primary">Upload Photo</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
        </form>
    </div>
  );
}