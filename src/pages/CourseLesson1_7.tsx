import LessonLayout from "@/components/LessonLayout";

const CourseLesson1_7 = () => (
  <LessonLayout
    lessonTitle="Exploration vs Exploitation"
    lessonNumber="1.7"
    duration="20 мин"
    tags={["theory", "strategy"]}
    level={1}
    lessonId="1-7"
    prevLesson={{ path: "/courses/1-5", title: "MDP" }}
    nextLesson={{ path: "/courses/project-1", title: "Проект: Балансировка шеста" }}
  >
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">🚧 Урок в разработке</h2>
      <p className="text-muted-foreground text-lg">
        Этот урок скоро будет доступен. Мы разберём ε-greedy, UCB, Thompson Sampling
        и другие стратегии исследования.
      </p>
    </section>
  </LessonLayout>
);

export default CourseLesson1_7;
