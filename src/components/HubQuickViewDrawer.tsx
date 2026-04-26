import { useNavigate } from "react-router-dom";
import { SUPPORT_HUBS, type HubId } from "@/content/hubs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";

interface HubQuickViewDrawerProps {
  hubId: HubId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HubQuickViewDrawer = ({ hubId, open, onOpenChange }: HubQuickViewDrawerProps) => {
  const navigate = useNavigate();

  if (!hubId) return null;
  const hub = SUPPORT_HUBS[hubId];
  const Icon = hub.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="border-border/50 bg-background/95 backdrop-blur-md sm:max-w-md">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Icon className={`h-5 w-5 ${hub.colorAccent}`} />
            </div>
            <SheetTitle className="text-xl font-bold text-foreground">
              {hub.label}
            </SheetTitle>
          </div>
          <SheetDescription className="text-sm text-muted-foreground leading-relaxed">
            {hub.shortDescription}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          <div className="rounded-lg border border-border/50 bg-card/40 p-4">
            <p className="text-xs text-muted-foreground">
              Откройте полную страницу хаба, чтобы изучить все материалы, справочники и примеры кода.
            </p>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              navigate(`/hub/${hub.slug}`);
            }}
          >
            Открыть хаб
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HubQuickViewDrawer;
