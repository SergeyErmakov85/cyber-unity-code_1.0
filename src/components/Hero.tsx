import { Button } from "@/components/ui/button";
import { Brain, Zap, Code } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Unity ML-Agents Hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#00f0ff20_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff20_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Icon Row */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 shadow-glow-cyan animate-glow-pulse">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-secondary/20 shadow-glow-purple animate-glow-pulse animation-delay-300">
              <Zap className="w-8 h-8 text-secondary" />
            </div>
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-accent/20 shadow-glow-pink animate-glow-pulse animation-delay-600">
              <Code className="w-8 h-8 text-accent" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Unity ML-Agents
            </span>
            <br />
            <span className="text-foreground">Обучение</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Научитесь создавать интеллектуальных агентов для Unity с помощью
            машинного обучения. Простые примеры, понятные объяснения.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" variant="cyber" className="text-lg">
              Начать обучение
            </Button>
            <Link to="/code-examples">
              <Button size="lg" variant="outline" className="text-lg">
                Примеры кода
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Уроков</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Примеров</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Бесплатно</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
};

export default Hero;
