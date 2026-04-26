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
    border: "border-primary/20",
    activeBorder: "border-primary/60",
    text: "text-primary",
    bg: "bg-primary/5",
    activeBg: "bg-primary/10",
    line: "bg-primary/40",
  },
  secondary: {
    number: "text-secondary",
    border: "border-secondary/20",
    activeBorder: "border-secondary/60",
    text: "text-secondary",
    bg: "bg-secondary/5",
    activeBg: "bg-secondary/10",
    line: "bg-secondary/40",
  },
  accent: {
    number: "text-accent",
    border: "border-accent/20",
    activeBorder: "border-accent/60",
    text: "text-accent",
    bg: "bg-accent/5",
    activeBg: "bg-accent/10",
    line: "bg-accent/40",
  },
};

const UniqueValueSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              именно мы?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Уникальные преимущества нашей платформы
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colors = colorConfig[value.color];
            const isOpen = openIndex === index;

            return (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < values.length - 1 && (
                  <div className={`absolute left-6 top-full w-px h-0 ${colors.line} z-0`} 
                       style={{ height: '1px' }} />
                )}

                <div
                  onMouseEnter={() => setOpenIndex(index)}
                  onMouseLeave={() => setOpenIndex(null)}
                  className={`w-full text-left transition-all duration-300 border-b cursor-default ${
                    isOpen ? colors.activeBorder : 'border-border/30'
                  } ${isOpen ? colors.activeBg : 'hover:bg-muted/30'}`}
                >
                  <div className="flex items-center gap-5 py-5 px-4 md:px-6">
                    {/* Number */}
                    <span className={`text-sm font-mono font-bold ${colors.number} opacity-60 min-w-[2rem] text-right`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground flex-1">
                      {value.title}
                    </h3>

                    {/* Chevron */}
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expandable description */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed px-4 md:px-6 pb-5 pl-[5.75rem]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UniqueValueSection;
