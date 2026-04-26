import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const GRID_SIZE = 5;
const GOAL = { r: 0, c: 4 };
const TRAP = { r: 2, c: 2 };
const START = { r: 4, c: 0 };
const WALLS = [
  { r: 1, c: 1 },
  { r: 1, c: 2 },
  { r: 3, c: 3 },
];

type Direction = "up" | "down" | "left" | "right";
type CellType = "empty" | "agent" | "goal" | "trap" | "wall" | "visited";

const isWall = (r: number, c: number) =>
  WALLS.some((w) => w.r === r && w.c === c);

const CELL_STYLES: Record<CellType, string> = {
  empty: "bg-muted/10 border-border/20",
  agent:
    "bg-primary/30 border-primary/50 shadow-[0_0_10px_hsl(180_100%_50%/0.3)]",
  goal: "bg-green-500/20 border-green-500/40",
  trap: "bg-red-500/20 border-red-500/40",
  wall: "bg-muted/40 border-border/50",
  visited: "bg-primary/5 border-primary/10",
};

const CELL_CONTENT: Record<CellType, string> = {
  empty: "",
  agent: "\u{1F916}",
  goal: "\u2B50",
  trap: "\u{1F480}",
  wall: "\u{1F9F1}",
  visited: "\u00B7",
};

const DIR_ARROW: Record<Direction, string> = {
  up: "\u2191",
  down: "\u2193",
  left: "\u2190",
  right: "\u2192",
};

const MiniGridWorld = () => {
  const [agentPos, setAgentPos] = useState(START);
  const [totalReward, setTotalReward] = useState(0);
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(
    () => new Set([`${START.r},${START.c}`]),
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const move = useCallback(
    (dir: Direction) => {
      if (gameOver) return;

      setAgentPos((prev) => {
        let nr = prev.r;
        let nc = prev.c;
        if (dir === "up") nr--;
        if (dir === "down") nr++;
        if (dir === "left") nc--;
        if (dir === "right") nc++;

        if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE || isWall(nr, nc)) {
          return prev;
        }

        let reward = -1;
        if (nr === GOAL.r && nc === GOAL.c) {
          reward = 10;
          setGameOver(true);
          setIsRunning(false);
        } else if (nr === TRAP.r && nc === TRAP.c) {
          reward = -5;
        }

        const sign = reward > 0 ? "+" : "";
        setTotalReward((p) => p + reward);
        setSteps((p) => p + 1);
        setHistory((p) => [
          ...p.slice(-4),
          `${DIR_ARROW[dir]} ${sign}${reward}`,
        ]);
        setVisited((p) => new Set([...p, `${nr},${nc}`]));

        return { r: nr, c: nc };
      });
    },
    [gameOver],
  );

  const autoStep = useCallback(() => {
    const dirs: Direction[] = ["up", "down", "left", "right"];
    move(dirs[Math.floor(Math.random() * dirs.length)]);
  }, [move]);

  useEffect(() => {
    if (isRunning && !gameOver) {
      intervalRef.current = setInterval(autoStep, 600);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, gameOver, autoStep]);

  const reset = () => {
    setAgentPos(START);
    setTotalReward(0);
    setSteps(0);
    setHistory([]);
    setGameOver(false);
    setIsRunning(false);
    setVisited(new Set([`${START.r},${START.c}`]));
  };

  const getCellType = (r: number, c: number): CellType => {
    if (r === agentPos.r && c === agentPos.c) return "agent";
    if (r === GOAL.r && c === GOAL.c) return "goal";
    if (r === TRAP.r && c === TRAP.c) return "trap";
    if (isWall(r, c)) return "wall";
    if (visited.has(`${r},${c}`)) return "visited";
    return "empty";
  };

  const controlsDisabled = gameOver || isRunning;

  return (
    <div className="bg-card/40 rounded-xl border border-border/50 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            Мини-GridWorld
          </h4>
          <p className="text-xs text-muted-foreground">
            Управляйте агентом стрелками или включите автоигру
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRunning((r) => !r)}
            disabled={gameOver}
          >
            {isRunning ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex gap-6 items-start flex-col sm:flex-row">
        {/* Grid */}
        <div className="grid grid-cols-5 gap-1 flex-shrink-0">
          {Array.from({ length: GRID_SIZE }, (_, r) =>
            Array.from({ length: GRID_SIZE }, (_, c) => {
              const type = getCellType(r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center text-lg transition-all duration-300 ${CELL_STYLES[type]}`}
                >
                  {CELL_CONTENT[type]}
                </div>
              );
            }),
          )}
        </div>

        {/* Controls & Stats */}
        <div className="flex-1 space-y-3 w-full">
          <div className="grid grid-cols-3 gap-1 w-fit mx-auto sm:mx-0">
            <div />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => move("up")}
              disabled={controlsDisabled}
              className="h-8 w-8 p-0"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <div />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => move("left")}
              disabled={controlsDisabled}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="h-8 w-8" />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => move("right")}
              disabled={controlsDisabled}
              className="h-8 w-8 p-0"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => move("down")}
              disabled={controlsDisabled}
              className="h-8 w-8 p-0"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <div />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-muted/20 border border-border/30 text-center">
              <p className="text-muted-foreground">Шагов</p>
              <p className="font-mono font-bold text-foreground">{steps}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/20 border border-border/30 text-center">
              <p className="text-muted-foreground">Награда</p>
              <p
                className={`font-mono font-bold ${totalReward >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {totalReward > 0 ? "+" : ""}
                {totalReward}
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                История:
              </p>
              {history.map((h, i) => (
                <p
                  key={i}
                  className="text-xs font-mono text-muted-foreground/70"
                >
                  {h}
                </p>
              ))}
            </div>
          )}

          {gameOver && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
              <p className="text-sm font-semibold text-green-400">
                Цель достигнута!
              </p>
              <p className="text-xs text-muted-foreground">
                Итог: {totalReward} за {steps} шагов
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
        <span>{CELL_CONTENT.agent} Агент</span>
        <span>{CELL_CONTENT.goal} Цель (+10)</span>
        <span>{CELL_CONTENT.trap} Ловушка (-5)</span>
        <span>{CELL_CONTENT.wall} Стена</span>
        <span>{CELL_CONTENT.visited} Посещено (-1/шаг)</span>
      </div>
    </div>
  );
};

export default MiniGridWorld;
