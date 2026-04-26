import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Rocket, BookOpen, Clock, Target, Sparkles, Code2, Gamepad2, RotateCcw } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

interface QuizStep {
  id: string;
  question: string;
  icon: React.ReactNode;
  options: { value: string; label: string; description: string }[];
}

const steps: QuizStep[] = [
  {
    id: "python",
    question: "Ваш уровень в Python?",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    options: [
      { value: "beginner", label: "Новичок", description: "Только начинаю изучать Python" },
      { value: "basics", label: "Знаю основы", description: "Уверенно пишу скрипты, знаю структуры данных" },
      { value: "confident", label: "Уверенный пользователь", description: "ООП, библиотеки, опыт проектов" },
    ],
  },
  {
    id: "ml",
    question: "Опыт с ML?",
    icon: <Sparkles className="w-6 h-6 text-secondary" />,
    options: [
      { value: "none", label: "Нет", description: "Не сталкивался с машинным обучением" },
      { value: "theory", label: "Читал теорию", description: "Знаю основные концепции, но без практики" },
      { value: "practice", label: "Есть практика", description: "Обучал модели в PyTorch / TensorFlow" },
    ],
  },
  {
    id: "unity",
    question: "Знакомы с Unity?",
    icon: <Gamepad2 className="w-6 h-6 text-accent" />,
    options: [
      { value: "none", label: "Нет", description: "Никогда не работал с Unity" },
      { value: "some", label: "Немного", description: "Создавал простые сцены, знаю основы" },
      { value: "active", label: "Активно использую", description: "Опытный Unity-разработчик" },
    ],
  },
  {
    id: "goal",
    question: "Цель обучения?",
    icon: <Target className="w-6 h-6 text-primary" />,
    options: [
      { value: "theory", label: "Понять теорию RL", description: "Разобраться в основах и математике" },
      { value: "agent", label: "Создать игрового агента", description: "Практика с Unity ML-Agents" },
      { value: "research", label: "Исследовательская работа", description: "Академические цели, публикации" },
    ],
  },
  {
    id: "time",
    question: "Сколько времени в неделю?",
    icon: <Clock className="w-6 h-6 text-secondary" />,
    options: [
      { value: "low", label: "1–2 часа", description: "Учусь в спокойном темпе" },
      { value: "medium", label: "3–5 часов", description: "Стабильные занятия несколько раз в неделю" },
      { value: "high", label: "6+ часов", description: "Интенсивное погружение" },
    ],
  },
];

interface Recommendation {
  title: string;
  level: string;
  description: string;
  firstStepPath: string;
  lessons: { title: string; path: string }[];
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { python, ml, unity, goal } = answers;

  // Research path
  if (goal === "research") {
    return {
      title: "Исследователь RL",
      level: "Math RL + FCA+RL хаб",
      description: "Углублённое изучение математических основ, уравнений Беллмана и формального анализа понятий для структурирования пространства состояний.",
      firstStepPath: "/math-rl",
      lessons: [
        { title: "Математика RL — Модуль 1", path: "/math-rl/module-1" },
        { title: "Математика RL — Модуль 2", path: "/math-rl/module-2" },
        { title: "FCA + RL для NPC", path: "/fca-rl" },
      ],
    };
  }

  // Advanced path: ML practice + Unity experience
  if (ml === "practice" && unity !== "none") {
    return {
      title: "Продвинутый практик",
      level: "Уровень 2 — Продвинутые методы + Алгоритмы",
      description: "Вы уже знакомы с ML и Unity — переходите сразу к продвинутым алгоритмам: Policy Gradient, PPO, непрерывные действия.",
      firstStepPath: "/courses/2-1",
      lessons: [
        { title: "Policy Gradient (REINFORCE)", path: "/courses/2-1" },
        { title: "PPO", path: "/courses/2-2" },
        { title: "Непрерывные действия", path: "/courses/2-3" },
      ],
    };
  }

