// 1. Users Data
export const INITIAL_USERS = [
    { id: 1, name: "Mike (Owner)", email: "mike@slatesnap.com" },
    { id: 2, name: "Sarah (Office)", email: "sarah@slatesnap.com" },
    { id: 3, name: "Dave (Field Tech)", email: "dave@slatesnap.com" }
];

// 2. Clients Data
export const INITIAL_CLIENTS = [
    {
        id: 101,
        name: "James Wilson",
        email: "jwilson@gmail.com",
        phone: "555-0199",
        address: "124 Maple Avenue",
        city: "Springfield",
        state: "IL",
        zip_code: "62704"
    },
    {
        id: 102,
        name: "Elena Rodriguez",
        email: "elena.r@yahoo.com",
        phone: "555-0244",
        address: "890 Oak Lane",
        city: "Shelbyville",
        state: "IL",
        zip_code: "62565"
    }
];

// 3. Shots/Photos Data
export const INITIAL_SHOTS = [
    {
        id: 501,
        client_id: 101, // Belongs to James Wilson
        user_id: 3,     // Uploaded by Dave
        image_path: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80", 
        description: "Missing shingles near chimney stack",
        date: "2023-10-12T14:30:00.000Z"
    },
    {
        id: 502,
        client_id: 101, // Belongs to James Wilson
        user_id: 3,
        image_path: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=800&q=80", 
        description: "Gutter detachment on North side",
        date: "2023-10-12T14:35:00.000Z"
    },
    {
        id: 503,
        client_id: 102, // Belongs to Elena
        user_id: 1,     // Uploaded by Mike
        image_path: "https://images.unsplash.com/photo-1623403565076-24df9cd3eb87?auto=format&fit=crop&w=800&q=80", 
        description: "Initial inspection - water pooling",
        date: "2023-11-05T09:15:00.000Z"
    }
];