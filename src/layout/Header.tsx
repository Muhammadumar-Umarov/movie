import { NavLink, Link } from "react-router-dom"
import logo from "@/assets/main-logo.svg"
import { CloseOutlined, MenuOutlined, MoonOutlined, SearchOutlined, } from "@ant-design/icons"

import "./Header.css"
import { useEffect, useState } from "react"
const Header = () => {
  useEffect(() => {
    localStorage.getItem("theme") === "dark" && document.body.classList.add("dark")
  }, [])
  const [isOpen, setIsOpen] = useState(false)
  const handleTheme = () => {
    const isDark = document.body.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <header
        className={`w-full  transition-all duration-300 h-[70px]  text-white  px-4 lg:px-8  fixed top-0 z-50 bg-gradient-to-b
    ${isScrolled ? "bg-[#000000bf] shadow-md" : "bg-gradient-to-b from-black/75 via-black/30 to-transparent"}`}>

        <div className="container mx-auto flex items-center justify-between  h-full">
          <div className="flex items-center gap-4 lg:gap-6">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="h-8 sm:h-10" />
            </Link>

            {/* Desktop Navbar */}
            <ul className="hidden md:grid grid-cols-3 text-[16px] lg:text-[20px] gap-3 lg:gap-6">
              <NavLink
                to={"/"}
                className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:border-white"
              >
                Home
              </NavLink>
              <NavLink
                to={"/movies"}
                className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:border-white"
              >
                Movies
              </NavLink>
              <NavLink
                to={"/wishlist"}
                className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:border-white"
              >
                My Movies
              </NavLink>
            </ul>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <NavLink to={"search"}>
              <SearchOutlined className="text-[20px] sm:text-[22px]" />
            </NavLink>
            <span className="cursor-pointer" onClick={handleTheme}>
              <MoonOutlined className="text-[20px] sm:text-[22px]" />
            </span>
            <Link to={"/signin"}>
              <button className="font-bold text-[15px] sm:text-[17px]">Sign in</button>
            </Link>

            {/* Hamburger icon */}
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <MenuOutlined className="text-xl text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 dark:bg-black bg-white dark:text-white text-black z-50 shadow-md transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <CloseOutlined className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4 text-lg">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:text-red-500">
            Home
          </NavLink>
          <NavLink to="/movies" onClick={() => setIsOpen(false)} className="hover:text-red-500">
            Movies
          </NavLink>
          <NavLink to="/wishlist" onClick={() => setIsOpen(false)} className="hover:text-red-500">
            My Movies
          </NavLink>
          <NavLink to="/search" onClick={() => setIsOpen(false)} className="hover:text-red-500">
            Search
          </NavLink>
          <NavLink to="/signin" onClick={() => setIsOpen(false)} className="hover:text-red-500">
            Sign In
          </NavLink>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0  bg-opacity-40 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>

  )
}

export default Header