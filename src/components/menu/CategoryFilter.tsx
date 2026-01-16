import { Category } from "@/lib/mock-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}
export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Scroll active category into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector(`[data-active="true"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategory]);
  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4 mb-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className={cn(
              "rounded-full whitespace-nowrap font-bold transition-all",
              activeCategory === 'all' 
                ? "bg-brand hover:bg-brand-dark text-white shadow-md" 
                : "hover:border-brand hover:text-brand"
            )}
            onClick={() => onSelectCategory('all')}
            data-active={activeCategory === 'all'}
          >
            All Menu
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={cn(
                "rounded-full whitespace-nowrap font-bold transition-all",
                activeCategory === category.id 
                  ? "bg-brand hover:bg-brand-dark text-white shadow-md" 
                  : "hover:border-brand hover:text-brand"
              )}
              onClick={() => onSelectCategory(category.id)}
              data-active={activeCategory === category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}