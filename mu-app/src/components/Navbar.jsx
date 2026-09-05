import { Link } from "react-router-dom";
import { Search, PlusCircle, Sun, Moon } from "lucide-react";

const themes = [
  { value: "aurora", label: "Aurora" },
  { value: "sunset", label: "Sunset" },
  { value: "ocean", label: "Ocean" },
  { value: "forest", label: "Forest" },
  { value: "berry", label: "Berry" },
  { value: "midnight", label: "Midnight" },
];

function Navbar({ theme, appearance, onThemeChange, onCycleTheme, onToggleAppearance }) {
  return (
    <nav className="theme-nav sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="theme-logo flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <Search size={20} />
          </div>

          <div>
            <h1 className="theme-heading text-xl font-bold">
              Lost<span className="theme-accent-text">&</span>Found
            </h1>

            <p className="theme-muted hidden text-xs sm:block">
              Find what matters
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link
            to="/"
            className="theme-nav-link hidden rounded-lg px-4 py-2 text-sm font-medium transition sm:block"
          >
            Home
          </Link>

          <label className="theme-picker flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold">
            <span className="hidden sm:inline">Theme</span>
            <select
              value={theme}
              onChange={(event) => onThemeChange(event.target.value)}
              className="theme-select bg-transparent outline-none"
              aria-label="Choose a color theme"
            >
              {themes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={onCycleTheme}
            className="theme-key-button flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold transition"
            title="Cycle theme (T)"
            aria-label="Cycle theme"
          >
            T
          </button>

          <button
            type="button"
            onClick={onToggleAppearance}
            className="theme-key-button flex h-9 w-9 items-center justify-center rounded-lg border transition"
            title={`Switch to ${appearance === "light" ? "dark" : "light"} background (D)`}
            aria-label={`Switch to ${appearance === "light" ? "dark" : "light"} background`}
          >
            {appearance === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button className="theme-button flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition">
            <PlusCircle size={17} />
            <span className="hidden sm:block">Report Item</span>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;