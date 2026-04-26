import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const RaycastVisualizer = () => {
  const [numRays, setNumRays] = useState(9);
  const [rayLength, setRayLength] = useState(120);
  const [carAngle, setCarAngle] = useState(0);
  const [fov, setFov] = useState(180);

  const cx = 200;
  const cy = 200;
  const carSize = 18;

  // Wall polygons (track boundaries)
  const outerWall = "M60,60 L340,60 L340,340 L60,340 Z";
  const innerWall = "M130,130 L270,130 L270,270 L130,270 Z";

  // Simple ray-wall intersection (axis-aligned boxes)
  const castRay = (angle: number): { x: number; y: number; dist: number; hit: boolean } => {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const maxDist = rayLength;

    // Check intersection with inner walls (box 130-270) and outer walls (box 60-340)
    let minT = maxDist;

    const checkLine = (wallVal: number, isVertical: boolean, minBound: number, maxBound: number) => {
      const dir = isVertical ? dx : dy;
      const origin = isVertical ? cx : cy;
      const crossDir = isVertical ? dy : dx;
      const crossOrigin = isVertical ? cy : cx;
      if (Math.abs(dir) < 0.001) return;
      const t = (wallVal - origin) / dir;
      if (t > 0 && t < minT) {
        const cross = crossOrigin + crossDir * t;
        if (cross >= minBound && cross <= maxBound) minT = t;
      }
    };

    // Outer walls
    checkLine(60, true, 60, 340);
    checkLine(340, true, 60, 340);
    checkLine(60, false, 60, 340);
    checkLine(340, false, 60, 340);
    // Inner walls
    checkLine(130, true, 130, 270);
    checkLine(270, true, 130, 270);
    checkLine(130, false, 130, 270);
    checkLine(270, false, 130, 270);

    const hit = minT < maxDist;
    const dist = minT;
    return {
      x: cx + dx * dist,
      y: cy + dy * dist,
      dist,
      hit,
    };
  };

  const rays = Array.from({ length: numRays }, (_, i) => {
    const startAngle = carAngle - fov / 2;
    const step = numRays > 1 ? fov / (numRays - 1) : 0;
    const angle = startAngle + step * i - 90; // -90 so 0° points up
    const result = castRay(angle);
    return { angle, ...result };
  });

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">🔦 Интерактивная визуализация Raycast-сенсоров</h3>
        <p className="text-sm text-muted-foreground">
          Управляйте параметрами сенсоров агента. Лучи показывают, как агент «видит» стены трека.
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* SVG Canvas */}
          <div className="flex-1 flex justify-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-[360px] rounded-lg bg-background/80 border border-border/50">
              {/* Track */}
              <path d={outerWall} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.4" />
              <path d={innerWall} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" opacity="0.4" />
              {/* Track surface */}
              <path d="M60,60 L340,60 L340,340 L60,340 Z" fill="hsl(var(--muted))" opacity="0.15" />
              <path d="M130,130 L270,130 L270,270 L130,270 Z" fill="hsl(var(--background))" />

              {/* Wall labels */}
              <text x="200" y="50" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" opacity="0.6">Wall</text>
              <text x="200" y="285" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" opacity="0.6">Wall</text>

              {/* Rays */}
              {rays.map((ray, i) => {
                const normDist = ray.dist / rayLength;
                const r = Math.round(255 * (1 - normDist));
                const g = Math.round(255 * normDist);
                return (
                  <g key={i}>
                    <line
                      x1={cx} y1={cy}
                      x2={ray.x} y2={ray.y}
                      stroke={`rgb(${r},${g},80)`}
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                    {ray.hit && (
                      <circle cx={ray.x} cy={ray.y} r="4" fill={`rgb(${r},${g},80)`} opacity="0.9" />
                    )}
                  </g>
                );
              })}

              {/* Car body */}
              <g transform={`translate(${cx},${cy}) rotate(${carAngle})`}>
                <rect
                  x={-carSize / 2} y={-carSize * 0.8}
                  width={carSize} height={carSize * 1.6}
                  rx="4"
                  fill="hsl(var(--primary))"
                  opacity="0.9"
                />
                {/* Direction arrow */}
                <polygon
                  points={`0,${-carSize * 1.1} ${-carSize * 0.35},${-carSize * 0.6} ${carSize * 0.35},${-carSize * 0.6}`}
                  fill="hsl(var(--primary-foreground))"
                  opacity="0.8"
                />
              </g>
            </svg>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-5 min-w-[200px]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Лучей: {numRays}</label>
              <Slider min={3} max={21} step={2} value={[numRays]} onValueChange={([v]) => setNumRays(v)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Длина луча: {rayLength}</label>
              <Slider min={40} max={180} step={5} value={[rayLength]} onValueChange={([v]) => setRayLength(v)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Угол обзора (FOV): {fov}°</label>
              <Slider min={30} max={360} step={10} value={[fov]} onValueChange={([v]) => setFov(v)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Поворот авто: {carAngle}°</label>
              <Slider min={-180} max={180} step={5} value={[carAngle]} onValueChange={([v]) => setCarAngle(v)} />
            </div>

            {/* Distance readout */}
            <div className="bg-background/60 rounded-lg p-3 space-y-1">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Дистанции</h4>
              <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground">
                {rays.map((ray, i) => (
                  <span key={i} className="font-mono">
                    R{i}: {ray.dist.toFixed(0)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RaycastVisualizer;
