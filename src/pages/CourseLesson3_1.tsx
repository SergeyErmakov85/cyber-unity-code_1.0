import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Math from "@/components/Math";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Shield } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Какой принцип лежит в основе SAC?",
    options: [
      "Минимизация энтропии политики",
      "Максимизация суммы reward и энтропии политики",
      "Максимизация только Q-значений",
      "Минимизация KL-divergence между политиками",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем в SAC используются две Q-сети (twin critics)?",
    options: [
      "Для ускорения обучения в 2 раза",
      "Для борьбы с переоценкой Q-значений — берётся минимум из двух",
      "Одна для training, другая для inference",
      "Twin critics не используются в SAC",
    ],
    correctIndex: 1,
  },
  {
    question: "Что делает температурный параметр α в SAC?",
    options: [
      "Определяет learning rate",
      "Контролирует баланс между reward и энтропией (стохастичностью)",
      "Управляет размером replay buffer",
      "Фиксирует epsilon для exploration",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой trick позволяет SAC использовать градиенты через сэмплирование?",
    options: [
      "Log-trick",
      "Reparameterization trick: a = μ + σ·ε, ε ~ N(0,1)",
      "Importance sampling",
      "Straight-through estimator",
    ],
    correctIndex: 1,
  },
  {
    question: "Когда SAC предпочтительнее PPO?",
    options: [
      "Всегда — SAC лучше во всём",
      "В задачах с непрерывными действиями и когда важна sample efficiency",
      "Только в дискретных задачах",
      "SAC и PPO идентичны по производительности",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_1 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Принцип <CrossLinkToHub hubPath="/math-rl/module-5" hubAnchor="глава-9" hubTitle="Математика RL — Глава 9. Policy Gradients">максимальной энтропии</CrossLinkToHub></h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground"><CrossLinkToHub hubPath="/algorithms/sac" hubAnchor="entropy" hubTitle="SAC — Максимальная энтропия">Soft Actor-Critic (SAC)</CrossLinkToHub></strong> — state-of-the-art off-policy
          алгоритм для задач с непрерывными действиями. В отличие от PPO, SAC максимизирует не только
          reward, но и <strong className="text-primary">энтропию политики</strong> — агент стремится быть
          максимально стохастичным при достижении высокой награды.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Зачем? Стохастичная политика лучше исследует среду, более робастна к изменениям
          и находит несколько способов решения задачи вместо одного.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-1"
      lessonTitle="SAC — Soft Actor-Critic"
      lessonNumber="3.1"
      duration="45 мин"
      tags={["#code", "#pytorch", "#sac", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/project-3", title: "Проект 3" }}
      nextLesson={{ path: "/courses/3-2", title: "MA-POCA и Self-Play" }}
    >
      <ProGate preview={preview}>
        {preview}

        <div className="flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Открыть в Google Colab
            </a>
          </Button>
        </div>

        {/* Entropy-augmented objective */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Entropy-augmented Objective</h2>
          <Math>{"J(\\pi) = \\sum_{t=0}^{T} \\mathbb{E}_{(s_t, a_t) \\sim \\rho_\\pi} \\left[ r(s_t, a_t) + \\alpha \\mathcal{H}(\\pi(\\cdot | s_t)) \\right]"}</Math>
          <p className="text-sm text-muted-foreground mt-2">
            α — температура, контролирующая баланс. При α→0 SAC превращается в обычный actor-critic.
          </p>
        </section>

        {/* Temperature auto-tuning */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Автоматическая настройка α</h2>
          <Card className="bg-card/40 border-primary/20 mb-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                Вместо ручного подбора α, SAC оптимизирует его автоматически, решая задачу:
              </div>
            </CardContent>
          </Card>
          <Math>{"\\alpha^* = \\arg\\min_\\alpha \\mathbb{E}_{a_t \\sim \\pi_t} \\left[ -\\alpha \\log \\pi_t(a_t | s_t) - \\alpha \\bar{\\mathcal{H}} \\right]"}</Math>
          <p className="text-sm text-muted-foreground mt-2">
            где <Math display={false}>{"\\bar{\\mathcal{H}}"}</Math> — целевая энтропия (обычно = −dim(A)).
          </p>
        </section>

        {/* Twin critics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4"><CrossLinkToHub hubPath="/algorithms/sac" hubAnchor="architecture" hubTitle="SAC — Архитектура Twin Critics">Twin Critics</CrossLinkToHub></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-5 space-y-2">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Проблема переоценки</h3>
                <p className="text-xs text-muted-foreground">
                  Одна Q-сеть склонна переоценивать Q-значения. Ошибка накапливается через bootstrap.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-5 space-y-2">
                <Shield className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-sm text-foreground">Решение: min(Q₁, Q₂)</h3>
                <p className="text-xs text-muted-foreground">
                  Две независимые Q-сети. Для target берём минимум — пессимистичная оценка стабильнее.
                </p>
              </CardContent>
            </Card>
          </div>
          <Math>{"y = r + \\gamma \\left( \\min_{i=1,2} Q_{\\theta_i'}(s', \\tilde{a}') - \\alpha \\log \\pi_\\phi(\\tilde{a}' | s') \\right)"}</Math>
        </section>

        {/* Reparameterization */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Reparameterization Trick</h2>
          <Math>{"a_\\theta(s, \\xi) = \\tanh\\left( \\mu_\\theta(s) + \\sigma_\\theta(s) \\odot \\xi \\right), \\quad \\xi \\sim \\mathcal{N}(0, I)"}</Math>
          <p className="text-sm text-muted-foreground mt-2">
            Позволяет вычислять градиенты через сэмплирование. tanh ограничивает действия в [-1, 1].
          </p>
        </section>

        {/* Full SAC code */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Полная реализация SAC</h2>
          <CyberCodeBlock language="python" filename="sac_agent.py">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Normal
import numpy as np
from collections import deque
import random

# ── Сети ───────────────────────────────────────────────
class GaussianPolicy(nn.Module):
    def __init__(self, obs_dim, act_dim, hidden=256):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
        )
        self.mean = nn.Linear(hidden, act_dim)
        self.log_std = nn.Linear(hidden, act_dim)

    def forward(self, state):
        h = self.net(state)
        mean = self.mean(h)
        log_std = self.log_std(h).clamp(-20, 2)
        return mean, log_std

    def sample(self, state):
        mean, log_std = self.forward(state)
        std = log_std.exp()
        normal = Normal(mean, std)
        # Reparameterization trick
        x = normal.rsample()
        action = torch.tanh(x)
        # Log prob с коррекцией tanh
        log_prob = normal.log_prob(x) - torch.log(1 - action.pow(2) + 1e-6)
        log_prob = log_prob.sum(-1, keepdim=True)
        return action, log_prob

class TwinQNetwork(nn.Module):
    def __init__(self, obs_dim, act_dim, hidden=256):
        super().__init__()
        self.q1 = nn.Sequential(
            nn.Linear(obs_dim + act_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, 1))
        self.q2 = nn.Sequential(
            nn.Linear(obs_dim + act_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, 1))

    def forward(self, state, action):
        x = torch.cat([state, action], dim=-1)
        return self.q1(x), self.q2(x)

# ── SAC Agent ──────────────────────────────────────────
class SACAgent:
    def __init__(self, obs_dim, act_dim, lr=3e-4, gamma=0.99,
                 tau=0.005, alpha=0.2, auto_alpha=True):
        self.gamma = gamma
        self.tau = tau
        self.auto_alpha = auto_alpha

        self.policy = GaussianPolicy(obs_dim, act_dim)
        self.critic = TwinQNetwork(obs_dim, act_dim)
        self.critic_target = TwinQNetwork(obs_dim, act_dim)
        self.critic_target.load_state_dict(self.critic.state_dict())

        self.policy_optim = optim.Adam(self.policy.parameters(), lr=lr)
        self.critic_optim = optim.Adam(self.critic.parameters(), lr=lr)

        # Auto temperature
        if auto_alpha:
            self.target_entropy = -act_dim
            self.log_alpha = torch.zeros(1, requires_grad=True)
            self.alpha_optim = optim.Adam([self.log_alpha], lr=lr)
            self.alpha = self.log_alpha.exp().item()
        else:
            self.alpha = alpha

        self.memory = deque(maxlen=1000000)

    def act(self, state, evaluate=False):
        state = torch.FloatTensor(state).unsqueeze(0)
        if evaluate:
            mean, _ = self.policy(state)
            return torch.tanh(mean).detach().numpy()[0]
        action, _ = self.policy.sample(state)
        return action.detach().numpy()[0]

    def update(self, batch_size=256):
        if len(self.memory) < batch_size:
            return
        batch = random.sample(self.memory, batch_size)
        s, a, r, s2, d = zip(*batch)
        states = torch.FloatTensor(np.array(s))
        actions = torch.FloatTensor(np.array(a))
        rewards = torch.FloatTensor(r).unsqueeze(1)
        next_states = torch.FloatTensor(np.array(s2))
        dones = torch.FloatTensor(d).unsqueeze(1)

        # ── Critic update ──────────────────────────────
        with torch.no_grad():
            next_actions, next_log_probs = self.policy.sample(next_states)
            q1_next, q2_next = self.critic_target(next_states, next_actions)
            q_next = torch.min(q1_next, q2_next) - self.alpha * next_log_probs
            q_target = rewards + self.gamma * (1 - dones) * q_next

        q1, q2 = self.critic(states, actions)
        critic_loss = nn.MSELoss()(q1, q_target) + nn.MSELoss()(q2, q_target)
        self.critic_optim.zero_grad()
        critic_loss.backward()
        self.critic_optim.step()

        # ── Policy update ──────────────────────────────
        new_actions, log_probs = self.policy.sample(states)
        q1_new, q2_new = self.critic(states, new_actions)
        q_new = torch.min(q1_new, q2_new)
        policy_loss = (self.alpha * log_probs - q_new).mean()
        self.policy_optim.zero_grad()
        policy_loss.backward()
        self.policy_optim.step()

        # ── Alpha update ───────────────────────────────
        if self.auto_alpha:
            alpha_loss = -(self.log_alpha.exp() *
                (log_probs + self.target_entropy).detach()).mean()
            self.alpha_optim.zero_grad()
            alpha_loss.backward()
            self.alpha_optim.step()
            self.alpha = self.log_alpha.exp().item()

        # ── Soft target update ─────────────────────────
        for p, tp in zip(self.critic.parameters(),
                         self.critic_target.parameters()):
            tp.data.copy_(self.tau * p.data + (1 - self.tau) * tp.data)`}
          </CyberCodeBlock>
        </section>

        {/* SAC vs PPO */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">SAC vs PPO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-muted-foreground">Критерий</th>
                  <th className="text-left py-2 px-3 text-secondary">PPO</th>
                  <th className="text-left py-2 px-3 text-primary">SAC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "Тип", ppo: "On-policy", sac: "Off-policy" },
                  { c: "Sample efficiency", ppo: "Низкая", sac: "Высокая (replay buffer)" },
                  { c: "Стабильность", ppo: "Высокая (clipping)", sac: "Высокая (twin critics + entropy)" },
                  { c: "Непрерывные действия", ppo: "Хорошо", sac: "Отлично (специализирован)" },
                  { c: "Дискретные действия", ppo: "Отлично", sac: "Требует модификации" },
                  { c: "Параллелизация", ppo: "Эффективна", sac: "Менее критична" },
                  { c: "Когда использовать", ppo: "Дискретные, симуляции Unity", sac: "Непрерывные, робототехника" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-2 px-3 text-foreground">{row.c}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.ppo}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.sac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Quiz title="Проверь себя: SAC" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_1;
