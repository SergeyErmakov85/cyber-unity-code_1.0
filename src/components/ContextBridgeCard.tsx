import { SUPPORT_HUBS, type HubId } from "@/content/hubs";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ContextBridgeCardProps {
  hubId: HubId;
  title: string;
  whyThisNow: string;
  ctaLabel: string;
  isPrimary: boolean;
  onClick: () => void;
}

const ContextBridgeCard = ({
  hubId,
  title,
  whyThisNow,
  ctaLabel,
  isPrimary,
  onClick,
}: ContextBridgeCardProps) => {
  const hub = SUPPORT_HUBS[hubId];
  const Icon = hub.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl border p-4 transition-all duration-200 group",
        isPrimary
          ? "border-primary/40 bg-primary/5 hover:border-primary/70 hover:bg-primary/10"
          : "border-border/50 bg-card/40 hover:border-border hover:bg-card/60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
            isPrimary ? "bg-primary/15" : "bg-muted/30"
          )}
        >
          <Icon className={cn("h-4 w-4", hub.colorAccent)} />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-medium uppercase tracking-wider", hub.colorAccent)}>
              {hub.label}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{whyThisNow}</p>

          <span
            className={cn(
              "inline-flex items-center gap-1 pt-1 text-xs font-medium transition-colors",
              isPrimary
                ? "text-primary group-hover:text-primary/80"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {ctaLabel}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
};

export default ContextBridgeCard;
