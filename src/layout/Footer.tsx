import { Link } from "react-router-dom"
import logo from "@/assets/EMBLEM.svg"
import instaLogo from "@/assets/insta.svg"
import facebookLogo from "@/assets/facebook.svg"
import youtubeLogo from "@/assets/youtube.svg"

const Footer = () => {
  return (
    <footer className="dark:bg-[#161616] py-8 mt-10 ">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-0 ">
          <div className="border-b border-slate-700 pb-4 md:pb-[20px] w-full md:w-[240px]  md:text-right ">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="mx-auto md:mx-0" />
            </Link>
          </div>

          
          <div className="border-b border-slate-700 pb-4 md:pb-[20px] w-full md:w-[240px] flex justify-center md:justify-end items-center gap-6">
            <a className="transition-transform duration-300 hover:-translate-y-2" href="#"><img src={instaLogo} alt="Instagram" /></a>
            <a className="transition-transform duration-300 hover:-translate-y-2" href="#"><img src={youtubeLogo} alt="YouTube" /></a>
            <a className="transition-transform duration-300 hover:-translate-y-2" href="#"><img src={facebookLogo} alt="Facebook" /></a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex flex-wrap justify-between gap-8 text-center md:text-center max-[768px]:text-start">
          
          <div className="w-full sm:w-1/2 md:w-auto">
            <p className="font-semibold text-[18px] mb-4">ABOUT US</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:underline"><a href="#">Public offer</a></li>
              <li className="hover:underline"><a href="#">Advertisement</a></li>
              <li className="hover:underline"><a href="#">F.A.Q</a></li>
              <li className="hover:underline"><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto">
            <p className="font-semibold text-[18px] mb-4">SUPPORT</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:underline"><a href="#">Contact support</a></li>
              <li className="hover:underline"><a href="#">Help center</a></li>
              <li className="hover:underline"><a href="#">Supported devices</a></li>
              <li className="hover:underline"><a href="#">Accessibility</a></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto">
            <p className="font-semibold text-[18px] mb-4">GET THE APPS</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:underline"><a href="#">iOS App</a></li>
              <li className="hover:underline"><a href="#">Android App</a></li>
              <li className="hover:underline"><a href="#">Windows App</a></li>
              <li className="hover:underline"><a href="#">Mac App</a></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-auto">
            <p className="font-semibold text-[18px] mb-4">CATEGORY</p>
            <ul className="flex flex-col gap-2">
              <li className="hover:underline"><Link to={"/movie"}>Movie</Link></li>
              <li className="hover:underline"><a href="#">Theater</a></li>
              <li className="hover:underline"><a href="#">Concerts</a></li>
              <li className="hover:underline"><a href="#">Sport</a></li>
            </ul>
          </div>


          <div className="w-full md:w-auto mr-[105px]">
            <p className="font-semibold text-[18px] mb-4">CONTACT US</p>
            <a className="hover:underline text-red-800 font-bold block" href="tel:+998958973338">
              +998 (95) 897-33-38
            </a>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer