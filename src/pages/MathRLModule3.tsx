import { useState } from "react";
import HubLessonBadges from "@/components/HubLessonBadges";
import CrossLinkToLesson from "@/components/CrossLinkToLesson";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain, BarChart3, GitBranch, Code2, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const sections = [
  { id: 1, title: "Теория вероятностей", icon: BookOpen, color: "primary" as const },
  { id: 2, title: "Статистика", icon: BarChart3, color: "secondary" as const },
  { id: 3, title: "Марковские процессы", icon: GitBranch, color: "accent" as const },
  { id: 4, title: "Функции ценности и уравнения Беллмана", icon: Brain, color: "primary" as const },
  { id: 5, title: "Алгоритмы RL", icon: Lightbulb, color: "secondary" as const },
  { id: 6, title: "Практические примеры (Python)", icon: Code2, color: "accent" as const },
];

const colorMap = {
  primary: {
    border: "border-primary/30 hover:border-primary/60",
    shadow: "hover:shadow-glow-cyan",
    icon: "text-primary",
    badge: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary/30 hover:border-secondary/60",
    shadow: "hover:shadow-glow-purple",
    icon: "text-secondary",
    badge: "bg-secondary/10 text-secondary",
  },
  accent: {
    border: "border-accent/30 hover:border-accent/60",
    shadow: "hover:shadow-glow-pink",
    icon: "text-accent",
    badge: "bg-accent/10 text-accent",
  },
};

const MathRLModule3 = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          {activeSection !== null ? (
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              К разделам
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/math-rl")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              К модулям
            </Button>
          )}
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">Модуль 3</span>
        </div>
      </div>

      {activeSection === null ? (
        /* ============ SECTION HUB ============ */
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              От вероятности к алгоритмам RL
            </span>
          </h1>
          <p className="text-muted-foreground mb-12 text-lg text-center max-w-2xl mx-auto">
            Фундаментальные концепции теории вероятности, статистики и MDP в контексте обучения с подкреплением
          </p>
          <HubLessonBadges hubPath="/math-rl/module-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sections.map((sec) => {
              const colors = colorMap[sec.color];
              const Icon = sec.icon;
              return (
                <Card
                  key={sec.id}
                  className={`bg-card/60 backdrop-blur-sm ${colors.border} ${colors.shadow} cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
                  onClick={() => setActiveSection(sec.id)}
                >
                  <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.badge}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badge}`}>
                      Раздел {sec.id}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{sec.title}</h3>
                    <Button variant="outline" size="sm" className={`${colors.border} ${colors.icon} w-full mt-2`}>
                      Открыть раздел
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        /* ============ SECTION CONTENT ============ */
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <SectionContent id={activeSection} />

          <div className="mt-16 flex justify-center">
            <Button variant="outline" onClick={() => setActiveSection(null)} className="border-accent/50 text-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к разделам
            </Button>
          </div>
        </article>
      )}
    </div>
  );
};

/* ─── Section content components ─── */

const SectionContent = ({ id }: { id: number }) => {
  switch (id) {
    case 1: return <Section1 />;
    case 2: return <Section2 />;
    case 3: return <Section3 />;
    case 4: return <Section4 />;
    case 5: return <Section5 />;
    case 6: return <Section6 />;
    default: return null;
  }
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 mb-8">
    {icon}
    <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
  </div>
);

