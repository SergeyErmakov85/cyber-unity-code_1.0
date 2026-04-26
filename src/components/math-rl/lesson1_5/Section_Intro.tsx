import HubLink from "@/components/math-rl/HubLink";

const CELL_SIZE = 58;
const ROWS = 3;
const COLS = 3;

const HEADING_FONT =
  "'Orbitron', 'Inter', ui-sans-serif, system-ui, sans-serif";
const GLASS_BG = "rgba(12,16,28,0.7)";
const CELL_BG = "rgba(255,255,255,0.03)";
const CELL_BORDER = "rgba(255,255,255,0.06)";
const CYAN = "#00FFD6";

type Coord = `${number}-${number}`;

interface EntitySpec {
  emoji: string;
  label: string;
  pulse?: boolean;
}

const ENTITIES: Record<Coord, EntitySpec> = {
  "0-0": { emoji: "🤖", label: "RoomBot — стартовая клетка" },
  "1-1": { emoji: "💧", label: "Лужа: -1 и конец эпизода" },
  "2-2": { emoji: "🔋", label: "Батарея: +1 (цель)", pulse: true },
};

const Section_Intro = () => {
  const cells: JSX.Element[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const key: Coord = `${r}-${c}`;
      const entity = ENTITIES[key];
      cells.push(
        <div
          key={key}
          role="gridcell"
          aria-label={entity ? entity.label : `Пустая клетка (${r}, ${c})`}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            background: CELL_BG,
            border: `1px solid ${CELL_BORDER}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {entity && (
            <span
              aria-hidden
              style={
                entity.pulse
                  ? {
                      animation:
                        "l15-battery-pulse 2s ease-in-out infinite",
                      display: "inline-block",
                    }
                  : undefined
              }
            >
              {entity.emoji}
            </span>
          )}
        </div>
      );
    }
  }

  return (
    <section
      id="l15-intro"
      aria-labelledby="l15-intro-heading"
      className="py-6"
      style={{ background: "transparent" }}
    >
      <style>{`
        @keyframes l15-battery-pulse {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
      `}</style>

      <header className="mb-5">
        <h2
          id="l15-intro-heading"
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{ fontFamily: HEADING_FONT, color: CYAN }}
        >
          § 1. Зачем агенту нужна модель мира
        </h2>
        <p
          className="mt-2 italic text-muted-foreground"
          style={{ fontSize: 14, lineHeight: 1.7 }}
        >
          «Программа знает, что она делает. Агент учится — что делать стоит.»
        </p>
      </header>

      <div style={{ fontSize: 14, lineHeight: 1.7 }} className="space-y-4">
        <p className="text-foreground/90">
          Когда мы пишем обычную программу, мир вокруг неё — послушный. Ввели
          число — вышел результат, вызвали функцию — получили ровно то, что
          задумывали. Агент в обучении с подкреплением живёт иначе: его среда не
          всегда отвечает тем же способом на одно и то же действие, а сигнал
          «ты молодец» или «так не надо» приходит с запозданием и часто
          размыто. Поэтому вместо «сделай шаг A, потом шаг B» ему нужно уметь
          думать о последствиях, которые наступят через много шагов после
          текущего решения.
        </p>

        <p className="text-foreground/90">
          Чтобы разговаривать об этом строго, нам понадобится модель мира —
          способ описать, из каких ситуаций состоит среда, что в ней можно
          делать и как она откликается. Именно для этого математика и
          изобрела марковские процессы принятия решений. Но прежде чем
          вводить формулы, давайте построим один крошечный мир и будем
          возвращаться к нему на протяжении всего урока.
        </p>

        <p className="text-foreground/90">
          Знакомьтесь: RoomBot. Квадратная комната три на три клетки. В левом
          верхнем углу стоит робот-пылесос, в правом нижнем — зарядная
          станция: попал на неё — получил награду плюс один и эпизод
          завершился успехом. Прямо в центре комнаты протекла лужа: если
          робот наступит в неё, теряет один и эпизод тоже заканчивается,
          только уже неудачей. Робот умеет делать четыре шага —
          вверх, вниз, влево и вправо, — но пол местами скользкий: в
          десяти процентах случаев он уезжает не туда, куда хотел, а в
          одну из соседних клеток. Этот RoomBot — наш сквозной пример:
          именно на нём мы введём все пять букв MDP.
        </p>
      </div>

      <figure
        className="my-6 rounded-xl p-5"
        style={{
          background: GLASS_BG,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: `1px solid ${CELL_BORDER}`,
        }}
      >
        <div
          role="grid"
          aria-label="Мир RoomBot: 3×3 клетки"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
            gap: 6,
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {cells}
        </div>
        <figcaption
          className="mt-4 text-center text-muted-foreground"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12,
            lineHeight: 1.6,
            letterSpacing: "0.02em",
          }}
        >
          RoomBot · 3×3 · старт (0,0) · лужа (1,1) · батарея (2,2) · slip 10%
        </figcaption>
      </figure>

      <div style={{ fontSize: 14, lineHeight: 1.7 }} className="space-y-4">
        <p className="text-foreground/90">
          В следующем параграфе мы формализуем этот мир как MDP — кортеж из
          пяти букв. Но каждую букву будем вводить по одной, ровно в тот
          момент, когда без неё дальше не пройти: так, чтобы за каждым
          обозначением осталась картинка, а не сухое определение.
        </p>
      </div>

      <div className="mt-6">
        <HubLink
          to="/hub/math-rl"
          anchor="случайная-величина-random-variable"
          variant="pill"
        >
          Случайная величина как базовый язык неопределённости
        </HubLink>
      </div>
    </section>
  );
};

export default Section_Intro;
