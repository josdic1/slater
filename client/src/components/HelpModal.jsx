import { useEffect } from "react";

export function HelpModal({ isOpen, onClose, screen = "home" }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <button className="help-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2>How SlateSnap Works</h2>

        {screen === "home" ? <HomeHelp /> : <ClientHelp />}

        <p className="help-footer">
          Questions? Contact the office or your supervisor.
        </p>
      </div>
    </div>
  );
}

// Help content for the Home/Client List screen
function HomeHelp() {
  return (
    <>
      <div className="help-section">
        <h3>📋 Getting Started</h3>
        <p>
          <strong>Tap a client's name</strong> to open their profile and see all
          their photos. That's where you'll add new photos for that job.
        </p>
      </div>

      <div className="help-section">
        <h3>📸 Adding Photos</h3>
        <p>
          Find the client first, then tap <strong>+ Add New Photo</strong> from
          their profile. This keeps all photos organized by job site
          automatically.
        </p>
      </div>

      <div className="help-section">
        <h3>🔍 Finding Clients</h3>
        <p>
          Use the search bar to filter by name, city, or address. Start typing
          and the list updates instantly.
        </p>
      </div>

      <div className="help-section">
        <h3>➕ New Client?</h3>
        <p>
          Tap <strong>+ Add Client</strong> at the bottom to create a new client
          record before your first site visit.
        </p>
      </div>
    </>
  );
}

// Help content for the Client Detail screen
function ClientHelp() {
  return (
    <>
      <div className="help-section">
        <h3>📸 Taking Photos</h3>
        <p>
          Tap <strong>+ Add New Photo</strong> to upload a picture from your
          phone. Select who's uploading and add a note about what you're
          documenting.
        </p>
      </div>

      <div className="help-section">
        <h3>🔍 Finding Photos</h3>
        <p>
          Use the search bar to filter photos by description or date. Type
          "damage" or "north" to find specific shots fast.
        </p>
      </div>

      <div className="help-section">
        <h3>📤 Sharing</h3>
        <p>
          Tap <strong>Share Photo</strong> on any image to send it via text,
          email, or any app on your phone. Great for homeowners or insurance
          adjusters.
        </p>
      </div>

      <div className="help-section">
        <h3>✏️ Client Info</h3>
        <p>
          Tap <strong>Edit Client Info</strong> to update the address, phone, or
          email. Delete the record when the job is complete.
        </p>
      </div>
    </>
  );
}
