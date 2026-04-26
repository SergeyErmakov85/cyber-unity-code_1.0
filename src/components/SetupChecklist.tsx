import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
}

interface SetupChecklistProps {
  items: ChecklistItem[];
  storageKey: string;
}

const SetupChecklist = ({ items, storageKey }: SetupChecklistProps) => {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked, storageKey]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const done = checked.size;
  const total = items.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="bg-card/40 rounded-xl border border-border/50 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground text-sm">
          Прогресс установки
        </h4>
        <span className="text-xs font-mono text-primary">
          {done}/{total}
        </span>
      </div>

      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="space-y-1.5">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                isChecked
                  ? "bg-green-500/5 border border-green-500/20 text-muted-foreground line-through"
                  : "bg-muted/10 border border-border/20 text-foreground hover:border-primary/30"
              }`}
            >
              {isChecked ? (
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {done === total && total > 0 && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
          <p className="text-sm font-semibold text-green-400">
            Все шаги выполнены! Окружение готово.
          </p>
        </div>
      )}
    </div>
  );
};

export default SetupChecklist;
