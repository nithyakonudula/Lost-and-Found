import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItemDetail from "./pages/itemDetail";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("lost-found-theme") || "aurora");
  const [appearance, setAppearance] = useState(() => localStorage.getItem("lost-found-appearance") || "light");
  const themeOrder = ["aurora", "sunset", "ocean", "forest", "berry", "midnight"];

  const changeTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem("lost-found-theme", nextTheme);
  };

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(theme);
    changeTheme(themeOrder[(currentIndex + 1) % themeOrder.length]);
  };

  const toggleAppearance = () => {
    const nextAppearance = appearance === "light" ? "dark" : "light";
    setAppearance(nextAppearance);
    localStorage.setItem("lost-found-appearance", nextAppearance);
  };

  useEffect(() => {
    const handleThemeShortcut = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && !["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) {
        if (event.key.toLowerCase() === "t") {
          cycleTheme();
        }
        if (event.key.toLowerCase() === "d") {
          toggleAppearance();
        }
      }
    };

    window.addEventListener("keydown", handleThemeShortcut);
    return () => window.removeEventListener("keydown", handleThemeShortcut);
  }, [theme, appearance]);

  return (
    <BrowserRouter>

      <div className={`app-theme theme-${theme} theme-${appearance}`}>
        <Navbar
          theme={theme}
          appearance={appearance}
          onThemeChange={changeTheme}
          onCycleTheme={cycleTheme}
          onToggleAppearance={toggleAppearance}
        />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/item/:id"
            element={<ItemDetail />}
          />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;


