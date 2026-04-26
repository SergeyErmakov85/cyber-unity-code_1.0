import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Eye, Brain, Table } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Когда стоит использовать CNN в RL-агенте?",
    options: [
      "Всегда — CNN лучше MLP",
      "Когда агент получает визуальные наблюдения (камера, изображения)",
      "Только для дискретных действий",
      "CNN не применимы в RL",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем добавлять LSTM-слой в архитектуру агента?",
    options: [
      "Для ускорения обучения",
      "Чтобы агент мог учитывать историю наблюдений — память о прошлых состояниях",
      "LSTM уменьшает размер модели",
      "LSTM работает только в supervised learning",
    ],
    correctIndex: 1,
  },
  {
    question: "Что такое Attention-механизм в контексте RL?",
    options: [
      "Способ визуализации Q-values",
      "Механизм, позволяющий агенту фокусироваться на наиболее важных частях наблюдения",
      "Альтернатива reward shaping",
      "Метод параллелизации обучения",
    ],
    correctIndex: 1,
  },
  {
    question: "Какая архитектура подойдёт для агента с переменным числом объектов в наблюдении?",
    options: [
      "Фиксированный MLP",
      "CNN с фиксированным входом",
      "Attention / Transformer — обрабатывает множества переменной длины",
      "Архитектура не имеет значения",
    ],
    correctIndex: 2,
  },
];

