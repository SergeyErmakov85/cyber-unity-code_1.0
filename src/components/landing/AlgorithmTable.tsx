import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const algorithms = [
  {
    name: "DQN",
    type: "Off-policy",
    actions: "Дискретные",
    complexity: "Средняя",
    stability: "Средняя",
    speed: "Быстрая",
    usage: "Atari, настольные игры",
    href: "/algorithms/dqn",
    desc: "Deep Q-Network — классический алгоритм, обучающий Q-функцию нейросетью. Идеален для сред с дискретным набором действий.",
    color: "text-primary",
  },
  {
    name: "PPO",
    type: "On-policy",
    actions: "Оба типа",
    complexity: "Низкая",
    stability: "Высокая",
    speed: "Средняя",
    usage: "Универсальный, Unity ML-Agents",
    href: "/algorithms/ppo",
    desc: "Proximal Policy Optimization — самый популярный алгоритм для игровых сред. Стабильный, простой в настройке, подходит для большинства задач.",
    color: "text-secondary",
  },
  {
    name: "SAC",
    type: "Off-policy",
    actions: "Непрерывные",
    complexity: "Высокая",
    stability: "Высокая",
    speed: "Быстрая",
    usage: "Робототехника, управление",
    href: "/algorithms/sac",
    desc: "Soft Actor-Critic — лучший выбор для непрерывных действий. Максимизирует награду и энтропию одновременно для лучшей exploration.",
    color: "text-accent",
  },
  {
    name: "MA-POCA",
    type: "On-policy",
    actions: "Оба типа",
    complexity: "Высокая",
    stability: "Средняя",
    speed: "Медленная",
    usage: "Кооперативные мультиагентные игры",
    href: "/blog/mapoca-guide",
    desc: "Multi-Agent POsthumous Credit Assignment — алгоритм Unity для кооперативного обучения нескольких агентов с общей наградой.",
    color: "text-green-400",
  },
];

const stabilityColor = (s: string) => {
  if (s === "Высокая") return "bg-green-500/20 text-green-400 border-green-500/30";
  if (s === "Средняя") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
};

const AlgorithmTable = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6">
        Сравнение алгоритмов
      </h3>
      <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-primary font-semibold">Алгоритм</TableHead>
              <TableHead className="text-muted-foreground">Тип</TableHead>
              <TableHead className="text-muted-foreground">Действия</TableHead>
              <TableHead className="text-muted-foreground">Сложность</TableHead>
              <TableHead className="text-muted-foreground">Стабильность</TableHead>
              <TableHead className="text-muted-foreground">Скорость</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Применение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {algorithms.map((alg) => (
              <Tooltip key={alg.name}>
                <TooltipTrigger asChild>
                  <TableRow
                    className="border-border/30 cursor-pointer hover:bg-primary/5 hover:shadow-[inset_0_0_30px_hsl(var(--primary)/0.05)] transition-all duration-300"
                    onClick={() => navigate(alg.href)}
                  >
                    <TableCell className={`font-bold ${alg.color}`}>{alg.name}</TableCell>
                    <TableCell className="text-foreground text-sm">{alg.type}</TableCell>
                    <TableCell className="text-foreground text-sm">{alg.actions}</TableCell>
                    <TableCell className="text-foreground text-sm">{alg.complexity}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${stabilityColor(alg.stability)}`}>
                        {alg.stability}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground text-sm">{alg.speed}</TableCell>
                    <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">{alg.usage}</TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-card border-primary/30 text-foreground">
                  <p className="text-sm">{alg.desc}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Нажмите на строку для перехода к подробному разбору алгоритма
      </p>
    </div>
  );
};

export default AlgorithmTable;
