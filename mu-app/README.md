## Lost & Found

A React and Vite campus lost-and-found website. Users can browse reported items, open item details, choose a visual theme, switch between light and dark appearance, and submit a new lost or found item to Supabase.

## Features

- Loads item records from the Supabase `lost-and-found` table
- Displays product name, ID, contact number, and image
- Item detail pages with contact actions
- Report form that inserts new records into Supabase
- Six gradient themes: Aurora, Sunset, Ocean, Forest, Berry, and Midnight
- Light/dark appearance toggle with saved preferences
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Supabase
- Lucide React icons

## Getting Started

From the `mu-app` directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Supabase Configuration

Create `mu-app/.env.local` with the URL and browser-safe publishable key from **Supabase Dashboard > Project Settings > API**:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

The app reads from the `lost-and-found` table using these columns:

- `product_id`
- `product_name`
- `user_phno`
- `img_url`

Enable a Row Level Security `SELECT` policy for public browsing. Enable an `INSERT` policy if users should submit reports from the website.

Never place a Supabase secret/service-role key in `.env.local` or frontend code. Secret keys must only be used by a protected server.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run Oxlint
```

## Repository Structure

```text
src/
	components/   Shared navbar and item UI
	data/         Legacy local item fixtures
	lib/          Supabase client and item normalization
	pages/        Home and item detail routes
public/         Item images and static assets
```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
