import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product, Modifier } from "@/lib/mock-menu";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}
export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [modifiers, setModifiers] = useState<Record<string, boolean>>({});
  const addItem = useCartStore((s) => s.addItem);
  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      const initialModifiers: Record<string, boolean> = {};
      product.modifiers?.forEach(m => {
        if (m.type === 'boolean' && typeof m.default === 'boolean') {
          initialModifiers[m.id] = m.default;
        }
      });
      setModifiers(initialModifiers);
    }
  }, [product, isOpen]);
  if (!product) return null;
  const handleModifierChange = (modifierId: string, checked: boolean) => {
    setModifiers(prev => ({ ...prev, [modifierId]: checked }));
  };
  const calculateTotal = () => {
    let total = product.price;
    product.modifiers?.forEach(m => {
      if (modifiers[m.id]) {
        total += m.price;
      }
    });
    return total * quantity;
  };
  const handleAddToCart = () => {
    const cartItem = {
      id: uuidv4(),
      product,
      quantity,
      modifiers,
      totalPrice: calculateTotal()
    };
    addItem(cartItem);
    toast.success(`Added ${quantity} ${product.name} to order`);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <DialogTitle className="text-2xl sm:text-3xl font-display font-bold shadow-black drop-shadow-md">
              {product.name}
            </DialogTitle>
            <div className="text-white/90 font-medium text-lg">
              ${product.price.toFixed(2)} • {product.calories} Cal
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1 p-6">
          <DialogDescription className="text-base mb-6">
            {product.description}
          </DialogDescription>
          {product.modifiers && product.modifiers.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Customize</h4>
              <div className="space-y-3">
                {product.modifiers.map((modifier) => (
                  <div key={modifier.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={modifier.id} 
                        checked={modifiers[modifier.id] || false}
                        onCheckedChange={(checked) => handleModifierChange(modifier.id, checked as boolean)}
                      />
                      <Label 
                        htmlFor={modifier.id}
                        className="text-base font-medium cursor-pointer"
                      >
                        {modifier.name}
                      </Label>
                    </div>
                    {modifier.price > 0 && (
                      <span className="text-sm font-medium text-muted-foreground">
                        +${modifier.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t bg-background mt-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xl font-bold text-brand-dark">
              ${calculateTotal().toFixed(2)}
            </div>
          </div>
          <Button 
            className="w-full h-12 text-lg font-bold bg-brand hover:bg-brand-dark text-white shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}