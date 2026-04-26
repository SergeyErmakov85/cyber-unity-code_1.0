import LessonLayout from "@/components/LessonLayout";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Math from "@/components/Math";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Zap } from "lucide-react";

const quizQuestions = [
  {
    question: "Зачем PPO использует clipping вместо KL-divergence (как в TRPO)?",
    options: [
      "Clipping точнее вычисляет градиент",
      "Clipping проще в реализации и эффективнее вычислительно",
      "KL-divergence не работает с нейросетями",
      "Clipping увеличивает entropy",
    ],
    correctIndex: 1,
  },
  {
    question: "Что ограничивает параметр ε в clipped objective?",
    options: [
      "Размер батча",
      "Максимальное изменение политики за один шаг",
      "Скорость обучения",
      "Количество эпизодов",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем добавляется entropy bonus в функцию потерь PPO?",
    options: [
      "Для ускорения обучения",
      "Для поощрения исследования и предотвращения преждевременной сходимости",
      "Для уменьшения размера сети",
      "Entropy bonus не используется в PPO",
    ],
    correctIndex: 1,
  },
  {
    question: "Что вычисляет GAE (Generalized Advantage Estimation)?",
    options: [
      "Точную Q-функцию",
      "Взвешенную сумму n-step advantages с параметром λ",
      "Скорость обучения для каждого слоя",
      "Оптимальную политику",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой типичный диапазон для ε в PPO clipping?",
    options: [
      "0.001 — 0.01",
      "0.1 — 0.3",
      "0.5 — 1.0",
      "1.0 — 10.0",
    ],
    correctIndex: 1,
  },
];

const CourseLesson2_2 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Почему PPO стал стандартом</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Proximal Policy Optimization (PPO)</strong> — алгоритм от OpenAI (2017),
          ставший де-факто стандартом в индустрии. Его используют OpenAI для обучения ChatGPT (RLHF),
          Unity ML-Agents как алгоритм по умолчанию, а также DeepMind, Tesla и другие.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          PPO сочетает стабильность TRPO с простотой реализации обычного Policy Gradient.
          Ключевая идея — ограничить шаг обновления политики, чтобы новая политика не отклонялась
          слишком сильно от старой.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="2-2"
      lessonTitle="PPO — реализация с нуля"
      lessonNumber="2.2"
      duration="45 мин"
      tags={["#code", "#pytorch", "#ppo", "#key-algorithm"]}
      level={2}
      prevLesson={{ path: "/courses/2-1", title: "Policy Gradient" }}
      nextLesson={{ path: "/courses/2-3", title: "Actor-Critic в Unity" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Colab */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Открыть в Google Colab
            </a>
          </Button>
        </div>

        {/* Why PPO */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Zap, title: "Простота", desc: "Реализуется в ~150 строк, без сложных вычислений как в TRPO" },
              { icon: Lightbulb, title: "Стабильность", desc: "Clipping предотвращает катастрофические обновления" },
              { icon: Zap, title: "Универсальность", desc: "Работает с дискретными и непрерывными действиями" },
            ].map((item, i) => (
              <Card key={i} className="bg-card/50 border-border/40">
                <CardContent className="p-4 space-y-2">
                  <item.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Clipped objective */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/algorithms/ppo" hubAnchor="clipped" hubTitle="PPO — Clipped Objective">Clipped Surrogate Objective</CrossLinkToHub></h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ratio между новой и старой политикой:
          </p>

          <Math>{"r_t(\\theta) = \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\theta_{old}}(a_t | s_t)}"}</Math>

          <p className="text-muted-foreground leading-relaxed my-4">
            Clipped objective — берём минимум из обычного и обрезанного ratio:
          </p>

          <Math>{"L^{CLIP}(\\theta) = \\mathbb{E}_t \\left[ \\min\\left( r_t(\\theta) \\hat{A}_t, \\; \\text{clip}(r_t(\\theta), 1-\\varepsilon, 1+\\varepsilon) \\hat{A}_t \\right) \\right]"}</Math>

          <Card className="bg-card/40 border-primary/20 mt-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Интуиция:</strong> если advantage положительный
                (действие хорошее), мы хотим увеличить его вероятность, но не более чем в (1+ε) раз.
                Если отрицательный — уменьшить, но не более чем в (1-ε) раз. Типичное ε = 0.2.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Entropy bonus */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Entropy Bonus</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Добавляем бонус за энтропию, чтобы агент не переставал исследовать:
          </p>
          <Math>{"L = L^{CLIP} - c_1 L^{VF} + c_2 H[\\pi_\\theta](s)"}</Math>
          <p className="text-sm text-muted-foreground mt-2">
            где c₂ ≈ 0.01 — коэффициент <CrossLinkToHub hubPath="/math-rl/module-5" hubAnchor="глава-9" hubTitle="Математика RL — Глава 9. Policy Gradients и энтропия">entropy bonus</CrossLinkToHub>, H — энтропия распределения действий.
          </p>
        </section>

        {/* GAE */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/algorithms/ppo" hubAnchor="gae" hubTitle="PPO — GAE">GAE (Generalized Advantage Estimation)</CrossLinkToHub></h2>
          <Math>{"\\hat{A}_t^{GAE(\\gamma, \\lambda)} = \\sum_{l=0}^{\\infty} (\\gamma \\lambda)^l \\delta_{t+l}"}</Math>
          <p className="text-sm text-muted-foreground mt-2">
            где <Math display={false}>{"\\delta_t = r_t + \\gamma V(s_{t+1}) - V(s_t)"}</Math> — TD-ошибка.
            λ=0 даёт TD(0), λ=1 — Monte Carlo. Обычно λ=0.95.
          </p>
        </section>

        {/* Full PPO code */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Полный код PPOAgent</h2>

          <CyberCodeBlock language="python" filename="ppo_agent.py">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Categorical
import gymnasium as gym
import numpy as np

class ActorCritic(nn.Module):
    def __init__(self, obs_dim=4, n_actions=2, hidden=64):
        super().__init__()
        self.shared = nn.Sequential(
            nn.Linear(obs_dim, hidden), nn.Tanh(),
            nn.Linear(hidden, hidden), nn.Tanh(),
        )
        self.actor = nn.Linear(hidden, n_actions)
        self.critic = nn.Linear(hidden, 1)

    def forward(self, x):
        h = self.shared(x)
        return self.actor(h), self.critic(h)

    def act(self, state):
        logits, value = self.forward(torch.FloatTensor(state))
        dist = Categorical(logits=logits)
        action = dist.sample()
        return action.item(), dist.log_prob(action), value.squeeze()

class PPOAgent:
    def __init__(self, lr=3e-4, gamma=0.99, lam=0.95, eps_clip=0.2,
                 entropy_coef=0.01, epochs=4, batch_size=64):
        self.model = ActorCritic()
        self.optimizer = optim.Adam(self.model.parameters(), lr=lr)
        self.gamma = gamma
        self.lam = lam
        self.eps_clip = eps_clip
        self.entropy_coef = entropy_coef
        self.epochs = epochs
        self.batch_size = batch_size

    def compute_gae(self, rewards, values, dones):
        advantages = []
        gae = 0
        values = values + [0]
        for t in reversed(range(len(rewards))):
            delta = rewards[t] + self.gamma * values[t+1] * (1-dones[t]) - values[t]
            gae = delta + self.gamma * self.lam * (1-dones[t]) * gae
            advantages.insert(0, gae)
        returns = [a + v for a, v in zip(advantages, values[:-1])]
        return advantages, returns

    def update(self, states, actions, old_log_probs, returns, advantages):
        states = torch.FloatTensor(np.array(states))
        actions = torch.LongTensor(actions)
        old_log_probs = torch.FloatTensor(old_log_probs)
        returns = torch.FloatTensor(returns)
        advantages = torch.FloatTensor(advantages)
        advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

        for _ in range(self.epochs):
            indices = np.random.permutation(len(states))
            for start in range(0, len(states), self.batch_size):
                idx = indices[start:start + self.batch_size]
                b_states = states[idx]
                b_actions = actions[idx]
                b_old_lp = old_log_probs[idx]
                b_returns = returns[idx]
                b_adv = advantages[idx]

                logits, values = self.model(b_states)
                dist = Categorical(logits=logits)
                new_lp = dist.log_prob(b_actions)
                entropy = dist.entropy().mean()

                # PPO clipped objective
                ratio = (new_lp - b_old_lp).exp()
                surr1 = ratio * b_adv
                surr2 = ratio.clamp(1-self.eps_clip, 1+self.eps_clip) * b_adv
                actor_loss = -torch.min(surr1, surr2).mean()

                critic_loss = nn.MSELoss()(values.squeeze(), b_returns)

                loss = actor_loss + 0.5 * critic_loss - self.entropy_coef * entropy

                self.optimizer.zero_grad()
                loss.backward()
                nn.utils.clip_grad_norm_(self.model.parameters(), 0.5)
                self.optimizer.step()

def train_ppo(episodes=500):
    env = gym.make("CartPole-v1")
    agent = PPOAgent()
    rewards_history = []

    for ep in range(episodes):
        states, actions, log_probs, rewards, values, dones = [], [], [], [], [], []
        state, _ = env.reset()

        while True:
            action, lp, val = agent.model.act(state)
            next_state, reward, term, trunc, _ = env.step(action)
            done = term or trunc

            states.append(state)
            actions.append(action)
            log_probs.append(lp.item())
            rewards.append(reward)
            values.append(val.item())
            dones.append(float(done))

            state = next_state
            if done:
                break

        advantages, returns = agent.compute_gae(rewards, values, dones)
        agent.update(states, actions, log_probs, returns, advantages)
        rewards_history.append(sum(rewards))

        if (ep+1) % 50 == 0:
            avg = np.mean(rewards_history[-50:])
            print(f"Ep {ep+1} | Avg: {avg:.1f}")

    return rewards_history

history = train_ppo()`}
          </CyberCodeBlock>
        </section>

        {/* DQN vs PPO comparison */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">PPO vs DQN на CartPole</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-muted-foreground">Метрика</th>
                  <th className="text-left py-2 px-3 text-primary">DQN</th>
                  <th className="text-left py-2 px-3 text-secondary">PPO</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: "Конвергенция (reward>475)", dqn: "~300-400 эпизодов", ppo: "~200-300 эпизодов" },
                  { m: "Стабильность", dqn: "Средняя", ppo: "Высокая (clipping)" },
                  { m: "Replay Buffer", dqn: "Да (100K+)", ppo: "Нет (on-policy)" },
                  { m: "Простота кода", dqn: "~80 строк", ppo: "~120 строк" },
                  { m: "Непрерывные действия", dqn: "❌", ppo: "✅" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-2 px-3 text-foreground">{row.m}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.dqn}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.ppo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Проверь себя: PPO" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson2_2;
