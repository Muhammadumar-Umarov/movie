import { NavLink } from "react-router-dom";
import React from "react";
import logo from "../assets/main-logo.svg";
import { GoHome } from "react-icons/go";
import { RiMovieLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "antd";
import { useStore } from "@/zustand/index";

const Header = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const auth = useStore(state => state.auth);
  const setAuth = useStore(state => state.setAuth);
  const logout = useStore(state => state.logout);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    if (!auth && typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setAuth(JSON.parse(storedUser));
      }
    }
  }, [auth, setAuth]);

  const handleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className="w-full dark:bg-black fixed top-0 left-0 right-0 z-50">
      <nav className="flex container mx-auto justify-between bg-white items-center px-6 py-4 dark:bg-black">
        <NavLink to="/">
          <img src={logo} className="cursor-pointer h-10" alt="Logo" />
        </NavLink>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6 text-white">
            {[
              { to: "/", icon: <GoHome className="w-6 h-6" />, label: "Home" },
              { to: "/movies", icon: <RiMovieLine className="w-6 h-6" />, label: "Movies" },
              { to: "/saved", icon: <FaRegBookmark className="w-6 h-5" />, label: "Saved" },
              { to: "/search", icon: <IoSearch className="w-6 h-5" />, label: "Search" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-red-500" : "text-black dark:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <button onClick={handleTheme} className="text-gray-800 cursor-pointer dark:text-gray-200">
            {/* {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />} */}
          </button>

          {auth ? (
            <div className="flex items-center gap-4">
              <img src={auth.picture} alt={auth.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
              <span className="text-black dark:text-white">{auth.name}</span>
              <Button danger onClick={logout}>Logout</Button>
            </div>
          ) : (
            <NavLink to="/login">
              <Button type="primary" danger className="outline-none border-none text-white rounded">Login</Button>
            </NavLink>
          )}
        </div>


        <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white dark:bg-black  dark:border-[#111] flex justify-around items-center py-2 z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-red-500" : "text-black dark:text-white"
                  }`
                }
         >
          <GoHome className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-red-500" : "text-black dark:text-white"
            }`
          }
         >
          <RiMovieLine className="w-6 h-5" />
          <span className="text-xs">Movies</span>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-red-500" : "text-black dark:text-white"
                  }`
                }
         >
          <FaRegBookmark className="w-6 h-5" />
          <span className="text-xs">Saved</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
                  `flex flex-col items-center ${
                    isActive ? "text-red-500" : "text-black dark:text-white"
                  }`
                }
         >
          <IoSearch className="w-6 h-5" />
          <span className="text-xs">Search</span>
        </NavLink>
       </div>
      </nav>
    </div>
  );
};

export default Header;
