import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { getProgress, ALL_BADGES, getLevel, getLevelProgress, getLevelCompletionPercent } from "@/lib/gamification";
import { User, Camera, BookOpen, Trophy, Settings, Lock, Trash2, Save, ArrowRight, Download } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const allLessonPaths = [
  "/courses/1-1", "/courses/1-2", "/courses/1-3", "/courses/1-4",
  "/courses/2-1", "/courses/2-2", "/courses/2-3", "/courses/2-4", "/courses/2-5", "/courses/2-6",
  "/courses/3-1", "/courses/3-2", "/courses/3-3", "/courses/3-4", "/courses/3-5", "/courses/3-6", "/courses/3-7",
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState("");

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Gamification
  const progress = getProgress();
  const totalLessons = allLessonPaths.length;
  const completedLessons = progress.completedLessons.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const level = getLevel(progress.xp);
  const levelProgress = getLevelProgress(progress.xp);

  // Determine current course
  const getCurrentCourse = () => {
    const lastCompleted = progress.completedLessons[progress.completedLessons.length - 1];
    if (!lastCompleted) return { name: "Уровень 1: Основы RL", path: "/courses/1-1" };
    const nextIndex = allLessonPaths.indexOf(lastCompleted) + 1;
    if (nextIndex >= allLessonPaths.length) return { name: "Все курсы пройдены! 🎉", path: "/courses" };
    const nextPath = allLessonPaths[nextIndex];
    if (nextPath.startsWith("/courses/1-")) return { name: "Уровень 1: Основы RL", path: nextPath };
    if (nextPath.startsWith("/courses/2-")) return { name: "Уровень 2: Deep RL", path: nextPath };
    return { name: "Уровень 3: Продвинутый RL", path: nextPath };
  };
  const currentCourse = getCurrentCourse();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUserId(user.id);
      setEmail(user.email || "");

      const { data } = await supabase.from("profiles").select("name, avatar_url, created_at").eq("id", user.id).maybeSingle();
      if (data) {
        setName(data.name || "");
        setAvatarUrl(data.avatar_url);
        setCreatedAt(data.created_at ? new Date(data.created_at).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" }) : "Дата не указана");
      }
      setLoading(false);
    };
    loadProfile();
  }, [navigate]);

  const handleSaveProfile = async () => {
    if (!userId) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ name }).eq("id", userId);
    setSaving(false);
    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Сохранено!", description: "Профиль обновлён" });
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast({ title: "Ошибка загрузки", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const url = `${publicUrl}?t=${Date.now()}`;
    await supabase.from("profiles").update({ avatar_url: url }).eq("id", userId);
    setAvatarUrl(url);
    toast({ title: "Аватар обновлён!" });
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Ошибка", description: "Пароль минимум 6 символов", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Ошибка", description: "Пароли не совпадают", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Пароль изменён!" });
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    // Sign out — actual deletion requires admin/edge function
    await supabase.auth.signOut();
    toast({ title: "Аккаунт", description: "Вы вышли из аккаунта. Для полного удаления свяжитесь с поддержкой." });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-lg">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Мой профиль</h1>

        <div className="grid gap-6">
          {/* Block 1 — Personal Info */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="w-5 h-5 text-primary" /> Личная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Avatar className="w-24 h-24 border-2 border-primary/30">
                      <AvatarImage src={avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {name ? name[0].toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => fileInputRef.current?.click()}>
                    Загрузить фото
                  </Button>
                </div>

                {/* Fields */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Имя</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="border-primary/20 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={email} disabled className="border-primary/20 bg-background/30 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Дата регистрации: {createdAt}
                  </div>
                  <Button onClick={handleSaveProfile} disabled={saving} className="bg-gradient-neon hover:shadow-glow-cyan">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Block 2 — Learning Progress */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" /> Прогресс обучения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Общий прогресс</span>
                  <span className="text-primary font-semibold">{overallPercent}%</span>
                </div>
                <Progress value={overallPercent} className="h-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">{completedLessons}</div>
                  <div className="text-xs text-muted-foreground">Уроков пройдено</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">{totalLessons}</div>
                  <div className="text-xs text-muted-foreground">Всего уроков</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">{progress.xp}</div>
                  <div className="text-xs text-muted-foreground">XP</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-2xl font-bold text-primary">Ур. {level}</div>
                  <div className="text-xs text-muted-foreground">{Math.round(levelProgress)}% до след.</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div>
                  <div className="text-sm text-muted-foreground">Текущий курс</div>
                  <div className="font-semibold text-foreground">{currentCourse.name}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate(currentCourse.path)}>
                  Продолжить <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Block 3 — Achievements */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Trophy className="w-5 h-5 text-primary" /> Достижения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_BADGES.map((badge) => {
                  const unlocked = progress.badges.some((b) => b.id === badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                        unlocked
                          ? "border-primary/30 bg-primary/5 shadow-glow-cyan"
                          : "border-muted/20 bg-muted/5 opacity-50 grayscale"
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className={`text-sm font-semibold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                        {badge.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                      {!unlocked && <Lock className="w-4 h-4 text-muted-foreground mx-auto mt-2" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Block 4 — Module Progress */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" /> Прогресс по модулям
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "Уровень 1 — Основы RL", index: 0, color: "text-primary" },
                { label: "Уровень 2 — Продвинутые методы", index: 1, color: "text-secondary" },
                { label: "Уровень 3 — Мастерство", index: 2, color: "text-accent" },
              ].map(({ label, index, color }) => {
                const percent = getLevelCompletionPercent(index);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className={`font-medium ${color}`}>{label}</span>
                      <span className="text-muted-foreground">{percent}%</span>
                    </div>
                    <Progress value={percent} className="h-2.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Block 4b — Jupyter Notebooks */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                Jupyter-ноутбуки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Рабочие ноутбуки из курса — скачай и запусти в Google Colab или локально.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    name: "FoodCollector_REINFORCE_v3.ipynb",
                    desc: "REINFORCE + GridSensor + ONNX",
                    href: "/FoodCollector_REINFORCE_v3.ipynb",
                    color: "border-primary/30 hover:border-primary/60",
                  },
                  {
                    name: "Taxi-v3.ipynb",
                    desc: "Q-Learning + epsilon-greedy",
                    href: "/Taxi-v3.ipynb",
                    color: "border-secondary/30 hover:border-secondary/60",
                  },
                ].map((nb) => (
                  <a
                    key={nb.name}
                    href={nb.href}
                    download
                    className={`flex items-start gap-3 p-4 rounded-lg border bg-card/60 transition-colors ${nb.color}`}
                  >
                    <Download className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{nb.name}</p>
                      <p className="text-xs text-muted-foreground">{nb.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Block 5 — Account Settings */}
          <Card className="border-primary/20 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="w-5 h-5 text-primary" /> Настройки аккаунта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Смена пароля</h3>
                <div className="grid gap-3 max-w-md">
                  <div className="space-y-2">
                    <Label>Новый пароль</Label>
                    <Input type="password" placeholder="Минимум 6 символов" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-primary/20 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Подтверждение нового пароля</Label>
                    <Input type="password" placeholder="Повторите пароль" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="border-primary/20 bg-background/50" />
                  </div>
                  <Button variant="outline" onClick={handleChangePassword} disabled={changingPassword} className="w-fit">
                    {changingPassword ? "Сохранение..." : "Сменить пароль"}
                  </Button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="border-t border-destructive/20 pt-6">
                <h3 className="text-sm font-semibold text-destructive mb-2">Опасная зона</h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" /> Удалить аккаунт
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-card border-destructive/30">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить аккаунт?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие необратимо. Все ваши данные и прогресс будут потеряны.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
