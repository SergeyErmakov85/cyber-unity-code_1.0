import { useState } from "react";
import { Code2, Gamepad2, LineChart, BookOpen, Layers, Cpu, FileCode2 } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "PyTorch RL",
    description: "Полные реализации DQN, PPO, SAC с нуля. Чистый код с подробными комментариями и объяснениями каждого шага",
    hsl: "0, 70%, 65%",
  },
  {
    icon: Gamepad2,
    title: "Unity ML-Agents",
    description: "Готовые проекты для Unity с настроенными средами. Обучайте агентов в 3D-играх и наблюдайте результаты",
    hsl: "35, 85%, 60%",
  },
  {
    icon: LineChart,
    title: "Визуализация",
    description: "Интерактивные графики и анимации, объясняющие функции потерь, градиенты и оптимизацию",
    hsl: "70, 60%, 55%",
  },
  {
    icon: Cpu,
    title: "Оптимизация",
    description: "Параллельные среды, GPU-обучение, гиперпараметры. Эффективное использование ресурсов",
    hsl: "160, 55%, 50%",
  },
  {
    icon: BookOpen,
    title: "Проекты",
    description: "От простых задач до сложных игровых сценариев. Каждый проект — законченное решение с документацией",
    hsl: "210, 70%, 65%",
  },
  {
    icon: Layers,
    title: "Архитектура",
    description: "Переиспользуемые компоненты: буферы опыта, нейросети, функции вознаграждения",
    hsl: "280, 55%, 65%",
  },
];

const centerFeature = {
  icon: FileCode2,
  title: "Jupyter",
  description: "Рабочие .ipynb-файлы: Taxi-v3, FoodCollector REINFORCE. Скачай — запусти — получи результат",
  hsl: "142, 60%, 50%",
};

const getCirclePosition = (index: number, radius: number) => {
  const angle = (index * 60 - 90) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

// Tooltip placement per circle index (pointing away from center)
const getTooltipStyle = (index: number): React.CSSProperties => {
  const placements: Record<number, React.CSSProperties> = {
    0: { bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" },        // top
    1: { left: "calc(100% + 12px)", top: "0" },                                              // top-right
    2: { left: "calc(100% + 12px)", bottom: "0" },                                           // bottom-right
    3: { top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" },             // bottom
    4: { right: "calc(100% + 12px)", bottom: "0" },                                          // bottom-left
    5: { right: "calc(100% + 12px)", top: "0" },                                             // top-left
    6: { top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" },             // center
  };
  return placements[index] || {};
};

const FeaturesSection = () => {
  const [active, setActive] = useState<number | null>(null);

  const CenterIcon = centerFeature.icon;
  const circleSize = 260;
  const centerSize = 160;
  const orbitRadius = 165;

  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Что включает </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">платформа?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Всё необходимое для освоения Reinforcement Learning
          </p>
        </div>

        {/* Desktop: Flower layout */}
        <div className="hidden sm:flex justify-center">
          <div className="relative" style={{ width: 640, height: 600 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const pos = getCirclePosition(index, orbitRadius);
              const isActive = active === index;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    left: `calc(50% + ${pos.x}px - ${circleSize / 2}px)`,
                    top: `calc(50% + ${pos.y}px - ${circleSize / 2}px)`,
                    zIndex: isActive ? 30 : 10,
                  }}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div
                    className="w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 border-2"
                    style={{
                      background: isActive
                        ? `hsla(${feature.hsl}, 0.35)`
                        : `hsla(${feature.hsl}, 0.15)`,
                      borderColor: isActive
                        ? `hsla(${feature.hsl}, 0.8)`
                        : `hsla(${feature.hsl}, 0.4)`,
                      boxShadow: isActive
                        ? `0 0 50px hsla(${feature.hsl}, 0.4), inset 0 0 30px hsla(${feature.hsl}, 0.1)`
                        : `0 0 15px hsla(${feature.hsl}, 0.1)`,
                      transform: isActive ? "scale(1.06)" : "scale(1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon
                      className="w-8 h-8 mb-2 transition-all duration-300"
                      style={{
                        color: `hsl(${feature.hsl})`,
                        filter: isActive ? `drop-shadow(0 0 10px hsla(${feature.hsl}, 0.7))` : "none",
                      }}
                    />
                    <span
                      className="text-sm font-bold"
                      style={{ color: `hsl(${feature.hsl})` }}
                    >
                      {feature.title}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute pointer-events-none transition-all duration-300"
                    style={{
                      ...getTooltipStyle(index),
                      opacity: isActive ? 1 : 0,
                      width: 220,
                    }}
                  >
                    <div
                      className="rounded-xl p-4 border-2 backdrop-blur-md"
                      style={{
                        background: `hsla(${feature.hsl}, 0.12)`,
                        borderColor: `hsla(${feature.hsl}, 0.5)`,
                        boxShadow: `0 0 25px hsla(${feature.hsl}, 0.2)`,
                      }}
                    >
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div
              className="absolute"
              style={{
                width: centerSize,
                height: centerSize,
                left: `calc(50% - ${centerSize / 2}px)`,
                top: `calc(50% - ${centerSize / 2}px)`,
                zIndex: active === 6 ? 30 : 5,
              }}
              onMouseEnter={() => setActive(6)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 border-2"
                style={{
                  background: active === 6
                    ? `hsla(${centerFeature.hsl}, 0.35)`
                    : `hsla(${centerFeature.hsl}, 0.12)`,
                  borderColor: active === 6
                    ? `hsla(${centerFeature.hsl}, 0.8)`
                    : `hsla(${centerFeature.hsl}, 0.4)`,
                  boxShadow: active === 6
                    ? `0 0 50px hsla(${centerFeature.hsl}, 0.4), inset 0 0 20px hsla(${centerFeature.hsl}, 0.1)`
                    : `0 0 10px hsla(${centerFeature.hsl}, 0.1)`,
                  transform: active === 6 ? "scale(1.1)" : "scale(1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CenterIcon
                  className="w-7 h-7 mb-1"
                  style={{
                    color: `hsl(${centerFeature.hsl})`,
                    filter: active === 6 ? `drop-shadow(0 0 10px hsla(${centerFeature.hsl}, 0.7))` : "none",
                  }}
                />
                <span className="text-xs font-bold" style={{ color: `hsl(${centerFeature.hsl})` }}>
                  {centerFeature.title}
                </span>
              </div>

              {/* Center tooltip */}
              <div
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                  ...getTooltipStyle(6),
                  opacity: active === 6 ? 1 : 0,
                  width: 220,
                }}
              >
                <div
                  className="rounded-xl p-4 border-2 backdrop-blur-md"
                  style={{
                    background: `hsla(${centerFeature.hsl}, 0.12)`,
                    borderColor: `hsla(${centerFeature.hsl}, 0.5)`,
                    boxShadow: `0 0 25px hsla(${centerFeature.hsl}, 0.2)`,
                  }}
                >
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {centerFeature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Grid */}
        <div className="sm:hidden grid grid-cols-2 gap-4">
          {[...features, { ...centerFeature, title: centerFeature.title }].map((feature, index) => {
            const Icon = feature.icon;
            const hsl = feature.hsl;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300 ${index === 6 ? "col-span-2" : ""}`}
                style={{
                  background: `hsla(${hsl}, 0.1)`,
                  borderColor: `hsla(${hsl}, 0.3)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                  style={{ background: `hsla(${hsl}, 0.2)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: `hsl(${hsl})` }} />
                </div>
                <span className="text-sm font-bold text-foreground mb-1">{feature.title}</span>
                <span className="text-xs text-muted-foreground leading-snug">{feature.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
