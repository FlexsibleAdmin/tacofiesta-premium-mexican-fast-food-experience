import { cn } from "@/lib/utils";
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}
export function SectionHeader({ title, subtitle, className, centered = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground uppercase italic">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn("h-1 w-24 bg-brand mt-4", centered && "mx-auto")} />
    </div>
  );
}