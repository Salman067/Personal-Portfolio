import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScrolled);
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-lg" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">SalmanTech</span>
            Portfolio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 relative p-2 text-forground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen?"Close Menu":"Open Menu"}
        >
            {isMenuOpen?<X size={24}/>:<Menu size={24}/>}
          {/* <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-all duration-300",
                isMenuOpen ? "rotate-45 translate-y-0.5" : ""
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1",
                isMenuOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1",
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              )}
            />
          </div> */}
        </button>

        {/* Mobile nav menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};