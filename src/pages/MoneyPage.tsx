import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Coins, Gift, TrendingUp, CreditCard, Lock, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { toast } from "sonner";
import { motion } from "framer-motion";
interface RewardItem {
  id: string;
  title: string;
  cost: number;
  image: string;
  locked: boolean;
}
const REWARD_ITEMS: RewardItem[] = [
  {
    id: "1",
    title: "Free Crunchy Taco",
    cost: 250,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80",
    locked: false
  },
  {
    id: "2",
    title: "Medium Drink",
    cost: 300,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
    locked: false
  },
  {
    id: "3",
    title: "Bean Burrito",
    cost: 500,
    image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?auto=format&fit=crop&w=400&q=80",
    locked: false
  },
  {
    id: "4",
    title: "Nachos BellGrande®",
    cost: 1200,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80",
    locked: true
  },
  {
    id: "5",
    title: "$10 Off Order",
    cost: 2000,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80",
    locked: true
  },
  {
    id: "6",
    title: "Taco Party Pack",
    cost: 3000,
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=400&q=80",
    locked: true
  }
];
export function MoneyPage() {
  const [balance, setBalance] = useState(850);
  const [progress] = useState(65); // 65% to next tier
  const handleRedeem = (item: RewardItem) => {
    if (item.locked) {
      toast.error("You need more points to unlock this money reward!");
      return;
    }
    if (balance < item.cost) {
      toast.error("Not enough points in your stash!");
      return;
    }
    setBalance(prev => prev - item.cost);
    toast.success(`Redeemed ${item.title}! Added to your money stash.`);
  };
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-brand text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-dark/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-wider mb-4">
                <Coins className="w-4 h-4 text-yellow-400" />
                TacoFiesta Money
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
                Your Money.<br />Your Way.
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-xl">
                Earn 10 points for every $1 spent. Redeem for free food, exclusive deals, and more. It pays to eat bold.
              </p>
            </motion.div>
            {/* Balance Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-white/70">Current Balance</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-bold">{balance}</span>
                    <span className="text-xl font-medium text-white/70">pts</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Silver Status</span>
                      <span>Gold Status</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-black/20" indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600" />
                    <p className="text-xs text-white/60 text-right">350 pts to Gold</p>
                  </div>
                </CardContent>
                <div className="bg-black/20 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>+120 pts this week</span>
                  </div>
                  <Button size="sm" variant="secondary" className="font-bold text-brand-dark">
                    History
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="bg-card hover:shadow-lg transition-all cursor-pointer border-none shadow-md group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                <CreditCard className="w-6 h-6 text-brand group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Scan to Pay</h3>
                <p className="text-sm text-muted-foreground">Earn points instantly</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card hover:shadow-lg transition-all cursor-pointer border-none shadow-md group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                <Gift className="w-6 h-6 text-brand group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Send a Gift</h3>
                <p className="text-sm text-muted-foreground">Share the taco love</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card hover:shadow-lg transition-all cursor-pointer border-none shadow-md group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6 text-brand group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Challenges</h3>
                <p className="text-sm text-muted-foreground">Earn bonus points</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Rewards Grid */}
        <SectionHeader title="Redeem Money" subtitle="Turn your points into delicious rewards." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REWARD_ITEMS.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`overflow-hidden border-none shadow-md h-full flex flex-col ${item.locked ? 'opacity-80' : ''}`}>
                <div className="relative aspect-video">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  {item.locked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                      <Lock className="w-8 h-8 text-white/80" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="font-bold shadow-sm">
                      {item.cost} pts
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <Button 
                    className={`w-full font-bold ${item.locked ? 'bg-muted text-muted-foreground hover:bg-muted' : 'bg-brand hover:bg-brand-dark'}`}
                    disabled={item.locked}
                    onClick={() => handleRedeem(item)}
                  >
                    {item.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" /> Locked
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Redeem
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}