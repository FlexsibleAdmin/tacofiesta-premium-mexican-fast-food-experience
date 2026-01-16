import { Product } from "@/lib/mock-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
interface MenuCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onCustomize: (product: Product) => void;
}
export function MenuCard({ product, onAdd, onCustomize }: MenuCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
        <div 
          className="relative aspect-[16/9] overflow-hidden cursor-pointer group"
          onClick={() => onCustomize(product)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.popular && (
            <div className="absolute top-2 left-2 bg-brand text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Popular
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="font-display font-bold text-xl leading-tight cursor-pointer hover:text-brand transition-colors"
              onClick={() => onCustomize(product)}
            >
              {product.name}
            </h3>
            <span className="font-bold text-lg text-brand-dark">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>
          <div className="text-xs text-muted-foreground font-medium">
            {product.calories} Cal
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button 
            variant="outline" 
            className="flex-1 font-semibold border-2 hover:bg-secondary hover:text-secondary-foreground"
            onClick={() => onCustomize(product)}
          >
            Customize
          </Button>
          <Button 
            className="flex-1 font-bold bg-brand hover:bg-brand-dark text-white shadow-md hover:shadow-lg transition-all"
            onClick={() => onAdd(product)}
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}