import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-menu";
import { MenuCard } from "@/components/menu/MenuCard";
import { ProductModal } from "@/components/product/ProductModal";
import { useState } from "react";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { SectionHeader } from "@/components/ui/section-header";
export function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const featuredProducts = PRODUCTS.filter(p => p.popular).slice(0, 4);
  const handleQuickAdd = (product: any) => {
    const defaultModifiers: Record<string, boolean> = {};
    product.modifiers?.forEach((m: any) => {
        if (m.type === 'boolean' && typeof m.default === 'boolean') {
            defaultModifiers[m.id] = m.default;
        }
    });
    addItem({
      id: uuidv4(),
      product,
      quantity: 1,
      modifiers: defaultModifiers,
      totalPrice: product.price
    });
    toast.success(`Added ${product.name} to cart`);
  };
  const handleCustomize = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1920&q=80" 
            alt="Taco Feast" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand text-white font-bold text-sm uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4 fill-current" />
              New Limited Time Offer
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight uppercase">
              Live Más.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand">Eat Bold.</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
              Experience the crunch, the spice, and the cheese. The all-new Cravings Box is here to satisfy your late-night hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white text-lg font-bold h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-all">
                <Link to="/menu">
                  Order Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg font-bold h-14 px-8 rounded-full">
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Fan Favorites" 
            subtitle="The items you can't get enough of. Order them again and again."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <MenuCard
                key={product.id}
                product={product}
                onAdd={handleQuickAdd}
                onCustomize={handleCustomize}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="font-bold border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Cravings Value Menu Promo */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand opacity-20 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase italic">
                Cravings Value Menu
              </h2>
              <p className="text-xl text-white/90">
                Big flavor doesn't have to mean big spending. Check out our value menu items starting at just $1.00.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center"><Star className="w-3 h-3 fill-white" /></div>
                  Spicy Potato Soft Taco
                </li>
                <li className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center"><Star className="w-3 h-3 fill-white" /></div>
                  Cheesy Bean and Rice Burrito
                </li>
                <li className="flex items-center gap-3 text-lg font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center"><Star className="w-3 h-3 fill-white" /></div>
                  Cinnamon Twists
                </li>
              </ul>
              <Button asChild size="lg" className="bg-white text-brand-dark hover:bg-gray-100 font-bold mt-4">
                <Link to="/menu">Shop Value Menu</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-white/10 absolute inset-0 scale-90 blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1624300626419-bda14d960916?auto=format&fit=crop&w=800&q=80" 
                alt="Value Menu Items" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}