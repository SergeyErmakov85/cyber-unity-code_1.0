import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Swords } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Что означает 'posthumous credit assignment' в MA-POCA?",
    options: [
      "Агенты получают награду после смерти",
      "Распределение заслуг между агентами, даже если один выбыл из игры",
      "Посмертная оценка Q-функции",
      "Метод сохранения весов после обучения",
    ],
    correctIndex: 1,
  },
  {
    question: "В чём проблема non-stationarity в мультиагентном обучении?",
    options: [
      "Среда слишком быстро меняется",
      "Политики других агентов меняются — среда с точки зрения одного агента нестационарна",
      "Нейросеть не сходится к стационарному решению",
      "Non-stationarity не является проблемой",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем используется Self-Play?",
    options: [
      "Для обучения без GPU",
      "Агент играет против копий себя — автоматически усложняющийся противник",
      "Для ускорения inference",
      "Self-Play не используется в ML-Agents",
    ],
    correctIndex: 1,
  },
  {
    question: "Что регулирует параметр swap_steps в Self-Play?",
    options: [
      "Количество шагов обучения",
      "Как часто текущая политика заменяет противника",
      "Размер батча",
      "Частоту обновления target network",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой рейтинг используется для отслеживания прогресса Self-Play?",
    options: [
      "MMR",
      "ELO",
      "TrueSkill",
      "Никакой — только reward",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_2 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Типы мультиагентных задач</h2>
        <p className="text-muted-foreground leading-relaxed">
          Реальный мир — мультиагентный. Роботы координируют доставку, NPC сражаются в командах,
          беспилотники формируют стаи. <strong className="text-foreground">Многоагентное обучение (MARL)</strong>
          — одна из самых сложных и перспективных областей RL.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Unity ML-Agents предоставляет мощные инструменты для MARL: <strong className="text-primary"><CrossLinkToHub hubPath="/deep-rl" hubAnchor="algorithms" hubTitle="Deep RL — ключевые алгоритмы">MA-POCA</CrossLinkToHub></strong>
          для кооперативных задач и <strong className="text-secondary"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — обучение и self-play">Self-Play</CrossLinkToHub></strong> для конкурентных.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-2"
      lessonTitle="Многоагентное обучение: MA-POCA и Self-Play"
      lessonNumber="3.2"
      duration="45 мин"
      tags={["#mlagents", "#multiagent", "#mapoca", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/3-1", title: "SAC" }}
      nextLesson={{ path: "/courses/3-3", title: "Curriculum Learning" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Types */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Users, title: "Cooperative", desc: "Агенты работают вместе к общей цели. Пример: перенос тяжёлого объекта.", color: "text-primary" },
              { icon: Swords, title: "Competitive", desc: "Агенты соревнуются друг с другом. Пример: шахматы, футбол 1v1.", color: "text-destructive" },
              { icon: Users, title: "Mixed", desc: "Команды кооперируют внутри, конкурируют между собой. Пример: Soccer 2v2.", color: "text-secondary", link: "/unity-projects/soccer" },
            ].map((item, i) => (
              <Card key={i} className="bg-card/50 border-border/40">
                <CardContent className="p-5 space-y-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* MA-POCA */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">MA-POCA</h2>
          <Card className="bg-card/40 border-primary/20 mb-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Multi-Agent POsthumous Credit Assignment</strong> —
                алгоритм от Unity, решающий проблему распределения заслуг в кооперативных задачах.
                Даже если агент выбывает из игры, его вклад учитывается через attention-механизм.
              </div>
            </CardContent>
          </Card>

          <CyberCodeBlock language="python" filename="mapoca_config.yaml">
{`behaviors:
  SoccerPlayer:
    trainer_type: poca         # MA-POCA
    hyperparameters:
      batch_size: 2048
      buffer_size: 20480
      learning_rate: 3.0e-4
      beta: 0.01               # Entropy для исследования
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
    network_settings:
      normalize: true
      hidden_units: 512
      num_layers: 3
      memory:
        memory_size: 256       # LSTM для запоминания
        sequence_length: 64
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 5000000
    time_horizon: 128`}
          </CyberCodeBlock>
        </section>

        {/* Self-Play */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Self-Play">Self-Play</CrossLinkToHub></h2>
          <CyberCodeBlock language="python" filename="self_play_config.yaml">
{`behaviors:
  SoccerPlayer:
    trainer_type: poca
    self_play:
      save_steps: 20000        # Как часто сохранять «снимок» политики
      swap_steps: 10000        # Как часто менять противника
      team_change: 100000      # Смена команд для баланса
      play_against_latest_model_ratio: 0.5  # 50% игр vs последняя модель
      window: 10               # Пул последних N моделей-противников

    # ELO рейтинг отслеживается автоматически в TensorBoard
    # Environment/Self-Play ELO`}
          </CyberCodeBlock>

          <div className="mt-4 space-y-3">
            {[
              { step: "Начало", desc: "Агент играет против случайной копии себя" },
              { step: "Развитие", desc: "По мере обучения, противник обновляется — сложность растёт автоматически" },
              { step: "ELO", desc: "Рейтинг отслеживает прогресс: если ELO растёт — агент улучшается" },
              { step: "Пул", desc: "Противники выбираются из пула последних N моделей для разнообразия" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-secondary">{i + 1}</span>
                </div>
                <div>
                  <span className="font-semibold text-sm text-foreground">{item.step}:</span>
                  <span className="text-sm text-muted-foreground ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C# TeamManager */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">C#: Team Manager и Group Reward</h2>
          <CyberCodeBlock language="csharp" filename="SoccerAgent.cs">
{`using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class SoccerAgent : Agent
{
    [Header("Team Settings")]
    public int teamId;              // 0 или 1
    public Transform ball;
    public Transform opponentGoal;

    private SimpleMultiAgentGroup agentGroup;
    private Rigidbody rb;

    public override void Initialize()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Вызывается менеджером команды
    public void SetAgentGroup(SimpleMultiAgentGroup group)
    {
        agentGroup = group;
    }

    public override void CollectObservations(VectorSensor sensor)
    {
        // Позиция агента (относительно поля)
        sensor.AddObservation(transform.localPosition / 10f);
        // Скорость
        sensor.AddObservation(rb.velocity / 20f);
        // Позиция мяча
        sensor.AddObservation(ball.localPosition / 10f);
        // Направление к воротам соперника
        Vector3 toGoal = (opponentGoal.position - transform.position).normalized;
        sensor.AddObservation(toGoal);
    }

    public override void OnActionReceived(ActionBuffers actions)
    {
        float moveX = actions.ContinuousActions[0];
        float moveZ = actions.ContinuousActions[1];
        rb.AddForce(new Vector3(moveX, 0, moveZ) * 10f);
    }

    // Вызывается при забитом голе
    public void OnGoalScored(int scoringTeam)
    {
        if (scoringTeam == teamId)
        {
            // Групповая награда — ВСЯ команда получает +1
            agentGroup.AddGroupReward(1.0f);
        }
        else
        {
            agentGroup.AddGroupReward(-1.0f);
        }
        agentGroup.EndGroupEpisode();
    }
}`}
          </CyberCodeBlock>
        </section>

        {/* Non-stationarity */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Проблема Non-Stationarity</h2>
          <Card className="bg-card/40 border-accent/20">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Проблема:</strong> когда все агенты учатся одновременно,
                среда с точки зрения каждого агента постоянно меняется (другие агенты меняют поведение).
                Это нарушает предположение о стационарности MDP.
                <br /><br />
                <strong className="text-foreground">Решения:</strong> centralized training + decentralized
                execution (CTDE), MA-POCA attention, experience replay с experience от разных версий политик.
              </div>
            </CardContent>
          </Card>
        </section>

        <Quiz title="Проверь себя: MARL" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_2;
