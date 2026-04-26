import { Button } from "@/components/ui/button";
import HubLessonBadges from "@/components/HubLessonBadges";
import CrossLinkToLesson from "@/components/CrossLinkToLesson";
import { ArrowLeft, BookOpen, Brain, Code2, Lightbulb, GraduationCap, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const MathRLModule2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/math-rl")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            К модулям
          </Button>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 2</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Линейная Алгебра для RL
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Векторы, матрицы, собственные значения и разложения в контексте обучения с подкреплением (архитектуры — <CrossLinkToLesson lessonId="3-7" lessonPath="/courses/3-7" lessonTitle="Архитектуры нейросетей через FCA" lessonLevel={3} />).
        </p>
        <HubLessonBadges hubPath="/math-rl/module-2" />

        {/* Section 1: Vectors */}
        <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="1. Векторы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1.4. Линейная комбинация векторов</h3>
          <p>
            Линейная комбинация векторов <Math display={false}>{"\\vec{v}_1, \\vec{v}_2, \\ldots, \\vec{v}_m"}</Math> с коэффициентами <Math display={false}>{"c_1, c_2, \\ldots, c_m"}</Math>:
          </p>
          <Math>{"\\vec{w} = c_1\\vec{v}_1 + c_2\\vec{v}_2 + \\cdots + c_m\\vec{v}_m = \\sum_{i=1}^{m} c_i\\vec{v}_i"}</Math>
          <p>В RL функция ценности часто аппроксимируется как линейная комбинация базисных функций:</p>
          <Math>{"V(s) \\approx \\sum_{i=1}^{k} w_i\\,\\varphi_i(s) = \\mathbf{w}^\\top \\boldsymbol{\\varphi}(s)"}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.5. Линейная зависимость и независимость</h3>
          <p>
            Система векторов <strong className="text-foreground">линейно зависима</strong>, если существуют не все нулевые коэффициенты:
          </p>
          <Math>{"c_1\\vec{v}_1 + c_2\\vec{v}_2 + \\cdots + c_m\\vec{v}_m = \\vec{0},\\quad \\text{где хотя бы один } c_i \\neq 0"}</Math>
          <p>
            <strong className="text-foreground">Линейно независимые</strong> векторы указывают на «разные» направления — ни один не выражается через остальные. Это важно при выборе признаков: линейно зависимые признаки ведут к мультиколлинеарности.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.6. Базис и размерность</h3>
          <p>
            <strong className="text-foreground">Базис</strong> — набор линейно независимых векторов <Math display={false}>{"\\{\\vec{e}_1, \\ldots, \\vec{e}_n\\}"}</Math>, через которые единственным образом выражается любой вектор пространства:
          </p>
          <Math>{"\\vec{v} = x_1\\vec{e}_1 + x_2\\vec{e}_2 + \\cdots + x_n\\vec{e}_n"}</Math>
          <p>
            PCA ищет новый базис, сохраняя максимум информации меньшим числом координат — борьба с «проклятием размерности» в RL.
          </p>
        </Section>

        {/* Section 2: Matrices */}
        <Section icon={<Layers className="w-5 h-5 text-secondary" />} title="2. Матрицы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1. Определение и типы матриц</h3>
          <p>
            Матрица <Math display={false}>{"A"}</Math> размера <Math display={false}>{"n \\times m"}</Math>:
          </p>
          <Math>{"A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1m} \\\\ a_{21} & a_{22} & \\cdots & a_{2m} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{n1} & a_{n2} & \\cdots & a_{nm} \\end{pmatrix}"}</Math>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Единичная:</strong> <Math display={false}>{"I_n"}</Math>, <strong className="text-foreground">диагональная:</strong> <Math display={false}>{"D = \\text{diag}(d_1, \\ldots, d_n)"}</Math></li>
            <li><strong className="text-foreground">Симметрическая:</strong> <Math display={false}>{"A = A^\\top"}</Math>, <strong className="text-foreground">кососимметрическая:</strong> <Math display={false}>{"A = -A^\\top"}</Math></li>
          </ul>
          <InfoBox color="primary" title="Применение в RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Матрицы переходных вероятностей <Math display={false}>{"P^a_{ss'} = P(s_{t+1} = s' \\mid s_t = s, a_t = a)"}</Math></li>
              <li>Весовые матрицы нейронных сетей в Deep RL</li>
              <li>Уравнения Беллмана: <Math display={false}>{"\\mathbf{V} = (I - \\gamma P^\\pi)^{-1} \\mathbf{R}^\\pi"}</Math></li>
            </ul>
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.2. Операции над матрицами</h3>
          <p><strong className="text-foreground">Произведение матриц</strong> <Math display={false}>{"A_{n \\times s} \\cdot B_{s \\times m} = C_{n \\times m}"}</Math>:</p>
          <Math>{"c_{ij} = \\sum_{k=1}^{s} a_{ik}\\, b_{kj}"}</Math>
          <p className="text-sm">⚠️ В общем случае <Math display={false}>{"AB \\neq BA"}</Math> (некоммутативность).</p>
          <p className="mt-2"><strong className="text-foreground">Транспонирование:</strong> <Math display={false}>{"(AB)^\\top = B^\\top A^\\top"}</Math></p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3. Определитель матрицы</h3>
          <p>
            <Math display={false}>{"\\det(A)"}</Math> — если <Math display={false}>{"\\det(A) = 0"}</Math>, матрица вырождена (необратима). Геометрически — коэффициент изменения «объёма».
          </p>
          <Math>{"\\det(AB) = \\det(A) \\cdot \\det(B),\\quad \\det(A^\\top) = \\det(A),\\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}"}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.4. Ранг матрицы</h3>
          <p>
            <Math display={false}>{"\\operatorname{rank}(A)"}</Math> — максимальное число линейно независимых строк (или столбцов). <Math display={false}>{"\\operatorname{rank}(A) \\leq \\min(n, m)"}</Math>.
          </p>
          <InfoBox color="secondary" title="Теорема Кронекера-Капелли">
            <Math>{"Ax = b \\text{ совместна} \\;\\Longleftrightarrow\\; \\operatorname{rank}(A) = \\operatorname{rank}(A|b)"}</Math>
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.5. Обратная матрица</h3>
          <Math>{"AA^{-1} = A^{-1}A = I_n, \\quad \\text{существует} \\;\\Leftrightarrow\\; \\det(A) \\neq 0"}</Math>
          <p className="mt-2">Решение уравнений Беллмана:</p>
          <Math>{"\\mathbf{V}^\\pi = (I - \\gamma P^\\pi)^{-1}\\, \\mathbf{R}^\\pi"}</Math>
        </Section>

        {/* Section 3: Dot Product */}
        <Section icon={<Brain className="w-5 h-5 text-accent" />} title="3. Скалярное произведение">
          <p><strong className="text-foreground">Геометрическое определение:</strong></p>
          <Math>{"\\vec{a} \\cdot \\vec{b} = \\|\\vec{a}\\| \\cdot \\|\\vec{b}\\| \\cdot \\cos\\theta"}</Math>
          <p><strong className="text-foreground">Алгебраическое (в координатах):</strong></p>
          <Math>{"\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^{n} a_i\\, b_i = a_1 b_1 + a_2 b_2 + \\cdots + a_n b_n"}</Math>
          <div className="mt-4 space-y-2">
            <p>• <Math display={false}>{"\\theta < 90^\\circ"}</Math> → произведение &gt; 0 (сонаправлены)</p>
            <p>• <Math display={false}>{"\\theta = 90^\\circ"}</Math> → произведение = 0 (<strong className="text-primary">ортогональность</strong>)</p>
            <p>• <Math display={false}>{"\\theta > 90^\\circ"}</Math> → произведение &lt; 0 (противонаправлены)</p>
          </div>
          <InfoBox color="accent" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Math display={false}>{"V(s) \\approx \\mathbf{w}^\\top \\boldsymbol{\\varphi}(s)"}</Math> — скалярное произведение весов и признаков</li>
              <li>Косинусное сходство: <Math display={false}>{"\\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{\\|\\vec{a}\\|\\,\\|\\vec{b}\\|}"}</Math></li>
              <li>Градиентный спуск: <Math display={false}>{"\\nabla J(\\theta)"}</Math></li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 4: Eigenvalues */}
        <Section icon={<Lightbulb className="w-5 h-5 text-primary" />} title="4. Собственные значения и собственные векторы">
          <Math>{"A\\vec{v} = \\lambda\\vec{v}, \\quad \\vec{v} \\neq \\vec{0}"}</Math>
          <p className="mt-3">
            <Math display={false}>{"\\lambda"}</Math> — собственное значение, <Math display={false}>{"\\vec{v}"}</Math> — собственный вектор. Находим из характеристического уравнения:
          </p>
          <Math>{"\\det(A - \\lambda I) = 0"}</Math>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Спектральное разложение</h3>
          <p>Если <Math display={false}>{"A"}</Math> диагонализуема:</p>
          <Math>{"A = PDP^{-1}, \\quad D = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n) \\;\\Rightarrow\\; A^k = PD^kP^{-1}"}</Math>

          <InfoBox color="primary" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Сходимость: <Math display={false}>{"\\rho(\\gamma P^\\pi) < 1"}</Math> гарантирует сходимость итерации ценности</li>
              <li>PCA = собственное разложение ковариационной матрицы → понижение размерности</li>
              <li>Гессиан <Math display={false}>{"H"}</Math>: собственные значения определяют выпуклость целевой функции</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 5: SVD */}
        <Section icon={<Code2 className="w-5 h-5 text-secondary" />} title="5. Сингулярное разложение (SVD)">
          <Math>{"A = U \\Sigma V^\\top"}</Math>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li><Math display={false}>{"U"}</Math> (<Math display={false}>{"m \\times m"}</Math>) — ортогональная, столбцы = левые сингулярные векторы</li>
            <li><Math display={false}>{"\\Sigma"}</Math> (<Math display={false}>{"m \\times n"}</Math>) — диагональная, <Math display={false}>{"\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq \\sigma_r > 0"}</Math></li>
            <li><Math display={false}>{"V"}</Math> (<Math display={false}>{"n \\times n"}</Math>) — ортогональная, столбцы = правые сингулярные векторы</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Связь с собственными значениями</h3>
          <Math>{"A^\\top A = V(\\Sigma^\\top\\Sigma)V^\\top, \\quad AA^\\top = U(\\Sigma\\Sigma^\\top)U^\\top"}</Math>
          <p>Сингулярные числа: <Math display={false}>{"\\sigma_i = \\sqrt{\\lambda_i(A^\\top A)}"}</Math></p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Теорема Эккарта-Янга</h3>
          <p>Лучшая аппроксимация ранга <Math display={false}>{"k"}</Math>:</p>
          <Math>{"A_k = U\\Sigma_k V^\\top, \\quad \\|A - A_k\\|_F = \\sqrt{\\sigma_{k+1}^2 + \\cdots + \\sigma_r^2}"}</Math>

          <InfoBox color="secondary" title="Применение SVD в RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Понижение размерности пространства состояний</li>
              <li>Аппроксимация Q-таблицы матрицей меньшего ранга</li>
              <li>Псевдообратная: <Math display={false}>{"A^+ = V\\Sigma^+ U^\\top"}</Math> для LSTD</li>
              <li>Робастность к шуму через низкоранговую аппроксимацию</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 6: Additional Topics */}
        <Section icon={<GraduationCap className="w-5 h-5 text-accent" />} title="6. Дополнительные темы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">6.1. Квадратичные формы</h3>
          <Math>{"Q(\\mathbf{x}) = \\mathbf{x}^\\top A\\, \\mathbf{x}, \\quad A = A^\\top"}</Math>
          <p>
            Классификация: <strong className="text-primary">положительно определённая</strong> (все <Math display={false}>{"\\lambda_i > 0"}</Math>), <strong className="text-secondary">отрицательно определённая</strong> (все <Math display={false}>{"\\lambda_i < 0"}</Math>), <strong className="text-accent">знакопеременная</strong>.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.2. Ортогональная проекция</h3>
          <Math>{"\\text{proj}_{\\mathcal{C}(A)}\\, \\mathbf{b} = A(A^\\top A)^{-1}A^\\top \\mathbf{b}"}</Math>
          <p className="mt-2 text-sm">Основа метода наименьших квадратов и аппроксимации <Math display={false}>{"V(s) \\approx \\Phi\\mathbf{w}"}</Math>.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.3. Изменение базиса</h3>
          <Math>{"[\\vec{v}]_B = P_{B\\to B'}\\,[\\vec{v}]_{B'}, \\quad M_{B'} = P^{-1} M_B\\, P"}</Math>
          <p className="mt-2 text-sm">PCA — переход к базису из собственных векторов ковариационной матрицы.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.4. Разложения LU и QR</h3>
          <Math>{"A = LU \\quad \\text{(LU)}, \\qquad A = QR \\quad \\text{(QR)}"}</Math>
          <p className="mt-2">
            <strong className="text-foreground">LU:</strong> <Math display={false}>{"L"}</Math> — нижнетреугольная, <Math display={false}>{"U"}</Math> — верхнетреугольная. Решение <Math display={false}>{"Ax = b"}</Math>: прямая + обратная подстановка.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">QR:</strong> <Math display={false}>{"Q"}</Math> — ортогональная (<Math display={false}>{"Q^\\top Q = I"}</Math>), <Math display={false}>{"R"}</Math> — верхнетреугольная. Численно устойчиво для наименьших квадратов.
          </p>
          <InfoBox color="accent" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Решение <Math display={false}>{"(I - \\gamma P^\\pi)V = R^\\pi"}</Math> через LU</li>
              <li>LSTD использует QR или SVD</li>
              <li>Натуральный градиент: обращение <Math display={false}>{"F^{-1}"}</Math> (матрица Фишера)</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Back */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-secondary/50 text-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к модулям
          </Button>
        </div>
      </article>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const InfoBox = ({ color, title, children }: { color: "primary" | "secondary" | "accent"; title: string; children: React.ReactNode }) => {
  const borderColor = color === "primary" ? "border-primary/30" : color === "secondary" ? "border-secondary/30" : "border-accent/30";
  const titleColor = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent";
  return (
    <div className={`my-4 p-4 rounded-lg bg-card/60 border ${borderColor}`}>
      <p className={`font-semibold ${titleColor} text-sm mb-2`}>{title}</p>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
};

export default MathRLModule2;
