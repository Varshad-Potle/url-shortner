# Trimme 

Trimme is a modern, full-stack URL shortener application designed to streamline link management. It allows users to easily shorten long URLs into concise links, create custom aliases, and generate QR codes for quick sharing. Beyond simple shortening, Trimme provides a comprehensive dashboard with robust analytics, enabling users to track click performance, visitor locations, and device types in real-time.

---

**Live Demo:** 

---

## ✨ Features

* **User Authentication** – Secure login and signup functionality using Supabase Auth.
* **URL Shortening** – Instantly convert long URLs into short, manageable links.
* **Custom Aliases** – Option to create personalized custom URLs (e.g., trimme.in/my-custom-link)
* **QR Code Generation** – Automatic QR code generation for every shortened link.
* **Comprehensive Dashboard** – View total links created and total clicks at a glance.
* **Advanced Analytics** – Visual charts displaying visitor location (City/Country) and device type (Mobile/Desktop).
* **Link Management** – Filter, copy, download QR codes, or delete links directly from the dashboard.
* **Responsive Design** – Fully responsive UI with a dark mode aesthetic.

---

## 🧠 Tech Stack

| Category             | Technology                           | Used For                                  |
| -------------------- | ------------------------------------ | ----------------------------------------- |
| **Frontend** | React.js, Tailwind CSS               | UI Development & Styling                  |
| **UI Library** | Shadcn UI                            | Component Library                         |
| **Backend** | Supabase (PostgreSQL, Auth, Storage) | Database, Auth & Image Storage            |
| **State Management** | React Context API                    | Global State Handling                     |
| **Routing** | React Router DOM                     | Navigation                                |
| **Charts** | Recharts                             | Data Visualization                        |
| **Icons** | Lucide React                         | UI Icons                                  |
| **Form** | Yup                                  | Input Validation                          |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Varshad-POtle/url-shortener.git
cd url-shortener
```

### 2️⃣ Install Dependencies

```bash
npm install
```
### 3️⃣ Environment Configuration
Create a .env file in the root directory and add your supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```
### 4️⃣ Environment Configuration
1. Create a new Project on Supabase.
2. **Tables:** Create tables for urls (to store link data) and clicks (to store analytics).
3. **Storage:** Create storage buckets for *profile_pic* and *qrs*.
4. **RLS Policies:** Enable Row Level Security (RLS) policies to ensure users can only manage their own data.
```


### 5️⃣ Start the Development Server

```bash
npm run dev
```

App will be running at:

```
http://localhost:5173
```

---

## 🗂 Project Structure (High-Level)

```
.
├── src/
│   ├── components/      # Reusable UI components
│   ├── db/              # Supabase configuration and API logic
│   ├── hooks/           # Custom React hooks (e.g., useFetch)
│   ├── layouts/         # Layout wrappers (e.g., AppLayout)
│   ├── lib/             # Utility functions (shadcn utils)
│   ├── pages/           # Page views (Dashboard, Landing, Auth)
│   ├── App.jsx          # Main application component
│   ├── app.css          # Global styles
│   └── context.jsx      # Global state context
└── .env                 # Environment variables (API Keys)

```

## 🔐 Security & Privacy

**Row Level Security (RLS):** Custom Supabase RLS policies are enforced on database tables to strictly isolate user data, ensuring users can only view, edit, or delete their own links and profiles.

**Authentication & Route Protection:** User identity is managed via Supabase Auth, coupled with a custom RequireAuth component that restricts access to the dashboard and private pages to authenticated users only.

**Client-Side Input Validation:** Forms for login, signup, and URL creation use Yup validation schemas to enforce strict data integrity (e.g., valid email formats and minimum password length) before any API calls are made.

**Secure Analytics Collection:** Public data access is minimized; the clicks table allows public writes only for recording anonymous analytics (device type and location) without exposing sensitive user records.

---
