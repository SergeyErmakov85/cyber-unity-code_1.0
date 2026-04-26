import { Button } from "@/components/ui/button";
import HubLessonBadges from "@/components/HubLessonBadges";
import CrossLinkToLesson from "@/components/CrossLinkToLesson";
import { ArrowLeft, BookOpen, Brain, TrendingUp, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const MathRLModule4 = () => {
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
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 4</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Методы оптимизации в обучении с подкреплением
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Градиент политики, REINFORCE, методы оптимизации (SGD, Adam) и PPO — от математических основ до реализации в Unity ML-Agents
        </p>
        <HubLessonBadges hubPath="/math-rl/module-4" />

        {/* Lecture 1 */}
        <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="Лекция 1. Основы RL и оптимизация политики">
          <p>
            Обучение с подкреплением заключается в том, что <strong className="text-foreground">агент</strong> взаимодействует с <strong className="text-foreground">окружением</strong> в дискретные моменты времени. На каждом шаге агент наблюдает состояние <Math display={false}>{`S_t`}</Math>, выбирает действие <Math display={false}>{`A_t`}</Math> по своей политике и получает вознаграждение <Math display={false}>{`R_{t+1}`}</Math> вместе с новым состоянием <Math display={false}>{`S_{t+1}`}</Math>.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Целевая функция политики</h3>
          <p>
            Если политика параметризована вектором <Math display={false}>{`\\theta`}</Math>, её полезность определяется как:
          </p>
          <Math>{`J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\left[\\sum_{t=0}^{T} \\gamma^t R_t\\right]`}</Math>
          <p>
            где <Math display={false}>{`0 \\le \\gamma < 1`}</Math> — коэффициент дисконтирования будущих вознаграждений. Для нахождения оптимальных параметров выполняется <strong className="text-foreground">градиентный подъём</strong> по <Math display={false}>{`\\theta`}</Math>. Градиент политики определяется как <Math display={false}>{`\\nabla_{\\theta} J(\\theta)`}</Math>.
          </p>

          <InfoBox color="primary" title="Unity ML-Agents">
            <p className="text-sm">
              В Unity ML-Agents логика агента инкапсулирована в нейросети с параметрами <Math display={false}>{`\\theta`}</Math>. Среда Unity передаёт опыты (состояния, действия, вознаграждения) в Python-тренер, где происходит накопление градиентов и обновление параметров.
            </p>
          </InfoBox>
        </Section>

        {/* Lecture 2 */}
        <Section icon={<Brain className="w-5 h-5 text-secondary" />} title="Лекция 2. Вывод градиента политики">
          <p>
            Представим <Math display={false}>{`J(\\theta)`}</Math> как ожидание по траекториям <Math display={false}>{`\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)`}</Math>:
          </p>
          <Math>{`J(\\theta) = \\int P(\\tau|\\theta)\\;R(\\tau)\\,d\\tau`}</Math>
          <p>
            где <Math display={false}>{`R(\\tau) = \\sum_{t=0}^T R_t`}</Math> — суммарное вознаграждение траектории.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 1: Дифференцирование под знаком интеграла</h3>
          <Math>{`\\nabla_{\\theta} J(\\theta) = \\int \\nabla_{\\theta} P(\\tau|\\theta)\\;R(\\tau)\\,d\\tau`}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 2: Трюк с логарифмом</h3>
          <p>Используем <Math display={false}>{`\\nabla_{\\theta}P = P\\,\\nabla_{\\theta}\\log P`}</Math>:</p>
          <Math>{`\\nabla_{\\theta} J(\\theta) = \\mathbb{E}_{\\tau\\sim \\pi_\\theta}\\!\\big[\\nabla_{\\theta}\\log P(\\tau|\\theta)\\;R(\\tau)\\big]`}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 3: Упрощение</h3>
          <p>
            Поскольку <Math display={false}>{`P(\\tau|\\theta) = P(s_0)\\prod_t \\pi_\\theta(a_t|s_t)\\,P(s_{t+1}|s_t,a_t)`}</Math>, а переходы среды не зависят от <Math display={false}>{`\\theta`}</Math>:
          </p>
          <Math>{`\\nabla_{\\theta}\\log P(\\tau|\\theta) = \\sum_{t=0}^T \\nabla_{\\theta}\\log \\pi_\\theta(a_t|s_t)`}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 4: Формула REINFORCE (<CrossLinkToLesson lessonId="2-1" lessonPath="/courses/2-1" lessonTitle="Policy Gradient и REINFORCE" lessonLevel={2} />)</h3>
          <Math>{`\\nabla_{\\theta} J(\\theta) = \\mathbb{E}_{\\tau\\sim \\pi_\\theta}\\Big[\\sum_{t=0}^T \\nabla_{\\theta}\\log \\pi_\\theta(a_t|s_t)\\;R(\\tau)\\Big]`}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 5: Reward-to-go</h3>
          <p>Вместо <Math display={false}>{`R(\\tau)`}</Math> используем <Math display={false}>{`G_t = \\sum_{k=t}^T \\gamma^{k-t} R_k`}</Math>:</p>
          <Math>{`\\nabla_{\\theta} J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\Big[\\sum_{t=0}^T \\nabla_{\\theta}\\log \\pi_\\theta(a_t|s_t)\\;G_t\\Big]`}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Шаг 6: Базис и Advantage</h3>
          <p>
            Вычитание функции <Math display={false}>{`b(s_t)`}</Math> снижает дисперсию без смещения. Оптимальный базис — оценка <Math display={false}>{`V^\\pi(s)`}</Math>, что даёт <strong className="text-foreground">advantage</strong>:
          </p>
          <Math>{`A(s_t, a_t) = G_t - V^\\pi(s_t)`}</Math>
          <p>Итоговая формула градиента:</p>
          <Math>{`\\nabla_{\\theta} J(\\theta) = \\mathbb{E}\\Big[\\sum_{t} \\nabla_{\\theta}\\log \\pi_\\theta(a_t|s_t)\\;A(s_t, a_t)\\Big]`}</Math>

          <InfoBox color="secondary" title="Практическое значение">
            <p className="text-sm">
              Эта формула позволяет оценивать градиент по сэмплам из среды. В Unity ML-Agents именно на этой основе строится обучение: собираются траектории, вычисляются преимущества, и параметры <Math display={false}>{`\\theta`}</Math> обновляются в направлении градиента.
            </p>
          </InfoBox>
        </Section>

        {/* Lecture 3 */}
        <Section icon={<TrendingUp className="w-5 h-5 text-accent" />} title="Лекция 3. Градиентный спуск и его варианты">
          <p>После оценки <Math display={false}>{`\\nabla_{\\theta}J(\\theta)`}</Math> параметры обновляются по правилу:</p>
          <Math>{`\\theta_{\\text{new}} = \\theta_{\\text{old}} + \\alpha\\,\\nabla_{\\theta}J(\\theta_{\\text{old}})`}</Math>
          <p>
            где <Math display={false}>{`\\alpha`}</Math> — скорость обучения (learning rate). В глубоких нейросетях RL обычно используют варианты <strong className="text-foreground">стохастического градиентного спуска</strong> (SGD) с дополнительными эвристиками.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Momentum</h3>
          <p>Вводит «скорость» <Math display={false}>{`v_t`}</Math>, аккумулирующую прошлые градиенты:</p>
          <Math>{`v_t = \\beta_1\\,v_{t-1} + (1-\\beta_1)\\,\\nabla J(\\theta_{t-1}), \\quad \\theta_t = \\theta_{t-1} + \\alpha\\,v_t`}</Math>
          <p>где <Math display={false}>{`\\beta_1 \\approx 0.9`}</Math>. Ускоряет движение в одном направлении и снижает колебания.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2. RMSProp</h3>
          <p>Адаптирует шаг для каждого параметра, масштабируя на основе скользящего среднего квадратов градиентов:</p>
          <Math>{`s_t = \\beta_2\\,s_{t-1} + (1-\\beta_2)\\,(\\nabla J(\\theta_{t-1}))^2, \\quad \\theta_t = \\theta_{t-1} + \\alpha\\,\\frac{\\nabla J(\\theta_{t-1})}{\\sqrt{s_t} + \\varepsilon}`}</Math>
          <p>где <Math display={false}>{`\\varepsilon`}</Math> — малое число для стабильности и <Math display={false}>{`\\beta_2 \\approx 0.999`}</Math>.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Adam (Adaptive Moment Estimation)</h3>
          <p>
            Комбинирует моменты первого и второго порядка (Momentum + RMSProp) (Adam в DQN — <CrossLinkToLesson lessonId="1-4" lessonPath="/courses/1-4" lessonTitle="DQN с нуля на PyTorch" lessonLevel={1} />). Параметры по умолчанию: <Math display={false}>{`\\beta_1 = 0.9`}</Math>, <Math display={false}>{`\\beta_2 = 0.999`}</Math>, <Math display={false}>{`\\varepsilon = 10^{-8}`}</Math>.
          </p>

          <InfoBox color="accent" title="Unity ML-Agents">
            <p className="text-sm">
              По умолчанию используется оптимизатор Adam с настраиваемым <code className="text-foreground">learning_rate</code> (обычно <Math display={false}>{`10^{-4} \\dots 10^{-3}`}</Math>) и опциональным расписанием (linear decay). Также практикуется обрезка градиентов (gradient clipping) и мини-батчи.
            </p>
          </InfoBox>
        </Section>

        {/* Lecture 4 */}
        <Section icon={<Settings2 className="w-5 h-5 text-primary" />} title="Лекция 4. Proximal Policy Optimization (PPO)">
          <p>
            <strong className="text-foreground">PPO</strong> — современный алгоритм оптимизации политик, стандарт в Unity ML-Agents. Он предназначен для того, чтобы <strong className="text-foreground">не допустить слишком больших обновлений политики</strong>, способных ухудшить результаты.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Клиповый суррогат-объектив</h3>
          <p>Определим отношение вероятностей:</p>
          <Math>{`r(\\theta) = \\frac{\\pi_{\\theta}(a|s)}{\\pi_{\\theta_{\\text{old}}}(a|s)}`}</Math>
          <p>Целевая функция PPO-Clip:</p>
          <Math>{`L(\\theta) = \\min\\!\\Big[r(\\theta)\\,A,\\;\\; \\text{clip}\\big(r(\\theta),\\, 1-\\epsilon,\\, 1+\\epsilon\\big)\\,A\\Big]`}</Math>
          <p>
            где <Math display={false}>{`A`}</Math> — Advantage, а <Math display={false}>{`\\epsilon \\approx 0.1 \\ldots 0.2`}</Math> — гиперпараметр ограничения обновления. Такой подход <strong className="text-foreground">защищает</strong> от чрезмерного изменения вероятностей и обеспечивает баланс между сходимостью и стабильностью.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Процедура обучения в Unity ML-Agents</h3>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong className="text-foreground">Сбор данных:</strong> Батчи опыта (например, <code className="text-foreground">buffer_size: 20480</code>) из параллельных сред (16 дубликатов).
            </li>
            <li>
              <strong className="text-foreground">Вычисление Advantage:</strong> С помощью сети критика оцениваются <Math display={false}>{`V(s)`}</Math>, затем применяется GAE (Generalized Advantage Estimation) с параметром <Math display={false}>{`\\lambda`}</Math> (обычно <Math display={false}>{`0.95 \\ldots 0.99`}</Math>).
            </li>
            <li>
              <strong className="text-foreground">Обучение:</strong> Несколько эпох (<code className="text-foreground">num_epoch</code> ≈ 4) мини-батчами, максимизируя клиповый объектив PPO, минимизируя value-loss и добавляя энтропийный бонус <Math display={false}>{`\\beta`}</Math> для исследования. Обновления — Adam с <code className="text-foreground">learning_rate</code> ≈ <Math display={false}>{`2 \\cdot 10^{-4}`}</Math>.
            </li>
            <li>
              <strong className="text-foreground">Повторение:</strong> После обновления политика становится новой, процесс сбора опыта повторяется.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Гиперпараметры PPO</h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border border-border/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-card/60">
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Параметр</th>
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Значение</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/20">
                  <td className="p-3">Дисконт <Math display={false}>{`\\gamma`}</Math></td>
                  <td className="p-3"><Math display={false}>{`0.99`}</Math></td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3">GAE <Math display={false}>{`\\lambda`}</Math></td>
                  <td className="p-3"><Math display={false}>{`0.95 \\ldots 0.99`}</Math></td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3">Клиповый порог <Math display={false}>{`\\epsilon`}</Math></td>
                  <td className="p-3"><Math display={false}>{`0.1 \\ldots 0.2`}</Math></td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3">Энтропийный коэффициент <Math display={false}>{`\\beta`}</Math></td>
                  <td className="p-3"><Math display={false}>{`0.0005 \\ldots 0.01`}</Math></td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3">Скорость обучения</td>
                  <td className="p-3"><Math display={false}>{`10^{-4} \\ldots 10^{-3}`}</Math></td>
                </tr>
                <tr>
                  <td className="p-3">Буфер / батч</td>
                  <td className="p-3">тысячи шагов</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox color="primary" title="Итог">
            <p className="text-sm">
              PPO сочетает в себе <strong className="text-foreground">градиенты политики</strong>, <strong className="text-foreground">адаптивные оптимизаторы</strong> и <strong className="text-foreground">ограничения обновлений</strong>, что обеспечивает надёжность и эффективность обучения в игровых симуляциях.
            </p>
          </InfoBox>
        </Section>

        {/* Conclusion */}
        <section className="mt-12 p-6 rounded-lg bg-card/40 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">📌 Заключение</h3>
          <p className="text-sm text-muted-foreground">
            Этот модуль из четырёх лекций даёт глубокое понимание того, как математические основы policy gradient (Лекция 2) сочетаются с методами оптимизации (Лекция 3) и приводят к современным алгоритмам, таким как PPO (Лекция 4), реализованным в Unity ML-Agents. Оптимизатор Adam используется и в дискриминаторе GAIL (<CrossLinkToLesson lessonId="3-4" lessonPath="/courses/3-4" lessonTitle="Imitation Learning: BC и GAIL" lessonLevel={3} />), а автоматический подбор гиперпараметров возможен через Optuna (<CrossLinkToLesson lessonId="3-6" lessonPath="/courses/3-6" lessonTitle="Оптимизация гиперпараметров" lessonLevel={3} />).
          </p>
        </section>

        {/* Back */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-primary/50 text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к модулям
          </Button>
        </div>
      </article>
    </div>
  );
};

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

export default MathRLModule4;
