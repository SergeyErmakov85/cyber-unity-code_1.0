import LessonLayout from "@/components/LessonLayout";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Gamepad2, Settings } from "lucide-react";

const quizQuestions = [
  {
    question: "Чем отличаются дискретные действия от непрерывных?",
    options: [
      "Дискретные используют GPU, непрерывные — CPU",
      "Дискретные — конечное множество (0,1,2), непрерывные — вещественные числа из диапазона",
      "Никакой разницы — это одно и то же",
      "Непрерывные работают только в Unity",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой компонент Unity отвечает за частоту принятия решений агентом?",
    options: [
      "BehaviorParameters",
      "DecisionRequester",
      "Agent.OnActionReceived",
      "RigidBody",
    ],
    correctIndex: 1,
  },
  {
    question: "Что делает метод CollectObservations в Unity ML-Agents?",
    options: [
      "Применяет действия к агенту",
      "Собирает данные о среде, которые агент использует для принятия решений",
      "Рассчитывает награду",
      "Инициализирует нейронную сеть",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем в Actor-Critic используются две отдельные «головы» сети?",
    options: [
      "Для увеличения скорости обучения в 2 раза",
      "Actor выбирает действия, Critic оценивает состояния — разные задачи",
      "Одна для training, другая для inference",
      "Две головы не используются — это одна сеть",
    ],
    correctIndex: 1,
  },
];

const CourseLesson2_3 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Дискретные vs непрерывные действия</h2>
        <p className="text-muted-foreground leading-relaxed">
          До сих пор мы работали с <strong className="text-foreground">дискретными действиями</strong>:
          агент выбирал из конечного набора (влево/вправо в CartPole). Но в реальных задачах — управление
          роботом, автопилот, физические симуляции — действия <strong className="text-primary"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="neural-networks" hubTitle="Unity ML-Agents — Нейросети">непрерывные</CrossLinkToHub></strong>:
          угол поворота, сила нажатия, скорость.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          В этом уроке мы разберём архитектуру Actor-Critic для непрерывных действий и реализуем
          полноценного агента в Unity ML-Agents.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="2-3"
      lessonTitle="Непрерывные действия и Actor-Critic в Unity"
      lessonNumber="2.3"
      duration="40 мин"
      tags={["#code", "#unity", "#mlagents", "#actor-critic"]}
      level={2}
      prevLesson={{ path: "/courses/2-2", title: "PPO с нуля" }}
      nextLesson={{ path: "/courses/2-4", title: "Unity ML-Agents" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Discrete vs Continuous */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-primary/30">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-primary" />
                  Дискретные
                </h3>
                <p className="text-xs text-muted-foreground">Конечное множество выборов</p>
                <CyberCodeBlock language="python" filename="discrete.py">
{`# Выход сети: logits для каждого действия
# action ∈ {0, 1, 2, 3}
logits = actor(state)  # shape: [4]
dist = Categorical(logits=logits)
action = dist.sample()  # → 2`}
                </CyberCodeBlock>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-secondary/30">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Settings className="w-4 h-4 text-secondary" />
                  Непрерывные
                </h3>
                <p className="text-xs text-muted-foreground">Вещественные числа из диапазона</p>
                <CyberCodeBlock language="python" filename="continuous.py">
{`# Выход сети: mean и std для Gaussian
# action ∈ [-1.0, 1.0]
mean, log_std = actor(state)
std = log_std.exp()
dist = Normal(mean, std)
action = dist.sample()  # → 0.73`}
                </CyberCodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Actor-Critic architecture */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/algorithms/ppo" hubAnchor="architecture" hubTitle="PPO — Архитектура Actor-Critic">Actor-Critic</CrossLinkToHub> архитектура</h2>
          <Card className="bg-card/40 border-primary/20 mb-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Actor</strong> — сеть политики, выбирает действия.
                <strong className="text-foreground"> Critic</strong> — сеть ценности, оценивает V(s).
                Общий backbone + раздельные головы.
              </div>
            </CardContent>
          </Card>

          <CyberCodeBlock language="python" filename="actor_critic_continuous.py">
{`import torch
import torch.nn as nn
from torch.distributions import Normal

class ContinuousActorCritic(nn.Module):
    def __init__(self, obs_dim, action_dim, hidden=256):
        super().__init__()
        # Shared backbone
        self.backbone = nn.Sequential(
            nn.Linear(obs_dim, hidden), nn.Tanh(),
            nn.Linear(hidden, hidden), nn.Tanh(),
        )
        # Actor head: outputs mean for each action dimension
        self.actor_mean = nn.Linear(hidden, action_dim)
        self.actor_log_std = nn.Parameter(torch.zeros(action_dim))
        
        # Critic head: outputs state value V(s)
        self.critic = nn.Linear(hidden, 1)

    def forward(self, state):
        h = self.backbone(state)
        mean = self.actor_mean(h)
        std = self.actor_log_std.exp()
        value = self.critic(h)
        return mean, std, value

    def act(self, state):
        mean, std, value = self.forward(torch.FloatTensor(state))
        dist = Normal(mean, std)
        action = dist.sample()
        action_clamped = action.clamp(-1.0, 1.0)  # Ограничиваем
        log_prob = dist.log_prob(action).sum(-1)
        return action_clamped.numpy(), log_prob, value.squeeze()`}
          </CyberCodeBlock>
        </section>

        {/* Unity setup */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Настройка Unity-сцены</h2>
          <div className="space-y-3">
            {[
              { step: "Agent", desc: "Создайте пустой GameObject, добавьте компонент Agent (наследник от Unity.MLAgents.Agent)." },
              { step: "BehaviorParameters", desc: "Определяет тип наблюдений и действий. Установите Continuous Actions: 2 (steering, throttle)." },
              { step: "DecisionRequester", desc: "Автоматически запрашивает решения. Decision Period = 5 (каждые 5 FixedUpdate)." },
              { step: "Observations", desc: "Vector Observation Size = 8 (скорость, позиция, направление, расстояние до цели)." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-card/40 border border-border/30">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono font-bold text-secondary text-xs">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.step}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YAML config */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Обучение">YAML-конфигурация</CrossLinkToHub> ML-Agents</h2>

          <CyberCodeBlock language="python" filename="trainer_config.yaml">
{`behaviors:
  CarAgent:
    trainer_type: ppo
    hyperparameters:
      batch_size: 1024
      buffer_size: 10240
      learning_rate: 3.0e-4
      beta: 5.0e-3          # entropy regularization
      epsilon: 0.2           # PPO clip
      lambd: 0.95            # GAE lambda
      num_epoch: 3
      learning_rate_schedule: linear
    network_settings:
      normalize: true
      hidden_units: 256
      num_layers: 2
      vis_encode_type: simple
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 500000
    time_horizon: 64
    summary_freq: 10000`}
          </CyberCodeBlock>
        </section>

        {/* C# Agent script */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">C# скрипт агента</h2>

          <CyberCodeBlock language="csharp" filename="CarAgent.cs">
{`using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class CarAgent : Agent
{
    public Transform target;
    private Rigidbody rb;
    
    public override void Initialize()
    {
        rb = GetComponent<Rigidbody>();
    }

    public override void OnEpisodeBegin()
    {
        // Сброс позиции агента
        transform.localPosition = new Vector3(0f, 0.5f, 0f);
        transform.localRotation = Quaternion.identity;
        rb.velocity = Vector3.zero;
        rb.angularVelocity = Vector3.zero;

        // Случайная позиция цели
        target.localPosition = new Vector3(
            Random.Range(-4f, 4f), 0.5f, Random.Range(-4f, 4f));
    }

    public override void CollectObservations(VectorSensor sensor)
    {
        // 8 наблюдений
        sensor.AddObservation(transform.localPosition);    // 3
        sensor.AddObservation(rb.velocity);                 // 3
        sensor.AddObservation(
            (target.localPosition - transform.localPosition).normalized); // 2 (x,z)
    }

    public override void OnActionReceived(ActionBuffers actions)
    {
        // Непрерывные действия: steering [-1,1] и throttle [-1,1]
        float steering = actions.ContinuousActions[0];
        float throttle = actions.ContinuousActions[1];

        // Применяем физику
        Vector3 force = transform.forward * throttle * 10f;
        rb.AddForce(force);
        transform.Rotate(0f, steering * 100f * Time.fixedDeltaTime, 0f);

        // Награда за приближение к цели
        float dist = Vector3.Distance(transform.localPosition, target.localPosition);
        AddReward(-dist * 0.001f);  // Штраф за расстояние

        if (dist < 1.0f)
        {
            AddReward(1.0f);    // Бонус за достижение цели
            EndEpisode();
        }

        // Штраф за выход за границы
        if (transform.localPosition.magnitude > 10f)
        {
            AddReward(-1.0f);
            EndEpisode();
        }
    }

    public override void Heuristic(in ActionBuffers actionsOut)
    {
        // Ручное управление для тестирования
        var continuous = actionsOut.ContinuousActions;
        continuous[0] = Input.GetAxis("Horizontal"); // steering
        continuous[1] = Input.GetAxis("Vertical");   // throttle
    }
}`}
          </CyberCodeBlock>
        </section>

        {/* Quiz */}
        <Quiz title="Проверь себя: Actor-Critic и Unity" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson2_3;
