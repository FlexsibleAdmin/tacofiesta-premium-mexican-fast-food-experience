import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export function MenuSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col border-none shadow-sm bg-card">
      <div className="aspect-[16/9] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4 flex-1 flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="mt-auto pt-2">
          <Skeleton className="h-3 w-12" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
      </CardFooter>
    </Card>
  );
}
export function MenuGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <MenuSkeleton key={i} />
      ))}
    </div>
  );
}