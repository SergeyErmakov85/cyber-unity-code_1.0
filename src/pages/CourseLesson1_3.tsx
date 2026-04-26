import LessonLayout from "@/components/LessonLayout";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import { Card, CardContent } from "@/components/ui/card";

const BELLMAN_FORMULA =
  "Q(s, a) ← Q(s, a) + α [ r + γ max_a' Q(s', a') − Q(s, a) ]";

const TD_ERROR_FORMULA = "[ r + γ max_a' Q(s', a') − Q(s, a) ]";

const PYTHON_IMPLEMENTATION = `import numpy as np
import gymnasium as gym
import random

# ==========================================
# ШАГ 1: Настройка среды и фиксация случайности
# ==========================================
# Фиксация seed предотвращает проблему "невоспроизводимых результатов".
seed = 42
np.random.seed(seed)
random.seed(seed)

# Создание классической среды FrozenLake (Замерзшее озеро) на карте 4x4.
# is_slippery=False означает, что мы отключаем случайное скольжение по льду,
# чтобы агент двигался строго в выбранном направлении.
env = gym.make("FrozenLake-v1", map_name="4x4", is_slippery=False)
env.action_space.seed(seed)

# Определение размерности пространства
state_size = env.observation_space.n
action_size = env.action_space.n

# ==========================================
# ШАГ 2: Инициализация Q-таблицы и гиперпараметров
# ==========================================
# Создаем таблицу размером 16x4, изначально заполненную нулями.
Q_table = np.zeros((state_size, action_size))

# Математические параметры алгоритма
total_episodes = 2000
learning_rate = 0.8
gamma = 0.95

# Параметры epsilon-жадной стратегии
epsilon = 1.0
max_epsilon = 1.0
min_epsilon = 0.01
decay_rate = 0.005

# ==========================================
# ШАГ 3: Тренировочный цикл (Обучение)
# ==========================================
print("Начало обучения агента...")

for episode in range(total_episodes):
    # Сброс среды для начала нового эпизода. Получаем стартовое состояние.
    state, info = env.reset(seed=seed if episode == 0 else None)
    done = False

    # Внутренний цикл: пока агент не упадет в прорубь или не найдет цель
    while not done:
        # 1. Выбор действия (epsilon-greedy policy)
        exp_tradeoff = random.uniform(0, 1)

        if exp_tradeoff < epsilon:
            # Исследование: выбираем случайное действие
            action = env.action_space.sample()
        else:
            # Использование: действие с максимальным Q-значением
            action = np.argmax(Q_table[state, :])

        # 2. Выполнение действия в среде
        # Среда возвращает: новое состояние, награду, флаг окончания,
        # флаг прерывания и дополнительную информацию.
        new_state, reward, done, truncated, info = env.step(action)

        # 3. Обновление Q-таблицы (Уравнение Беллмана)
        td_target = reward + gamma * np.max(Q_table[new_state, :])
        td_error = td_target - Q_table[state, action]
        Q_table[state, action] = Q_table[state, action] + learning_rate * td_error

        # 4. Переход в новое состояние
        state = new_state

        # Завершение цикла шагов, если игра окончена
        if done or truncated:
            break

    # Обновление (уменьшение) значения epsilon после каждого эпизода
    epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-decay_rate * episode)

print("Обучение завершено!\\n")
print("Финальная Q-таблица (Обученный мозг агента):")
print(np.round(Q_table, 3))`;

