import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect, use } from "react";
import { INITIAL_SHOTS } from "../data/data";

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const [clients, setClients] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5555/api";



  useEffect(() => {
    fetchUsers();
    fetchClients();
  }, []);


 async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
  //  console.log('users response:', data);
    setUsers(data);  // not data.items anymore
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function fetchClient(clientId) {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}`);
    const data = await response.json();
    // console.log('client response:', data);
    // You can set specific client data to state if needed
  } catch (error) {
    console.error('Error fetching client:', error);
  }
}

async function fetchClients() {
  try {
    const response = await fetch(`${API_URL}/clients`);
    const data = await response.json();
    // console.log('clients response:', data);
    setClients(data);  // not data.items anymore
    setLoading(false);
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
}


const createClient = async (clientData) => {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });
    
    if (response.ok) {
      const newClient = await response.json();
      setClients(prev => [...prev, newClient]);
      return { success: true, client: newClient };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};

const updateClient = async (id, clientData) => {
  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });
    
    if (response.ok) {
      const updated = await response.json();
      setClients(prev => prev.map(c => c.id === parseInt(id) ? updated : c));
      return { success: true, client: updated };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};
  
const deleteClient = async (id) => {
  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      setClients(prev => prev.filter(c => c.id !== parseInt(id)));  
      return { success: true };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};

const createShot = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/shots`, {
      method: "POST",
      body: formData,  // no headers, no JSON.stringify
    });
    
    if (response.ok) {
      const newShot = await response.json();
      return { success: true, shot: newShot };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};


const deleteShot = async (id) => {
  try {
    const response = await fetch(`${API_URL}/shots/${id}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      return { success: false, error: error.error };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};

  const value = {
    API_URL,
    loading,
    users,
    fetchUsers,
    clients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    createShot,
    deleteShot,
  };

    return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )}