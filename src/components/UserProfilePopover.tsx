import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { getProgress, getLevel, getLevelProgress, ALL_BADGES } from "@/lib/gamification";
import { Zap, User } from "lucide-react";

const UserProfilePopover = () => {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    const handler = () => setProgress(getProgress());
    window.addEventListener("progress-updated", handler);
    return () => window.removeEventListener("progress-updated", handler);
  }, []);

  const level = getLevel(progress.xp);
  const lvlProgress = getLevelProgress(progress.xp);

  return (
    <div className="flex items-center gap-2">
      {/* XP counter */}
      <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-primary">
        <Zap className="w-3.5 h-3.5" />
        <span>{progress.xp} XP</span>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 hover:shadow-[var(--glow-cyan)] transition-all">
            <User className="w-4 h-4 text-primary" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-card/95 backdrop-blur-xl border-primary/30" align="end">
          <div className="space-y-4">
            {/* Level & XP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">Уровень {level}</span>
                <span className="text-xs text-primary font-semibold">{progress.xp} XP</span>
              </div>
              <Progress value={lvlProgress} className="h-2 bg-muted" />
              <p className="text-xs text-muted-foreground">
                {500 - (progress.xp % 500)} XP до уровня {level + 1}
              </p>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🔥</span>
              <span className="text-muted-foreground">Серия:</span>
              <span className="font-bold text-foreground">{progress.streak} дней</span>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Бейджи ({progress.badges.length}/{ALL_BADGES.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_BADGES.map((badge) => {
                  const unlocked = progress.badges.some((b) => b.id === badge.id);
                  return (
                    <div
                      key={badge.id}
                      title={`${badge.name}: ${badge.description}`}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-all ${
                        unlocked
                          ? "bg-primary/10 border-primary/40 shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                          : "bg-muted/30 border-border/50 opacity-40 grayscale"
                      }`}
                    >
                      {badge.icon}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/20 rounded-md p-2 text-center">
                <p className="font-bold text-foreground">{progress.completedLessons.length}</p>
                <p className="text-muted-foreground">Уроков</p>
              </div>
              <div className="bg-muted/20 rounded-md p-2 text-center">
                <p className="font-bold text-foreground">{progress.completedProjects.length}</p>
                <p className="text-muted-foreground">Проектов</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserProfilePopover;