  // Beginner path: Python < "basics" or default
  if (python === "beginner") {
    return {
      title: "Уверенный старт",
      level: "Уровень 1 — Основы RL + PyTorch Хаб",
      description: "Начните с фундамента: основы Python для ML, введение в RL, первый агент CartPole. Параллельно изучайте PyTorch Хаб.",
      firstStepPath: "/courses/1-1",
      lessons: [
        { title: "Основы Reinforcement Learning", path: "/courses/1-1" },
        { title: "Установка PyTorch + Unity", path: "/courses/1-2" },
        { title: "Первый агент: CartPole", path: "/courses/1-3" },
      ],
    };
  }

  // Default: knows basics, start from level 1 but faster
  return {
    title: "Быстрый старт",
    level: "Уровень 1 — Основы RL",
    description: "У вас есть база — пройдите основы RL в ускоренном темпе и переходите к продвинутым алгоритмам.",
    firstStepPath: "/courses/1-1",
    lessons: [
      { title: "Основы Reinforcement Learning", path: "/courses/1-1" },
      { title: "Базовый DQN", path: "/courses/1-4" },
      { title: "Policy Gradient (REINFORCE)", path: "/courses/2-1" },
    ],
  };
}

function getTimeEstimate(answers: Record<string, string>, level: string): string {
  const time = answers.time;
  const hoursPerWeek = time === "low" ? 1.5 : time === "medium" ? 4 : 7;
  const totalHours = level.includes("Уровень 2") ? 18 : level.includes("Math") ? 20 : 27;
  const weeks = Math.ceil(totalHours / hoursPerWeek);
  return weeks <= 4 ? `~${weeks} недели` : `~${Math.ceil(weeks / 4)} месяца`;
}

const OnboardingQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = showResult ? 100 : ((currentStep + 1) / steps.length) * 100;
  const currentQuestion = steps[currentStep];
  const currentAnswer = answers[currentQuestion?.id];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleStart = (path: string) => {
    localStorage.setItem("rl-onboarding-complete", "true");
    localStorage.setItem("rl-onboarding-answers", JSON.stringify(answers));
    navigate(path);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  const recommendation = showResult ? getRecommendation(answers) : null;
  const timeEstimate = showResult && recommendation ? getTimeEstimate(answers, recommendation.level) : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {showResult ? "Результат" : `Шаг ${currentStep + 1} из ${steps.length}`}
            </span>
            <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>

        {!showResult ? (
          /* Question Card */
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                {currentQuestion.icon}
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {currentQuestion.question}
                </h2>
              </div>

              <RadioGroup
                value={currentAnswer || ""}
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {currentQuestion.options.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      currentAnswer === opt.value
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
                        : "border-border/50 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} className="mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{opt.description}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Назад
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="gap-2 bg-gradient-neon"
                >
                  {currentStep === steps.length - 1 ? "Показать план" : "Далее"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : recommendation ? (
          /* Result Card */
          <Card className="border-primary/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-glow-cyan">
            <div className="h-1.5 bg-gradient-neon" />
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-3">
                <Rocket className="w-14 h-14 text-primary mx-auto animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                  Твой путь обучения
                </h2>
                <p className="text-muted-foreground">{recommendation.title}</p>
              </div>

              <div className="grid gap-4">
                {/* Recommended level */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <BookOpen className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Рекомендованный уровень</div>
                    <div className="font-semibold text-foreground">{recommendation.level}</div>
                  </div>
                </div>

                {/* Time estimate */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                  <Clock className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Ориентировочный срок</div>
                    <div className="font-semibold text-foreground">{timeEstimate}</div>
                  </div>
                </div>

                {/* Focus description */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <Target className="w-8 h-8 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Описание</div>
                    <div className="text-sm text-foreground mt-1">{recommendation.description}</div>
                  </div>
                </div>
              </div>

              {/* First 3 lessons */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Первые 3 урока
                </h3>
                <div className="grid gap-2">
                  {recommendation.lessons.map((lesson, i) => (
                    <Link
                      key={lesson.path}
                      to={lesson.path}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 group-hover:bg-primary/20">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-neon text-lg gap-2"
                  onClick={() => handleStart(recommendation.firstStepPath)}
                >
                  <Rocket className="w-5 h-5" />
                  Начать обучение
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2"
                  onClick={handleRetry}
                >
                  <RotateCcw className="w-4 h-4" /> Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default OnboardingQuiz;
