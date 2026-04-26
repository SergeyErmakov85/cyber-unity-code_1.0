import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => (
  <div className="rounded-xl border border-border/30 bg-card/50 p-5 space-y-4">
    <Skeleton className="h-32 w-full rounded-lg" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="grid gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
    <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <div className="text-center space-y-3">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
      <SkeletonList count={4} />
    </main>
  </div>
);

export default SkeletonCard;
