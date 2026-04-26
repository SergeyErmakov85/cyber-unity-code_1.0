import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LEARNING_MAP } from "@/content/learningMap";
import type { ContextLink } from "@/content/lessonContextLinks";
import type { HubId } from "@/content/hubs";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { useUserRole } from "@/hooks/useUserRole";
import ContextBridgeCard from "@/components/ContextBridgeCard";
import HubQuickViewDrawer from "@/components/HubQuickViewDrawer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";

type Placement = ContextLink["placement"];

const DUMMY_SECTIONS: { placement: Placement; heading: string; body: string }[] = [
  {
    placement: "after-intro",
    heading: "Введение",
    body: "В этом разделе мы познакомимся с ключевыми концепциями урока. Вы узнаете, зачем этот материал важен и как он вписывается в общую картину обучения с подкреплением.",
  },
  {
    placement: "after-core-explanation",
    heading: "Основная теория",
    body: "Здесь будет подробное объяснение теоретических основ: формулы, определения и интуитивные примеры. Мы разберём каждый компонент и покажем, как они связаны между собой.",
  },
  {
    placement: "after-code",
    heading: "Код и практика",
    body: "Практическая часть: реализация алгоритма на Python/PyTorch, пошаговый разбор кода и запуск экспериментов. Попробуйте изменить гиперпараметры и наблюдайте за результатами.",
  },
  {
    placement: "lesson-end",
    heading: "Итоги и следующие шаги",
    body: "Подведём итоги урока, закрепим ключевые выводы и наметим план дальнейшего изучения. Не забудьте выполнить практическое задание!",
  },
];

const LessonPage = () => {
  const { stageSlug, lessonSlug } = useParams<{ stageSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useUserRole();
  const { getStatus, completeLesson, getNextSlug } = useLearningProgress(isAdmin);

  const [drawerHub, setDrawerHub] = useState<HubId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { stage, lesson } = useMemo(() => {
    const s = LEARNING_MAP.find((st) => st.slug === stageSlug);
    const l = s?.lessons.find((ls) => ls.slug === lessonSlug);
    return { stage: s ?? null, lesson: l ?? null };
  }, [stageSlug, lessonSlug]);

  const status = lessonSlug ? getStatus(lessonSlug) : ("locked" as const);

  const linksByPlacement = useMemo(() => {
    const map: Record<Placement, ContextLink[]> = {
      "after-intro": [],
      "after-core-explanation": [],
      "after-code": [],
      "lesson-end": [],
    };
    lesson?.contextLinks.forEach((cl) => map[cl.placement].push(cl));
    return map;
  }, [lesson]);

  const openDrawer = (hubId: HubId) => {
    setDrawerHub(hubId);
    setDrawerOpen(true);
  };

  // Not found
  if (!stage || !lesson) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Урок не найден</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> На главную
        </Button>
      </div>
    );
  }

  // Locked
  if (status === "locked") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <Lock className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center max-w-sm">
          Этот урок ещё закрыт. Завершите предыдущие уроки, чтобы разблокировать его.
        </p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> К карте обучения
        </Button>
      </div>
    );
  }

  // Prev / Next
  const allLessons = LEARNING_MAP.flatMap((s) =>
    s.lessons.map((l) => ({ stageSlug: s.slug, ...l }))
  );
  const currentIdx = allLessons.findIndex((l) => l.slug === lessonSlug);
  const prev = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const next = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const isCompleted = status === "completed";
  const nextSlug = getNextSlug(lessonSlug!);

  const handleComplete = () => {
    completeLesson(lessonSlug!);
    if (nextSlug) {
      const nextStage = LEARNING_MAP.find((s) => s.lessons.some((l) => l.slug === nextSlug));
      if (nextStage) navigate(`/learn/${nextStage.slug}/${nextSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-foreground">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-muted-foreground">{stage.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">{lesson.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              {stage.title}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Завершён
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">{lesson.title}</span>
          </h1>
        </div>

        {DUMMY_SECTIONS.map((section) => (
          <div key={section.placement} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>

            {linksByPlacement[section.placement].length > 0 && (
              <div className="space-y-3 pt-2">
                {linksByPlacement[section.placement].map((cl, i) => (
                  <ContextBridgeCard
                    key={`${cl.hubId}-${i}`}
                    hubId={cl.hubId}
                    title={cl.title}
                    whyThisNow={cl.whyThisNow}
                    ctaLabel={cl.ctaLabel}
                    isPrimary={cl.isPrimary}
                    onClick={() => openDrawer(cl.hubId)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Mark complete */}
        {!isCompleted && (
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              className="bg-gradient-neon hover:shadow-glow-cyan text-primary-foreground"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Завершить урок
            </Button>
          </div>
        )}

        {/* Prev / Next nav */}
        <div className="flex items-center justify-between pt-8 border-t border-border/50">
          {prev ? (
            <Button variant="ghost" onClick={() => navigate(`/learn/${prev.stageSlug}/${prev.slug}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> {prev.title}
            </Button>
          ) : <div />}
          {next ? (
            <Button
              variant="ghost"
              onClick={() => navigate(`/learn/${next.stageSlug}/${next.slug}`)}
              disabled={getStatus(next.slug) === "locked"}
            >
              {next.title} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : <div />}
        </div>
      </div>

      <HubQuickViewDrawer hubId={drawerHub} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
};

export default LessonPage;