const Section1 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<BookOpen className="w-7 h-7 text-primary" />} title="1. Теория вероятностей" />
    <p>
      Теория вероятности — краеугольный камень для понимания неопределённости в задачах RL (введение — <CrossLinkToLesson lessonId="1-1" lessonPath="/courses/1-1" lessonTitle="Что такое обучение с подкреплением?" lessonLevel={1} />). Агент взаимодействует со стохастической средой, и вероятность предоставляет аппарат для моделирования такой неопределённости.
    </p>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Основные понятия</h3>
    <ul className="list-disc list-inside space-y-2">
      <li><strong className="text-foreground">Пространство элементарных исходов</strong> <Math display={false}>{`\\Omega`}</Math> — множество всех возможных результатов эксперимента</li>
      <li><strong className="text-foreground">Событие</strong> <Math display={false}>{`A \\subseteq \\Omega`}</Math> — подмножество пространства исходов</li>
      <li><strong className="text-foreground">Вероятность</strong> <Math display={false}>{`P(A) \\in [0, 1]`}</Math>, <Math display={false}>{`\\sum P(\\omega_i) = 1`}</Math></li>
    </ul>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Случайные величины и распределения</h3>
    <p>
      <strong className="text-foreground">Случайная величина</strong> <Math display={false}>{`X: \\Omega \\to \\mathbb{R}`}</Math> — функция, сопоставляющая каждому исходу числовое значение.
    </p>
    <ul className="list-disc list-inside mt-3 space-y-2">
      <li><strong className="text-foreground">PMF</strong> (дискретная): <Math display={false}>{`P(X = x)`}</Math></li>
      <li><strong className="text-foreground">PDF</strong> (непрерывная): <Math display={false}>{`f(x)`}</Math>, где <Math display={false}>{`\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1`}</Math></li>
      <li><strong className="text-foreground">CDF:</strong> <Math display={false}>{`F(x) = P(X \\leq x)`}</Math></li>
    </ul>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Ожидаемое значение и дисперсия</h3>
    <p>Дискретная случайная величина:</p>
    <Math>{`E[X] = \\sum_x x \\cdot P(X = x)`}</Math>
    <p>Непрерывная случайная величина:</p>
    <Math>{`E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx`}</Math>
    <p>Дисперсия:</p>
    <Math>{`\\text{Var}(X) = E\\bigl[(X - E[X])^2\\bigr] = E[X^2] - (E[X])^2`}</Math>

    <InfoBox color="primary" title="В RL">
      <p className="text-sm">Ожидаемое значение вознаграждения — ключевое понятие для оценки политик. Цель агента — максимизировать <Math display={false}>{`E\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_t\\right]`}</Math>.</p>
    </InfoBox>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Условная вероятность и правило Байеса</h3>
    <Math>{`P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0`}</Math>
    <p className="mt-3"><strong className="text-foreground">Независимость:</strong> <Math display={false}>{`P(A \\cap B) = P(A) \\cdot P(B)`}</Math></p>
    <p className="mt-3"><strong className="text-foreground">Правило Байеса:</strong></p>
    <Math>{`P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}`}</Math>
    <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
      <li><Math display={false}>{`P(H|E)`}</Math> — апостериорная вероятность</li>
      <li><Math display={false}>{`P(E|H)`}</Math> — правдоподобие</li>
      <li><Math display={false}>{`P(H)`}</Math> — априорная вероятность</li>
    </ul>

    <InfoBox color="primary" title="Применение в RL">
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Переходы: <Math display={false}>{`P(s'|s, a)`}</Math> — стохастическая модель среды</li>
        <li>Оценка политик через ожидаемое суммарное вознаграждение</li>
        <li>ε-жадная стратегия для баланса исследования и эксплуатации</li>
        <li>POMDP: байесовский вывод для неполностью наблюдаемых состояний</li>
      </ul>
    </InfoBox>
  </div>
);

