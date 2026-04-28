import { useState } from "react";
import { FlaskConical, Gamepad2, GraduationCap, Repeat, Eye, Zap, ChevronDown } from "lucide-react";

const values = [
  {
    icon: Repeat,
    title: "Воспроизводимые эксперименты",
    description: "Каждый проект включает фиксированные seed-значения, версии зависимостей и детальные инструкции. Получите те же результаты, что и в примерах",
    color: "primary" as const,
  },
  {
    icon: Gamepad2,
    title: "Реальные игровые среды",
    description: "Не абстрактные задачи, а полноценные Unity-проекты. Обучайте агентов в 3D-мирах с физикой, визуализацией и интерактивностью",
    color: "secondary" as const,
  },
  {
    icon: FlaskConical,
    title: "Научный подход",
    description: "Следуем лучшим практикам из исследований. Алгоритмы реализованы согласно оригинальным статьям с понятными объяснениями",
    color: "accent" as const,
  },
  {
    icon: Eye,
    title: "Визуализация обучения",
    description: "Наблюдайте за процессом в реальном времени. Графики наград, траектории агентов, распределения действий — всё визуализировано",
    color: "primary" as const,
  },
  {
    icon: GraduationCap,
    title: "От основ до продвинутого",
    description: "Структурированная программа обучения. Начните с базовых концепций и дойдите до state-of-the-art алгоритмов",
    color: "secondary" as const,
  },
  {
    icon: Zap,
    title: "Практика с первого дня",
    description: "Никакой месячной подготовки. Запустите первого агента в первый же день обучения и сразу увидите результаты",
    color: "accent" as const,
  },
];

const colorConfig = {
  primary: {
    number: "text-primary",
    text: "text-primary",
    stroke: "hsl(var(--primary))",
    glow: "hsla(var(--primary), 0.35)",
    fill: "hsla(var(--primary), 0.05)",
    fillActive: "hsla(var(--primary), 0.12)",
  },
  secondary: {
    number: "text-secondary",
    text: "text-secondary",
    stroke: "hsl(var(--secondary))",
    glow: "hsla(var(--secondary), 0.35)",
    fill: "hsla(var(--secondary), 0.05)",
    fillActive: "hsla(var(--secondary), 0.12)",
  },
  accent: {
    number: "text-accent",
    text: "text-accent",
    stroke: "hsl(var(--accent))",
    glow: "hsla(var(--accent), 0.35)",
    fill: "hsla(var(--accent), 0.05)",
    fillActive: "hsla(var(--accent), 0.12)",
  },
};

// Trapezoid shapes per position (top row leans inward to center, bottom row mirrors)
// Indices: 0=top-left, 1=top-center, 2=top-right, 3=bottom-right, 4=bottom-center, 5=bottom-left
const shapes = [
  // Top-left: wider at bottom-left, leans toward top-right (down to center)
  "polygon(0% 30%, 85% 0%, 100% 100%, 15% 100%)",
  // Top-center: trapezoid, narrower at top
  "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
  // Top-right: mirror of top-left
  "polygon(15% 0%, 100% 30%, 85% 100%, 0% 100%)",
  // Bottom-right: wider at top-right, leans down-left
  "polygon(0% 0%, 100% 0%, 85% 70%, 15% 100%)",
  // Bottom-center: inverted trapezoid
  "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)",
  // Bottom-left: mirror of bottom-right
  "polygon(0% 0%, 100% 0%, 100% 100%, 15% 70%)",
];

const UniqueValueSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Reorder for visual hex layout: row1 = [0,1,2], row2 = [5,4,3] (per reference)
  const rowTop = [values[0], values[1], values[2]];
  const rowBottom = [values[5], values[4], values[3]];
  const idxTop = [0, 1, 2];
  const idxBottom = [5, 4, 3];
  const shapeTop = [shapes[0], shapes[1], shapes[2]];
  const shapeBottom = [shapes[5], shapes[4], shapes[3]];

  const renderCell = (value: typeof values[number], realIdx: number, shape: string) => {
    const Icon = value.icon;
    const colors = colorConfig[value.color];
    const isOpen = openIndex === realIdx;

    return (
      <div
        key={realIdx}
        className="relative cursor-pointer group"
        style={{ aspectRatio: "16 / 10" }}
        onMouseEnter={() => setOpenIndex(realIdx)}
        onMouseLeave={() => setOpenIndex(null)}
      >
        {/* Hex shape with neon border via filter */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            clipPath: shape,
            background: isOpen ? colors.fillActive : colors.fill,
            filter: isOpen
              ? `drop-shadow(0 0 12px ${colors.glow}) drop-shadow(0 0 24px ${colors.glow})`
              : `drop-shadow(0 0 6px ${colors.glow})`,
          }}
        />
        {/* Stroke layer: a slightly inset shape with a colored bg, masked by inner shape */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            clipPath: shape,
            background: colors.stroke,
            opacity: isOpen ? 0.9 : 0.6,
            padding: "1.5px",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              clipPath: shape,
              background: "hsl(var(--background))",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 min-w-0">
              <div className={`text-sm font-mono font-bold ${colors.number} opacity-80`}>
                {String(realIdx + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base md:text-lg font-bold text-foreground leading-tight">
                {value.title}
              </h3>
            </div>
            <Icon
              className={`w-7 h-7 md:w-8 md:h-8 ${colors.text} shrink-0 transition-transform duration-300 ${
                isOpen ? "scale-110" : ""
              }`}
              style={{
                filter: isOpen ? `drop-shadow(0 0 8px ${colors.glow})` : "none",
              }}
            />
          </div>

          <div className="flex items-end justify-between gap-3">
            <p
              className={`text-xs md:text-sm text-muted-foreground leading-relaxed transition-all duration-300 ${
                isOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              {value.description}
            </p>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground/60 shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему именно </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              эта платформа?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Уникальные преимущества нашей платформы
          </p>
        </div>

        {/* Desktop: hex composition */}
        <div className="hidden md:block max-w-6xl mx-auto space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {rowTop.map((v, i) => renderCell(v, idxTop[i], shapeTop[i]))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {rowBottom.map((v, i) => renderCell(v, idxBottom[i], shapeBottom[i]))}
          </div>
        </div>

        {/* Mobile: simple stack */}
        <div className="md:hidden max-w-md mx-auto space-y-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colors = colorConfig[value.color];
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="border rounded-lg p-4 transition-colors"
                style={{
                  borderColor: isOpen ? colors.stroke : "hsl(var(--border))",
                  background: isOpen ? colors.fillActive : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold ${colors.number} opacity-70`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="text-sm font-bold text-foreground flex-1">{value.title}</h3>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                    {value.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UniqueValueSection;
