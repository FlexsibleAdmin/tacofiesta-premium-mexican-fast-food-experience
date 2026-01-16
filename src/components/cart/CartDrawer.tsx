import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/use-cart-store";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { PRODUCTS } from "@/lib/mock-menu";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
export function CartDrawer() {
  const navigate = useNavigate();
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const addItem = useCartStore((s) => s.addItem);
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const tax = subtotal * 0.08; // Mock tax
  const total = subtotal + tax;
  // Smart Upsell Logic: Find a cheap item (<$4) from specific categories that isn't already in the cart
  const upsellItem = useMemo(() => {
    if (items.length === 0) return null;
    const cartProductIds = new Set(items.map(i => i.product.id));
    const candidates = PRODUCTS.filter(p => 
      p.price < 4.00 && 
      ['drinks', 'sides', 'cravings'].includes(p.categoryId) && 
      !cartProductIds.has(p.id)
    );
    if (candidates.length === 0) return null;
    // Return a random candidate to keep it fresh
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [items]);
  const handleUpsellAdd = () => {
    if (!upsellItem) return;
    const defaultModifiers: Record<string, boolean> = {};
    upsellItem.modifiers?.forEach(m => {
        if (m.type === 'boolean' && typeof m.default === 'boolean') {
            defaultModifiers[m.id] = m.default;
        }
    });
    addItem({
      id: uuidv4(),
      product: upsellItem,
      quantity: 1,
      modifiers: defaultModifiers,
      totalPrice: upsellItem.price
    });
    toast.success(`Added ${upsellItem.name} to your order!`);
  };
  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl uppercase">
            <ShoppingBag className="w-6 h-6 text-brand" />
            Your Order
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your selected items, add upsells, and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your cart is empty</h3>
                <p className="text-muted-foreground">Start adding some delicious items!</p>
              </div>
              <Button onClick={() => setOpen(false)} variant="outline">
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 bg-muted">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm line-clamp-2">{item.product.name}</h4>
                      <span className="font-bold text-sm">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                    </div>
                    {/* Modifiers Summary */}
                    <div className="text-xs text-muted-foreground">
                      {Object.entries(item.modifiers).map(([key, value]) => {
                        if (!value) return null;
                        const modName = item.product.modifiers?.find(m => m.id === key)?.name;
                        return modName ? <div key={key}>+ {modName}</div> : null;
                      })}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border rounded-md h-8">
                        <button
                          className="px-2 hover:bg-muted h-full flex items-center"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          className="px-2 hover:bg-muted h-full flex items-center"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="border-t bg-muted/20 p-6 space-y-4">
            {/* Upsell Section */}
            {upsellItem && (
                <div className="bg-background border border-brand/20 rounded-lg p-3 flex items-center gap-3 shadow-sm animate-fade-in">
                    <div className="h-12 w-12 rounded-md bg-muted overflow-hidden shrink-0">
                        <img src={upsellItem.image} alt={upsellItem.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-xs font-bold text-brand uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Add a treat?
                        </div>
                        <p className="text-sm font-bold truncate">{upsellItem.name}</p>
                        <p className="text-xs text-muted-foreground">+${upsellItem.price.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 border-brand text-brand hover:bg-brand hover:text-white transition-colors" onClick={handleUpsellAdd}>
                        Add
                    </Button>
                </div>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full h-12 text-lg font-bold bg-brand hover:bg-brand-dark text-white shadow-lg"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}