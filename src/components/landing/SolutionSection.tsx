import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Code2, Gamepad2, CheckCircle2, Trophy } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="solution" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Наше решение</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Мост между теорией и практикой
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Платформа, которая связывает математику, код и реальные игровые среды
          </p>
        </div>

        {/* Solution Flow */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
            {/* Math Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow-cyan group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Теория и математика</h3>
                <p className="text-sm text-muted-foreground">
                  Визуализация формул и интуитивные объяснения алгоритмов
                </p>
              </CardContent>
            </Card>

            {/* Arrow for desktop */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary animate-glow-pulse" />
            </div>

            {/* Code Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:shadow-glow-purple group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Код на PyTorch</h3>
                <p className="text-sm text-muted-foreground">
                  Чистые реализации алгоритмов с подробными комментариями
                </p>
              </CardContent>
            </Card>

            {/* Arrow for desktop */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-secondary animate-glow-pulse animation-delay-300" />
            </div>

            {/* Game Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-glow-pink group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-pink group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Игровые среды Unity</h3>
                <p className="text-sm text-muted-foreground">
                  Обучение агентов в реальных 3D-окружениях
                </p>
              </CardContent>
            </Card>

            {/* Arrow for desktop */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-accent animate-glow-pulse animation-delay-600" />
            </div>

            {/* Results Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:shadow-[0_0_20px_hsl(142_76%_36%/0.3)] group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-[0_0_15px_hsl(142_76%_36%/0.4)] group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Реальные результаты</h3>
                <p className="text-sm text-muted-foreground">
                  Работающие агенты и портфолио проектов
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
