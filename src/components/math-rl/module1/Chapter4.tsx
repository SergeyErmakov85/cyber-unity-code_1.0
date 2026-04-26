import { TrendingUp } from "lucide-react";
import Math from "@/components/Math";
import { Section, InfoBox } from "./Section";

const Chapter4 = () => (
  <Section icon={<TrendingUp className="w-5 h-5 text-secondary" />} title="Глава 4. Возврат, политики и функции ценности" id="глава-4">
    <h3 id="возврат-return" className="scroll-mt-28 text-xl font-semibold text-foreground mt-6 mb-3">Возврат (Return)</h3>
    <p>
      Агент стремится максимизировать совокупную награду — <strong className="text-foreground">возврат</strong> <Math display={false}>{"G_t"}</Math>.
    </p>
    <p>Для <strong className="text-foreground">эпизодических задач</strong> (с чётким завершением):</p>
    <Math>{"G_t = R_{t+1} + R_{t+2} + R_{t+3} + \\dots + R_T"}</Math>
    <p>Для <strong className="text-foreground">непрерывных задач</strong> (без терминального состояния, <Math display={false}>{"T = \\infty"}</Math>) простая сумма расходится. Решение — <strong className="text-primary">фактор дисконтирования</strong> <Math display={false}>{"\\gamma"}</Math>:</p>
    <Math>{"G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\dots = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}"}</Math>

    <InfoBox>
      <p className="font-semibold text-foreground mb-2">Интуитивный смысл γ — «горизонт планирования»</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><Math display={false}>{"\\gamma = 0"}</Math> — агент абсолютно близорук, учитывает только немедленную награду</li>
        <li><Math display={false}>{"\\gamma = 0.99"}</Math> — агент крайне дальновиден</li>
        <li>Эффективный горизонт ≈ <Math display={false}>{"\\frac{1}{1-\\gamma}"}</Math> шагов</li>
      </ul>
      <p className="text-sm mt-2">
        <strong className="text-primary">На практике:</strong> при обучении робота с разреженной наградой (Sparse Reward) <Math display={false}>{"\\gamma"}</Math> должно быть очень близко к 1, чтобы сигнал награды смог «дотянуться» до первых шагов эпизода.
      </p>
    </InfoBox>

    <h3 id="политика-policy" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Политика (Policy)</h3>
    <p>
      Поведение агента формализуется <strong className="text-foreground">политикой</strong> <Math display={false}>{"\\pi"}</Math> — функцией, сопоставляющей состояниям вероятности выбора действий. Запись <Math display={false}>{"\\pi(a|s)"}</Math> означает: вероятность выбрать действие <Math display={false}>{"a"}</Math> в состоянии <Math display={false}>{"s"}</Math>.
    </p>

    <h3 id="функции-ценности-value-functions" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Функции ценности (Value Functions)</h3>
    <p>
      <strong className="text-foreground">Функция ценности состояния</strong> <Math display={false}>{"V_\\pi(s)"}</Math> — «насколько выгодно находиться в состоянии <Math display={false}>{"s"}</Math>, следуя политике <Math display={false}>{"\\pi"}</Math>?»:
    </p>
    <Math>{"V_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s\\right]"}</Math>

    <p className="mt-4">
      <strong className="text-foreground">Функция ценности действия</strong> <Math display={false}>{"Q_\\pi(s, a)"}</Math> — «насколько выгодно совершить действие <Math display={false}>{"a"}</Math> в состоянии <Math display={false}>{"s"}</Math>, а далее следовать <Math display={false}>{"\\pi"}</Math>?»:
    </p>
    <Math>{"Q_\\pi(s, a) = \\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s,\\, A_0 = a\\right]"}</Math>

    <p className="mt-4">Элегантная связь между ними:</p>
    <Math>{"V_\\pi(s) = \\sum_{a \\in A} \\pi(a|s)\\, Q_\\pi(s, a)"}</Math>
  </Section>
);

export default Chapter4;
