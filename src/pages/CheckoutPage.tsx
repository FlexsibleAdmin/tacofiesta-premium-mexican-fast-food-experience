import { useState } from "react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, MapPin, CreditCard, Truck, Store, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// Validation Schema
const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  fulfillmentType: z.enum(["pickup", "delivery"]),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  cardNumber: z.string().min(16, "Invalid card number"),
  expiry: z.string().min(5, "Invalid expiry (MM/YY)"),
  cvc: z.string().min(3, "Invalid CVC"),
}).refine((data) => {
  if (data.fulfillmentType === "delivery") {
    return !!data.address && !!data.city && !!data.zip;
  }
  return true;
}, {
  message: "Address is required for delivery",
  path: ["address"],
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fulfillmentType: "pickup",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });
  const fulfillmentType = form.watch("fulfillmentType");
  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = fulfillmentType === "delivery" ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setOrderId(`ORD-${Math.floor(Math.random() * 1000000)}`);
    clearCart();
    toast.success("Order placed successfully!");
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-none shadow-2xl">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-display font-bold text-brand-dark">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your order. We're firing up the grill!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Order Number</p>
              <p className="text-2xl font-mono font-bold text-foreground">{orderId}</p>
            </div>
            <p className="text-muted-foreground">
              We've sent a confirmation email to <span className="font-bold text-foreground">{form.getValues().email}</span>.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-brand hover:bg-brand-dark font-bold h-12" onClick={() => navigate("/")}>
              Return Home
            </Button>
            <Button variant="ghost" onClick={() => navigate("/menu")}>
              Order More
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you haven't added any delicious tacos yet. Head over to the menu to get started!
          </p>
          <Button asChild className="bg-brand hover:bg-brand-dark font-bold h-12 px-8">
            <Link to="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-secondary/30 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-brand transition-colors font-medium">Home</Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-bold">Checkout</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-7 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* 1. Contact Info */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">1</div>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                {/* 2. Fulfillment */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">2</div>
                      Fulfillment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fulfillmentType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem value="pickup" className="peer sr-only" />
                                </FormControl>
                                <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand peer-data-[state=checked]:text-brand cursor-pointer transition-all">
                                  <Store className="mb-3 h-6 w-6" />
                                  <span className="font-bold">Pickup</span>
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem value="delivery" className="peer sr-only" />
                                </FormControl>
                                <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand peer-data-[state=checked]:text-brand cursor-pointer transition-all">
                                  <Truck className="mb-3 h-6 w-6" />
                                  <span className="font-bold">Delivery</span>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {fulfillmentType === "delivery" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-accordion-down">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Taco Lane" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Flavor Town" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input placeholder="90210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    {fulfillmentType === "pickup" && (
                      <div className="bg-secondary/50 p-4 rounded-lg flex items-start gap-3 animate-accordion-down">
                        <MapPin className="w-5 h-5 text-brand mt-0.5" />
                        <div>
                          <p className="font-bold">TacoFiesta Downtown</p>
                          <p className="text-sm text-muted-foreground">123 Main St, City Center</p>
                          <p className="text-sm text-green-600 font-medium mt-1">Ready in ~15 mins</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                {/* 3. Payment */}
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">3</div>
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="0000 0000 0000 0000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold bg-brand hover:bg-brand-dark shadow-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-secondary/50 border-b">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 bg-muted">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm">{item.product.name}</h4>
                            <span className="font-medium text-sm">${(item.totalPrice * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Object.entries(item.modifiers).map(([key, value]) => {
                                if (!value) return null;
                                const modName = item.product.modifiers?.find(m => m.id === key)?.name;
                                return modName ? <span key={key} className="block">+ {modName}</span> : null;
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="p-6 space-y-3 bg-secondary/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    {fulfillmentType === "delivery" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-xl font-bold text-brand-dark">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}