const Section2 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<BarChart3 className="w-7 h-7 text-secondary" />} title="2. Статистика" />
    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Описательная статистика</h3>
    <ul className="list-disc list-inside space-y-2">
      <li><strong className="text-foreground">Среднее:</strong> <Math display={false}>{`\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i`}</Math></li>
      <li><strong className="text-foreground">Дисперсия:</strong> <Math display={false}>{`\\text{Var}(X) = E[(X - E[X])^2]`}</Math></li>
      <li><strong className="text-foreground">Стандартное отклонение:</strong> <Math display={false}>{`\\sigma = \\sqrt{\\text{Var}(X)}`}</Math></li>
      <li><strong className="text-foreground">Медиана, мода, квартили, IQR</strong></li>
    </ul>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Оценка параметров</h3>
    <ul className="list-disc list-inside space-y-2">
      <li><strong className="text-foreground">Точечная оценка</strong> — например, выборочное среднее <Math display={false}>{`\\hat{\\mu} = \\bar{x}`}</Math></li>
      <li><strong className="text-foreground">Доверительные интервалы</strong> — диапазон, в котором с заданной вероятностью находится параметр</li>
    </ul>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Проверка гипотез</h3>
    <ul className="list-disc list-inside space-y-2">
      <li><Math display={false}>{`H_0`}</Math> — нулевая гипотеза (нет различия)</li>
      <li><Math display={false}>{`H_1`}</Math> — альтернативная гипотеза</li>
      <li><strong className="text-foreground">p-значение</strong> <Math display={false}>{`< 0.05`}</Math> → отклоняем <Math display={false}>{`H_0`}</Math></li>
      <li>Ошибка I рода (α) — ложноположительная; ошибка II рода (β) — ложноотрицательная</li>
    </ul>

    <InfoBox color="secondary" title="Применение в RL">
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>t-тесты для сравнения производительности алгоритмов</li>
        <li>Бутстрэп для оценки неопределённости</li>
        <li>Байесовский RL: количественная оценка неопределённости</li>
        <li>Офлайн-оценка политики по данным другой политики</li>
        <li>Регрессия для аппроксимации функций ценности</li>
      </ul>
    </InfoBox>
  </div>
);

const Section3 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<GitBranch className="w-7 h-7 text-accent" />} title="3. Марковские процессы" />
    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Цепи Маркова</h3>
    <p><strong className="text-foreground">Свойство Маркова</strong> — будущее зависит только от текущего состояния:</p>
    <Math>{`P(S_{t+1} = s' \\mid S_t = s_t, S_{t-1} = s_{t-1}, \\ldots, S_0 = s_0) = P(S_{t+1} = s' \\mid S_t = s_t)`}</Math>
    <p className="mt-3">Цепь Маркова определяется:</p>
    <ul className="list-disc list-inside mt-2 space-y-1">
      <li>Множеством состояний <Math display={false}>{`\\mathcal{S}`}</Math></li>
      <li>Матрицей переходных вероятностей <Math display={false}>{`P`}</Math>, где <Math display={false}>{`\\sum_{s'} P(s, s') = 1`}</Math></li>
    </ul>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">MDP — Марковский процесс принятия решений</h3>
    <p>MDP определяется кортежем:</p>
    <Math>{`(\\mathcal{S},\\; \\mathcal{A},\\; P,\\; R,\\; \\gamma)`}</Math>
    <ul className="list-disc list-inside mt-3 space-y-2">
      <li><Math display={false}>{`\\mathcal{S}`}</Math> — множество состояний</li>
      <li><Math display={false}>{`\\mathcal{A}`}</Math> — множество действий</li>
      <li><Math display={false}>{`P(s'|s, a)`}</Math> — переходные вероятности</li>
      <li><Math display={false}>{`R(s, a, s')`}</Math> — функция вознаграждения</li>
      <li><Math display={false}>{`\\gamma \\in [0, 1]`}</Math> — коэффициент дисконтирования</li>
    </ul>

    <InfoBox color="accent" title="Дисконтирование γ">
      <p className="text-sm">
        <Math display={false}>{`\\gamma = 0`}</Math> — агент заботится только о немедленном вознаграждении.{" "}
        <Math display={false}>{`\\gamma \\to 1`}</Math> — одинаково ценит все будущие вознаграждения (возможны проблемы сходимости).
      </p>
    </InfoBox>
  </div>
);

