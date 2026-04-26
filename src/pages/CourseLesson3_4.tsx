import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import Math from "@/components/Math";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Copy, Layers } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "В чём ключевое отличие GAIL от Behavioral Cloning?",
    options: [
      "GAIL быстрее обучается",
      "GAIL использует дискриминатор для оценки «похожести» поведения, а не просто копирует действия",
      "BC работает только с дискретными действиями",
      "Отличий нет — это одно и то же",
    ],
    correctIndex: 1,
  },
  {
    question: "Когда Behavioral Cloning достаточен?",
    options: [
      "Когда задача сложная и данных мало",
      "Когда есть много качественных демонстраций и задача относительно простая",
      "BC всегда хуже GAIL",
      "Когда нет доступа к среде",
    ],
    correctIndex: 1,
  },
  {
    question: "Что делает Demonstration Recorder в Unity ML-Agents?",
    options: [
      "Записывает видео игрового процесса",
      "Записывает пары (наблюдение, действие) в .demo файл для обучения через имитацию",
      "Сохраняет веса нейросети",
      "Компилирует C# скрипт",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем комбинировать GAIL + RL?",
    options: [
      "Это бессмысленно",
      "GAIL помогает быстро начать, а RL-награда позволяет превзойти эксперта и адаптироваться",
      "Для ускорения компиляции",
      "RL заменяет GAIL полностью",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_4 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Учиться у эксперта</h2>
        <p className="text-muted-foreground leading-relaxed">
          Иногда проще <strong className="text-foreground">показать</strong> агенту, как выполнять задачу,
          чем проектировать сложную функцию награды. <strong className="text-primary">Imitation Learning</strong> —
          семейство методов, в которых агент учится, наблюдая за демонстрациями эксперта (человека или другого агента).
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Два ключевых подхода — <strong className="text-foreground"><CrossLinkToHub hubPath="/deep-rl" hubAnchor="algorithms" hubTitle="Deep RL — алгоритмы и имитация">Behavioral Cloning</CrossLinkToHub></strong> (BC), который
          напрямую копирует действия эксперта через supervised learning, и{" "}
          <strong className="text-secondary"><CrossLinkToHub hubPath="/deep-rl" hubAnchor="algorithms" hubTitle="Deep RL — алгоритмы и имитация">GAIL</CrossLinkToHub></strong> (Generative Adversarial Imitation Learning),
          использующий состязательную архитектуру для глубокого понимания стратегии эксперта.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-4"
      lessonTitle="Imitation Learning: GAIL и Behavioral Cloning"
      lessonNumber="3.4"
      duration="40 мин"
      tags={["#mlagents", "#imitation", "#gail", "#advanced"]}
      level={3}
      prevLesson={{ path: "/courses/3-3", title: "Curriculum Learning" }}
      nextLesson={{ path: "/courses/3-5", title: "Деплой модели" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Behavioral Cloning */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Copy className="w-6 h-6 text-primary" />
            Behavioral Cloning (BC)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            BC — простейшая форма имитационного обучения. Мы собираем датасет пар
            <code className="text-primary">(наблюдение, действие)</code> от эксперта и обучаем
            нейросеть предсказывать действия через supervised learning:
          </p>
          <Math>{`\\mathcal{L}_{BC} = \\mathbb{E}_{(s,a) \\sim \\mathcal{D}} \\left[ -\\log \\pi_\\theta(a|s) \\right]`}</Math>

          <Card className="border-primary/20 bg-card/50 mt-4">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold text-foreground">Когда BC достаточен</h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Много качественных демонстраций (100+ эпизодов)</li>
                <li>Задача относительно простая или детерминированная</li>
                <li>Не требуется превзойти эксперта</li>
              </ul>
              <h4 className="font-semibold text-foreground mt-3">Проблемы BC</h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>Distribution shift</strong> — агент никогда не видел ошибок, не знает как исправлять</li>
                <li><strong>Compounding errors</strong> — маленькие ошибки накапливаются</li>
                <li>Не может превзойти эксперта</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* GAIL */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-secondary" />
            GAIL — Generative Adversarial Imitation Learning
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            GAIL решает проблемы BC через <strong className="text-foreground">состязательное обучение</strong>.
            <CrossLinkToHub hubPath="/math-rl/module-4" hubAnchor="лекция-2-вывод-градиента-политики" hubTitle="Математика RL — Градиент политики и GAIL-подобные методы">Дискриминатор</CrossLinkToHub> учится отличать поведение агента от экспертного, а агент получает награду
            за то, что обманывает дискриминатор:
          </p>
          <Math>{`\\min_\\pi \\max_D \\; \\mathbb{E}_{\\pi}[\\log D(s,a)] + \\mathbb{E}_{\\pi_E}[\\log(1 - D(s,a))] - \\lambda H(\\pi)`}</Math>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card className="border-secondary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-secondary mb-2">Генератор (Агент)</h4>
                <p className="text-sm text-muted-foreground">
                  Пытается действовать так, чтобы дискриминатор считал его «экспертом».
                  Обучается стандартным RL-алгоритмом (PPO), где награда — выход дискриминатора.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">Дискриминатор</h4>
                <p className="text-sm text-muted-foreground">
                  Бинарный классификатор, который получает пары (s, a) и определяет:
                  эксперт это или агент. Обучается минимизировать cross-entropy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recording Demos */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Запись демонстраций в Unity
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Unity ML-Agents предоставляет компонент <code className="text-primary"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Обучение">DemonstrationRecorder</CrossLinkToHub></code>,
            который записывает действия игрока в <code>.demo</code> файл:
          </p>
          <CyberCodeBlock language="csharp" filename="DemonstrationRecorder Setup">
{`// 1. Добавьте компонент DemonstrationRecorder к Agent
// 2. Настройте в Inspector:
//    - Record: true
//    - Demonstration Name: "ExpertDemo"
//    - Demonstration Directory: "Assets/Demonstrations"

// 3. В Heuristic() реализуйте ручное управление:
public override void Heuristic(in ActionBuffers actionsOut)
{
    var continuousActions = actionsOut.ContinuousActions;
    continuousActions[0] = Input.GetAxis("Horizontal"); // steering
    continuousActions[1] = Input.GetAxis("Vertical");   // throttle
    
    // Запустите сцену и играйте — демонстрация запишется автоматически
}

// 4. После записи найдите файл:
//    Assets/Demonstrations/ExpertDemo.demo`}
          </CyberCodeBlock>
        </section>

        {/* GAIL + RL Combo */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Комбинирование GAIL + RL
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            На практике лучший результат даёт <strong className="text-foreground">комбинация</strong>:
            GAIL помогает агенту быстро найти хорошую стратегию, а RL-награда позволяет
            превзойти эксперта. В YAML это настраивается параметром <code className="text-primary">strength</code>
            и <code className="text-primary">gail_reward_signal</code>:
          </p>
          <CyberCodeBlock language="python" filename="gail_config.yaml">
{`behaviors:
  ImitationAgent:
    trainer_type: ppo
    max_steps: 1000000
    
    hyperparameters:
      learning_rate: 3.0e-4
      batch_size: 128
      buffer_size: 2048
    
    network_settings:
      hidden_units: 256
      num_layers: 2
    
    reward_signals:
      # Стандартная RL-награда из среды
      extrinsic:
        strength: 1.0    # вес RL-награды
        gamma: 0.99
      
      # GAIL-награда из демонстраций
      gail:
        strength: 0.5    # вес GAIL-награды
        gamma: 0.99
        demo_path: Assets/Demonstrations/ExpertDemo.demo
        use_actions: true   # учитывать действия (не только состояния)
        use_vail: false     # Variational — для сложных задач`}
          </CyberCodeBlock>

          <Card className="border-accent/20 bg-card/50 mt-4">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">Behavioral Cloning в YAML</h4>
              <CyberCodeBlock language="python" filename="bc_config.yaml">
{`behaviors:
  BCAgent:
    trainer_type: ppo
    max_steps: 500000
    
    behavioral_cloning:
      demo_path: Assets/Demonstrations/ExpertDemo.demo
      strength: 0.5        # вес BC-лосса
      steps: 150000         # через сколько шагов отключить BC
      batch_size: 512
      num_epoch: 3`}
              </CyberCodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>steps</strong> — BC автоматически отключается после указанного числа шагов,
                позволяя RL-обучению взять верх.
              </p>
            </CardContent>
          </Card>
        </section>

        <Quiz title="Тест: Imitation Learning" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_4;
