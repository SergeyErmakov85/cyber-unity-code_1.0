import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Lock, Crown, QrCode, Download, CheckCircle } from "lucide-react";
import { getProgress, getLevelCompletionPercent } from "@/lib/gamification";

const CertificatePreview = () => {
  const [userName, setUserName] = useState("Ваше имя");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const progress = getProgress();
  const allComplete = [0, 1, 2].every((i) => getLevelCompletionPercent(i) === 100);
  const overallPercent = Math.round(
    ([0, 1, 2].reduce((sum, i) => sum + getLevelCompletionPercent(i), 0)) / 3
  );

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setIsLoggedIn(true);
      const { data } = await supabase.from("profiles").select("name").eq("id", user.id).maybeSingle();
      if (data?.name) setUserName(data.name);
    };
    load();
  }, []);

  const todayFormatted = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Сертификат | RL Platform"
        description="Получите сертификат о прохождении курса по Reinforcement Learning после завершения всех уровней."
        path="/certificate-preview"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="text-center space-y-4 mb-10">
          <Award className="w-12 h-12 text-secondary mx-auto" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Сертификат о прохождении
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Подтверждает успешное завершение курса «Reinforcement Learning: от основ до мультиагентных систем»
          </p>
        </div>

        {/* Progress to certificate */}
        {!allComplete && (
          <div className="mb-8 p-5 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прогресс до сертификата</span>
              <span className="text-primary font-semibold">{overallPercent}%</span>
            </div>
            <Progress value={overallPercent} className="h-3" />
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { label: "Уровень 1", index: 0 },
                { label: "Уровень 2", index: 1 },
                { label: "Уровень 3", index: 2 },
              ].map(({ label, index }) => {
                const pct = getLevelCompletionPercent(index);
                const done = pct === 100;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-xs p-2 rounded-lg border ${
                      done
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-border/50 text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                    )}
                    {label}: {pct}%
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certificate Card */}
        <div className={`relative p-1 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent ${!allComplete ? "opacity-60" : ""}`}>
          <div className="bg-card rounded-xl p-8 md:p-12 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Сертификат</p>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                RL Learning Platform
              </h2>
              <p className="text-xs text-muted-foreground">Certificate of Completion</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Body */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Настоящим подтверждается, что</p>
              <p className="text-2xl font-bold text-foreground border-b border-dashed border-muted-foreground/30 pb-2 inline-block px-8">
                {userName}
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                успешно завершил(а) полный курс по обучению с подкреплением, включающий
                18 уроков, 5 практических проектов и финальный проект.
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Дата</p>
                <p className="text-sm font-semibold text-foreground">{allComplete ? todayFormatted : "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">XP</p>
                <p className="text-sm font-semibold text-primary font-mono">{progress.xp}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Верификация</p>
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded bg-muted/50 border border-border/50 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                Курс: Reinforcement Learning — от основ до мультиагентных систем
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center space-y-4">
          {allComplete ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
              <CheckCircle className="w-4 h-4" />
              Сертификат доступен для скачивания
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm text-secondary">
              <Lock className="w-4 h-4" />
              Завершите все 3 уровня, чтобы получить сертификат
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {allComplete ? (
              <Button className="bg-gradient-neon gap-2" disabled>
                <Download className="w-4 h-4" />
                Скачать PDF (скоро)
              </Button>
            ) : (
              <Button asChild className="bg-gradient-neon gap-2">
                <Link to="/courses">
                  <Crown className="w-4 h-4" />
                  Продолжить обучение
                </Link>
              </Button>
            )}
            {!isLoggedIn && (
              <Button variant="outline" asChild>
                <Link to="/login">Войти в аккаунт</Link>
              </Button>
            )}
            <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Распечатать / Сохранить как PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificatePreview;
