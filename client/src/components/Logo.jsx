export function Logo() {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px', // Space between icon and text
      marginBottom: '24px',
    },
    // The "Fintech" Text Style: Bold, Uppercase, Trustworthy Blue
    text: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", Roboto, sans-serif',
        fontSize: '32px', // Nice and big
        fontWeight: '800', // Extra Bold
        color: '#002C5F', // Our Deep Navy
        letterSpacing: '-0.5px',
        lineHeight: '1',
        textTransform: 'uppercase', // Makes it feel institutional like a bank
    },
    // Highlight 'Slate' vs 'Snap' slightly for readability
    snapText: {
       color: '#0066FF' // The brighter action blue for the "action" part of the name
    }
  };

  return (
    <div style={styles.container}>
      {/* A sleek, simple SVG Icon inline.
        Concept: A solid, stable roof peak with a camera lens aperture inside.
      */}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The Roof Peak (Stability) */}
        <path d="M24 4L4 22H44L24 4Z" fill="#002C5F"/>
        {/* The Camera Base/Shutter (Action) */}
        <rect x="8" y="22" width="32" height="22" rx="2" fill="#002C5F"/>
        <circle cx="24" cy="33" r="7" fill="white"/>
        <circle cx="24" cy="33" r="3" fill="#0066FF"/>
      </svg>
      
      {/* The Text */}
      <div style={styles.text}>
        <span>Slate</span>
        <span style={styles.snapText}>Snap</span>
      </div>
    </div>
  );
}