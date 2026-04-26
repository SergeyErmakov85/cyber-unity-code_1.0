import LessonLayout from "@/components/LessonLayout";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Zap } from "lucide-react";

const quizQuestions = [
  {
    question: "Зачем нужна параллелизация сред при обучении RL-агента?",
    options: [
      "Чтобы агент мог играть в несколько игр одновременно",
      "Для сбора большего батча данных — стабилизирует градиент и ускоряет обучение",
      "Параллелизация не используется в RL",
      "Чтобы увеличить размер нейронной сети",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой параметр в YAML-конфигурации ML-Agents отвечает за ускорение симуляции?",
    options: [
      "num_envs",
      "time_scale",
      "batch_size",
      "max_steps",
    ],
    correctIndex: 1,
  },
  {
    question: "Как запустить 8 параллельных сред в ML-Agents из командной строки?",
    options: [
      "mlagents-learn --parallel=8",
      "mlagents-learn --num-envs=8",
      "mlagents-learn config.yaml --num-envs=8 --env=Build.exe",
      "Невозможно — нужен отдельный скрипт",
    ],
    correctIndex: 2,
  },
];

const CourseLesson2_5 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Зачем нужна параллелизация</h2>
        <p className="text-muted-foreground leading-relaxed">
          On-policy алгоритмы (PPO) требуют свежих данных на каждом шаге обновления. Один агент
          собирает данные медленно — обучение может занимать часы. <strong className="text-foreground">Параллельные
          среды</strong> позволяют собирать в N раз больше данных за то же время.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Кроме скорости, параллелизация улучшает <strong className="text-primary">стабильность</strong> обучения:
          большой батч из разных сред снижает дисперсию оценки градиента.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="2-5"
      lessonTitle="Параллельные среды для ускорения обучения"
      lessonNumber="2.5"
      duration="25 мин"
      tags={["#practice", "#mlagents", "#performance"]}
      level={2}
      prevLesson={{ path: "/courses/2-4", title: "Reward Shaping" }}
      nextLesson={{ path: "/courses/2-6", title: "TensorBoard и W&B" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Benefits */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Zap, title: "Скорость", desc: "N сред → N× больше данных за единицу времени" },
              { icon: Lightbulb, title: "Стабильность", desc: "Большой батч → меньше дисперсия градиента" },
              { icon: Zap, title: "Разнообразие", desc: "Разные среды → агент видит больше ситуаций" },
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

        {/* Unity ML-Agents config */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Настройка <CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Обучение">параллельных сред</CrossLinkToHub> в Unity ML-Agents</h2>

          <CyberCodeBlock language="python" filename="terminal">
{`# Запуск с 8 параллельными средами
mlagents-learn config/trainer.yaml \\
    --env=Build/MyEnv \\
    --run-id=parallel_test \\
    --num-envs=8 \\
    --no-graphics

# Ключевые параметры:
# --num-envs=N     — количество параллельных копий среды
# --no-graphics    — без рендеринга (ускоряет в ~3x)
# --time-scale=20  — ускорение внутриигрового времени`}
          </CyberCodeBlock>

          <CyberCodeBlock language="python" filename="trainer_config.yaml">
{`behaviors:
  HunterAgent:
    trainer_type: ppo
    hyperparameters:
      batch_size: 2048        # Больше батч для параллельных сред
      buffer_size: 20480      # buffer_size = batch_size * 10
      learning_rate: 3.0e-4
      num_epoch: 3
    network_settings:
      hidden_units: 256
      num_layers: 2
    max_steps: 1000000
    time_horizon: 128         # Увеличиваем для стабильности
    summary_freq: 10000
    # Важно: batch_size и buffer_size масштабируются
    # с количеством параллельных сред`}
          </CyberCodeBlock>
        </section>

        {/* Python SubprocVecEnv */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Python: SubprocVecEnv</h2>
          <CyberCodeBlock language="python" filename="parallel_envs.py">
{`from stable_baselines3.common.vec_env import SubprocVecEnv
from stable_baselines3 import PPO
import gymnasium as gym

def make_env(env_id, seed):
    def _init():
        env = gym.make(env_id)
        env.reset(seed=seed)
        return env
    return _init

# Создаём 8 параллельных сред
num_envs = 8
envs = SubprocVecEnv([make_env("CartPole-v1", i) for i in range(num_envs)])

# PPO автоматически собирает данные из всех сред
model = PPO("MlpPolicy", envs, verbose=1,
            n_steps=128,           # Шаги на среду
            batch_size=256,        # Мини-батч
            n_epochs=4)

model.learn(total_timesteps=500000)
# Эффективные шаги: 500k / 8 = 62.5k на среду`}
          </CyberCodeBlock>
        </section>

        {/* Benchmark */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Бенчмарк: время обучения</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-muted-foreground">Параллельных сред</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Время (500k шагов)</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Ускорение</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Финальный reward</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { envs: "1", time: "~45 мин", speed: "1×", reward: "~450" },
                  { envs: "4", time: "~14 мин", speed: "~3.2×", reward: "~480" },
                  { envs: "8", time: "~8 мин", speed: "~5.6×", reward: "~490" },
                  { envs: "16", time: "~5 мин", speed: "~9×", reward: "~495" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-2 px-3 text-primary font-mono">{row.envs}</td>
                    <td className="py-2 px-3 text-foreground">{row.time}</td>
                    <td className="py-2 px-3 text-secondary">{row.speed}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Quiz title="Проверь себя: Параллельные среды" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson2_5;
