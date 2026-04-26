import { GraduationCap } from "lucide-react";
import Math from "@/components/Math";
import { Section, GlossaryItem } from "./Section";

const Conclusion = () => (
  <>
    <Section icon={<GraduationCap className="w-5 h-5 text-secondary" />} title="Заключение">
      <p>
        Мы выстроили логическую цепь от простейшей теории вероятностей до сложных нейросетевых архитектур. Дилемма исследования и использования формализуется через оценку уверенности (UCB). Взаимодействие агента с миром укладывается в рамки MDP, где каждое состояние должно инкапсулировать всю необходимую историю.
      </p>
      <p>
        Желание максимизировать дисконтированный возврат приводит к рекурсивным уравнениям Беллмана — алгебраическому сердцу дисциплины. Невозможность аналитического решения в условиях неопределённости породила TD-learning с бутстраппингом, а следы пригодности продемонстрировали изящный способ решения проблемы распределения кредита. Проклятие размерности привело к интеграции нейросетей, открыв путь к DQN и Policy Gradient методам.
      </p>
      <p>
        Системное владение математическим аппаратом превращает инженера из «оператора чёрного ящика» в архитектора интеллектуальных систем, способного осознанно формировать векторы состояний, проектировать функции наград и настраивать параметры сходимости.
      </p>
    </Section>

    <Section icon={<GraduationCap className="w-5 h-5 text-primary" />} title="Мини-глоссарий">
      <div className="space-y-4">
        <GlossaryItem term="Математическое ожидание" formula={"\\mathbb{E}[X] = \\sum_x x \\cdot P(X=x)"} definition="Среднее взвешенное всех возможных значений случайной величины. Центральное понятие оптимизации в RL." />
        <GlossaryItem term="Марковское свойство" formula={"P(S_{t+1}|S_0,...,S_t,A_t) = P(S_{t+1}|S_t,A_t)"} definition="Будущее зависит только от текущего состояния и действия, а не от истории." />
        <GlossaryItem term="Дисконтирование" formula={"\\gamma^t,\\; 0 \\leq \\gamma < 1"} definition="Будущие награды обесцениваются экспоненциально. Гарантирует конечность бесконечных сумм." />
        <GlossaryItem term="Функция ценности" formula={"V_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\mid S_0 = s\\right]"} definition="Ожидаемый суммарный дисконтированный возврат из состояния s при политике π." />
        <GlossaryItem term="Уравнение Беллмана" formula={"V_\\pi(s) = \\sum_a \\pi(a|s)\\sum_{s'}P(s'|s,a)[R + \\gamma V_\\pi(s')]"} definition="Рекуррентное соотношение, связывающее ценности текущего и будущих состояний." />
        <GlossaryItem term="TD-ошибка" formula={"\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)"} definition="Разница между целью (Target) и текущей оценкой. Основа TD-обучения." />
        <GlossaryItem term="Q-обучение" formula={"Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[R + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\big]"} definition="Off-policy алгоритм, сходящийся к Q* при посещении всех пар (s,a)." />
        <GlossaryItem term="Контрактное отображение" formula={"d(F(x), F(y)) \\leq \\kappa\\, d(x, y),\\; \\kappa < 1"} definition="Имеет единственную неподвижную точку. Оператор Беллмана — γ-сжатие." />
        <GlossaryItem term="Policy Gradient" formula={"\\nabla_\\theta J = \\mathbb{E}[G_t \\nabla_\\theta \\ln \\pi_\\theta(A_t|S_t)]"} definition="Прямая оптимизация параметров политики через градиентный подъём." />
        <GlossaryItem term="Actor-Critic" formula={"\\theta \\leftarrow \\theta + \\alpha \\delta_t \\nabla_\\theta \\ln \\pi_\\theta(A_t|S_t)"} definition="Гибрид: Актор (политика) + Критик (оценка ценности). Основа PPO и SAC." />
      </div>
    </Section>
  </>
);

export default Conclusion;
