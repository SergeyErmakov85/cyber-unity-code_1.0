import { MessageSquare } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4 relative bg-cyber-darker/50">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-4">
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">Отзывы</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Что говорят </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              наши студенты
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Отзывы тех, кто уже прошёл обучение
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
