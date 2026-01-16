import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

export function ClientForm() {
  const { clients, createClient, updateClient } = useAuth();
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const inEditMode = !!clientId;

  if (inEditMode) {
    const selectedClient = clients.find((c) => c.id === parseInt(clientId));
    if (selectedClient && formData.name === "") {
      setFormData({
        name: selectedClient.name,
        email: selectedClient.email,
        phone: selectedClient.phone,
        address: selectedClient.address,
        city: selectedClient.city,
        state: selectedClient.state,
        zip_code: selectedClient.zip_code,
      });
    }
  }

  const onClear = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createClient(formData);

    if (result.success) {
      onClear();
      navigate("/");
    } else {
      console.error("Failed:", result.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateClient(clientId, formData);

    if (result.success) {
      onClear();
      navigate("/");
    } else {
      console.error("Failed:", result.error);
    }
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h3>{inEditMode ? "Edit Client Details" : "Add New Client"}</h3>
      </div>

      <form onSubmit={inEditMode ? handleUpdate : handleSubmit}>
        
        {/* Contact Info */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Address Info */}
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            style={{ flex: 2 }} 
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={formData.zip_code}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary">
            {inEditMode ? "Update Client" : "Create Client"}
        </button>
        
        {inEditMode ? (
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
                Cancel
            </button>
        ) : (
            <button type="button" className="btn-secondary" onClick={onClear}>
                Clear Form
            </button>
        )}
      </form>
    </div>
  );
}