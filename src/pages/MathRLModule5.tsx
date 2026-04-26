import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HubLessonBadges from "@/components/HubLessonBadges";
import CrossLinkToLesson from "@/components/CrossLinkToLesson";
import { useNavigate } from "react-router-dom";

import Introduction from "@/components/math-rl/module1/Introduction";
import Chapter1 from "@/components/math-rl/module1/Chapter1";
import Chapter2 from "@/components/math-rl/module1/Chapter2";
import Chapter3 from "@/components/math-rl/module1/Chapter3";
import Chapter4 from "@/components/math-rl/module1/Chapter4";
import Chapter5 from "@/components/math-rl/module1/Chapter5";
import Chapter6 from "@/components/math-rl/module1/Chapter6";
import Chapter7 from "@/components/math-rl/module1/Chapter7";
import Chapter8 from "@/components/math-rl/module1/Chapter8";
import Chapter9 from "@/components/math-rl/module1/Chapter9";
import Chapter10 from "@/components/math-rl/module1/Chapter10";
import Conclusion from "@/components/math-rl/module1/Conclusion";

const chapters = [
  "Введение",
  "1. Теоретико-вероятностный фундамент",
  "2. Многорукие бандиты",
  "3. MDP",
  "4. Возврат и функции ценности",
  "5. Уравнения Беллмана",
  "6. Model-Free RL",
  "7. Следы пригодности",
  "8. Deep RL",
  "9. Policy Gradients",
  "10. Unity ML-Agents",
  "Заключение и глоссарий",
];

const MathRLModule5 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/math-rl")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            К модулям
          </Button>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 5</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl flex gap-8">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-[80px] space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Содержание</p>
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => {
                  const sections = document.querySelectorAll("article section");
                  sections[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="block w-full text-left text-xs py-1.5 px-2 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/5 transition-colors cursor-pointer truncate"
              >
                {ch}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Фундаментальная математика
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-foreground/80 mb-2">
            обучения с подкреплением
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Исчерпывающий модуль: от теории вероятностей до Actor-Critic. Ключевые связи: Bellman в DQN — <CrossLinkToLesson lessonId="1-5" lessonPath="/courses/1-5" lessonTitle="DQN с нуля на PyTorch" lessonLevel={1} />, GAE в PPO — <CrossLinkToLesson lessonId="2-2" lessonPath="/courses/2-2" lessonTitle="PPO — Proximal Policy Optimization" lessonLevel={2} />, entropy в SAC — <CrossLinkToLesson lessonId="3-1" lessonPath="/courses/3-1" lessonTitle="SAC — Soft Actor-Critic" lessonLevel={3} />, дисконтирование — <CrossLinkToLesson lessonId="1-1" lessonPath="/courses/1-1" lessonTitle="Что такое обучение с подкреплением?" lessonLevel={1} />.
          </p>
          <HubLessonBadges hubPath="/math-rl/module-5" />

          <Introduction />
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Chapter5 />
          <Chapter6 />
          <Chapter7 />
          <Chapter8 />
          <Chapter9 />
          <Chapter10 />
          <Conclusion />

          {/* Back button */}
          <div className="mt-16 flex justify-center">
            <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-secondary/50 text-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к модулям
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MathRLModule5;