const Section4 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<Brain className="w-7 h-7 text-primary" />} title="4. Функции ценности и уравнения Беллмана" />
    <p>
      <strong className="text-foreground">Политика</strong> <Math display={false}>{`\\pi(a|s)`}</Math> — распределение вероятностей над действиями для состояния <Math display={false}>{`s`}</Math>.
    </p>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности состояния</h3>
    <Math>{`V^\\pi(s) = E_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_t \\;\\middle|\\; S_0 = s\\right]`}</Math>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности действия</h3>
    <Math>{`Q^\\pi(s, a) = E_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_t \\;\\middle|\\; S_0 = s, A_0 = a\\right]`}</Math>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для V<sup>π</sup></h3>
    <Math>{`V^\\pi(s) = \\sum_a \\pi(a|s) \\sum_{s'} P(s'|s, a) \\bigl[R(s, a, s') + \\gamma\\, V^\\pi(s')\\bigr]`}</Math>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для Q<sup>π</sup></h3>
    <Math>{`Q^\\pi(s, a) = \\sum_{s'} P(s'|s, a) \\left[R(s, a, s') + \\gamma \\sum_{a'} \\pi(a'|s')\\, Q^\\pi(s', a')\\right]`}</Math>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнения оптимальности Беллмана</h3>
    <Math>{`V^*(s) = \\max_a \\sum_{s'} P(s'|s, a) \\bigl[R(s, a, s') + \\gamma\\, V^*(s')\\bigr]`}</Math>
    <Math>{`Q^*(s, a) = \\sum_{s'} P(s'|s, a) \\left[R(s, a, s') + \\gamma \\max_{a'} Q^*(s', a')\\right]`}</Math>

    <InfoBox color="primary" title="Оптимальная политика">
      <p className="text-sm">
        Оптимальная политика <Math display={false}>{`\\pi^*`}</Math> достигает <Math display={false}>{`V^*(s) = \\max_\\pi V^\\pi(s)`}</Math> для всех <Math display={false}>{`s \\in \\mathcal{S}`}</Math>.
        Для больших MDP прямое решение невозможно — используются алгоритмы RL.
      </p>
    </InfoBox>
  </div>
);

const Section5 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<Lightbulb className="w-7 h-7 text-secondary" />} title="5. Алгоритмы RL" />
    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Методы, основанные на ценности</h3>
    <p><strong className="text-foreground">Q-learning</strong> (off-policy):</p>
    <Math>{`Q(s, a) \\leftarrow Q(s, a) + \\alpha \\bigl[R + \\gamma \\max_{a'} Q(s', a') - Q(s, a)\\bigr]`}</Math>
    <p className="mt-3"><strong className="text-foreground">SARSA</strong> (on-policy):</p>
    <Math>{`Q(s, a) \\leftarrow Q(s, a) + \\alpha \\bigl[R + \\gamma\\, Q(s', a') - Q(s, a)\\bigr]`}</Math>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Методы, основанные на политике</h3>
    <p><strong className="text-foreground">REINFORCE</strong> — метод Монте-Карло для оценки градиента (Policy Gradient — <CrossLinkToLesson lessonId="2-1" lessonPath="/courses/2-1" lessonTitle="REINFORCE — Policy Gradient" lessonLevel={2} />):</p>
    <Math>{`\\nabla_\\theta J(\\theta) = E_\\pi\\left[\\sum_{t=0}^{T} \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) \\cdot G_t\\right]`}</Math>
    <p className="mt-3"><strong className="text-foreground">Actor-Critic:</strong> критик оценивает <Math display={false}>{`V(s)`}</Math>, актёр обновляет <Math display={false}>{`\\pi_\\theta`}</Math> на основе оценки критика.</p>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Методы, основанные на модели</h3>
    <p>
      Сначала изучается модель среды (<Math display={false}>{`\\hat{P}`}</Math> и <Math display={false}>{`\\hat{R}`}</Math>), затем используется для планирования или генерации синтетического опыта.
    </p>

    <InfoBox color="secondary" title="Связь с теорией">
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Q-learning / SARSA: используют ожидаемое значение и свойство Маркова</li>
        <li>REINFORCE: метод Монте-Карло + градиент по параметрам политики</li>
        <li>Model-based: статистическая оценка <Math display={false}>{`P`}</Math> и <Math display={false}>{`R`}</Math></li>
      </ul>
    </InfoBox>
  </div>
);

