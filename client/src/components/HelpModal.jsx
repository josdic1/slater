import { useEffect } from "react";

export function HelpModal({ isOpen, onClose }) {
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
          <h3>👥 Client Records</h3>
          <p>
            Each client has their own page with all their photos. Edit their
            info anytime or delete the record when the job is done.
          </p>
        </div>

        <p className="help-footer">
          Questions? Contact the office or your supervisor.
        </p>
      </div>
    </div>
  );
}
