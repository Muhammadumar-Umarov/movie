import { NavLink, Link } from "react-router-dom"
import logo from "@/assets/main-logo.svg"
import { MoonOutlined, SearchOutlined, } from "@ant-design/icons"

import "./Header.css"
import { useEffect } from "react"
const Header = () => {
  useEffect(() => {
    localStorage.getItem("theme") === "dark" && document.body.classList.add("dark")
  }, [])

  const handleTheme = () => {
    const isDark = document.body.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return (
    <header className="h-[76px] flex items-center justify-between max-w-[1880px] w-full px-4 lg:px-8 mx-auto dark:bg-black">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-8 sm:h-10" />
        </Link>

        {/* Navbar Links */}
        <ul className="hidden md:grid grid-cols-3 text-[16px] lg:text-[20px] gap-3 lg:gap-6">
          <NavLink
            to={"/"}
            className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200"
          >
            Home
          </NavLink>
          <NavLink
            to={"/movies"}
            className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200"
          >
            Movies
          </NavLink>
          <NavLink
            to={"/wishlist"}
            className="grid place-items-center navbar__links pb-[5px] lg:pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200"
          >
            My Movies
          </NavLink>
        </ul>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <NavLink to={"search"}>
          <SearchOutlined className="text-[20px] sm:text-[22px]" />
        </NavLink>
        <span className="cursor-pointer" onClick={handleTheme}>
          <MoonOutlined className="text-[20px] sm:text-[22px]" />
        </span>
        <Link to={"/signin"}>
          <button className="font-bold text-[15px] sm:text-[17px] dark:text-slate-200">
            Sign in
          </button>
        </Link>
      </div>
    </header>

  )
}

export default Header