const Section6 = () => (
  <div className="text-muted-foreground leading-relaxed space-y-3">
    <SectionHeader icon={<Code2 className="w-7 h-7 text-accent" />} title="6. Практические примеры (Python)" />
    <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Пример 1: Симуляция бросков монеты</h3>
    <CodeBlock>{`import numpy as np
import matplotlib.pyplot as plt

num_flips = 1000
results = np.random.randint(0, 2, num_flips)  # 0=орёл, 1=решка

heads = np.sum(results == 0)
tails = np.sum(results == 1)
print(f"Доля орлов: {heads/num_flips:.2f}")
print(f"Доля решек: {tails/num_flips:.2f}")`}</CodeBlock>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Пример 2: Анализ вознаграждений</h3>
    <CodeBlock>{`np.random.seed(42)
rewards = np.random.normal(loc=10, scale=3, size=100)

mean_reward = np.mean(rewards)
std_reward  = np.std(rewards)
print(f"Среднее: {mean_reward:.2f}, σ: {std_reward:.2f}")

plt.hist(rewards, bins=10, edgecolor='black', alpha=0.7)
plt.title('Распределение вознаграждений агента RL')
plt.show()`}</CodeBlock>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Пример 3: Оценка политики в MDP</h3>
    <p className="text-sm mb-3">
      Среда: 2 состояния (S0, S1), 2 действия (A0, A1), <Math display={false}>{`\\gamma = 0.9`}</Math>.
      Политика: S0 → A0, S1 → A1.
    </p>
    <CodeBlock>{`import numpy as np

# Переходные вероятности P[s, a, s']
P = np.zeros((2, 2, 2))
P[0,0,0]=0.8; P[0,0,1]=0.2  # S0, A0
P[0,1,0]=0.3; P[0,1,1]=0.7  # S0, A1
P[1,0,0]=0.1; P[1,0,1]=0.9  # S1, A0
P[1,1,0]=0.6; P[1,1,1]=0.4  # S1, A1

# Вознаграждения R[s, a, s']
R = np.zeros((2, 2, 2))
R[0,0,0]=5;  R[0,0,1]=1
R[0,1,0]=0;  R[0,1,1]=2
R[1,0,0]=1;  R[1,0,1]=10
R[1,1,0]=3;  R[1,1,1]=4

gamma = 0.9
policy = {0: 0, 1: 1}  # S0->A0, S1->A1
V = np.zeros(2)

for _ in range(100):
    new_V = np.zeros(2)
    for s in range(2):
        a = policy[s]
        for s_p in range(2):
            new_V[s] += P[s,a,s_p] * (R[s,a,s_p] + gamma*V[s_p])
    V = new_V

print(f"V(S0) = {V[0]:.2f}, V(S1) = {V[1]:.2f}")`}</CodeBlock>

    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Упражнения для самопроверки</h3>
    <ol className="list-decimal list-inside space-y-2 text-sm">
      <li>Измените Пример 1 для двух игральных костей — постройте гистограмму сумм.</li>
      <li>В Примере 2 добавьте медиану и IQR. Сравните со средним и σ.</li>
      <li>В Примере 3 смените политику (S0→A1, S1→A0) и пересчитайте V.</li>
    </ol>
  </div>
);

/* ─── Shared sub-components ─── */

const InfoBox = ({ color, title, children }: { color: "primary" | "secondary" | "accent"; title: string; children: React.ReactNode }) => {
  const borderColor = color === "primary" ? "border-primary/30" : color === "secondary" ? "border-secondary/30" : "border-accent/30";
  const titleColor = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent";
  return (
    <div className={`my-4 p-4 rounded-lg bg-card/60 border ${borderColor}`}>
      <p className={`font-semibold ${titleColor} text-sm mb-2`}>{title}</p>
      {children}
    </div>
  );
};

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="my-4 p-4 rounded-lg bg-card/80 border border-primary/20 overflow-x-auto text-sm font-mono text-foreground">
    <code>{children}</code>
  </pre>
);

export default MathRLModule3;
