import LessonLayout from "@/components/LessonLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Layers, Sparkles, Target } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";
import CrossLinkToLesson from "@/components/CrossLinkToLesson";

const CourseProject1 = () => {
  return (
    <LessonLayout
      lessonId="project-1"
      lessonTitle='Проект-1: "Баланс в 3D"'
      lessonNumber="П1"
      duration="60–90 мин"
      tags={["#project", "#unity", "#3d", "#dqn"]}
      prevLesson={{ path: "/courses/1-7", title: "Exploration vs Exploitation" }}
      nextLesson={{ path: "/courses/2-1", title: "Введение в Уровень 2" }}
    >
      {/* Intro */}
      <section>
        <Card className="bg-gradient-to-br from-primary/10 via-card/40 to-secondary/10 border-primary/30">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Box className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                От 2D-шеста к 3D-платформе
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              В уроке{" "}
              <CrossLinkToLesson
                lessonId="1-4"
                lessonPath="/courses/1-4"
                lessonTitle="CartPole — твой первый RL-агент"
                lessonLevel={1}
              />{" "}
              мы провели полноценный воспроизводимый эксперимент по
              балансировке шеста в 2D-среде Gymnasium. Теперь поднимаемся на уровень
              выше — те же идеи, но в{" "}
              <strong className="text-foreground">настоящей 3D-среде Unity</strong> с
              физикой, сенсорами и графикой.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Mission */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Миссия проекта</h2>
        <Card className="bg-card/40 border-primary/30">
          <CardContent className="p-6 flex gap-4 items-start">
            <Target className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-foreground font-semibold">
                Обучите агента, который удерживает шар на 3D-платформе, наклоняя её
                по осям X и Z.
              </p>
              <p className="text-sm text-muted-foreground">
                Используется среда{" "}
                <CrossLinkToHub
                  hubPath="/unity-projects/ball-balance"
                  hubTitle="Unity → 3D Ball Balance"
                >
                  3D Ball Balance
                </CrossLinkToHub>{" "}
                из Unity ML-Agents. Алгоритм —{" "}
                <CrossLinkToHub hubPath="/algorithms/dqn" hubTitle="DQN — Deep Q-Network">
                  DQN
                </CrossLinkToHub>{" "}
                или его непрерывный аналог (PPO). Это прямой перенос идей CartPole в
                3D-мир.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why 3D */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Что нового в 3D?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              icon: Layers,
              title: "Непрерывные действия",
              desc: "Угол наклона по двум осям — вещественные числа, а не «лево/право».",
              color: "text-primary",
            },
            {
              icon: Box,
              title: "Реальная физика",
              desc: "Гравитация, инерция и трение Unity, а не упрощённая 2D-модель.",
              color: "text-secondary",
            },
            {
              icon: Sparkles,
              title: "Sensors & Observations",
              desc: "Состояние формируется через ML-Agents Sensors, как в боевых проектах.",
              color: "text-accent",
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card/40 border-border/30">
              <CardContent className="p-4 space-y-2">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <p className="font-semibold text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
          <CardContent className="p-6 text-center space-y-3">
            <h3 className="text-xl font-bold text-foreground">
              Полный гайд по проекту — в Unity-разделе
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Установка ML-Agents, конфиг тренировки, граф наград и ONNX-экспорт —
              в подробной странице проекта.
            </p>
            <Button variant="cyber" size="lg" asChild className="mt-2">
              <a href="/unity-projects/ball-balance" className="flex items-center gap-2">
                Открыть «Баланс в 3D» <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </LessonLayout>
  );
};

export default CourseProject1;
