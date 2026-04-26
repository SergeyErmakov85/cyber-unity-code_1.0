import { Sparkles } from "lucide-react";
import Math from "@/components/Math";
import { Section, InfoBox } from "./Section";

const Chapter9 = () => (
  <Section icon={<Sparkles className="w-5 h-5 text-accent" />} title="Глава 9. Методы градиента политики (Policy Gradients)" id="глава-9">
    <p>
      Value-based методы (DQN) не работают с <strong className="text-foreground">непрерывным пространством действий</strong> (нельзя вычислить <Math display={false}>{"\\max_a"}</Math> для бесконечного числа вариантов) и не могут выучить истинно стохастические политики (в «Камень-ножницы-бумага» оптимальная стратегия — играть случайно).
    </p>

    <h3 id="параметризация-политики" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Параметризация политики</h3>
    <p>
      Политика напрямую параметризуется нейронной сетью с весами <Math display={false}>{"\\theta"}</Math>: <Math display={false}>{"\\pi_\\theta(a|s)"}</Math>. Целевая функция — ожидаемый суммарный возврат:
    </p>
    <Math>{"J(\\theta) = \\mathbb{E}_{\\pi_\\theta}[G_t]"}</Math>
    <p>Обновление весов методом градиентного подъёма:</p>
    <Math>{"\\theta_{t+1} = \\theta_t + \\alpha\\, \\nabla_\\theta J(\\theta_t)"}</Math>

    <h3 id="теорема-о-градиенте-политики" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Теорема о градиенте политики</h3>
    <Math>{"\\nabla_\\theta J(\\theta) \\propto \\sum_{s} d^{\\pi}(s) \\sum_{a} Q^\\pi(s,a)\\, \\nabla_\\theta \\pi_\\theta(a|s)"}</Math>
    <p>
      Здесь <Math display={false}>{"d^\\pi(s)"}</Math> — стационарное распределение состояний.
    </p>

    <h3 id="логарифмический-трюк-log-derivative-trick" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Логарифмический трюк (Log-derivative trick)</h3>
    <p>
      Из матанализа: <Math display={false}>{"\\nabla f(x) = f(x)\\, \\nabla \\ln f(x)"}</Math>. Применяя к <Math display={false}>{"\\pi_\\theta"}</Math>, преобразуем градиент в форму математического ожидания:
    </p>
    <Math>{"\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\!\\left[ G_t\\, \\nabla_\\theta \\ln \\pi_\\theta(A_t | S_t) \\right]"}</Math>

    <h3 id="алгоритм-reinforce" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Алгоритм REINFORCE</h3>
    <Math>{"\\theta_{t+1} = \\theta_t + \\alpha\\, G_t\\, \\nabla_\\theta \\ln \\pi_\\theta(A_t | S_t)"}</Math>

    <InfoBox variant="secondary">
      <p className="font-semibold text-foreground mb-2">Интуиция REINFORCE</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Вектор <Math display={false}>{"\\nabla_\\theta \\ln \\pi_\\theta(A_t|S_t)"}</Math> указывает направление, увеличивающее вероятность действия <Math display={false}>{"A_t"}</Math></li>
        <li><Math display={false}>{"G_t > 0"}</Math> — действие было хорошим → веса сдвигаются <em>в направлении</em> градиента (вероятность ↑)</li>
        <li><Math display={false}>{"G_t < 0"}</Math> — действие было плохим → веса сдвигаются <em>против</em> градиента (вероятность ↓)</li>
      </ul>
    </InfoBox>

    <h3 id="архитектура-актор-критик-actor-critic" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Архитектура Актор-Критик (Actor-Critic)</h3>
    <p>
      REINFORCE имеет колоссальную <strong className="text-foreground">дисперсию</strong>. Гибридная архитектура решает эту проблему, объединяя две сети:
    </p>
    <ul className="list-disc list-inside space-y-1">
      <li><strong className="text-primary">Актор</strong> — сеть политики <Math display={false}>{"\\pi_\\theta(a|s)"}</Math>, принимающая решения</li>
      <li><strong className="text-secondary">Критик</strong> — сеть функции ценности <Math display={false}>{"V_w(s)"}</Math>, оценивающая Актора</li>
    </ul>
    <p className="mt-3">
      Вместо зашумлённого <Math display={false}>{"G_t"}</Math> Критик на каждом шаге вычисляет TD-ошибку — «насколько реальность превзошла ожидания»:
    </p>
    <Math>{"\\theta_{t+1} = \\theta_t + \\alpha\\, \\delta_t\\, \\nabla_\\theta \\ln \\pi_\\theta(A_t | S_t)"}</Math>
    <Math>{"\\delta_t = R_{t+1} + \\gamma V_w(S_{t+1}) - V_w(S_t)"}</Math>
    <p>
      Архитектуры Actor-Critic лежат в основе передовых алгоритмов: <strong className="text-primary">PPO</strong> (Proximal Policy Optimization) и <strong className="text-primary">SAC</strong> (Soft Actor-Critic).
    </p>
  </Section>
);

export default Chapter9;
