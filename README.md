# APPLEN SOLUTIONS — User Management Dashboard

> **Frontend Developer Task**  
> **Assigned to:** Neel Darji  
> **Tech Stack:** React 19 + Vite + React Router 7  
> **Data Source:** [JSONPlaceholder Users API](https://jsonplaceholder.typicode.com/users)  

---

## 📌 Project Overview

This application is a responsive, modern frontend dashboard built to manage and inspect user records fetched from a public REST API. The core focus is on **clean API integration, real-time client-side search and dynamic city filtering, pagination (5 records/page), and seamless page navigation using React Router**.

---

## 🚀 Key Features & Implemented Requirements

| Requirement | Implementation Detail | Status |
|---|---|:---:|
| **1. Fetch Users API** | Asynchronous `fetch()` service (`userService.js`) retrieving records from `https://jsonplaceholder.typicode.com/users`. | ✅ Complete |
| **2. Users Directory (Cards & Table)** | Displays **Name**, **Email**, **Phone**, **Company**, and **City** with avatar initials and interactive contact links in modern **Cards Grid View** (default) with a 1-click toggle to **Table View**. | ✅ Complete |
| **3. Real-time Search** | Instant case-insensitive filtering matching either user name or email address. | ✅ Complete |
| **4. Dynamic City Filter** | Populates dropdown from unique cities extracted dynamically from API records. | ✅ Complete |
| **5. Pagination (6 users/page)** | 6 records per page (optimized for balanced 3-column grid) with Previous / Next buttons, page number controls, and record indicator. | ✅ Complete |
| **6. Dedicated User Details Route** | React Router dynamic route (`/users/:id`, e.g. `/users/3`) opened via "View Details". | ✅ Complete |
| **7. User Details Display** | Renders name, username, email, phone, street, suite, city, zipcode, geo coordinates, website, and company details. | ✅ Complete |
| **8. State Handling** | Custom animated loading spinner, error alert with retry button, and no-results view with filter reset. | ✅ Complete |
| **9. Filter Reset & Page Sync** | Dedicated "Clear Filters" button and automatic pagination reset to Page 1 whenever search or city changes. | ✅ Complete |
| **10. Dedicated Page Separation** | Clean Home landing page (`/`), Users Directory (`/users`), and User Profile (`/users/:id`) with active Navbar tabs. | ✅ Complete |

---

## 🏗️ Project Architecture & Directory Structure

```text
user-management-dashboard/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Icons & SVGs
│   ├── Components/             # Reusable UI components
│   │   ├── CityFilter.jsx      # Dynamic city dropdown filter
│   │   ├── ErrorMessage.jsx    # Error state card with retry button
│   │   ├── Loading.jsx         # Animated dual-ring loading spinner
│   │   ├── Navbar.jsx          # Header navigation with brand & active route tabs
│   │   ├── Pagination.jsx      # Page navigation (6 items/page, Prev/Next, Page numbers)
│   │   ├── SearchBar.jsx       # Search input with clear button & icons
│   │   ├── UserCards.jsx       # Responsive Card Grid view of users
│   │   └── UserTable.jsx       # Tabular display of users with responsive scrolling
│   ├── Pages/                  # Route views
│   │   ├── Home.jsx            # Landing / Overview page with project context & CTA
│   │   ├── Dashboard.jsx       # Users Directory page (search, filters, cards/table, pagination)
│   │   ├── UserDetails.jsx     # Deep detail profile card (/users/:id)
│   │   └── NotFound.jsx        # 404 fallback page
│   ├── services/               # API layer (Separation of Concerns)
│   │   └── userService.js      # getUsers() & getUserById(id)
│   ├── Style/                  # Individual CSS stylesheets for each component & page
│   │   ├── CityFilter.css
│   │   ├── Dashboard.css
│   │   ├── ErrorMessage.css
│   │   ├── Home.css
│   │   ├── Loading.css
│   │   ├── Navbar.css
│   │   ├── NotFound.css
│   │   ├── Pagination.css
│   │   ├── SearchBar.css
│   │   ├── UserCards.css
│   │   ├── UserDetails.css
│   │   └── UserTable.css
│   ├── App.jsx                 # Route definitions & router provider
│   ├── App.css                 # Base app layout
│   ├── index.css               # Design tokens, variables & typography
│   └── main.jsx                # Application entry point
├── package.json                # Dependencies and build scripts
└── README.md                   # Documentation & explanation guide
```

---

## 🧠 How the Logic Works & Data Flow

### 1. Separation of Concerns (API Layer)
Network operations are decoupled from React components into `src/services/userService.js`:
- `getUsers()` performs an HTTP `GET` request to `https://jsonplaceholder.typicode.com/users`.
- `getUserById(id)` fetches an individual user record `https://jsonplaceholder.typicode.com/users/${id}`.
- Both methods validate `response.ok` and throw descriptive errors for the UI to capture.

```text
[JSONPlaceholder API] 
         │ (HTTP GET)
         ▼
[userService.js] 
         │ (Returns parsed JSON or throws Error)
         ▼
[Dashboard.jsx / UserDetails.jsx]
```

### 2. State Lifecycle in `Dashboard.jsx`
The Dashboard coordinates five core pieces of state:
1. `users`: Holds the complete raw array of 10 users downloaded from the API.
2. `search`: Holds the user's search text.
3. `selectedCity`: Holds the selected city filter (empty string `""` represents All Cities).
4. `currentPage`: Holds the active page number (starts at `1`).
5. `loading` & `error`: Track network state for smooth UX transitions.

### 3. Dynamic City Extraction (`useMemo`)
Cities are dynamically derived from the downloaded user records:
```javascript
const cities = useMemo(() => {
  const cityList = users.map((user) => user.address?.city).filter(Boolean);
  return [...new Set(cityList)].sort(); // Set eliminates duplicates
}, [users]);
```

### 4. Compound Filtering Logic
Whenever `search` or `selectedCity` updates, `filteredUsers` recalculates:
```javascript
const filteredUsers = users.filter((user) => {
  const query = search.trim().toLowerCase();
  
  // Requirement 3: Case-insensitive search matching Name or Email
  const nameMatches = user.name.toLowerCase().includes(query);
  const emailMatches = user.email.toLowerCase().includes(query);
  const matchesSearch = query === "" || nameMatches || emailMatches;

  // Requirement 4: Match selected city or allow all if empty
  const matchesCity = selectedCity === "" || user.address.city === selectedCity;

  return matchesSearch && matchesCity;
});
```

### 5. Client-Side Pagination Math (6 Records per Page)
Because JSONPlaceholder does not provide server-side filtering or pagination, pagination is computed on the filtered array:
```javascript
const USERS_PER_PAGE = 6;

// Total pages calculation
const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));

// Slice indexes for the active page
const startIndex = (currentPage - 1) * USERS_PER_PAGE;
const endIndex = startIndex + USERS_PER_PAGE;
const currentUsers = filteredUsers.slice(startIndex, endIndex);
```

### 6. Filter Change & Reset Behavior
As required by Requirement 9:
- Whenever the user types in the search bar or selects a city from the dropdown, `setCurrentPage(1)` is called immediately so results start on the first page.
- Clicking the **"Clear Filters"** button resets `search = ""`, `selectedCity = ""`, and sets `currentPage = 1`.

### 7. React Router Navigation Flow
```text
[Navbar]
   ├── [Home] --------------> '/'          (Landing page & Project Overview)
   └── [Users Directory] ---> '/users'     (Interactive Users List)
                                 │
                                 └── [View Details] ---> '/users/:id' (User Profile)
```

---

## 💻 Getting Started (Local Setup)

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd user-management-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Run linter
```bash
npm run lint
```

---

## 🎓 Intern Interview Guide (How Neel Darji Can Explain This Code)

When your mentor or interviewer asks about this implementation, here are clear explanations you can share:

1. **Why use an API service layer instead of calling `fetch()` inside the component?**
   > *"Separating `userService.js` from the UI follows the Separation of Concerns principle. It makes the code cleaner, reusable across multiple components (like `Dashboard` and `UserDetails`), and makes testing much easier."*

2. **Why do we need `useMemo` for cities and filtered users?**
   > *"In React, computations inside a component re-run on every render. `useMemo` ensures the unique cities list and filtered array are only recalculated when the raw `users` list, `search` term, or `selectedCity` actually change, optimizing performance."*

3. **How does pagination work client-side?**
   > *"Since JSONPlaceholder sends all 10 users in one request, we store the full list in state, filter it based on user inputs, and then calculate `startIndex = (currentPage - 1) * 5` and `endIndex = startIndex + 5`. Using `array.slice(startIndex, endIndex)` gives us exactly the 5 records for the active page."*

4. **Why did we reset pagination to Page 1 when filtering?**
   > *"If a user is on Page 2 and types a search keyword that only has 3 matches, keeping them on Page 2 would display an empty page. Resetting to Page 1 ensures the user immediately sees the top results of their query."*

5. **How does the route `/users/:id` receive the user ID?**
   > *"We defined `<Route path="/users/:id" element={<UserDetails />} />` in `App.jsx`. In `UserDetails.jsx`, we use the `useParams()` hook from `react-router-dom` to extract `id` from the URL, then pass it to `getUserById(id)` to load that specific user's information."*

---

## 🎨 Styling Architecture
- All stylesheets are located inside the dedicated `src/Style/` folder as requested.
- Each component and page has its own isolated stylesheet:
  - `Navbar.css`, `Home.css`, `Dashboard.css`, `UserTable.css`, `SearchBar.css`, `CityFilter.css`, `Pagination.css`, `Loading.css`, `ErrorMessage.css`, `UserDetails.css`, and `NotFound.css`.
- Global design tokens (colors, shadows, border-radii) are centralized in `src/index.css`.
- Built with a modern corporate color scheme (deep indigo `#1e40af`, vibrant blue `#2563eb`, neutral slates), subtle elevation shadows, and full mobile responsiveness.