const CourseLesson1_3 = () => {
  return (
    <LessonLayout
      lessonTitle="Q-Learning: табличный метод"
      lessonNumber="1.3"
      duration="30 мин"
      tags={["#algorithm", "#qlearning", "#tabular", "#gym"]}
      level={1}
      lessonId="1-3"
      prevLesson={{ path: "/courses/1-2", title: "Установка окружения" }}
      nextLesson={{ path: "/courses/1-4", title: "CartPole" }}
      keyConcepts={[
        "Q-таблица как модель знаний агента",
        "Уравнение Беллмана и TD Error",
        "Model-free и off-policy свойства Q-learning",
        "Epsilon-greedy и epsilon decay",
        "Практическая реализация на FrozenLake в Gymnasium",
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Интуитивное введение</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Обучение с подкреплением (RL) — одна из фундаментальных парадигм машинного
          обучения, где агент учится принимать последовательные решения в динамической
          среде и максимизировать суммарную выгоду.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Q-обучение решает задачу отложенных последствий: действие может не давать
          мгновенной пользы, но быть ключевым для будущего успеха. Алгоритм учится
          видеть такие связи и оценивать долгосрочную ценность каждого шага.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Интуитивная аналогия: обучение езде на велосипеде или освоение новой игры.
          В начале агент действует хаотично, получает награды и штрафы, а затем через
          тысячи проб выстраивает устойчивую стратегию поведения.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Ключевые концепции</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Любая RL-задача формулируется как Марковский процесс принятия решений (MDP),
          где важно четко определить состояние, действие, награду и политику.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: "Состояние (s)",
              desc: "Полное описание текущего положения агента в среде.",
            },
            {
              title: "Действие (a)",
              desc: "Конкретный шаг или решение агента в состоянии s.",
            },
            {
              title: "Награда (r)",
              desc: "Числовой сигнал обратной связи от среды после действия.",
            },
            {
              title: "Стратегия (π)",
              desc: "Правило, определяющее какое действие выбирать в каждом состоянии.",
            },
            {
              title: "Q-значение Q(s, a)",
              desc: "Оценка долгосрочной полезности действия a в состоянии s.",
            },
          ].map((item) => (
            <Card key={item.title} className="bg-card/40 border-border/30">
              <CardContent className="p-4">
                <p className="font-semibold text-sm text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Цель Q-обучения — сформировать оптимальную стратегию, вычислив Q-значения для
          каждой пары «состояние-действие».
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Основная идея Q-обучения</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Табличный Q-learning строит двумерную Q-таблицу: строки — состояния, столбцы —
          действия, а ячейки хранят оценку качества выбора конкретного действия в
          конкретном состоянии.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Метод <strong className="text-foreground">model-free</strong>: не требует
          математической модели среды. Агент учится только из опыта взаимодействия.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Метод <strong className="text-foreground">off-policy</strong>: агент может
          физически исследовать мир случайно, но обновлять оценки так, будто в будущем
          будет действовать оптимально.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Формула Q-обучения</h2>
        <Card className="bg-card/40 border-primary/20">
          <CardContent className="p-4">
            <p className="font-mono text-primary text-sm sm:text-base break-words">
              {BELLMAN_FORMULA}
            </p>
          </CardContent>
        </Card>
        <p className="text-muted-foreground leading-relaxed mt-4 mb-3">
          Где α — скорость обучения, γ — фактор дисконтирования будущего, а
          max_a'Q(s',a') — оценка лучшего будущего действия в новом состоянии.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Ключевая часть формулы — TD Error (ошибка временного различия), то есть мера
          расхождения между реальностью и старым ожиданием агента.
        </p>
        <Card className="bg-card/30 border-border/30 mt-4">
          <CardContent className="p-4">
            <p className="font-mono text-sm text-primary break-words">{TD_ERROR_FORMULA}</p>
          </CardContent>
        </Card>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Если TD Error положителен, действие оказалось лучше ожидаемого и Q-значение
          растет. Если отрицателен — действие оказалось хуже и Q-значение снижается.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">5. От математики к алгоритму</h2>
        <div className="space-y-2">
          {[
            "Инициализируем Q-таблицу и гиперпараметры (α, γ, ε).",
            "Сбрасываем среду в начальное состояние.",
            "Выбираем действие по epsilon-greedy (exploration/exploitation).",
            "Выполняем действие и получаем (s', r, done).",
            "Обновляем Q(s,a) уравнением Беллмана.",
            "Переходим в новое состояние и повторяем до конца эпизода.",
            "Уменьшаем ε (epsilon decay) по мере обучения.",
          ].map((step, i) => (
            <div key={step} className="flex gap-3 p-3 rounded-lg bg-card/30 border border-border/30">
              <span className="text-primary font-bold text-sm">{i + 1}.</span>
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Epsilon decay критически важен: в начале обучения агент исследует мир почти
          полностью случайно, а затем постепенно переходит к использованию уже выученной
          стратегии.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          6. Реализация на Python (MANDATORY)
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ниже — полный рабочий код табличного Q-learning для
          <code className="text-primary text-xs"> FrozenLake-v1 </code>
          с использованием библиотек <code className="text-primary text-xs">numpy</code> и
          <code className="text-primary text-xs"> gymnasium</code>.
        </p>
        <CyberCodeBlock language="python" filename="q_learning_frozen_lake.py">
          {PYTHON_IMPLEMENTATION}
        </CyberCodeBlock>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          7. Пример среды: FrozenLake
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          FrozenLake — сетка 4x4 с безопасными клетками, прорубями и финишем.
          В этой среде агент учится находить путь к цели, избегая провалов.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "S (Start) — стартовая позиция агента.",
            "F (Frozen) — безопасный лед.",
            "H (Hole) — прорубь, эпизод завершается с наградой 0.",
            "G (Goal) — цель, эпизод завершается с наградой +1.",
          ].map((item) => (
            <Card key={item} className="bg-card/40 border-border/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4 mb-2">
          Как распространяется знание: сначала агент случайно находит выгодный переход
          рядом с целью, затем эта ценность «перетекает» в более ранние состояния.
        </p>
        <Card className="bg-card/30 border-border/30">
          <CardContent className="p-4 space-y-2">
            <p className="font-mono text-xs text-primary">
              Q(14, 2) ← 0 + 0.8 × [1 + 0.95 × 0 − 0] = 0.8
            </p>
            <p className="font-mono text-xs text-primary">
              Q(13, 2) ← 0 + 0.8 × [0 + 0.95 × 0.8 − 0] = 0.608
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          8. Пошаговый разбор кода (Математика → Алгоритм → Код)
        </h2>
        <div className="space-y-3">
          <Card className="bg-card/40 border-border/30">
            <CardContent className="p-4">
              <p className="text-sm text-foreground font-semibold">Q-таблица</p>
              <p className="text-sm text-muted-foreground mt-1">
                <code className="text-primary text-xs">Q_table = np.zeros((state_size, action_size))</code>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 border-border/30">
            <CardContent className="p-4">
              <p className="text-sm text-foreground font-semibold">Epsilon-greedy</p>
              <p className="text-sm text-muted-foreground mt-1">
                С вероятностью ε выбирается случайное действие, иначе —
                <code className="text-primary text-xs"> np.argmax(Q_table[state, :])</code>.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 border-border/30">
            <CardContent className="p-4">
              <p className="text-sm text-foreground font-semibold">Bellman update</p>
              <p className="text-sm text-muted-foreground mt-1">
                Через <code className="text-primary text-xs">td_target</code>,
                <code className="text-primary text-xs">td_error</code> и обновление
                значения <code className="text-primary text-xs">Q_table[state, action]</code>.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 border-border/30">
            <CardContent className="p-4">
              <p className="text-sm text-foreground font-semibold">Epsilon Decay</p>
              <p className="text-sm text-muted-foreground mt-1">
                Постепенное снижение случайности:
                <code className="text-primary text-xs">
                  {" "}
                  epsilon = min_epsilon + (max_epsilon - min_epsilon) * exp(-decay_rate * episode)
                </code>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Распространенные ошибки</h2>
        <div className="space-y-3">
          {[
            "Попытка применять табличный Q-learning в средах с непрерывными действиями.",
            "Некорректное управление исследованием: слишком быстрое или отсутствующее затухание epsilon.",
            "Переоценка Q-значений (overestimation bias) из-за использования max в целевой оценке.",
            "Отсутствие seeding и, как следствие, невоспроизводимые эксперименты.",
            "Проблемный reward shaping, при котором агент эксплуатирует лазейки вместо выполнения цели.",
          ].map((err, i) => (
            <Card key={err} className="bg-card/30 border-destructive/20">
              <CardContent className="p-4 flex gap-3">
                <span className="text-destructive font-bold text-sm">{i + 1}.</span>
                <p className="text-sm text-muted-foreground">{err}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Для борьбы с переоценкой часто используют Double Q-learning, а для
          воспроизводимости — фиксацию seed во всех источниках случайности.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Ключевые выводы</h2>
        <Card className="bg-gradient-to-br from-primary/5 via-card/40 to-secondary/5 border-primary/20">
          <CardContent className="p-6 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Табличный Q-learning — базовый и прозрачный алгоритм RL, который оценивает
              долгосрочную ценность каждого действия через многократное применение
              уравнения Беллмана.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Он отлично подходит для дискретных задач небольшого размера (GridWorld,
              лабиринты, простые игры), но ограничен проклятием размерности.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Следующий эволюционный шаг — Deep Q-Network (DQN), где Q-таблица заменяется
              нейросетевой аппроксимацией, но математическое ядро остается тем же.
            </p>
          </CardContent>
        </Card>
      </section>
    </LessonLayout>
  );
};

export default CourseLesson1_3;
