import LessonLayout from "@/components/LessonLayout";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const quizQuestions = [
  {
    question: "Какая проблема возникает при sparse rewards?",
    options: [
      "Агент обучается слишком быстро",
      "Агент редко получает сигнал обратной связи — сложно понять, какие действия полезны",
      "Награды слишком большие",
      "Sparse rewards не используются в RL",
    ],
    correctIndex: 1,
  },
  {
    question: "Что такое reward hacking?",
    options: [
      "Атака на систему наград хакерами",
      "Агент находит непредусмотренный способ получить высокую награду, не решая задачу",
      "Ускорение обучения через модификацию reward",
      "Метод оптимизации гиперпараметров",
    ],
    correctIndex: 1,
  },
  {
    question: "Почему potential-based reward shaping безопасен?",
    options: [
      "Он всегда увеличивает reward",
      "Он гарантированно не меняет оптимальную политику (доказано теоретически)",
      "Он работает только с DQN",
      "Он не требует настройки",
    ],
    correctIndex: 1,
  },
  {
    question: "Какой тип reward лучше для начала обучения сложному поведению?",
    options: [
      "Только sparse (+1 за успех)",
      "Dense reward с промежуточными сигналами",
      "Отрицательный reward за все действия",
      "Случайный reward",
    ],
    correctIndex: 1,
  },
];

const CourseLesson2_4 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Sparse vs Dense Rewards</h2>
        <p className="text-muted-foreground leading-relaxed">
          Проектирование функции награды — одна из самых важных и недооценённых задач в RL.
          <strong className="text-foreground"> Sparse reward</strong> (+1 только за достижение цели) кажется
          простым, но агент может часами блуждать, не получая сигнала. <strong className="text-foreground">Dense reward</strong>
          даёт обратную связь на каждом шаге, но его легко спроектировать неправильно.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          В этом уроке мы разберём теоретические основы <CrossLinkToHub hubPath="/deep-rl" hubAnchor="practice" hubTitle="Deep RL — Практика">reward shaping</CrossLinkToHub> и практические приёмы,
          которые помогут вашим агентам обучаться быстрее и стабильнее.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="2-4"
      lessonTitle="Reward Shaping: искусство проектирования наград"
      lessonNumber="2.4"
      duration="30 мин"
      tags={["#theory", "#practice", "#reward-design"]}
      level={2}
      prevLesson={{ path: "/courses/2-3", title: "Actor-Critic в Unity" }}
      nextLesson={{ path: "/courses/2-5", title: "Параллельные среды" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* Sparse vs Dense */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-destructive/30">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-foreground">❌ Sparse Reward</h3>
                <CyberCodeBlock language="csharp" filename="sparse.cs">
{`// Только +1 за победу
if (reachedGoal) AddReward(1.0f);
// Агент может часами не получать сигнала`}
                </CyberCodeBlock>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-green-500/30">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-foreground">✅ Dense Reward</h3>
                <CyberCodeBlock language="csharp" filename="dense.cs">
{`// Промежуточные сигналы
float dist = Vector3.Distance(pos, goal);
AddReward(-dist * 0.001f);  // За расстояние
if (reachedGoal) AddReward(1.0f);`}
                </CyberCodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Potential-based */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Potential-based Reward Shaping</h2>
          <Card className="bg-card/40 border-primary/20 mb-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Теорема (Ng et al., 1999):</strong> если дополнительная
                награда имеет форму F(s, s') = γΦ(s') − Φ(s), где Φ — потенциальная функция,
                то оптимальная политика не изменится. Это единственная безопасная форма reward shaping.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practical techniques */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Практические приёмы</h2>
          <div className="space-y-3">
            {[
              { title: "Distance-based", desc: "Награда обратно пропорциональна расстоянию до цели. Просто и эффективно.", icon: Target },
              { title: "Curriculum-based", desc: <span>Начинаем с простых задач, постепенно усложняем (<CrossLinkToHub hubPath="/deep-rl" hubAnchor="practice" hubTitle="Deep RL — практика">curriculum learning</CrossLinkToHub>). Агент не теряет мотивацию.</span>, icon: Lightbulb },
              { title: "Curiosity-driven", desc: "Внутренняя награда за посещение новых состояний. Решает проблему sparse rewards.", icon: Target },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-lg bg-card/40 border border-border/30">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reward hacking */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Типичные ловушки</h2>
          <div className="space-y-3">
            {[
              { trap: "Reward Hacking", example: "Агент, получающий reward за движение вперёд, научился двигаться по кругу — формально «вперёд», но без прогресса." },
              { trap: "Deceptive Alignment", example: "Агент выучил получать reward, обманывая систему оценки, а не решая реальную задачу." },
              { trap: "Reward Clipping", example: "Обрезка больших наград может убрать важный сигнал. Используйте нормализацию вместо clipping." },
            ].map((item, i) => (
              <Card key={i} className="bg-card/40 border-destructive/20">
                <CardContent className="p-4 flex gap-3 items-start">
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{item.trap}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Unity C# example */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Пример: <CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="training" hubTitle="Unity ML-Agents — Обучение">AddReward / SetReward</CrossLinkToHub> в Unity C#</h2>
          <CyberCodeBlock language="csharp" filename="RewardExample.cs">
{`public override void OnActionReceived(ActionBuffers actions)
{
    float steering = actions.ContinuousActions[0];
    float throttle = actions.ContinuousActions[1];

    // Применяем действия
    ApplyMovement(steering, throttle);

    // ── Dense Rewards ──────────────────────────────
    // 1. Награда за приближение к цели
    float currentDist = Vector3.Distance(transform.position, target.position);
    float distReward = (previousDist - currentDist) * 10f;
    AddReward(distReward);
    previousDist = currentDist;

    // 2. Штраф за время (мотивация к скорости)
    AddReward(-0.001f);

    // 3. Штраф за отклонение от направления
    float alignment = Vector3.Dot(
        transform.forward,
        (target.position - transform.position).normalized);
    AddReward(alignment * 0.01f);

    // ── Sparse Rewards ─────────────────────────────
    if (currentDist < 1.0f)
    {
        AddReward(1.0f);
        EndEpisode();
    }

    if (transform.position.y < -1f)
    {
        AddReward(-1.0f);
        EndEpisode();
    }
}`}
          </CyberCodeBlock>
        </section>

        <Card className="border-accent/20 bg-accent/5 mt-8">
          <CardContent className="p-5 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">Практика: FoodCollector с REINFORCE</p>
              <p className="text-sm text-muted-foreground mb-3">
                Полный пайплайн обучения агента: кастомный REINFORCE на PyTorch, GridSensor, ONNX.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/unity-projects/food-collector">Открыть проект →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Quiz title="Проверь себя: Reward Shaping" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson2_4;
