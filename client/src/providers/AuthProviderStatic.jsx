import { AuthContext } from "../contexts/AuthContext"; // Import the context container
import { useState } from "react";
import { INITIAL_USERS, INITIAL_CLIENTS, INITIAL_SHOTS } from "../data/data";

export function AuthProviderStatic({ children }) {
  // 1. Initialize State with your Data File
  const [users] = useState(INITIAL_USERS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [shots, setShots] = useState(INITIAL_SHOTS); 
  const [loading, setLoading] = useState(false);

  // Leave blank so images treat paths as relative or use full URLs
  const API_URL = ""; 

  // --- MOCK FUNCTIONS (Mimic the Server) ---

  // In static mode, data is already "fetched" via the imports above.
  // We keep these empty or simple so the app doesn't crash if it calls them.
  const fetchUsers = async () => {};
  const fetchClients = async () => {};

  // This replaces the server call to get 1 client.
  // We perform a "Join" here to attach photos to the client.
  const fetchClient = async (clientId) => {
    const id = parseInt(clientId);
    const client = clients.find(c => c.id === id);
    if (!client) return null;

    // Simulate the database relationship
    const clientShots = shots.filter(s => s.client_id === id);
    
    // Return the combined object (just like a good API would)
    return { ...client, shots: clientShots };
  };

  const createClient = async (clientData) => {
    const newClient = {
      id: Date.now(), // Fake ID
      ...clientData
    };
    setClients(prev => [...prev, newClient]);
    return { success: true, client: newClient };
  };

  const updateClient = async (id, clientData) => {
    const updatedClient = { id: parseInt(id), ...clientData };
    
    setClients(prev => prev.map(c => 
      c.id === parseInt(id) ? { ...c, ...clientData } : c
    ));
    
    return { success: true, client: updatedClient };
  };
  
  const deleteClient = async (id) => {
    // 1. Delete the client
    setClients(prev => prev.filter(c => c.id !== parseInt(id)));
    // 2. Cascade delete their shots (optional, but clean)
    setShots(prev => prev.filter(s => s.client_id !== parseInt(id)));
    
    return { success: true };
  };

  const createShot = async (formData) => {
    // Extract data from the FormData object
    const file = formData.get('image');
    
    // MAGIC: Create a temporary URL for the uploaded file 
    // This lets you see the photo immediately without a server!
    const fakeImageUrl = file ? URL.createObjectURL(file) : "https://via.placeholder.com/400";

    const newShot = {
      id: Date.now(),
      client_id: parseInt(formData.get('client_id')),
      user_id: parseInt(formData.get('user_id')),
      description: formData.get('description'),
      date: new Date().toISOString(),
      image_path: fakeImageUrl 
    };

    setShots(prev => [newShot, ...prev]); 
    return { success: true, shot: newShot };
  };

  const deleteShot = async (id) => {
    setShots(prev => prev.filter(s => s.id !== parseInt(id)));
    return { success: true };
  };

  // The interface must match AuthProviderServer exactly
  const value = {
    API_URL,
    loading,
    users,
    clients,
    fetchUsers,
    fetchClients,
    fetchClient, // Use this in ClientDetail to get data!
    createClient,
    updateClient,
    deleteClient,
    createShot,
    deleteShot,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}