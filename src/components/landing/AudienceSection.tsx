import { Gamepad2, GraduationCap, Cpu, FlaskConical, Star } from "lucide-react";

const audiences = [
  {
    icon: Gamepad2,
    title: "Разработчики игр",
    description: "Умные NPC и адаптивный геймплей в Unity-проектах",
    color: "secondary" as const,
    isPrimary: true,
    benefits: ["Unity-проекты", "ML-Agents", "Игровые среды"],
    position: "top" as const,
  },
  {
    icon: Cpu,
    title: "AI-инженеры",
    description: "PPO, SAC с чистыми реализациями на PyTorch",
    color: "accent" as const,
    isPrimary: false,
    benefits: ["Алгоритмы", "Чистый код", "Best practices"],
    position: "right" as const,
  },
  {
    icon: FlaskConical,
    title: "Исследователи",
    description: "Воспроизводимые эксперименты и модульная архитектура",
    color: "warning" as const,
    isPrimary: false,
    benefits: ["Воспроизводимость", "Модульность", "Эксперименты"],
    position: "bottom" as const,
  },
  {
    icon: GraduationCap,
    title: "Студенты",
    description: "Практические навыки RL для курсовых и портфолио",
    color: "info" as const,
    isPrimary: false,
    benefits: ["Пошагово", "Теория + практика", "Примеры"],
    position: "left" as const,
  },
];

const colorMap = {
  secondary: {
    border: "border-secondary/40",
    text: "text-secondary",
    bg: "bg-secondary/10",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    line: "from-secondary/60",
  },
  accent: {
    border: "border-accent/40",
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    line: "from-accent/60",
  },
  warning: {
    border: "border-[hsl(45,90%,55%)]/40",
    text: "text-[hsl(45,90%,55%)]",
    bg: "bg-[hsl(45,90%,55%)]/10",
    glow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    line: "from-[hsl(45,90%,55%)]/60",
  },
  info: {
    border: "border-[hsl(210,90%,60%)]/40",
    text: "text-[hsl(210,90%,60%)]",
    bg: "bg-[hsl(210,90%,60%)]/10",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    line: "from-[hsl(210,90%,60%)]/60",
  },
};

/* ── Desktop: diamond pinwheel via CSS clip-path ─────────────── */
const clipPaths: Record<string, string> = {
  top:    "polygon(50% 50%, 0% 0%, 100% 0%)",
  right:  "polygon(50% 50%, 100% 0%, 100% 100%)",
  bottom: "polygon(50% 50%, 100% 100%, 0% 100%)",
  left:   "polygon(50% 50%, 0% 100%, 0% 0%)",
};

/* content anchor positions inside the diamond */
const contentPosition: Record<string, string> = {
  top:    "top-[8%] left-1/2 -translate-x-1/2",
  right:  "top-1/2 right-[8%] -translate-y-1/2 text-right",
  bottom: "bottom-[8%] left-1/2 -translate-x-1/2",
  left:   "top-1/2 left-[8%] -translate-y-1/2 text-left",
};

const AudienceSection = () => {
  return (
    <section id="audience" className="py-20 px-4 relative bg-cyber-darker/50">
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Для кого </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              эта платформа?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Материалы адаптированы для разных уровней и целей
          </p>
        </div>

        {/* ── MOBILE: stacked cards ─────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:hidden max-w-sm mx-auto">
          {audiences.map((a, i) => {
            const c = colorMap[a.color];
            const Icon = a.icon;
            return (
              <div
                key={i}
                className={`relative bg-card/60 backdrop-blur-sm border ${c.border} rounded-xl p-5 ${c.glow} transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{a.title}</h3>
                  {a.isPrimary && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 ml-auto">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-[10px] font-medium text-primary">ЦА</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{a.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.benefits.map((b, bi) => (
                    <span key={bi} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.bg} ${c.text} border ${c.border}`}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: diamond pinwheel ─────────────────────── */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-[560px] h-[560px] lg:w-[640px] lg:h-[640px]">
            {/* Decorative cross lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-border/40 to-transparent" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
              {/* Diagonal lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100" y2="100" stroke="hsl(var(--border))" strokeWidth="0.15" strokeOpacity="0.4" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="hsl(var(--border))" strokeWidth="0.15" strokeOpacity="0.4" />
              </svg>
            </div>

            {/* Diamond outline (rotated square) */}
            <div className="absolute inset-[12%] border border-border/30 rotate-45 rounded-sm" />

            {/* 4 triangular segments */}
            {audiences.map((a, i) => {
              const c = colorMap[a.color];
              const Icon = a.icon;
              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-500 group cursor-default"
                  style={{ clipPath: clipPaths[a.position] }}
                >
                  {/* Background fill on hover */}
                  <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className={`absolute ${contentPosition[a.position]} max-w-[200px] lg:max-w-[220px] z-10`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.bg} border ${c.border} mb-3 ${a.position === 'right' ? 'ml-auto' : a.position === 'left' ? '' : 'mx-auto'}`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground text-center px-[44px]">{a.title}</h3>
                      {a.isPrimary && <Star className="w-3.5 h-3.5 text-primary fill-primary flex-shrink-0 px-0 mx-0 my-0" />}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">{a.description}</p>
                    <div className={`flex flex-wrap gap-1.5 ${a.position === 'right' ? 'justify-end' : a.position === 'left' ? 'justify-start' : 'justify-center'}`}>
                      {a.benefits.map((b, bi) => (
                        <span key={bi} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.bg} ${c.text} border ${c.border}`}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center glow dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/60 shadow-[0_0_20px_rgba(0,212,255,0.4)] z-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
