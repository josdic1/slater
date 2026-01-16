import { useState } from 'react';

export function ShareButton({ title, text, url }) {
  const [buttonText, setButtonText] = useState("Share Photo");
  const [isError, setIsError] = useState(false);

  // Use the browser's native sharing capabilities
  const handleShare = async () => {
    // 1. Try Native Share (Mobile Phones)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url || window.location.href,
        });
        setButtonText("Shared successfully!");
        setTimeout(() => setButtonText("Share Photo"), 2000);
      } catch (error) {
        // User cancelled share, do nothing
        console.log('Error sharing:', error);
      }
    } 
    // 2. Fallback for Desktop (Copy to Clipboard)
    else {
      try {
        await navigator.clipboard.writeText(url || window.location.href);
        setButtonText("Link Copied!");
        setTimeout(() => setButtonText("Share Photo"), 2000);
      } catch (err) {
        setButtonText("Failed to copy");
        setIsError(true);
      }
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleShare}
      className="btn-secondary" 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: isError ? '#DC2626' : undefined, // Red if error
        borderColor: isError ? '#DC2626' : undefined
      }}
    >
      {/* Simple Share Icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      {buttonText}
    </button>
  );
}