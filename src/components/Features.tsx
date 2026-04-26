import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Cpu, GitBranch, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Пошаговые уроки",
    description: "Структурированные материалы от базовых концепций до продвинутых техник",
    color: "primary",
  },
  {
    icon: Target,
    title: "Практические примеры",
    description: "Реальные проекты с готовым кодом и подробными комментариями",
    color: "secondary",
  },
  {
    icon: Cpu,
    title: "ML алгоритмы",
    description: "Изучите PPO, SAC, POCA и другие алгоритмы машинного обучения",
    color: "accent",
  },
  {
    icon: GitBranch,
    title: "Готовые решения",
    description: "Скачивайте готовые проекты и адаптируйте под свои задачи",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "Визуализация",
    description: "Понимайте процесс обучения через интерактивные графики",
    color: "secondary",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Общайтесь с другими разработчиками и делитесь опытом",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Почему </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              выбирают нас?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Все необходимое для создания умных агентов в Unity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-cyan hover:-translate-y-2"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-glow-${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
