import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-12 py-4 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <h1
        className="text-2xl md:text-3xl font-extrabold tracking-wider"
        style={{ color: "hsl(0, 72%, 51%)" }}
      >
        MOVIEFLIX
      </h1>
    </nav>
  );
};

export default Navbar;