const CourseLesson3_7 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Правильная архитектура — половина успеха</h2>
        <p className="text-muted-foreground leading-relaxed">
          Выбор архитектуры нейросети для RL-агента критически влияет на качество обучения.
          <strong className="text-foreground"> <CrossLinkToHub hubPath="/pytorch/cheatsheet" hubAnchor="nn" hubTitle="PyTorch — Нейронные сети">MLP</CrossLinkToHub></strong> подходит для простых задач,{" "}
          <strong className="text-primary">CNN</strong> — для визуальных наблюдений,{" "}
          <strong className="text-secondary">LSTM</strong> — когда нужна память.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          В этом уроке мы разберём все основные архитектуры, используя знания <CrossLinkToHub hubPath="/math-rl/module-2" hubTitle="Линейная алгебра для RL">линейной алгебры</CrossLinkToHub>,
          новые подходы с Attention-механизмами, и составим таблицу рекомендаций с учётом <CrossLinkToHub hubPath="/fca-rl" hubAnchor="fca-basics" hubTitle="FCA — Основы">формального анализа</CrossLinkToHub>: какую архитектуру выбрать под конкретную задачу.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-7"
      lessonTitle="Архитектуры нейросетей для RL-агентов"
      lessonNumber="3.7"
      duration="40 мин"
      tags={["#theory", "#architecture", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/3-6", title: "Оптимизация гиперпараметров" }}
      nextLesson={{ path: "/courses/final-project", title: "Финальный проект" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* MLP */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" />
            MLP — Multi-Layer Perceptron
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Стандартная архитектура для RL: полносвязные слои с активацией ReLU/Tanh.
            Подходит для векторных наблюдений (позиции, скорости, расстояния).
          </p>
          <CyberCodeBlock language="python" filename="mlp_policy.py">
{`import torch.nn as nn

class MLPPolicy(nn.Module):
    """Стандартный MLP для Actor-Critic."""
    def __init__(self, obs_size: int, action_size: int, hidden: int = 256):
        super().__init__()
        
        # Shared backbone
        self.backbone = nn.Sequential(
            nn.Linear(obs_size, hidden),
            nn.ReLU(),
            nn.Linear(hidden, hidden),
            nn.ReLU(),
        )
        
        # Actor head — policy
        self.actor = nn.Sequential(
            nn.Linear(hidden, hidden // 2),
            nn.ReLU(),
            nn.Linear(hidden // 2, action_size),
            nn.Tanh(),  # для непрерывных действий [-1, 1]
        )
        
        # Critic head — value
        self.critic = nn.Sequential(
            nn.Linear(hidden, hidden // 2),
            nn.ReLU(),
            nn.Linear(hidden // 2, 1),
        )`}
          </CyberCodeBlock>
        </section>

        {/* CNN */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-secondary" />
            CNN — визуальные наблюдения
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Когда агент «видит» мир через камеру (пиксели), необходимы свёрточные слои
            для извлечения признаков из изображений:
          </p>
          <CyberCodeBlock language="python" filename="cnn_policy.py">
{`class CNNPolicy(nn.Module):
    """CNN для агента с камерой (84x84 grayscale)."""
    def __init__(self, action_size: int):
        super().__init__()
        
        # Nature DQN-style CNN
        self.conv = nn.Sequential(
            nn.Conv2d(4, 32, kernel_size=8, stride=4),  # 4 stacked frames
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, stride=1),
            nn.ReLU(),
            nn.Flatten(),
        )
        
        # Вычисляем размер после conv слоёв
        conv_out = 64 * 7 * 7  # для 84x84 входа
        
        self.actor = nn.Sequential(
            nn.Linear(conv_out, 512),
            nn.ReLU(),
            nn.Linear(512, action_size),
        )
        
        self.critic = nn.Sequential(
            nn.Linear(conv_out, 512),
            nn.ReLU(),
            nn.Linear(512, 1),
        )`}
          </CyberCodeBlock>

          <Card className="border-secondary/20 bg-card/50 mt-4">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">Unity ML-Agents: визуальные наблюдения</h4>
              <CyberCodeBlock language="python" filename="trainer_config.yaml">
{`behaviors:
  VisualAgent:
    trainer_type: ppo
    network_settings:
      vis_encode_type: simple  # simple | nature_cnn | resnet
      hidden_units: 256
      num_layers: 2`}
              </CyberCodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* LSTM */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            LSTM — память для POMDP
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Если агент не видит полного состояния среды (Partially Observable MDP),
            LSTM позволяет «запоминать» предыдущие наблюдения:
          </p>
          <CyberCodeBlock language="python" filename="lstm_policy.py">
{`class LSTMPolicy(nn.Module):
    """LSTM для частично наблюдаемых сред."""
    def __init__(self, obs_size: int, action_size: int, hidden: int = 128):
        super().__init__()
        
        self.encoder = nn.Sequential(
            nn.Linear(obs_size, hidden),
            nn.ReLU(),
        )
        
        self.lstm = nn.LSTM(
            input_size=hidden,
            hidden_size=hidden,
            num_layers=1,
            batch_first=True,
        )
        
        self.actor = nn.Linear(hidden, action_size)
        self.critic = nn.Linear(hidden, 1)
    
    def forward(self, obs_seq, hidden_state=None):
        # obs_seq: (batch, seq_len, obs_size)
        x = self.encoder(obs_seq)         # (batch, seq_len, hidden)
        lstm_out, new_hidden = self.lstm(x, hidden_state)
        last_out = lstm_out[:, -1, :]     # берём последний выход
        
        actions = self.actor(last_out)
        value = self.critic(last_out)
        return actions, value, new_hidden`}
          </CyberCodeBlock>

          <Card className="border-primary/20 bg-card/50 mt-4">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">ML-Agents: включение памяти</h4>
              <CyberCodeBlock language="python" filename="memory_config.yaml">
{`behaviors:
  MemoryAgent:
    trainer_type: ppo
    network_settings:
      hidden_units: 128
      memory:
        memory_size: 256       # размер LSTM hidden state
        sequence_length: 64    # длина последовательности`}
              </CyberCodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Attention */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Attention-механизмы в RL</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Attention позволяет агенту <strong className="text-foreground">фокусироваться</strong> на
            наиболее важных частях наблюдения. Особенно полезен для сред с переменным числом объектов:
          </p>
          <CyberCodeBlock language="python" filename="attention_policy.py">
{`class AttentionPolicy(nn.Module):
    """Attention для сред с множеством объектов."""
    def __init__(self, entity_dim: int, n_heads: int = 4, hidden: int = 128):
        super().__init__()
        
        # Entity encoder
        self.entity_encoder = nn.Linear(entity_dim, hidden)
        
        # Multi-head self-attention
        self.attention = nn.MultiheadAttention(
            embed_dim=hidden,
            num_heads=n_heads,
            batch_first=True,
        )
        
        self.norm = nn.LayerNorm(hidden)
        
        # Pool + policy head
        self.policy_head = nn.Sequential(
            nn.Linear(hidden, hidden),
            nn.ReLU(),
            nn.Linear(hidden, 4),  # action_size
        )
    
    def forward(self, entities):
        # entities: (batch, num_entities, entity_dim)
        x = self.entity_encoder(entities)
        attn_out, weights = self.attention(x, x, x)
        x = self.norm(x + attn_out)
        
        # Mean pooling over entities
        pooled = x.mean(dim=1)
        return self.policy_head(pooled), weights`}
          </CyberCodeBlock>
        </section>

        {/* Recommendation Table */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Table className="w-6 h-6 text-primary" />
            Таблица рекомендаций (<CrossLinkToHub hubPath="/fca-rl" hubAnchor="lattices" hubTitle="FCA — Решётки понятий">решётка выбора</CrossLinkToHub>)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-3 text-foreground font-semibold">Тип задачи</th>
                  <th className="text-left p-3 text-foreground font-semibold">Архитектура</th>
                  <th className="text-left p-3 text-foreground font-semibold">Пример</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr><td className="p-3 text-muted-foreground">Векторные obs, простая задача</td><td className="p-3 text-primary font-semibold">MLP (2 слоя, 128–256)</td><td className="p-3 text-muted-foreground">CartPole, Ball Balance</td></tr>
                <tr><td className="p-3 text-muted-foreground">Векторные obs, сложная задача</td><td className="p-3 text-primary font-semibold">MLP (3 слоя, 256–512)</td><td className="p-3 text-muted-foreground">Racing, 3D navigation</td></tr>
                <tr><td className="p-3 text-muted-foreground">Визуальные наблюдения</td><td className="p-3 text-secondary font-semibold">CNN + MLP</td><td className="p-3 text-muted-foreground">Atari, камера в Unity</td></tr>
                <tr><td className="p-3 text-muted-foreground">Частичная наблюдаемость</td><td className="p-3 text-secondary font-semibold">LSTM + MLP</td><td className="p-3 text-muted-foreground">Поиск в лабиринте</td></tr>
                <tr><td className="p-3 text-muted-foreground">Переменное число объектов</td><td className="p-3 text-accent font-semibold">Attention + MLP</td><td className="p-3 text-muted-foreground">Multi-agent, RTS</td></tr>
                <tr><td className="p-3 text-muted-foreground">Визуальные + память</td><td className="p-3 text-accent font-semibold">CNN + LSTM</td><td className="p-3 text-muted-foreground">Навигация по видео</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <Quiz title="Тест: Архитектуры нейросетей" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_7;
