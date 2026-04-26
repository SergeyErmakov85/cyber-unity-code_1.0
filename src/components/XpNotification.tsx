import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/lib/gamification";
import { Zap, Award } from "lucide-react";

interface Notification {
  id: number;
  type: "xp" | "badge";
  xp?: number;
  badge?: Badge;
}

let notifId = 0;

const XpNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((n: Omit<Notification, "id">) => {
    const id = ++notifId;
    setNotifications((prev) => [...prev, { ...n, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.xp) {
        addNotification({ type: "xp", xp: detail.xp });
      }
      if (detail?.badges) {
        for (const badge of detail.badges) {
          setTimeout(() => addNotification({ type: "badge", badge }), 500);
        }
      }
    };
    window.addEventListener("xp-notification", handler);
    return () => window.removeEventListener("xp-notification", handler);
  }, [addNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="animate-fade-in bg-card/90 backdrop-blur-xl border border-primary/40 rounded-lg px-4 py-3 shadow-[var(--glow-cyan)] flex items-center gap-3 min-w-[220px]"
        >
          {n.type === "xp" ? (
            <>
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary">+{n.xp} XP</span>
            </>
          ) : (
            <>
              <span className="text-2xl">{n.badge?.icon}</span>
              <div>
                <p className="text-xs text-muted-foreground">Новый бейдж!</p>
                <p className="text-sm font-bold text-foreground">{n.badge?.name}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export function notifyXp(xp: number, badges?: Badge[]) {
  window.dispatchEvent(new CustomEvent("xp-notification", { detail: { xp, badges } }));
}

export default XpNotification;
