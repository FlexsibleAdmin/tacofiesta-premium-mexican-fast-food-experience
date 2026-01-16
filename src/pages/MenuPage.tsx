import { useState, useMemo, useEffect } from "react";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/mock-menu";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuCard } from "@/components/menu/MenuCard";
import { ProductModal } from "@/components/product/ProductModal";
import { SectionHeader } from "@/components/ui/section-header";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuGridSkeleton } from "@/components/ui/menu-skeleton";
export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  // Simulate initial data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;
    // Filter by Category
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === activeCategory);
    }
    // Filter by Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);
  const handleQuickAdd = (product: Product) => {
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
  const clearSearch = () => setSearchQuery("");
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-brand text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Explore our craveable selection of tacos, burritos, and more. Made fresh, just for you.
            </p>
          </motion.div>
        </div>
      </div>
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
          <SectionHeader
            title={activeCategory === 'all' ? 'Full Menu' : CATEGORIES.find(c => c.id === activeCategory)?.name || 'Menu'}
            subtitle={`${filteredProducts.length} items found`}
            className="mb-0"
          />
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search menu..." 
              className="pl-9 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <MenuGridSkeleton />
        ) : filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuCard
                    product={product}
                    onAdd={handleQuickAdd}
                    onCustomize={handleCustomize}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-muted-foreground">
              We couldn't find anything matching "{searchQuery}" in this category.
            </p>
            <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 text-brand font-bold hover:underline"
            >
                Clear filters
            </button>
          </motion.div>
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