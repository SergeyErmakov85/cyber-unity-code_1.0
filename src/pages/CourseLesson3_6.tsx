import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import Math from "@/components/Math";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, BarChart3, Zap } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Что делает Optuna в контексте RL?",
    options: [
      "Обучает нейросеть",
      "Автоматически подбирает оптимальные гиперпараметры через байесовскую оптимизацию",
      "Визуализирует графики обучения",
      "Экспортирует модель в ONNX",
    ],
    correctIndex: 1,
  },
  {
    question: "Что такое pruning в Optuna?",
    options: [
      "Удаление слоёв нейросети",
      "Досрочная остановка неперспективных trial-ов для экономии времени",
      "Обрезка градиентов",
      "Сжатие модели",
    ],
    correctIndex: 1,
  },
  {
    question: "Какие гиперпараметры PPO критически влияют на результат?",
    options: [
      "Только learning_rate",
      "learning_rate, batch_size, num_epoch, clip_epsilon, gamma, lambda — все взаимосвязаны",
      "Только hidden_units",
      "Гиперпараметры не важны для PPO",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем интегрировать Optuna с W&B?",
    options: [
      "Это обязательное требование",
      "Для визуализации пространства поиска, корреляций параметров и сравнения trial-ов в команде",
      "W&B заменяет Optuna",
      "Для ускорения обучения",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_6 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Автоматический подбор параметров</h2>
        <p className="text-muted-foreground leading-relaxed">
          В RL гиперпараметры критически важны: один и тот же алгоритм может дать отличный или
          ужасный результат в зависимости от <code className="text-primary">learning_rate</code>,
          <code className="text-primary">batch_size</code>, <code className="text-primary">clip_epsilon</code>
          и десятка других параметров. Структурировать результаты экспериментов поможет <CrossLinkToHub hubPath="/fca-rl" hubAnchor="fca-hyperparams" hubTitle="FCA для анализа гиперпараметров">FCA-анализ</CrossLinkToHub>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          <strong className="text-foreground"><CrossLinkToHub hubPath="/math-rl/module-4" hubAnchor="лекция-3-градиентный-спуск-и-его-варианты" hubTitle="Математика RL — Методы оптимизации">Optuna</CrossLinkToHub></strong> — фреймворк для байесовской оптимизации,
          который интеллектуально исследует пространство параметров. В связке с{" "}
          <strong className="text-secondary">Weights & Biases Sweeps</strong> вы получаете
          полный пайплайн автоподбора с визуализацией.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-6"
      lessonTitle="Оптимизация гиперпараметров: Optuna + W&B"
      lessonNumber="3.6"
      duration="35 мин"
      tags={["#optimization", "#tools", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/3-5", title: "Деплой модели" }}
      nextLesson={{ path: "/courses/3-7", title: "Архитектуры нейросетей" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Hyperparameter Space */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Пространство <CrossLinkToHub hubPath="/algorithms/ppo" hubAnchor="implementation" hubTitle="PPO — Реализация">гиперпараметров PPO</CrossLinkToHub>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-3 text-foreground font-semibold">Параметр</th>
                  <th className="text-left p-3 text-foreground font-semibold">Диапазон</th>
                  <th className="text-left p-3 text-foreground font-semibold">Влияние</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr><td className="p-3 text-primary font-mono">learning_rate</td><td className="p-3 text-muted-foreground">1e-5 — 1e-3</td><td className="p-3 text-muted-foreground">Критическое</td></tr>
                <tr><td className="p-3 text-primary font-mono">batch_size</td><td className="p-3 text-muted-foreground">32 — 4096</td><td className="p-3 text-muted-foreground">Высокое</td></tr>
                <tr><td className="p-3 text-primary font-mono">buffer_size</td><td className="p-3 text-muted-foreground">2048 — 50000</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
                <tr><td className="p-3 text-primary font-mono">hidden_units</td><td className="p-3 text-muted-foreground">64 — 512</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
                <tr><td className="p-3 text-primary font-mono">num_layers</td><td className="p-3 text-muted-foreground">1 — 4</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
                <tr><td className="p-3 text-primary font-mono">num_epoch</td><td className="p-3 text-muted-foreground">1 — 10</td><td className="p-3 text-muted-foreground">Высокое</td></tr>
                <tr><td className="p-3 text-primary font-mono">beta (entropy)</td><td className="p-3 text-muted-foreground">1e-4 — 1e-2</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
                <tr><td className="p-3 text-primary font-mono">epsilon (clip)</td><td className="p-3 text-muted-foreground">0.1 — 0.3</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
                <tr><td className="p-3 text-primary font-mono">lambd (GAE)</td><td className="p-3 text-muted-foreground">0.9 — 0.99</td><td className="p-3 text-muted-foreground">Среднее</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Optuna */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-secondary" />
            Optuna: Study, Objective, Pruning
          </h2>
          <CyberCodeBlock language="python" filename="optuna_ppo_search.py">
{`import optuna
from optuna.pruners import MedianPruner
import subprocess
import json

def objective(trial: optuna.Trial) -> float:
    """Objective function для Optuna — обучает PPO с предложенными параметрами."""
    
    # Optuna предлагает параметры из пространства поиска
    lr = trial.suggest_float("learning_rate", 1e-5, 1e-3, log=True)
    batch_size = trial.suggest_categorical("batch_size", [64, 128, 256, 512, 1024])
    buffer_size = trial.suggest_int("buffer_size", 2048, 20480, step=2048)
    hidden_units = trial.suggest_categorical("hidden_units", [64, 128, 256, 512])
    num_layers = trial.suggest_int("num_layers", 1, 3)
    num_epoch = trial.suggest_int("num_epoch", 1, 10)
    beta = trial.suggest_float("beta", 1e-4, 1e-2, log=True)
    epsilon = trial.suggest_float("epsilon", 0.1, 0.3)
    lambd = trial.suggest_float("lambd", 0.9, 0.99)
    
    # Генерируем YAML-конфиг
    config = {
        "behaviors": {
            "MyAgent": {
                "trainer_type": "ppo",
                "max_steps": 200000,
                "hyperparameters": {
                    "learning_rate": lr,
                    "batch_size": batch_size,
                    "buffer_size": buffer_size,
                    "num_epoch": num_epoch,
                    "beta": beta,
                    "epsilon": epsilon,
                    "lambd": lambd,
                },
                "network_settings": {
                    "hidden_units": hidden_units,
                    "num_layers": num_layers,
                }
            }
        }
    }
    
    config_path = f"configs/trial_{trial.number}.yaml"
    with open(config_path, "w") as f:
        import yaml
        yaml.dump(config, f)
    
    # Запускаем обучение
    result = subprocess.run(
        ["mlagents-learn", config_path, "--run-id", f"optuna_trial_{trial.number}"],
        capture_output=True, text=True
    )
    
    # Извлекаем финальную награду из логов
    final_reward = parse_final_reward(f"results/optuna_trial_{trial.number}")
    
    # Pruning: сообщаем промежуточные результаты
    trial.report(final_reward, step=200000)
    if trial.should_prune():
        raise optuna.TrialPruned()
    
    return final_reward

# Создаём study
study = optuna.create_study(
    direction="maximize",
    pruner=MedianPruner(n_startup_trials=5, n_warmup_steps=50000),
    study_name="ppo_hyperopt"
)

# Запускаем 50 trial-ов
study.optimize(objective, n_trials=50, timeout=3600*12)

# Лучшие параметры
print(f"Best reward: {study.best_value:.3f}")
print(f"Best params: {study.best_params}")`}
          </CyberCodeBlock>
        </section>

        {/* W&B Sweeps */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Weights & Biases Sweeps
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            W&B Sweeps предоставляют визуализацию пространства поиска, корреляцию параметров
            и командный доступ к результатам:
          </p>
          <CyberCodeBlock language="python" filename="sweep_config.yaml">
{`# wandb sweep config
program: train_agent.py
method: bayes          # bayesian optimization
metric:
  name: final_reward
  goal: maximize

parameters:
  learning_rate:
    distribution: log_uniform_values
    min: 0.00001
    max: 0.001
  batch_size:
    values: [64, 128, 256, 512]
  hidden_units:
    values: [64, 128, 256]
  num_layers:
    values: [1, 2, 3]
  num_epoch:
    min: 1
    max: 10
  epsilon:
    min: 0.1
    max: 0.3

# Запуск:
# wandb sweep sweep_config.yaml → получите sweep_id
# wandb agent <sweep_id> --count 30`}
          </CyberCodeBlock>

          <CyberCodeBlock language="python" filename="train_agent.py">
{`import wandb

def train():
    wandb.init()
    config = wandb.config
    
    # Создаём агента с параметрами из sweep
    agent = PPOAgent(
        lr=config.learning_rate,
        batch_size=config.batch_size,
        hidden_units=config.hidden_units,
        num_layers=config.num_layers,
    )
    
    for step in range(200000):
        reward = agent.train_step()
        
        if step % 1000 == 0:
            wandb.log({
                "reward": reward,
                "step": step,
                "policy_loss": agent.policy_loss,
                "value_loss": agent.value_loss,
                "entropy": agent.entropy,
            })
    
    wandb.log({"final_reward": agent.avg_reward})

if __name__ == "__main__":
    train()`}
          </CyberCodeBlock>
        </section>

        <Quiz title="Тест: Оптимизация гиперпараметров" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_6;
