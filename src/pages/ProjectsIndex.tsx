import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Apple, Snowflake } from "lucide-react";

interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  ready: boolean;
  flagship?: boolean;
}

const projects: ProjectEntry[] = [
  {
    id: "food-collector",
    title: "Food Collector",
    description:
      "Полный пайплайн REINFORCE на PyTorch: кастомная среда, гибридные действия, GridSensor, экспорт ONNX для Unity Sentis.",
    icon: Apple,
    link: "/demo-project",
    ready: true,
    flagship: true,
  },
  {
    id: "frozen-lake",
    title: "Frozen Lake",
    description:
      "Классическая задача на табличный Q-Learning: скользкое озеро, дискретные состояния, стохастические переходы.",
    icon: Snowflake,
    link: "/projects/frozen-lake",
    ready: true,
  },
];

const ProjectsIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Проекты | Neon Unity Neural"
        description="Практические проекты по обучению с подкреплением: от FoodCollector до Frozen Lake."
      />
      <Navbar />

      <div className="pt-20 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Проекты
            </span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Пошаговые практические проекты по обучению с подкреплением — от
            классических задач до полного пайплайна с Unity.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.id}
                className={`bg-card/60 backdrop-blur-sm border-border/50 transition-all duration-300 ${
                  project.ready
                    ? "hover:border-primary/50 group"
                    : "opacity-60"
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {project.flagship && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                          ★ Флагманский проект
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary/10"
                    onClick={() => navigate(project.link)}
                    disabled={!project.ready}
                  >
                    {project.ready ? "Открыть проект" : "Скоро"}{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default ProjectsIndex;
