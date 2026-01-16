import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Locations", path: "#" },
    { name: "Rewards", path: "#" },
  ];
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl">����</span>
            </div>
            <span className={cn(
              "font-display font-bold text-2xl tracking-tight uppercase",
              isScrolled ? "text-foreground" : "text-foreground drop-shadow-sm"
            )}>
              Taco<span className="text-brand">Fiesta</span>
            </span>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-bold uppercase tracking-wide hover:text-brand transition-colors",
                  location.pathname === link.path ? "text-brand" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:text-brand transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Select Location</span>
            </div>
            <ThemeToggle className="relative top-0 right-0" />
            <Button 
              onClick={toggleCart}
              className="relative bg-brand hover:bg-brand-dark text-white rounded-full w-12 h-12 p-0 shadow-lg hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                  {cartCount}
                </span>
              )}
            </Button>
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 mt-8">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center">
                      <span className="text-xl">🌮</span>
                    </div>
                    <span className="font-display font-bold text-xl uppercase">
                      Taco<span className="text-brand">Fiesta</span>
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="text-lg font-bold uppercase tracking-wide hover:text-brand transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto">
                    <Button className="w-full bg-brand font-bold">Sign In / Sign Up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}