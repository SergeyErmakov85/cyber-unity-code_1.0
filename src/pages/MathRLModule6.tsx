import { Button } from "@/components/ui/button";
import HubLessonBadges from "@/components/HubLessonBadges";
import { ArrowLeft, BookOpen, Brain, BarChart3, GitBranch, Code2, Lightbulb, TrendingUp, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const MathRLModule6 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/math-rl")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            К модулям
          </Button>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 6</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Учебное пособие по математике и глубокому обучению с подкреплением
          </span>
        </h1>
        <p className="text-muted-foreground mb-4 text-lg">
          Комплексное пособие, интегрирующее все математические основы (модули 1–5) в единую систему знаний для глубокого обучения с подкреплением
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 1: Пределы и ряды</span>
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 2: Линейная алгебра</span>
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">Модуль 3: Вероятность и MDP</span>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 4: Оптимизация</span>
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 5: Фундаментальная математика RL</span>
        </div>
        <HubLessonBadges hubPath="/math-rl/module-6" />

        {/* ============================================================ */}
        {/* CHAPTER 1: Introduction to Deep RL */}
        {/* ============================================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 pb-3 border-b border-primary/30">
            Глава 1. Введение в глубокое обучение с подкреплением
          </h2>

          <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="1.1 Основные понятия: агент, среда, награда, состояние, действие">
            <p>
              <strong className="text-foreground">Глубокое обучение с подкреплением (Deep RL)</strong> объединяет методы обучения с подкреплением с возможностями глубоких нейронных сетей. Эта комбинация позволяет решать сложные задачи принятия решений в условиях неопределённости.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Ключевые компоненты</h3>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-foreground">Агент (Agent)</strong> — сущность, которая принимает решения и выполняет действия. Цель — максимизировать накопленное вознаграждение путём выбора оптимальных действий.</li>
              <li><strong className="text-foreground">Среда (Environment)</strong> — внешний мир, реальный или виртуальный, с которым взаимодействует агент. Среда реагирует на действия, изменяя состояние и предоставляя вознаграждение.</li>
              <li><strong className="text-foreground">Состояние (State)</strong> — представление текущей ситуации в среде. Может быть <em>полностью наблюдаемым</em> или <em>частично наблюдаемым</em> (POMDP).</li>
              <li><strong className="text-foreground">Действие (Action)</strong> — операция агента. Пространство действий может быть <em>дискретным</em> (конечное число вариантов) или <em>непрерывным</em> (диапазон значений).</li>
              <li><strong className="text-foreground">Награда (Reward)</strong> — числовой сигнал обратной связи от среды. Ключевой механизм, указывающий на качество выбранного действия.</li>
              <li><strong className="text-foreground">Политика (Policy)</strong> — стратегия выбора действий. Может быть <em>детерминированной</em> или <em>стохастической</em>.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Цикл взаимодействия</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Агент получает состояние <Math display={false}>{`s_t`}</Math></li>
              <li>Выбирает действие <Math display={false}>{`a_t`}</Math> согласно политике</li>
              <li>Среда переходит в новое состояние <Math display={false}>{`s_{t+1}`}</Math></li>
              <li>Агент получает награду <Math display={false}>{`r_t`}</Math></li>
              <li>Процесс повторяется</li>
            </ol>

            <InfoBox color="primary" title="Эпизоды и траектории">
              <p className="text-sm">
                <strong className="text-foreground">Эпизод</strong> — последовательность от начального до терминального состояния (например, одна партия в шахматы).{" "}
                <strong className="text-foreground">Траектория</strong> <Math display={false}>{`\\tau = (s_0, a_0, r_1, s_1, a_1, r_2, \\ldots)`}</Math> — полная запись взаимодействия.
              </p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Особенности Deep RL</h3>
            <p>Глубокие нейронные сети используются для аппроксимации:</p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong className="text-foreground">Функции ценности</strong> — оценка ожидаемой будущей награды в каждом состоянии</li>
              <li><strong className="text-foreground">Политики</strong> — прямая параметризация выбора действий</li>
              <li><strong className="text-foreground">Модели среды</strong> — предсказание следующего состояния и награды</li>
            </ol>
          </Section>

          <Section icon={<Brain className="w-5 h-5 text-secondary" />} title="1.2 Формализация задачи RL: MDP и уравнение Беллмана">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Марковский процесс принятия решений (MDP)</h3>
            <p>MDP определяется кортежем:</p>
            <Math>{`(\\mathcal{S},\\; \\mathcal{A},\\; P,\\; R,\\; \\gamma)`}</Math>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><Math display={false}>{`\\mathcal{S}`}</Math> — конечное множество состояний</li>
              <li><Math display={false}>{`\\mathcal{A}`}</Math> — конечное множество действий</li>
              <li><Math display={false}>{`P: \\mathcal{S} \\times \\mathcal{A} \\times \\mathcal{S} \\to [0,1]`}</Math> — функция вероятности перехода</li>
              <li><Math display={false}>{`R: \\mathcal{S} \\times \\mathcal{A} \\times \\mathcal{S} \\to \\mathbb{R}`}</Math> — функция вознаграждения</li>
              <li><Math display={false}>{`\\gamma \\in [0,1]`}</Math> — коэффициент дисконтирования</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Марковское свойство</h3>
            <p>Будущее зависит только от текущего состояния и действия:</p>
            <Math>{`P(s_{t+1}|s_t, a_t, s_{t-1}, a_{t-1}, \\ldots, s_0, a_0) = P(s_{t+1}|s_t, a_t)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности состояния</h3>
            <Math>{`V^\\pi(s) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности действия</h3>
            <Math>{`Q^\\pi(s, a) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s, A_0 = a\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для <Math display={false}>{`V^\\pi`}</Math></h3>
            <Math>{`V^\\pi(s) = \\sum_{a \\in \\mathcal{A}} \\pi(a|s) \\sum_{s' \\in \\mathcal{S}} P(s'|s,a)\\bigl[R(s,a,s') + \\gamma\\, V^\\pi(s')\\bigr]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для <Math display={false}>{`Q^\\pi`}</Math></h3>
            <Math>{`Q^\\pi(s,a) = \\sum_{s'} P(s'|s,a)\\left[R(s,a,s') + \\gamma \\sum_{a'} \\pi(a'|s')\\, Q^\\pi(s',a')\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнения оптимальности Беллмана</h3>
            <Math>{`V^*(s) = \\max_{a \\in \\mathcal{A}} \\sum_{s'} P(s'|s,a)\\bigl[R(s,a,s') + \\gamma\\, V^*(s')\\bigr]`}</Math>
            <Math>{`Q^*(s,a) = \\sum_{s'} P(s'|s,a)\\left[R(s,a,s') + \\gamma \\max_{a'} Q^*(s',a')\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Оптимальная политика</h3>
            <Math>{`\\pi^*(s) = \\arg\\max_{a \\in \\mathcal{A}} Q^*(s,a)`}</Math>

            <InfoBox color="secondary" title="Практическое значение уравнения Беллмана">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Теоретическая основа</strong> — математический фундамент для анализа задач RL</li>
                <li><strong className="text-foreground">Алгоритмическая основа</strong> — Value Iteration, Policy Iteration, Q-learning</li>
                <li><strong className="text-foreground">Связь с динамическим программированием</strong> — итеративное решение через рекурсию</li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Ограничения MDP</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Размерность</strong> — для больших или непрерывных пространств точное решение невозможно</li>
              <li><strong className="text-foreground">Неизвестная модель</strong> — функции <Math display={false}>{`P`}</Math> и <Math display={false}>{`R`}</Math> часто неизвестны (model-free методы)</li>
              <li><strong className="text-foreground">Частичная наблюдаемость</strong> — POMDP требуют байесовского вывода</li>
            </ol>
          </Section>

          <Section icon={<Lightbulb className="w-5 h-5 text-accent" />} title="1.3 Обзор алгоритмов RL">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Q-learning: табличный метод</h3>
            <p>
              Q-learning (Уоткинс, 1989) — фундаментальный off-policy алгоритм класса временных различий (TD). Итеративно обновляет оценки Q-функции по формуле:
            </p>
            <Math>{`Q(s,a) \\leftarrow Q(s,a) + \\alpha\\bigl[r + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\bigr]`}</Math>
            <p className="mt-3">
              где <Math display={false}>{`\\alpha`}</Math> — скорость обучения, <Math display={false}>{`\\gamma`}</Math> — коэффициент дисконтирования.
            </p>

            <InfoBox color="primary" title="Сходимость Q-learning">
              <p className="text-sm">
                Доказано, что при бесконечном посещении всех пар (s, a) и убывающей скорости обучения Q-learning сходится к оптимальной <Math display={false}>{`Q^*(s,a)`}</Math> независимо от политики исследования.
              </p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Deep Q-Network (DQN)</h3>
            <p>DQN (DeepMind, 2013–2015) заменяет Q-таблицу глубокой нейронной сетью <Math display={false}>{`Q(s,a;\\theta)`}</Math>. Ключевые компоненты:</p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong className="text-foreground">Аппроксимация нейронной сетью:</strong> <Math display={false}>{`Q(s,a;\\theta)`}</Math></li>
              <li><strong className="text-foreground">Experience Replay:</strong> буфер переходов <Math display={false}>{`(s,a,r,s')`}</Math> для стабилизации обучения</li>
              <li><strong className="text-foreground">Target Network:</strong> отдельная сеть <Math display={false}>{`Q(s,a;\\theta^-)`}</Math>, обновляемая реже</li>
            </ol>
            <p className="mt-4">Функция потерь DQN:</p>
            <Math>{`L(\\theta) = \\frac{1}{N} \\sum_j \\bigl(y_j - Q(s_j, a_j; \\theta)\\bigr)^2`}</Math>
            <p>где целевое значение:</p>
            <Math>{`y_j = r_j + \\gamma \\max_{a'} Q(s'_j, a'; \\theta^-)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Улучшения DQN</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Double DQN</strong> — разделяет выбор и оценку действия для борьбы с переоценкой</li>
              <li><strong className="text-foreground">Dueling DQN</strong> — разделяет <Math display={false}>{`Q = V(s) + A(s,a)`}</Math></li>
              <li><strong className="text-foreground">Prioritized Experience Replay</strong> — выборка пропорционально TD-ошибке</li>
              <li><strong className="text-foreground">Noisy Networks</strong> — параметрический шум для исследования</li>
              <li><strong className="text-foreground">Distributional DQN</strong> — моделирование распределения наград</li>
              <li><strong className="text-foreground">Rainbow</strong> — объединение всех улучшений</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Policy Gradient: методы градиента политики</h3>
            <p>
              Прямая оптимизация параметров политики <Math display={false}>{`\\pi(a|s;\\theta)`}</Math> без промежуточного вычисления функции ценности. Теорема о градиенте политики:
            </p>
            <Math>{`\\nabla_\\theta J(\\theta) = \\mathbb{E}_\\pi\\bigl[\\nabla_\\theta \\log \\pi(a|s;\\theta) \\cdot Q^\\pi(s,a)\\bigr]`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Алгоритм REINFORCE</h4>
            <p>Использует метод Монте-Карло для оценки <Math display={false}>{`Q^\\pi`}</Math>. Обновление параметров:</p>
            <Math>{`\\theta \\leftarrow \\theta + \\alpha \\cdot \\nabla_\\theta \\log \\pi(a_t|s_t;\\theta) \\cdot G_t`}</Math>
            <p>где <Math display={false}>{`G_t = \\sum_{k=t}^T \\gamma^{k-t} r_{k+1}`}</Math> — дисконтированная сумма наград.</p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Улучшения REINFORCE</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Baseline:</strong> <Math display={false}>{`\\nabla_\\theta J = \\mathbb{E}[\\nabla_\\theta \\log \\pi \\cdot (Q^\\pi(s,a) - b(s))]`}</Math> — снижение дисперсии</li>
              <li><strong className="text-foreground">Actor-Critic:</strong> Critic оценивает <Math display={false}>{`V(s)`}</Math>, Actor обновляет политику</li>
              <li><strong className="text-foreground">A2C/A3C:</strong> Advantage <Math display={false}>{`A(s,a) = Q(s,a) - V(s)`}</Math>, параллельное обучение</li>
              <li><strong className="text-foreground">TRPO:</strong> ограничение размера обновления через KL-дивергенцию</li>
              <li><strong className="text-foreground">PPO:</strong> клиповый суррогат-объектив (подробно в Модуле 4)</li>
            </ol>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Современные алгоритмы</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">SAC (Soft Actor-Critic)</strong> — энтропийная регуляризация для исследования</li>
              <li><strong className="text-foreground">TD3</strong> — двойные Q-сети, задержка обновления политики</li>
              <li><strong className="text-foreground">D4PG</strong> — распределённое обучение с моделированием распределения наград</li>
            </ul>

            <InfoBox color="accent" title="Выбор алгоритма">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Дискретные действия</strong> → Q-learning, DQN</li>
                <li><strong className="text-foreground">Непрерывные действия</strong> → DDPG, TD3, SAC</li>
                <li><strong className="text-foreground">Стохастическая среда</strong> → Policy Gradient методы</li>
                <li><strong className="text-foreground">Большое пространство состояний</strong> → Deep RL (нейросетевая аппроксимация)</li>
              </ul>
            </InfoBox>
          </Section>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 2: Mathematical Foundations */}
        {/* ============================================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 pb-3 border-b border-secondary/30">
            Глава 2. Математические основы глубокого обучения с подкреплением
          </h2>

          {/* 2.1 Calculus */}
          <Section icon={<TrendingUp className="w-5 h-5 text-primary" />} title="2.1 Математический анализ">
            <ReferenceTag modules={[1, 4]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Производные и правила дифференцирования</h3>
            <p>Производная функции <Math display={false}>{`f(x)`}</Math> в точке <Math display={false}>{`x`}</Math>:</p>
            <Math>{`f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Основные правила</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Степенная функция:</strong> <Math display={false}>{`(x^n)' = nx^{n-1}`}</Math></li>
              <li><strong className="text-foreground">Произведение:</strong> <Math display={false}>{`(fg)' = f'g + fg'`}</Math></li>
              <li><strong className="text-foreground">Частное:</strong> <Math display={false}>{`\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}`}</Math></li>
              <li><strong className="text-foreground">Цепное правило:</strong> <Math display={false}>{`(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)`}</Math></li>
              <li><strong className="text-foreground">Экспонента:</strong> <Math display={false}>{`(e^x)' = e^x`}</Math></li>
              <li><strong className="text-foreground">Логарифм:</strong> <Math display={false}>{`(\\ln x)' = \\frac{1}{x}`}</Math></li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Частные производные и градиент</h3>
            <p>Для функции нескольких переменных <Math display={false}>{`f(x_1, x_2, \\ldots, x_n)`}</Math>:</p>
            <Math>{`\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(x_1, \\ldots, x_i + h, \\ldots, x_n) - f(x_1, \\ldots, x_n)}{h}`}</Math>

            <p className="mt-4"><strong className="text-foreground">Градиент</strong> — вектор всех частных производных:</p>
            <Math>{`\\nabla f = \\left(\\frac{\\partial f}{\\partial x_1},\\; \\frac{\\partial f}{\\partial x_2},\\; \\ldots,\\; \\frac{\\partial f}{\\partial x_n}\\right)`}</Math>

            <InfoBox color="primary" title="Применение в RL (Модуль 4)">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Градиентный спуск:</strong> <Math display={false}>{`\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\alpha \\nabla L(\\theta)`}</Math></li>
                <li><strong className="text-foreground">Обратное распространение</strong> — цепное правило для вычисления градиентов в нейросетях</li>
                <li><strong className="text-foreground">Градиент политики:</strong> <Math display={false}>{`\\nabla_\\theta J(\\theta) = \\mathbb{E}_\\pi[\\nabla_\\theta \\log \\pi \\cdot Q^\\pi]`}</Math></li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Экстремумы функций</h3>
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Одна переменная</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Необходимое условие:</strong> <Math display={false}>{`f'(a) = 0`}</Math></li>
              <li><Math display={false}>{`f''(a) > 0`}</Math> → локальный минимум</li>
              <li><Math display={false}>{`f''(a) < 0`}</Math> → локальный максимум</li>
              <li><Math display={false}>{`f''(a) = 0`}</Math> → требуется дополнительное исследование</li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Несколько переменных</h4>
            <p>Для <Math display={false}>{`f(x,y)`}</Math> с критической точкой <Math display={false}>{`(a,b)`}</Math>:</p>
            <Math>{`D = \\frac{\\partial^2 f}{\\partial x^2} \\cdot \\frac{\\partial^2 f}{\\partial y^2} - \\left(\\frac{\\partial^2 f}{\\partial x \\partial y}\\right)^2`}</Math>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li><Math display={false}>{`D > 0`}</Math> и <Math display={false}>{`\\frac{\\partial^2 f}{\\partial x^2} > 0`}</Math> → локальный минимум</li>
              <li><Math display={false}>{`D > 0`}</Math> и <Math display={false}>{`\\frac{\\partial^2 f}{\\partial x^2} < 0`}</Math> → локальный максимум</li>
              <li><Math display={false}>{`D < 0`}</Math> → седловая точка</li>
            </ul>
          </Section>

          {/* 2.2 Linear Algebra */}
          <Section icon={<Layers className="w-5 h-5 text-secondary" />} title="2.2 Линейная алгебра">
            <ReferenceTag modules={[2]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Векторы и векторные пространства</h3>
            <p>Вектор размерности <Math display={false}>{`n`}</Math>:</p>
            <Math>{`\\mathbf{x} = (x_1, x_2, \\ldots, x_n)^\\top`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Собственные значения и собственные векторы</h3>
            <p>Ненулевой вектор <Math display={false}>{`\\mathbf{v}`}</Math> — собственный вектор матрицы <Math display={false}>{`A`}</Math> с собственным значением <Math display={false}>{`\\lambda`}</Math>, если:</p>
            <Math>{`A\\mathbf{v} = \\lambda\\mathbf{v}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Характеристическое уравнение</h4>
            <Math>{`\\det(A - \\lambda I) = 0`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Спектральное разложение</h3>
            <p>Для симметричной матрицы:</p>
            <Math>{`A = Q\\Lambda Q^\\top`}</Math>
            <p>где <Math display={false}>{`Q`}</Math> — ортогональная матрица собственных векторов, <Math display={false}>{`\\Lambda`}</Math> — диагональная матрица собственных значений.</p>

            <InfoBox color="secondary" title="Применение в Deep RL (Модуль 2)">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Нейросети</strong> = линейные преобразования + нелинейные активации: <Math display={false}>{`W\\mathbf{x} + \\mathbf{b}`}</Math></li>
                <li><strong className="text-foreground">Ковариационные матрицы</strong> в стохастических политиках с непрерывными действиями</li>
                <li><strong className="text-foreground">PCA</strong> для снижения размерности пространства состояний</li>
              </ul>
            </InfoBox>
          </Section>

          {/* 2.3 Probability and Statistics */}
          <Section icon={<BarChart3 className="w-5 h-5 text-accent" />} title="2.3 Теория вероятностей и статистика">
            <ReferenceTag modules={[3]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Случайные величины, ожидание, дисперсия</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Математическое ожидание</h4>
            <p>Дискретная случайная величина:</p>
            <Math>{`\\mathbb{E}[X] = \\sum_x x \\cdot P(X = x)`}</Math>
            <p>Непрерывная:</p>
            <Math>{`\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Дисперсия</h4>
            <Math>{`\\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Нормальное распределение</h3>
            <Math>{`f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Оценка максимального правдоподобия (MLE)</h3>
            <Math>{`\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\sum_{i=1}^n \\log f(X_i|\\theta)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Оценка MAP</h3>
            <Math>{`\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\bigl[\\log P(X|\\theta) + \\log P(\\theta)\\bigr]`}</Math>
          </Section>

          {/* 2.4 Differential Equations */}
          <Section icon={<GitBranch className="w-5 h-5 text-primary" />} title="2.4 Дифференциальные уравнения">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">ОДУ с разделяющимися переменными</h3>
            <p>Уравнение <Math display={false}>{`y' = ky`}</Math>:</p>
            <Math>{`\\frac{dy}{y} = k\\,dx \\quad \\Rightarrow \\quad y = C_1 e^{kx}`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">ОДУ второго порядка с постоянными коэффициентами</h3>
            <p>Уравнение <Math display={false}>{`ay'' + by' + cy = 0`}</Math>. Характеристическое уравнение:</p>
            <Math>{`ar^2 + br + c = 0`}</Math>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Различные действительные корни: <Math display={false}>{`y = C_1 e^{r_1 x} + C_2 e^{r_2 x}`}</Math></li>
              <li>Кратный корень: <Math display={false}>{`y = (C_1 + C_2 x)e^{rx}`}</Math></li>
              <li>Комплексные корни: <Math display={false}>{`y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)`}</Math></li>
            </ul>
          </Section>
        </div>

        {/* Conclusion */}
        <section className="mt-12 p-6 rounded-lg bg-card/40 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">📌 Итоги пособия</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Данное учебное пособие объединило все шесть модулей курса «Математика RL» в единую систему знаний:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Модуль 1 (Пределы и ряды)</strong> → сходимость, дисконтирование, итерация ценности</li>
            <li><strong className="text-foreground">Модуль 2 (Линейная алгебра)</strong> → матрицы, собственные значения, спектральное разложение → нейросети, PCA</li>
            <li><strong className="text-foreground">Модуль 3 (Вероятность и MDP)</strong> → распределения, Байес, Марковские процессы → формализация RL</li>
            <li><strong className="text-foreground">Модуль 4 (Оптимизация)</strong> → SGD, Adam, PPO → обучение политик</li>
            <li><strong className="text-foreground">Модуль 5 (Фундаментальная математика RL)</strong> → от вероятностей до Actor-Critic и Unity ML-Agents</li>
            <li><strong className="text-foreground">Модуль 6 (Пособие)</strong> → интеграция всех тем + DQN, дифференциальные уравнения, статистические оценки</li>
          </ul>
        </section>

        {/* References */}
        <section className="mt-8 p-6 rounded-lg bg-card/40 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">📚 Литература</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Sutton, R. S., & Barto, A. G. (2018). <em>Reinforcement Learning: An Introduction.</em> MIT Press.</li>
            <li>Mnih, V., et al. (2015). Human-level control through deep RL. <em>Nature</em>, 518, 529–533.</li>
            <li>Schulman, J., et al. (2017). Proximal Policy Optimization Algorithms. <em>arXiv:1707.06347</em>.</li>
            <li>Goodfellow, I., et al. (2016). <em>Deep Learning.</em> MIT Press.</li>
            <li>Bertsekas, D. P. (2017). <em>Dynamic Programming and Optimal Control.</em> Athena Scientific.</li>
          </ol>
        </section>

        {/* Back */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-secondary/50 text-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к модулям
          </Button>
        </div>
      </article>
    </div>
  );
};

/* ─── Reusable sub-components ─── */

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

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

const ReferenceTag = ({ modules }: { modules: number[] }) => {
  const colors = ["bg-primary/10 text-primary", "bg-secondary/10 text-secondary", "bg-accent/10 text-accent"];
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {modules.map(m => (
        <span key={m} className={`text-xs px-2 py-0.5 rounded-full ${colors[(m - 1) % 3]}`}>
          ← Модуль {m}
        </span>
      ))}
    </div>
  );
};

export default MathRLModule6;