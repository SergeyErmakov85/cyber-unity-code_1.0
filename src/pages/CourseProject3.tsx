import LessonLayout from "@/components/LessonLayout";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Trophy, CheckCircle2, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";

const CourseProject3 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Задание</h2>
        <p className="text-muted-foreground leading-relaxed">
          Создайте <CrossLinkToHub hubPath="/unity-projects/racing" hubTitle="Проект Racing Car">гоночного агента</CrossLinkToHub> в Unity, который управляет машинкой с непрерывным рулевым
          управлением и газом/тормозом. Агент должен проехать полный круг по трассе с чекпоинтами,
          не вылетая за пределы дороги.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Проект использует <CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="neural-networks" hubTitle="Unity ML-Agents — Нейросети">Ray Perception Sensors</CrossLinkToHub> для «зрения» агента, checkpoint-систему наград
          и SAC/PPO для обучения непрерывному управлению.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="project-3"
      lessonTitle="Гоночный агент с непрерывным управлением"
      lessonNumber="П3"
      duration="120–180 мин"
      tags={["#project", "#unity", "#sac", "#racing"]}
      level={2}
      prevLesson={{ path: "/courses/project-2", title: "Проект 2" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Environment */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Описание среды</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Трасса", value: "Замкнутый контур с поворотами разной сложности" },
              { label: "Агент", value: "Машинка с WheelColliders, Rigidbody" },
              { label: "Сенсоры", value: "Ray Perception: 9 лучей, дальность 20м, угол 180°" },
              { label: "Наблюдения", value: "11: 9 ray distances + скорость + угол к следующему checkpoint" },
              { label: "Действия", value: "2 непрерывных: steering [-1,1], throttle [-1,1]" },
              { label: "Чекпоинты", value: "12 на круг, триггеры-коллайдеры" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-card/40 border border-border/30">
                <p className="text-xs text-primary font-semibold">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reward */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Checkpoint-система наград</h2>
          <Card className="bg-card/40 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-foreground">Reward Structure</h3>
              </div>
              <div className="space-y-2">
                {[
                  { reward: "+1.0", event: "Прохождение очередного чекпоинта" },
                  { reward: "+5.0", event: "Завершение полного круга" },
                  { reward: "-0.001", event: "Каждый шаг (мотивация к скорости)" },
                  { reward: "-1.0", event: "Вылет за пределы трассы" },
                  { reward: "+speed×0.001", event: "Бонус за скорость в правильном направлении" },
                  { reward: "-0.01", event: "Движение задним ходом (wrong way)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-xs text-primary w-24 text-right">{item.reward}</span>
                    <span className="text-muted-foreground">{item.event}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Agent script */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Starter-код</h2>
          <CyberCodeBlock language="csharp" filename="RacingAgent.cs">
{`using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class RacingAgent : Agent
{
    public Transform[] checkpoints;
    public float maxSpeed = 30f;
    private Rigidbody rb;
    private int currentCheckpoint = 0;

    public override void Initialize()
    {
        rb = GetComponent<Rigidbody>();
    }

    public override void OnEpisodeBegin()
    {
        transform.localPosition = checkpoints[0].position;
        transform.localRotation = checkpoints[0].rotation;
        rb.velocity = Vector3.zero;
        rb.angularVelocity = Vector3.zero;
        currentCheckpoint = 1;
    }

    public override void CollectObservations(VectorSensor sensor)
    {
        // Скорость (нормализованная)
        sensor.AddObservation(rb.velocity.magnitude / maxSpeed);

        // Направление к следующему чекпоинту
        Vector3 toCheckpoint = (checkpoints[currentCheckpoint].position
            - transform.position).normalized;
        float angle = Vector3.SignedAngle(
            transform.forward, toCheckpoint, Vector3.up) / 180f;
        sensor.AddObservation(angle);

        // Ray Perception добавляет остальные наблюдения автоматически
    }

    public override void OnActionReceived(ActionBuffers actions)
    {
        float steering = actions.ContinuousActions[0];
        float throttle = actions.ContinuousActions[1];

        // Применяем управление
        ApplyCarControl(steering, throttle);

        // Бонус за скорость в правильном направлении
        Vector3 toCP = (checkpoints[currentCheckpoint].position
            - transform.position).normalized;
        float alignment = Vector3.Dot(rb.velocity.normalized, toCP);
        AddReward(alignment * rb.velocity.magnitude * 0.001f);

        // Штраф за время
        AddReward(-0.001f);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Checkpoint"))
        {
            AddReward(1.0f);
            currentCheckpoint = (currentCheckpoint + 1) % checkpoints.Length;

            if (currentCheckpoint == 0)
            {
                AddReward(5.0f); // Полный круг!
                EndEpisode();
            }
        }
        else if (other.CompareTag("Wall"))
        {
            AddReward(-1.0f);
            EndEpisode();
        }
    }

    private void ApplyCarControl(float steering, float throttle)
    {
        // TODO: реализуйте через WheelColliders или AddForce
        rb.AddForce(transform.forward * throttle * 20f);
        transform.Rotate(0, steering * 100f * Time.fixedDeltaTime, 0);
    }

    public override void Heuristic(in ActionBuffers actionsOut)
    {
        var c = actionsOut.ContinuousActions;
        c[0] = Input.GetAxis("Horizontal");
        c[1] = Input.GetAxis("Vertical");
    }
}`}
          </CyberCodeBlock>

          <CyberCodeBlock language="python" filename="racing_config.yaml">
{`behaviors:
  RacingAgent:
    trainer_type: ppo          # или sac для лучших результатов
    hyperparameters:
      batch_size: 2048
      buffer_size: 20480
      learning_rate: 3.0e-4
      beta: 5.0e-3
      epsilon: 0.2
      lambd: 0.95
      num_epoch: 3
    network_settings:
      normalize: true
      hidden_units: 256
      num_layers: 3
    reward_signals:
      extrinsic:
        gamma: 0.995           # Высокий γ для долгосрочного планирования
        strength: 1.0
    max_steps: 2000000
    time_horizon: 128
    summary_freq: 10000`}
          </CyberCodeBlock>

          <div className="flex gap-3 mt-4 flex-wrap">
            <Button variant="outline" size="sm" asChild>
              <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Unity Package
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              Скачать YAML
            </Button>
          </div>
        </section>

        {/* Success criteria */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Критерии успеха</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-muted-foreground">Метрика</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Минимум</th>
                  <th className="text-left py-2 px-3 text-muted-foreground">Хорошо</th>
                  <th className="text-left py-2 px-3 text-primary">Отлично</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: "Завершение круга", min: "> 50%", good: "> 80%", great: "> 95%" },
                  { m: "Время на круг", min: "< 60с", good: "< 40с", great: "< 30с" },
                  { m: "Шаги обучения", min: "< 2M", good: "< 1M", great: "< 500k" },
                  { m: "Среднее число чекпоинтов", min: "> 8/12", good: "> 10/12", great: "12/12" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="py-2 px-3 text-foreground">{row.m}</td>
                    <td className="py-2 px-3 text-muted-foreground">{row.min}</td>
                    <td className="py-2 px-3 text-secondary">{row.good}</td>
                    <td className="py-2 px-3 text-primary font-semibold">{row.great}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Level 2 completion */}
        <section>
          <Card className="bg-gradient-to-r from-secondary/10 via-card/80 to-accent/10 border-secondary/30">
            <CardContent className="p-6 text-center space-y-3">
              <Trophy className="w-10 h-10 text-secondary mx-auto" />
              <h3 className="text-xl font-bold text-foreground">Уровень 2 завершён!</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Вы освоили Policy Gradient, PPO, Actor-Critic, reward shaping, параллельные среды
                и визуализацию обучения. Готовы к финальному уровню?
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <Button variant="cyber" size="lg" asChild>
                  <Link to="/courses">Перейти к Уровню 3 →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </ProGate>
    </LessonLayout>
  );
};

export default CourseProject3;
