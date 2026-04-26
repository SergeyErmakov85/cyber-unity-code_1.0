import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle2, Gamepad2, Brain, Settings, Package, Star } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const CourseFinalProject = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">🏆 Финальный проект: Полноценная игра с обученным NPC</h2>
        <p className="text-muted-foreground leading-relaxed">
          Это кульминация всего курса. Вы создадите <strong className="text-primary">полноценную Unity-игру</strong>,
          в которой NPC-противник обучен с помощью RL. Проект объединяет все навыки: проектирование среды,
          функцию награды, обучение, оптимизацию и деплой.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Успешное завершение проекта подтверждает вашу квалификацию как специалиста по RL в gamedev
          и открывает доступ к <strong className="text-secondary">сертификату об окончании курса</strong>.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="final-project"
      lessonTitle="Финальный проект: Полноценная игра с обученным NPC"
      lessonNumber="FP"
      duration="10–20 часов"
      tags={["#project", "#unity", "#ppo", "#sac", "#final"]}
      level={3}
      prevLesson={{ path: "/courses/3-7", title: "Архитектуры нейросетей" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-primary" />
            Описание проекта
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Создайте Unity-игру, в которой игрок сражается или соревнуется с NPC, обученным
            через <CrossLinkToHub hubPath="/algorithms/ppo" hubTitle="PPO — Proximal Policy Optimization">PPO или SAC</CrossLinkToHub>. Жанр и механики — на ваш выбор. Примеры:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-primary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">🎯 Арена-шутер</h4>
                <p className="text-sm text-muted-foreground">
                  NPC-противник на арене, обученный уклоняться и стрелять. Игрок управляет персонажем вручную.
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-secondary mb-2">⚽ Спортивная игра</h4>
                <p className="text-sm text-muted-foreground">
                  2v2 футбол или хоккей. NPC-напарник помогает, NPC-противники обучены через Self-Play.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-accent mb-2">🏎️ Гоночная игра</h4>
                <p className="text-sm text-muted-foreground">
                  NPC-соперники на гоночной трассе. Обучены проходить круги через checkpoint-систему наград.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2">🗡️ Tower Defense</h4>
                <p className="text-sm text-muted-foreground">
                  NPC-атакующие обучены находить оптимальный путь и адаптироваться к защитным башням.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pipeline */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Этапы проекта</h2>
          <div className="space-y-4">
            {[
              { icon: <Gamepad2 className="w-5 h-5" />, title: "Этап 1: Среда", desc: "Создайте Unity-сцену с ареной/трассой, объектами и физикой. Добавьте Agent-компонент.", time: "2–4 часа" },
              { icon: <Star className="w-5 h-5" />, title: "Этап 2: Функция награды", desc: "Спроектируйте reward: dense rewards для ускорения, штрафы за ошибки, бонусы за цели.", time: "2–3 часа" },
              { icon: <Brain className="w-5 h-5" />, title: "Этап 3: Обучение", desc: "Настройте YAML-конфиг (PPO/SAC), запустите mlagents-learn с параллельными средами.", time: "2–4 часа" },
              { icon: <Settings className="w-5 h-5" />, title: "Этап 4: Оптимизация", desc: <span>Используйте Optuna или ручной подбор для финальной настройки гиперпараметров. Примените <CrossLinkToHub hubPath="/fca-rl" hubAnchor="fca-practice" hubTitle="FCA — Практика">FCA-анализ</CrossLinkToHub> для структурирования результатов.</span>, time: "2–4 часа" },
              { icon: <Package className="w-5 h-5" />, title: "Этап 5: Деплой", desc: <span>Выполните <CrossLinkToHub hubPath="/pytorch/cheatsheet" hubAnchor="onnx-export" hubTitle="PyTorch — ONNX-экспорт">ONNX-экспорт</CrossLinkToHub>, подключите к BehaviorParameters, оптимизируйте модель.</span>, time: "1–2 часа" },
              { icon: <Gamepad2 className="w-5 h-5" />, title: "Этап 6: Геймплей", desc: "Добавьте UI, управление игроком, камеру. Соберите билд под целевую платформу.", time: "2–4 часа" },
            ].map((stage, i) => (
              <Card key={i} className="border-border/30 bg-card/50">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 text-primary">
                    {stage.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{stage.title}</h4>
                      <span className="text-xs text-muted-foreground">{stage.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stage.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Starter Template */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Стартовый шаблон агента</h2>
          <CyberCodeBlock language="csharp" filename="GameNPCAgent.cs">
{`using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class GameNPCAgent : Agent
{
    [Header("References")]
    public Transform target;           // цель / противник
    public Transform[] waypoints;      // опциональные waypoints
    
    [Header("Settings")]
    public float moveSpeed = 5f;
    public float rotateSpeed = 200f;
    
    private Rigidbody rb;
    private int score = 0;
    
    public override void Initialize()
    {
        rb = GetComponent<Rigidbody>();
    }
    
    public override void OnEpisodeBegin()
    {
        // Сброс позиции агента
        transform.localPosition = new Vector3(
            Random.Range(-4f, 4f), 0.5f, Random.Range(-4f, 4f)
        );
        rb.velocity = Vector3.zero;
        rb.angularVelocity = Vector3.zero;
        
        // Сброс цели (опционально)
        if (target != null)
        {
            target.localPosition = new Vector3(
                Random.Range(-4f, 4f), 0.5f, Random.Range(-4f, 4f)
            );
        }
    }
    
    public override void CollectObservations(VectorSensor sensor)
    {
        // Собственная позиция и скорость
        sensor.AddObservation(transform.localPosition);        // 3
        sensor.AddObservation(rb.velocity);                     // 3
        
        // Направление к цели
        if (target != null)
        {
            Vector3 toTarget = target.localPosition - transform.localPosition;
            sensor.AddObservation(toTarget.normalized);         // 3
            sensor.AddObservation(toTarget.magnitude);          // 1
        }
        
        // Добавьте свои наблюдения:
        // - HP агента и противника
        // - Расстояния до стен (ray perception)
        // - Состояние оружия / cooldown
    }
    
    public override void OnActionReceived(ActionBuffers actions)
    {
        // Непрерывные действия
        float moveX = actions.ContinuousActions[0];
        float moveZ = actions.ContinuousActions[1];
        
        Vector3 move = new Vector3(moveX, 0, moveZ) * moveSpeed;
        rb.AddForce(move, ForceMode.VelocityChange);
        
        // Штраф за время (мотивация действовать быстрее)
        AddReward(-0.001f);
        
        // Проверка достижения цели
        if (target != null)
        {
            float dist = Vector3.Distance(transform.localPosition, target.localPosition);
            if (dist < 1.5f)
            {
                AddReward(1.0f);
                score++;
                EndEpisode();
            }
        }
    }
    
    public override void Heuristic(in ActionBuffers actionsOut)
    {
        var ca = actionsOut.ContinuousActions;
        ca[0] = Input.GetAxis("Horizontal");
        ca[1] = Input.GetAxis("Vertical");
    }
    
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Wall"))
        {
            AddReward(-0.5f);
        }
    }
}`}
          </CyberCodeBlock>

          <CyberCodeBlock language="python" filename="final_project_config.yaml">
{`behaviors:
  GameNPC:
    trainer_type: ppo
    max_steps: 2000000
    time_horizon: 128
    
    hyperparameters:
      learning_rate: 3.0e-4
      learning_rate_schedule: linear
      batch_size: 256
      buffer_size: 4096
      beta: 0.005
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 4
    
    network_settings:
      normalize: true
      hidden_units: 256
      num_layers: 3
      vis_encode_type: simple  # если используете камеру
      # memory:                # раскомментируйте для LSTM
      #   memory_size: 256
      #   sequence_length: 64
    
    reward_signals:
      extrinsic:
        strength: 1.0
        gamma: 0.99
    
    # Параллельные среды для ускорения
    # num_envs: 8  (настраивается при запуске)
    
    # Опционально: GAIL для ускорения начального обучения
    # reward_signals:
    #   gail:
    #     strength: 0.3
    #     demo_path: Demos/expert.demo`}
          </CyberCodeBlock>
        </section>

        {/* Evaluation Criteria */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Критерии оценки
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-primary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-3">Обязательные требования</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {[
                    "Unity-сцена с агентом и интерактивной средой",
                    "Работающая функция награды (dense rewards)",
                    "Обученная модель через PPO или SAC",
                    "ONNX-экспорт и работающий инференс в Unity",
                    "Игрок может взаимодействовать с обученным NPC",
                    "TensorBoard-графики процесса обучения",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-secondary mb-3">Бонусные задания</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {[
                    "Curriculum Learning для постепенного усложнения",
                    "Self-Play для конкурентного NPC",
                    "GAIL для ускорения обучения из демонстраций",
                    "Оптимизация гиперпараметров через Optuna",
                    "Квантизация модели для мобильной платформы",
                    "W&B-логирование с красивыми графиками",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certificate */}
        <section>
          <Card className="border-secondary/40 bg-gradient-to-br from-secondary/10 via-card/80 to-primary/10">
            <CardContent className="p-8 text-center space-y-4">
              <Trophy className="w-16 h-16 text-secondary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">Сертификат об окончании курса</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                После успешного завершения финального проекта и прохождения всех квизов
                вы получите <strong className="text-secondary">сертификат</strong> —
                подтверждение вашей квалификации как специалиста по RL в gamedev.
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {["PyTorch", "Unity ML-Agents", "PPO", "SAC", "GAIL", "ONNX", "Optuna"].map(skill => (
                  <span key={skill} className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </ProGate>
    </LessonLayout>
  );
};

export default CourseFinalProject;
