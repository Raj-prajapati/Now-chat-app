import React, { useEffect, useState } from "react";
import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/themeStore";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const previewTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
  };

  const restoreTheme = () => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const applyTheme = () => {
    setTheme(selectedTheme);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="flex">
        <Link to="/" className="ml-auto mr-1 mt-1">
          <button className="hover:text-success">
            <X />
          </button>
        </Link>
      </div>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-12 gap-6">
        
        <aside className="col-span-12 md:col-span-4">
          <div className="bg-base-200 border border-base-300 rounded-xl p-4">
            <h2 className="text-lg font-bold mb-3">Settings</h2>

            <ul className="menu bg-base-100 rounded-lg">
              <li className="menu-title">
                <span>Appearance</span>
              </li>
              <li>
                <a className="active">Themes</a>
              </li>

              <li className="menu-title mt-4">
                <span>Account</span>
              </li>
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Privacy</a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-8">
          <div className="bg-base-200 border border-base-300 rounded-xl p-6">
            <h1 className="text-2xl font-bold">Appearance</h1>
            <p className="text-base-content/70 mt-1">
              Current Theme: <span className="font-semibold">{theme}</span>
            </p>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Choose Theme</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onMouseEnter={() => previewTheme(t)}
                    onMouseLeave={restoreTheme}
                    onClick={() => setSelectedTheme(t)}
                    className={`p-3 rounded-lg border text-left transition-all 
                      ${
                        selectedTheme === t
                          ? "border-primary border-2 bg-base-100"
                          : "border-base-300 bg-base-100 hover:border-primary"
                      }
                    `}
                  >
                    <div className="font-semibold capitalize">{t}</div>

                    <div className="flex gap-2 mt-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div className="h-3 w-3 rounded-full bg-secondary" />
                      <div className="h-3 w-3 rounded-full bg-accent" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={applyTheme}
                className="btn btn-primary"
                disabled={selectedTheme === theme}
              >
                Apply Theme
              </button>

              <button
                className="btn btn-outline"
                onClick={() => {
                  setSelectedTheme(theme);
                  restoreTheme();
                }}
              >
                Cancel Preview
              </button>
            </div>

            <p className="text-base-content/60 text-sm mt-3">
              Tip: hover a theme to preview instantly ✨
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
