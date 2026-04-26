import LessonLayout from "@/components/LessonLayout";

const CourseLesson1_6 = () => (
  <LessonLayout
    lessonTitle="Q-Learning: табличный метод"
    lessonNumber="1.6"
    duration="30 мин"
    tags={["algorithm", "tabular"]}
    level={1}
    lessonId="1-6"
    prevLesson={{ path: "/courses/1-2", title: "Установка окружения" }}
    nextLesson={{ path: "/courses/1-3", title: "CartPole" }}
  >
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">🚧 Урок в разработке</h2>
      <p className="text-muted-foreground text-lg">
        Этот урок скоро будет доступен. Вы узнаете, как работает табличный Q-Learning
        и реализуете его с нуля на Python.
      </p>
    </section>
  </LessonLayout>
);

export default CourseLesson1_6;
