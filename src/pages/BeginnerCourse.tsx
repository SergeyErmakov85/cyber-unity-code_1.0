import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bot, Globe, Trophy, Brain, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import LessonBreadcrumbs from "@/components/LessonBreadcrumbs";
import SEOHead from "@/components/SEOHead";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "sonner";

const concepts = [
  { icon: Bot, title: "Агент (Agent)", desc: "Принимает решения на основе наблюдений" },
  { icon: Globe, title: "Среда (Environment)", desc: "Мир, в котором действует агент" },
  { icon: Trophy, title: "Награда (Reward)", desc: "Числовой сигнал качества действия" },
  { icon: Brain, title: "Политика (Policy)", desc: "Стратегия выбора действий агентом" },
];

const codeSnippet = `import gym
import torch

env = gym.make('CartPole-v1')
obs, _ = env.reset(seed=42)

for step in range(200):
    action = env.action_space.sample()  # случайная политика
    obs, reward, done, truncated, info = env.step(action)
    print(f"Шаг {step}: награда={reward:.1f}, done={done}")
    if done or truncated:
        obs, _ = env.reset()
env.close()`;

const quizData = [
  {
    question: "Что такое политика (Policy) в RL?",
    options: ["Функция ошибки", "Стратегия выбора действий", "Среда симуляции", "Оценка наград"],
    correct: 1,
  },
  {
    question: "Какой сигнал агент получает от среды после каждого действия?",
    options: ["Градиент", "Потеря", "Награда", "Веса сети"],
    correct: 2,
  },
  {
    question: "Что означает seed=42 в коде?",
    options: ["Скорость обучения", "Воспроизводимость результатов", "Число эпизодов", "Размер батча"],
    correct: 1,
  },
];

const breadcrumbItems = [
  { label: "Курсы", href: "/courses" },
  { label: "Уровень 1", href: "/courses" },
  { label: "Урок 1.1" },
];

const BeginnerCourse = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    toast.success("Код скопирован!");
  };

  const handleCheck = () => {
    setChecked(true);
    const correct = quizData.every((q, i) => answers[i] === String(q.correct));
    if (correct) toast.success("Все ответы верны! 🎉");
    else toast.error("Есть ошибки — попробуй ещё раз");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Урок 1.1: Что такое Reinforcement Learning? | RL Platform"
        description="Первый урок курса по Reinforcement Learning: ключевые концепции, код CartPole и тест."
        path="/beginner-course"
      />
      <ScrollProgressBar />
      <ScrollToTop />

      {/* Sticky header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Курсы</span>
          </Link>
          <span className="text-border">|</span>
          <span className="text-sm text-muted-foreground">Урок 1.1</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Breadcrumbs */}
        <LessonBreadcrumbs items={breadcrumbItems} />

        {/* 1. HEADER */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-green-500/20 text-green-400 border-green-500/30">FREE</span>
            <span className="text-xs text-muted-foreground">⏱ 20 мин</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">#theory</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">#pytorch</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-muted-foreground font-normal text-2xl md:text-3xl">1.1. </span>
            Что такое Reinforcement Learning?
          </h1>
          <img
            src="/images/rl-cycle-infographic.png"
            alt="Цикл обучения с подкреплением: Агент, Среда, Действие, Вознаграждение, Состояние, Политика"
            className="w-full max-w-2xl mx-auto rounded-xl border border-border/50 shadow-lg mt-4"
          />
        </div>

        {/* 2. PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Урок 1 из 4</span>
            <span>25%</span>
          </div>
          <Progress value={25} className="h-1.5 bg-muted" />
        </div>

        {/* 3. THEORY — Concept Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Ключевые концепции</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {concepts.map((c) => (
              <Card key={c.title} className="bg-card border-l-2 border-l-primary border-border/50 p-4 flex items-start gap-3">
                <c.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. CODE BLOCK */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Минимальная среда CartPole на Python</h2>
          <div className="relative rounded-lg border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/30">
              <span className="text-xs text-muted-foreground font-mono">python</span>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-primary" onClick={handleCopy}>
                <Copy className="w-3 h-3" /> Копировать
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code className="font-mono text-foreground/90">{codeSnippet}</code>
            </pre>
          </div>
          <a
            href="https://colab.research.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.941 4.976a7.033 7.033 0 0 0-4.93 2.064 7.033 7.033 0 0 0-.124 9.807l2.395-2.395a3.646 3.646 0 0 1 5.15-5.148l2.397-2.399a7.033 7.033 0 0 0-4.888-1.93z" />
              <path d="M7.074 4.976a7.033 7.033 0 0 0-4.888 1.93l2.397 2.398a3.646 3.646 0 0 1 5.15 5.149l2.395 2.395a7.033 7.033 0 0 0-.124-9.808 7.033 7.033 0 0 0-4.93-2.064z" />
              <path d="M7.074 19.024a7.033 7.033 0 0 0 4.93-2.064l-2.395-2.395a3.646 3.646 0 0 1-5.15-5.149L2.063 7.019A7.033 7.033 0 0 0 7.074 19.024z" />
            </svg>
            Открыть в Google Colab
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* 5. QUIZ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Проверь себя</h2>
          <div className="space-y-6">
            {quizData.map((q, qi) => {
              const isCorrect = checked && answers[qi] === String(q.correct);
              const isWrong = checked && answers[qi] !== undefined && answers[qi] !== String(q.correct);
              return (
                <Card key={qi} className={`p-5 bg-card border-border/50 ${isCorrect ? "border-green-500/50" : isWrong ? "border-destructive/50" : ""}`}>
                  <p className="font-medium text-foreground text-sm mb-3">
                    {qi + 1}. {q.question}
                  </p>
                  <RadioGroup value={answers[qi] ?? ""} onValueChange={(v) => { setChecked(false); setAnswers((p) => ({ ...p, [qi]: v })); }}>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2 py-1">
                        <RadioGroupItem value={String(oi)} id={`q${qi}-o${oi}`} />
                        <Label htmlFor={`q${qi}-o${oi}`} className="text-sm text-muted-foreground cursor-pointer">
                          {opt}
                        </Label>
                        {checked && oi === q.correct && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                      </div>
                    ))}
                  </RadioGroup>
                </Card>
              );
            })}
          </div>
          <Button className="mt-4" onClick={handleCheck} disabled={Object.keys(answers).length < quizData.length}>
            Проверить
          </Button>
        </section>

        {/* 6. NAVIGATION FOOTER */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <Button variant="outline" asChild>
            <Link to="/courses" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              На карту обучения
            </Link>
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button variant="default" disabled className="flex items-center gap-2">
                  Следующий урок
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Скоро: Установка PyTorch + Unity</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default BeginnerCourse;
