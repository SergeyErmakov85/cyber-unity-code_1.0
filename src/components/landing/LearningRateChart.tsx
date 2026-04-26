import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const generateCurve = (lr: number) => {
  const data = [];
  for (let ep = 0; ep <= 100; ep += 2) {
    // Simulate: higher LR → faster initial rise but more noise & potential instability
    const progress = 1 - Math.exp(-lr * 800 * (ep / 100));
    const noise = lr > 0.005
      ? Math.sin(ep * lr * 200) * 0.15 * (1 - ep / 150)
      : Math.sin(ep * 0.3) * 0.03;
    const instability = lr > 0.007 ? Math.max(0, (ep - 60) / 100) * 0.3 * Math.sin(ep * 0.5) : 0;
    const reward = Math.min(1, Math.max(0, progress + noise - instability));
    data.push({ episode: ep, reward: Math.round(reward * 100) / 100 });
  }
  return data;
};

const LearningRateChart = () => {
  const [lr, setLr] = useState(0.001);
  const data = useMemo(() => generateCurve(lr), [lr]);

  const lrLabel = lr >= 0.007 ? "Слишком высокий" : lr >= 0.003 ? "Средний" : lr <= 0.0003 ? "Слишком низкий" : "Оптимальный";
  const lrColor = lr >= 0.007 ? "bg-red-500/20 text-red-400 border-red-500/30"
    : lr >= 0.003 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    : lr <= 0.0003 ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
    : "bg-green-500/20 text-green-400 border-green-500/30";

  return (
    <div className="mt-16 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Интерактивный график обучения
        </h3>
        <p className="text-sm text-muted-foreground">
          Двигайте слайдер, чтобы увидеть, как Learning Rate влияет на обучение агента
        </p>
      </div>

      {/* Chart */}
      <div className="h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="episode"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              label={{ value: "Эпизод", position: "insideBottomRight", offset: -5, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              domain={[0, 1]}
              label={{ value: "Награда", angle: -90, position: "insideLeft", offset: 15, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--primary) / 0.3)",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
                fontSize: 12,
              }}
              formatter={(value: number) => [value.toFixed(2), "Награда"]}
              labelFormatter={(label) => `Эпизод ${label}`}
            />
            <Line
              type="monotone"
              dataKey="reward"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Learning Rate</span>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono text-primary">{lr.toFixed(4)}</code>
            <Badge variant="outline" className={`text-xs ${lrColor}`}>
              {lrLabel}
            </Badge>
          </div>
        </div>
        <Slider
          value={[lr]}
          onValueChange={([v]) => setLr(v)}
          min={0.0001}
          max={0.01}
          step={0.0001}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0.0001</span>
          <span>0.01</span>
        </div>
      </div>
    </div>
  );
};

export default LearningRateChart;
