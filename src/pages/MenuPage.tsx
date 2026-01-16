import { useState, useMemo } from "react";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/mock-menu";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuCard } from "@/components/menu/MenuCard";
import { ProductModal } from "@/components/product/ProductModal";
import { SectionHeader } from "@/components/ui/section-header";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);
  const handleQuickAdd = (product: Product) => {
    // If product has required modifiers or complex options, open modal instead
    // For now, we'll assume all products can be quick added with defaults
    // But if it has modifiers, better to open modal to be safe, or just add defaults
    // Let's just add with defaults for "Quick Add"
    const defaultModifiers: Record<string, boolean> = {};
    product.modifiers?.forEach(m => {
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
  const handleCustomize = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-brand text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Explore our craveable selection of tacos, burritos, and more. Made fresh, just for you.
          </p>
        </div>
      </div>
      <CategoryFilter 
        categories={CATEGORIES} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title={activeCategory === 'all' ? 'Full Menu' : CATEGORIES.find(c => c.id === activeCategory)?.name || 'Menu'} 
          subtitle={`${filteredProducts.length} items found`}
        />
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <MenuCard
                key={product.id}
                product={product}
                onAdd={handleQuickAdd}
                onCustomize={handleCustomize}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No items found in this category.</p>
            <button 
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-brand font-bold hover:underline"
            >
                View all items
            </button>
          </div>
        )}
      </div>
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}