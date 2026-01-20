// 1. Users Data
export const INITIAL_USERS = [
  { id: 1, name: "Sandy (Owner)", email: "sandy@slatesnap.com" },
  { id: 2, name: "Sarah (Office)", email: "sarah@slatesnap.com" },
  { id: 3, name: "Irving (Field Tech)", email: "irving@slatesnap.com" },
];

// 2. Clients Data
export const INITIAL_CLIENTS = [
  {
    id: 101,
    name: "Anthony Raspano",
    email: "araspano1@gmail.com",
    phone: "973-555-0199",
    address: "14 Aspen Drive",
    city: "North Caldwell",
    state: "NJ",
    zip_code: "07006",
  },
  {
    id: 102,
    name: "Shelly Briggs",
    email: "shelbriggs@gmail.com",
    phone: "909-555-0244",
    address: "137 Main Street",
    city: "Twin Peaks",
    state: "WA",
    zip_code: "98065",
  },
];

// 3. Shots/Photos Data
export const INITIAL_SHOTS = [
  {
    id: 501,
    client_id: 101,
    user_id: 1,
    image_path: "/slater/images/1_1_15012026161907.jpg",
    description: "North side roof damage",
    date: "2026-01-15T21:19:07.000Z",
  },
  {
    id: 502,
    client_id: 101,
    user_id: 2,
    image_path: "/slater/images/1_1_15012026162322.jpg",
    description: "Hail damage on west side",
    date: "2026-01-15T21:23:22.000Z",
  },
  {
    id: 503,
    client_id: 101,
    user_id: 3,
    image_path: "/slater/images/1_1_16012026154740.jpg",
    description: "Cracked slate near gutter",
    date: "2026-01-16T15:47:40.000Z",
  },
  {
    id: 504,
    client_id: 101,
    user_id: 1,
    image_path: "/slater/images/1_1_16012026155029.jpg",
    description: "Flashing damage at chimney",
    date: "2026-01-16T15:50:29.000Z",
  },
  {
    id: 505,
    client_id: 102,
    user_id: 3,
    image_path: "/slater/images/2_1_16012026163750.jpg",
    description: "Initial inspection overview",
    date: "2026-01-16T16:37:50.000Z",
  },
];
