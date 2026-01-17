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
        client_id: 101,
        user_id: 1,
        image_path: "/images/1_1_15012026161907.jpg",
        description: "North side roof damage",
        date: "2026-01-15T21:19:07.000Z"
    },
    {
        id: 502,
        client_id: 101,
        user_id: 1,
        image_path: "/images/1_1_15012026162322.jpg",
        description: "Hail damage on west side",
        date: "2026-01-15T21:23:22.000Z"
    },
    {
        id: 503,
        client_id: 101,
        user_id: 1,
        image_path: "/images/1_1_16012026154740.jpg",
        description: "Cracked slate near gutter",
        date: "2026-01-16T15:47:40.000Z"
    },
    {
        id: 504,
        client_id: 101,
        user_id: 1,
        image_path: "/images/1_1_16012026155029.jpg",
        description: "Flashing damage at chimney",
        date: "2026-01-16T15:50:29.000Z"
    },
    {
        id: 505,
        client_id: 102,
        user_id: 1,
        image_path: "/images/2_1_16012026163750.jpg",
        description: "Initial inspection overview",
        date: "2026-01-16T16:37:50.000Z"
    },
];