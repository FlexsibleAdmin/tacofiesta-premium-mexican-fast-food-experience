import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center">
                <span className="text-xl">🌮</span>
              </div>
              <span className="font-display font-bold text-xl uppercase">
                Taco<span className="text-brand">Fiesta</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Serving the boldest, freshest Mexican-inspired fast food since 2025. Live Más, Eat Better.
            </p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Menu</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-brand transition-colors">Tacos</Link></li>
              <li><Link to="/menu" className="hover:text-brand transition-colors">Burritos</Link></li>
              <li><Link to="/menu" className="hover:text-brand transition-colors">Quesadillas</Link></li>
              <li><Link to="/menu" className="hover:text-brand transition-colors">Cravings Value</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">About Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-brand transition-colors">Our Story</Link></li>
              <li><Link to="#" className="hover:text-brand transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand transition-colors">News</Link></li>
              <li><Link to="#" className="hover:text-brand transition-colors">Nutrition</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background border flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ by Aurelia | Your AI Co-founder
            </p>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 TacoFiesta. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground">Terms of Service</Link>
            <Link to="#" className="hover:text-foreground">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}