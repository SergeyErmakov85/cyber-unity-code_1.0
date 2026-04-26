import { Box } from "lucide-react";
import Math from "@/components/Math";
import { Section, InfoBox } from "./Section";
import { MDPTreeViz } from "./Module5Charts";

const Chapter3 = () => (
  <Section icon={<Box className="w-5 h-5 text-primary" />} title="Глава 3. Марковские процессы принятия решений (MDP)" id="глава-3">
    <p>
      В реальных задачах текущее действие агента влияет не только на сиюминутную награду, но и на то, в какой ситуации он окажется на следующем шаге. Для описания таких сред используется мощный аппарат — <strong className="text-foreground">Марковские процессы принятия решений</strong>.
    </p>
    <p>
      Математически MDP задаётся кортежем из пяти элементов: <Math display={false}>{"(S, A, P, R, \\gamma)"}</Math>.
    </p>

    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-3 text-primary">Элемент</th>
            <th className="text-left py-2 px-3 text-foreground">Описание</th>
            <th className="text-left py-2 px-3 text-muted-foreground">Проекция на Unity ML-Agents</th>
          </tr>
        </thead>
        <tbody>
          {[
            { e: "S", d: "Пространство состояний — множество всех возможных ситуаций", u: "Вектор из CollectObservations: позиции, скорости, Raycast" },
            { e: "A", d: "Пространство действий — дискретные или непрерывные", u: "DiscreteActions / ContinuousActions в OnActionReceived" },
            { e: "P", d: "Вероятности переходов p(s'|s,a)", u: "Физический движок PhysX просчитывает переходы" },
            { e: "R", d: "Функция награды R(s, a, s')", u: "AddReward(1.0f) при успехе, AddReward(-1.0f) при ошибке" },
            { e: "γ", d: "Фактор дисконтирования ∈ [0, 1)", u: "Параметр gamma в конфигурационном .yaml файле" },
          ].map((row, i) => (
            <tr key={i} className="border-b border-border/20">
              <td className="py-2 px-3 text-primary font-mono font-bold">{row.e}</td>
              <td className="py-2 px-3 text-foreground">{row.d}</td>
              <td className="py-2 px-3 text-muted-foreground text-xs">{row.u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 id="марковское-свойство" className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">Марковское свойство</h3>
    <p>
      Центральное свойство MDP: будущее зависит <em>исключительно</em> от текущего состояния и действия, а не от всей истории:
    </p>
    <Math>{"P(S_{t+1}=s',\\, R_{t+1}=r \\mid S_0, A_0, \\ldots, S_t, A_t) = P(S_{t+1}=s',\\, R_{t+1}=r \\mid S_t, A_t)"}</Math>

    <InfoBox variant="accent">
      <p className="font-semibold text-foreground mb-2">Интуиция: Фотография футбольного мяча</p>
      <p className="text-sm">
        Если состояние — только координаты мяча <Math display={false}>{"(x, y, z)"}</Math>, оно <strong className="text-foreground">не является Марковским</strong>: по фотографии нельзя предсказать траекторию. Но если добавить векторы скорости и ускорения, новое состояние становится полностью Марковским — текущих данных достаточно для предсказания будущего.
      </p>
      <p className="text-sm mt-2">
        <strong className="text-primary">В Unity ML-Agents:</strong> если вы забудете добавить критический параметр в <code className="text-primary">CollectObservations</code> (например, время перезарядки оружия NPC), алгоритмы будут работать нестабильно.
      </p>
    </InfoBox>

    <MDPTreeViz />
  </Section>
);

export default Chapter3;
