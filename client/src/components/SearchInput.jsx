export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      {/* Only show the X if there is text */}
      {value && (
        <button 
            type="button" 
            className="search-clear-btn" 
            onClick={() => onChange("")}
            aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}