import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="pt-[78px] md:pt-[84px] pb-[72px] md:pb-0 bg-black min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default React.memo(Layout);
