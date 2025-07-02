import { NavLink, Link } from "react-router-dom"
import logo from "@/assets/main-logo.svg"
import {MoonOutlined, SearchOutlined,  } from "@ant-design/icons"

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
    <header className="h-[76px] flex items-center justify-between max-w-[1880px] w-full mx-auto dark:bg-black">
      <div className="flex items-center gap-6">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <ul className="grid grid-cols-3 text-[20px]">
          <NavLink to={"/"} className="grid place-items-center navbar__links pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200">
            Home
          </NavLink>
          <NavLink to={"/movies"} className="grid place-items-center navbar__links pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200">
            Movies
          </NavLink>
          <NavLink to={"/wishlist"} className="grid place-items-center navbar__links pb-[7px] border-b border-transparent hover:text-white dark:text-slate-200">
            My Movies
          </NavLink>
        </ul>
      </div>
      <div className="flex items-center gap-7">
        <NavLink to={"search"}><SearchOutlined style={{ fontSize: 22 }}></SearchOutlined></NavLink>
        <span className="cursor-pointer" onClick={handleTheme}><MoonOutlined style={{ fontSize: 22 }} /></span>
        <Link to={"/signin"}><button className="font-[inherit] font-bold text-[17px] cursor-pointer dark:text-slate-200 ">Sign in</button></Link>
      </div>
    </header>
  )
}

export default Header