import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Navigation, Clock, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { toast } from "sonner";
interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  distance: string;
  status: "Open" | "Closed" | "Closing Soon";
  hours: string;
  phone: string;
}
const MOCK_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "TacoFiesta Downtown",
    address: "123 Main St",
    city: "Metropolis",
    state: "NY",
    zip: "10001",
    distance: "0.8 mi",
    status: "Open",
    hours: "10:00 AM - 2:00 AM",
    phone: "(555) 123-4567"
  },
  {
    id: "2",
    name: "TacoFiesta Westside",
    address: "456 Market Blvd",
    city: "Metropolis",
    state: "NY",
    zip: "10002",
    distance: "2.4 mi",
    status: "Open",
    hours: "10:00 AM - 12:00 AM",
    phone: "(555) 987-6543"
  },
  {
    id: "3",
    name: "TacoFiesta University",
    address: "789 College Ave",
    city: "Metropolis",
    state: "NY",
    zip: "10003",
    distance: "3.1 mi",
    status: "Closing Soon",
    hours: "11:00 AM - 11:00 PM",
    phone: "(555) 456-7890"
  },
  {
    id: "4",
    name: "TacoFiesta Mall",
    address: "101 Shopping Ctr",
    city: "Metropolis",
    state: "NY",
    zip: "10004",
    distance: "5.2 mi",
    status: "Closed",
    hours: "10:00 AM - 9:00 PM",
    phone: "(555) 222-3333"
  }
];
export function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLocations = MOCK_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.zip.includes(searchQuery)
  );
  const handleSetLocation = (name: string) => {
    toast.success(`Selected ${name} for pickup`);
  };
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Map Placeholder */}
      <div className="h-[40vh] bg-muted relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">
            Find a TacoFiesta
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Satisfy your cravings at a location near you. Open late for all your fourthmeal needs.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <Card className="border-none shadow-xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by city, state, or zip..." 
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-12 px-8 bg-brand hover:bg-brand-dark font-bold text-lg">
                <Navigation className="mr-2 h-5 w-5" /> Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-12">
          <SectionHeader title="Nearby Locations" subtitle={`${filteredLocations.length} stores found`} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-brand">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase">{location.name}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-lg">{location.distance}</span>
                      <Badge 
                        variant={location.status === "Open" ? "default" : location.status === "Closed" ? "destructive" : "secondary"}
                        className={location.status === "Open" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {location.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{location.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{location.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-brand hover:bg-brand-dark font-bold"
                      onClick={() => handleSetLocation(location.name)}
                      disabled={location.status === "Closed"}
                    >
                      Order Here
                    </Button>
                    <Button variant="outline" className="flex-1 font-bold">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredLocations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No locations found</h3>
              <p className="text-muted-foreground">Try adjusting your search or use your current location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}