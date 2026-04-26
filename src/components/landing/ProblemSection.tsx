import { BookX, Unlink, Brain, AlertTriangle, FileX } from "lucide-react";
import { useState } from "react";

const problems = [
  {
    icon: BookX,
    title: "Слишком много сухой теории",
    description: "Учебники переполнены формулами и математикой, но не объясняют, как применить их на практике",
    color: { border: "rgba(251,191,36,0.35)", glow: "rgba(251,191,36,0.25)", bg: "rgba(251,191,36,0.08)", icon: "#fbbf24", title: "#fde68a" },
  },
  {
    icon: Unlink,
    title: "Код оторван от результатов",
    description: "Вы пишете код, но не видите, как он влияет на поведение агента в реальной среде",
    color: { border: "rgba(251,146,60,0.35)", glow: "rgba(251,146,60,0.25)", bg: "rgba(251,146,60,0.08)", icon: "#fb923c", title: "#fed7aa" },
  },
  {
    icon: Brain,
    title: "Сложность алгоритмов",
    description: "PPO, SAC, DQN — аббревиатуры путают, а реализации кажутся недоступными",
    color: { border: "rgba(245,158,11,0.35)", glow: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.08)", icon: "#f59e0b", title: "#fde68a" },
  },
  {
    icon: AlertTriangle,
    title: "Отсутствие практики",
    description: "Нет пошаговых проектов, где можно увидеть результат своего обучения",
    color: { border: "rgba(248,113,113,0.35)", glow: "rgba(248,113,113,0.25)", bg: "rgba(248,113,113,0.08)", icon: "#f87171", title: "#fecaca" },
  },
  {
    icon: FileX,
    title: "Нет реального кода",
    description: "Туториалы показывают теорию, но готовый воспроизводимый код для Unity ML-Agents с PyTorch найти сложно.",
    color: { border: "rgba(234,88,12,0.35)", glow: "rgba(234,88,12,0.25)", bg: "rgba(234,88,12,0.08)", icon: "#ea580c", title: "#fdba74" },
  },
];

const PuzzlePiece = ({ problem, index }: { problem: (typeof problems)[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = problem.icon;
  const c = problem.color;

  // Each piece gets a subtle unique sway animation
  const swayClass = index % 2 === 0 ? "animate-[sway_4s_ease-in-out_infinite]" : "animate-[sway-alt_5s_ease-in-out_infinite]";
  const delay = `${index * 0.4}s`;

  return (
    <div
      className={`relative group cursor-default transition-all duration-400 ease-out ${swayClass}`}
      style={{
        animationDelay: delay,
        transform: hovered ? "rotate(0deg) scale(1.02)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-2xl border backdrop-blur-sm p-6 md:p-7 h-full transition-all duration-400"
        style={{
          borderColor: hovered ? c.border.replace("0.35", "0.6") : c.border,
          backgroundColor: c.bg,
          boxShadow: hovered ? `0 0 35px ${c.glow}, inset 0 1px 0 ${c.border}` : `inset 0 1px 0 ${c.border}`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: c.bg.replace("0.08", "0.15") }}
          >
            <Icon className="w-5 h-5" style={{ color: c.icon }} />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className="text-base md:text-lg font-bold" style={{ color: c.title }}>
              {problem.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 px-4 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, hsl(20 20% 7%), hsl(var(--background)))" }}>
      {/* Keyframes for sway */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
        @keyframes sway-alt {
          0%, 100% { transform: rotate(0.4deg); }
          50% { transform: rotate(-0.4deg); }
        }
      `}</style>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.6), transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">Знакомые проблемы?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему изучение </span>
            <span className="text-destructive">RL так сложно?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Многие разработчики сталкиваются с одними и теми же препятствиями
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
            <PuzzlePiece problem={problems[0]} index={0} />
            <PuzzlePiece problem={problems[1]} index={1} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
            <PuzzlePiece problem={problems[2]} index={2} />
            <PuzzlePiece problem={problems[3]} index={3} />
          </div>
          <div className="max-w-lg mx-auto">
            <PuzzlePiece problem={problems[4]} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
