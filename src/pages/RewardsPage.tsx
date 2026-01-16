import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star, Gift, ChevronRight, Lock } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { toast } from "sonner";
const REWARDS = [
  {
    id: "r1",
    name: "Free Crunchy Taco",
    points: 250,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80",
    locked: false
  },
  {
    id: "r2",
    name: "Bean Burrito",
    points: 500,
    image: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?auto=format&fit=crop&w=400&q=80",
    locked: false
  },
  {
    id: "r3",
    name: "Nachos BellGrande®",
    points: 1500,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80",
    locked: true
  },
  {
    id: "r4",
    name: "Quesadilla Combo",
    points: 2000,
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=400&q=80",
    locked: true
  }
];
export function RewardsPage() {
  const currentPoints = 1250;
  const nextTierPoints = 2000;
  const progress = (currentPoints / nextTierPoints) * 100;
  const handleRedeem = (item: string) => {
    toast.success(`Redeemed: ${item}! Added to your rewards.`);
  };
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-brand-dark text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                <Flame className="w-3 h-3 fill-current" /> Fire Tier Member
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase italic">
                TacoFiesta <span className="text-brand-light">Rewards</span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg">
                Earn points on every order. Unlock exclusive deals. Eat more tacos.
              </p>
            </div>
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Current Balance</p>
                    <p className="text-5xl font-display font-bold">{currentPoints}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white/70">Next Reward</p>
                    <p className="text-xl font-bold text-brand-light">1500 pts</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={progress} className="h-3 bg-white/20" />
                  <div className="flex justify-between text-xs text-white/60 font-medium">
                    <span>0 pts</span>
                    <span>{nextTierPoints} pts</span>
                  </div>
                </div>
                <Button className="w-full bg-brand-light hover:bg-brand text-white font-bold h-12 shadow-lg">
                  Scan to Earn <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Rewards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Redeem Rewards" subtitle="Turn your points into cravings." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REWARDS.map((reward) => (
            <Card key={reward.id} className={`overflow-hidden border-none shadow-md transition-all hover:shadow-xl ${reward.locked ? 'opacity-80' : ''}`}>
              <div className="relative aspect-square">
                <img 
                  src={reward.image} 
                  alt={reward.name} 
                  className={`w-full h-full object-cover ${reward.locked ? 'grayscale' : ''}`}
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {reward.points}
                </div>
                {reward.locked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-background/90 p-3 rounded-full shadow-lg">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-bold leading-tight">{reward.name}</CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-2">
                <Button 
                  className={`w-full font-bold ${reward.locked ? 'bg-muted text-muted-foreground' : 'bg-brand hover:bg-brand-dark'}`}
                  disabled={reward.locked}
                  onClick={() => handleRedeem(reward.name)}
                >
                  {reward.locked ? `Need ${reward.points - currentPoints} more` : 'Redeem Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {/* How it works */}
      <div className="bg-secondary/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="How It Works" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
                <Phone className="w-8 h-8" /> {/* Using Phone icon as placeholder for App/Order */}
              </div>
              <h3 className="text-xl font-bold mb-2">1. Order</h3>
              <p className="text-muted-foreground">Order in the app, online, or scan your code at the register.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Earn</h3>
              <p className="text-muted-foreground">Get 10 points for every $1 spent. Watch your balance grow.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Redeem</h3>
              <p className="text-muted-foreground">Turn those points into free food. It's that simple.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Helper component for the icon
function Phone({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}