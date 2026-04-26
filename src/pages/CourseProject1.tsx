import LessonLayout from "@/components/LessonLayout";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Target, Trophy, CheckCircle2 } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const CourseProject1 = () => {
  return (
    <LessonLayout
      lessonId="project-1"
      lessonTitle="Балансировка шеста — воспроизводимый эксперимент"
      lessonNumber="П1"
      duration="60–90 мин"
      tags={["#project", "#dqn", "#pytorch"]}
      prevLesson={{ path: "/courses/1-4", title: "DQN с нуля" }}
    >
      {/* Mission */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Задание</h2>
        <Card className="bg-card/40 border-primary/30">
          <CardContent className="p-6 flex gap-4 items-start">
            <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-foreground font-semibold">
                Обучите <CrossLinkToHub hubPath="/algorithms/dqn" hubTitle="DQN — Deep Q-Network">DQN</CrossLinkToHub>-агента, который стабильно достигает среднего reward &gt; 475
                за последние 100 из 500 эпизодов в среде CartPole-v1.
              </p>
              <p className="text-sm text-muted-foreground">
                Используйте фиксированный <code className="text-primary bg-primary/10 px-1 rounded">seed=42</code> для
                <CrossLinkToHub hubPath="/pytorch/cheatsheet" hubAnchor="saving" hubTitle="PyTorch — Сохранение и загрузка">воспроизводимости</CrossLinkToHub> результатов. Эксперимент должен быть запускаемым одной командой.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Success criteria */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Критерии успеха</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Метрика</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Минимум</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Хорошо</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Отлично</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: "Avg reward (последние 100)", min: "> 400", good: "> 475", great: "= 500" },
                { metric: "Эпизод конвергенции", min: "< 500", good: "< 350", great: "< 250" },
                { metric: "Воспроизводимость (seed=42)", min: "Да", good: "Да", great: "Да" },
                { metric: "Код документирован", min: "Комментарии", good: "+docstrings", great: "+README" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/20">
                  <td className="py-2 px-3 text-foreground">{row.metric}</td>
                  <td className="py-2 px-3 text-muted-foreground">{row.min}</td>
                  <td className="py-2 px-3 text-secondary">{row.good}</td>
                  <td className="py-2 px-3 text-primary font-semibold">{row.great}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Starter code */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Starter-код</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Используйте этот шаблон как основу. Заполните пропуски, помеченные <code className="text-accent bg-accent/10 px-1 rounded">TODO</code>.
        </p>

        <CyberCodeBlock language="python" filename="project1_starter.py">
{`"""
Проект 1: Балансировка шеста — DQN агент
Цель: avg reward > 475 за последние 100 эпизодов из 500
Seed: 42
"""
import torch
import torch.nn as nn
import torch.optim as optim
import gymnasium as gym
import numpy as np
import random
from collections import deque, namedtuple

# ── Фиксируем seed ─────────────────────────────────────
SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)

# ── Гиперпараметры (можно менять) ──────────────────────
LR = 1e-3
GAMMA = 0.99
EPS_START = 1.0
EPS_END = 0.01
EPS_DECAY = 0.995
EPISODES = 500
BATCH_SIZE = 64
MEMORY_SIZE = 100000
TARGET_UPDATE = 10

# ── Replay Buffer ──────────────────────────────────────
Transition = namedtuple('Transition',
    ('state', 'action', 'reward', 'next_state', 'done'))

class ReplayBuffer:
    # TODO: реализуйте методы push, sample, __len__
    pass

# ── Q-Network ──────────────────────────────────────────
class DQN(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: определите архитектуру сети
        pass

    def forward(self, x):
        # TODO
        pass

# ── Выбор действия ─────────────────────────────────────
def select_action(state, policy_net, epsilon):
    # TODO: epsilon-greedy
    pass

# ── Шаг обучения ───────────────────────────────────────
def train_step(policy_net, target_net, memory, optimizer):
    if len(memory) < BATCH_SIZE:
        return
    # TODO: sample batch, compute loss, backprop
    pass

# ── Основной цикл ─────────────────────────────────────
def main():
    env = gym.make("CartPole-v1")
    policy_net = DQN()
    target_net = DQN()
    target_net.load_state_dict(policy_net.state_dict())
    optimizer = optim.Adam(policy_net.parameters(), lr=LR)
    memory = ReplayBuffer(MEMORY_SIZE)

    epsilon = EPS_START
    rewards_history = []

    for episode in range(EPISODES):
        state, _ = env.reset(seed=SEED + episode)
        total_reward = 0

        while True:
            action = select_action(state, policy_net, epsilon)
            next_state, reward, term, trunc, _ = env.step(action)
            done = term or trunc

            memory.push(state, action, reward, next_state, done)
            train_step(policy_net, target_net, memory, optimizer)

            state = next_state
            total_reward += reward
            if done:
                break

        epsilon = max(EPS_END, epsilon * EPS_DECAY)
        rewards_history.append(total_reward)

        if (episode + 1) % TARGET_UPDATE == 0:
            target_net.load_state_dict(policy_net.state_dict())

        if (episode + 1) % 50 == 0:
            avg = np.mean(rewards_history[-50:])
            print(f"Ep {episode+1} | Avg: {avg:.1f} | ε: {epsilon:.3f}")

    # ── Проверка результата ────────────────────────────
    final_avg = np.mean(rewards_history[-100:])
    print(f"\\nФинальный средний reward: {final_avg:.1f}")
    assert final_avg > 475, f"Не достигнут порог 475! ({final_avg:.1f})")
    print("✅ Проект завершён успешно!")

if __name__ == "__main__":
    main()`}
        </CyberCodeBlock>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button variant="outline" size="sm" asChild>
            <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Открыть в Colab
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            Скачать .py
          </Button>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Подсказки</h2>
        <div className="space-y-3">
          {[
            "Начните с реализации ReplayBuffer — он нужен для всего остального.",
            "Используйте Huber Loss (SmoothL1Loss) вместо MSE — он устойчивее к выбросам.",
            "Не забудьте clip_grad_norm_ — предотвращает взрыв градиентов.",
            "Если reward не растёт после 200 эпизодов — уменьшите LR или увеличьте BATCH_SIZE.",
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completion */}
      <section>
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
          <CardContent className="p-6 text-center space-y-3">
            <Trophy className="w-10 h-10 text-primary mx-auto" />
            <h3 className="text-xl font-bold text-foreground">Уровень 1 завершён!</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Поздравляем! Вы освоили основы RL, настроили окружение, обучили первого агента
              и реализовали DQN с нуля. Готовы к Уровню 2?
            </p>
            <Button variant="cyber" size="lg" asChild className="mt-2">
              <a href="/pricing">Перейти на PRO →</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </LessonLayout>
  );
};

export default CourseProject1;
