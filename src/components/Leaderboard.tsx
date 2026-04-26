import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMockLeaderboard } from "@/lib/gamification";
import { Trophy, Medal, Award } from "lucide-react";

const filters = ["Эта неделя", "Этот месяц", "Все время"] as const;

const Leaderboard = () => {
  const [filter, setFilter] = useState<string>("Все время");
  const data = getMockLeaderboard();

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
  };

  return (
    <Card className="bg-card/60 border-primary/20 backdrop-blur-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Таблица лидеров
          </h3>
          <div className="flex gap-1">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "ghost"}
                size="sm"
                className={filter === f ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground"}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {data.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                entry.rank <= 3
                  ? "bg-primary/5 border border-primary/10"
                  : "hover:bg-muted/20"
              }`}
            >
              <div className="w-8 flex justify-center">{rankIcon(entry.rank)}</div>
              <span className="text-lg">{entry.avatar}</span>
              <span className="font-semibold text-foreground flex-1 text-sm">{entry.name}</span>
              <span className="text-xs text-muted-foreground">{entry.badges} 🏅</span>
              <span className="text-sm font-bold text-primary min-w-[60px] text-right">{entry.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
