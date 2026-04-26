import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Shuffle } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Зачем использовать Curriculum Learning?",
    options: [
      "Для уменьшения размера нейронной сети",
      "Чтобы начать с простых задач и постепенно усложнять — агент не теряет мотивацию",
      "Для ускорения инференса",
      "Curriculum Learning не даёт преимуществ",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой параметр определяет переключение между уровнями curriculum?",
    options: [
      "max_steps",
      "measure: reward, threshold: значение при котором переходить на следующий уровень",
      "learning_rate",
      "Уровни переключаются случайно",
    ],
    correctIndex: 1,
  },
  {
    question: "Как Environment Randomization помогает generalization?",
    options: [
      "Рандомизация замедляет обучение",
      "Агент видит разные варианты среды — учится обобщать вместо запоминания одного сценария",
      "Рандомизация используется только для тестирования",
      "Environment Randomization не влияет на обобщение",
    ],
    correctIndex: 1,
  },
  {
    question: "Какие параметры среды можно рандомизировать в Unity ML-Agents?",
    options: [
      "Только визуальные (цвет, текстура)",
      "Любые: гравитация, масса объектов, размеры, скорость, позиции",
      "Только позиции объектов",
      "Рандомизация не поддерживается в ML-Agents",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_3 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Зачем усложнять постепенно</h2>
        <p className="text-muted-foreground leading-relaxed">
          Представьте, что ребёнка сразу посадили за руль болида Формулы-1 — он ничему не научится.
          Но если начать с велосипеда, потом картинг, потом обычная машина — он освоит вождение.
          <strong className="text-foreground"> <CrossLinkToHub hubPath="/deep-rl" hubAnchor="practice" hubTitle="Deep RL — практика и curriculum">Curriculum Learning</CrossLinkToHub></strong> применяет тот же принцип к RL-агентам.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          А <strong className="text-primary">Environment Randomization</strong> — это способ сделать агента
          робастным: тренируясь в разных вариациях среды (разная гравитация, масса, размеры),
          агент учится обобщать вместо заучивания одного сценария.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-3"
      lessonTitle="Curriculum Learning и Environment Randomization"
      lessonNumber="3.3"
      duration="35 мин"
      tags={["#mlagents", "#curriculum", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/3-2", title: "MA-POCA и Self-Play" }}
      nextLesson={{ path: "/courses/3-4", title: "Имитационное обучение" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Curriculum */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Curriculum Learning в ML-Agents: <CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Обучение">environment_parameters</CrossLinkToHub></h2>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Задаём уровни сложности, агент переходит на следующий при достижении порога reward.
            </p>
          </div>

          <CyberCodeBlock language="python" filename="curriculum_config.yaml">
{`behaviors:
  JumperAgent:
    trainer_type: ppo
    hyperparameters:
      batch_size: 1024
      buffer_size: 10240
      learning_rate: 3.0e-4
    max_steps: 2000000

# Curriculum: постепенное усложнение
environment_parameters:
  obstacle_height:
    curriculum:
      - name: EasyPhase
        completion_criteria:
          measure: reward
          behavior: JumperAgent
          min_lesson_length: 100
          threshold: 0.8             # Переход при reward > 0.8
        value: 0.5                   # Начальная высота: 0.5
      - name: MediumPhase
        completion_criteria:
          measure: reward
          behavior: JumperAgent
          min_lesson_length: 100
          threshold: 0.8
        value: 1.0                   # Средняя: 1.0
      - name: HardPhase
        value: 2.0                   # Финальная: 2.0

  obstacle_speed:
    curriculum:
      - name: SlowPhase
        completion_criteria:
          measure: reward
          behavior: JumperAgent
          threshold: 0.7
        value: 1.0
      - name: FastPhase
        value: 3.0`}
          </CyberCodeBlock>
        </section>

        {/* C# side */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">C#: чтение параметров curriculum</h2>
          <CyberCodeBlock language="csharp" filename="JumperEnvironment.cs">
{`using Unity.MLAgents;
using UnityEngine;

public class JumperEnvironment : MonoBehaviour
{
    public Transform obstacle;
    private EnvironmentParameters envParams;

    void Start()
    {
        envParams = Academy.Instance.EnvironmentParameters;
    }

    public void ResetEnvironment()
    {
        // Читаем текущие параметры curriculum
        float height = envParams.GetWithDefault(
            "obstacle_height", 0.5f);
        float speed = envParams.GetWithDefault(
            "obstacle_speed", 1.0f);

        // Применяем к среде
        obstacle.localScale = new Vector3(
            obstacle.localScale.x,
            height,
            obstacle.localScale.z);

        // Скорость применяется в Update()
        obstacleSpeed = speed;

        Debug.Log($"Curriculum: height={height}, speed={speed}");
    }

    private float obstacleSpeed;

    void FixedUpdate()
    {
        // Двигаем препятствие
        obstacle.Translate(Vector3.left * obstacleSpeed * Time.fixedDeltaTime);

        // Сброс если вышло за пределы
        if (obstacle.localPosition.x < -10f)
        {
            obstacle.localPosition = new Vector3(10f, obstacle.localPosition.y, 0);
        }
    }
}`}
          </CyberCodeBlock>
        </section>

        {/* Environment Randomization */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Environment Randomization</h2>
          <Card className="bg-card/40 border-primary/20 mb-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Shuffle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Domain Randomization</strong> — рандомизируем параметры
                среды при каждом эпизоде. Агент не может «заучить» одну конфигурацию и вынужден обобщать.
                Критически важно для sim-to-real transfer.
              </div>
            </CardContent>
          </Card>

          <CyberCodeBlock language="python" filename="randomization_config.yaml">
{`environment_parameters:
  # Uniform sampling: случайное значение из диапазона
  gravity:
    sampler_type: uniform
    sampler_parameters:
      min_value: 7.0
      max_value: 12.0           # Земная ≈ 9.81

  agent_mass:
    sampler_type: uniform
    sampler_parameters:
      min_value: 0.5
      max_value: 2.0

  # Gaussian sampling: нормальное распределение
  friction:
    sampler_type: gaussian
    sampler_parameters:
      mean: 0.5
      st_dev: 0.15

  # Multirange uniform: несколько диапазонов
  platform_size:
    sampler_type: multirangeuniform
    sampler_parameters:
      ranges:
        - [2.0, 4.0]
        - [6.0, 8.0]            # Исключаем средний размер`}
          </CyberCodeBlock>
        </section>

        {/* Generalization */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Как рандомизация помогает</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-destructive/30">
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-destructive">❌ Без рандомизации</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Агент запоминает одну конфигурацию</li>
                  <li>• Ломается при малейшем изменении среды</li>
                  <li>• Не переносится в реальный мир (sim-to-real gap)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-green-500/30">
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-green-400">✅ С рандомизацией</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Агент учится обобщать</li>
                  <li>• Робастен к изменениям параметров</li>
                  <li>• Лучше переносится в реальный мир</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Example */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Пример: прыжки через препятствия</h2>
          <Card className="bg-card/40 border-border/30">
            <CardContent className="p-5">
              <div className="space-y-3">
                {[
                  { phase: "Фаза 1 (Easy)", height: "0.5м", speed: "1×", expected: "~200k шагов для reward > 0.8" },
                  { phase: "Фаза 2 (Medium)", height: "1.0м", speed: "2×", expected: "~300k шагов (с учётом трансфера)" },
                  { phase: "Фаза 3 (Hard)", height: "2.0м", speed: "3×", expected: "~500k шагов" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-primary w-32">{item.phase}</span>
                    <span className="text-muted-foreground">H: {item.height}</span>
                    <span className="text-muted-foreground">V: {item.speed}</span>
                    <span className="text-xs text-muted-foreground/70">{item.expected}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Без curriculum агент на Hard-уровне может вообще не обучиться за 2M шагов.
                С curriculum — стабильно достигает reward {">"} 0.8 за ~800k.
              </p>
            </CardContent>
          </Card>
        </section>

        <Quiz title="Проверь себя: Curriculum Learning" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_3;
