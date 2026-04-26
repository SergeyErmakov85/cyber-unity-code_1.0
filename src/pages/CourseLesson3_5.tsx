import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Smartphone, Cpu, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "В каком формате экспортируется модель из ML-Agents?",
    options: [
      ".pt (PyTorch)",
      ".h5 (Keras)",
      ".onnx (Open Neural Network Exchange)",
      ".pb (TensorFlow)",
    ],
    correctIndex: 2,
  },
  {
    question: "Какой движок выполняет инференс нейросетей в Unity?",
    options: [
      "TensorFlow Lite",
      "Unity Sentis (ранее Barracuda)",
      "ONNX Runtime напрямую",
      "PyTorch Mobile",
    ],
    correctIndex: 1,
  },
  {
    question: "Зачем применять квантизацию модели?",
    options: [
      "Для улучшения качества предсказаний",
      "Для уменьшения размера модели и ускорения инференса (за счёт небольшой потери точности)",
      "Квантизация увеличивает размер модели",
      "Для перевода модели в формат .onnx",
    ],
    correctIndex: 1,
  },
];

const CourseLesson3_5 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">От обучения к продукту</h2>
        <p className="text-muted-foreground leading-relaxed">
          Обучение агента — это только половина пути. Чтобы RL-модель работала в реальной игре,
          её нужно <strong className="text-primary">экспортировать</strong> в формат <CrossLinkToHub hubPath="/pytorch/cheatsheet" hubAnchor="onnx-export" hubTitle="PyTorch — ONNX-экспорт">ONNX</CrossLinkToHub>,
          подключить к Unity через <strong className="text-foreground"><CrossLinkToHub hubPath="/unity-ml-agents" hubAnchor="installation" hubTitle="Unity ML-Agents">Sentis</CrossLinkToHub></strong> (ранее Barracuda)
          и оптимизировать для целевой платформы.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          В этом уроке мы пройдём полный путь: от файла <code className="text-primary">.onnx</code> до
          работающей сборки под PC, мобильные устройства и WebGL — с оптимизацией размера и скорости инференса.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonId="3-5"
      lessonTitle="Деплой модели: ONNX-экспорт и интеграция в Unity-сборку"
      lessonNumber="3.5"
      duration="30 мин"
      tags={["#deployment", "#onnx", "#unity", "#production"]}
      level={3}
      prevLesson={{ path: "/courses/3-4", title: "Imitation Learning" }}
      nextLesson={{ path: "/courses/3-6", title: "Оптимизация гиперпараметров" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* ONNX Export */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Экспорт модели в ONNX
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            После обучения ML-Agents автоматически сохраняет <code className="text-primary">.onnx</code> файл
            в директории <code>results/</code>. Но можно экспортировать и вручную:
          </p>
          <CyberCodeBlock language="python" filename="export_onnx.py">
{`import torch
import torch.onnx

# Загружаем обученную модель
model = PolicyNetwork(obs_size=8, action_size=4, hidden=256)
model.load_state_dict(torch.load("trained_model.pth"))
model.eval()

# Создаём dummy input соответствующего размера
dummy_input = torch.randn(1, 8)  # batch=1, obs_size=8

# Экспорт в ONNX
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    input_names=["obs_0"],        # имя должно совпадать с ML-Agents
    output_names=["continuous_actions"],  # или "discrete_actions"
    opset_version=15,
    dynamic_axes={
        "obs_0": {0: "batch_size"},
        "continuous_actions": {0: "batch_size"}
    }
)
print("✅ Модель экспортирована: model.onnx")`}
          </CyberCodeBlock>

          <Card className="border-accent/20 bg-card/50 mt-4">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">ML-Agents автоматический экспорт</h4>
              <CyberCodeBlock language="python" filename="results_dir.sh">
{`# После обучения через mlagents-learn:
# results/<run-id>/<BehaviorName>.onnx

# Копируем в Unity:
# Assets/ML-Models/<BehaviorName>.onnx`}
              </CyberCodeBlock>
            </CardContent>
          </Card>
        </section>

        {/* Sentis / Barracuda */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-secondary" />
            Unity Sentis: инференс в реальном времени
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Unity Sentis</strong> (наследник Barracuda) — движок для
            запуска нейросетей прямо в Unity. Он поддерживает GPU и CPU-бекенды, оптимизирован для
            игровых движков.
          </p>
          <CyberCodeBlock language="csharp" filename="DeployedAgent.cs">
{`// 1. Импортируйте .onnx файл в Assets/ML-Models/
// 2. Unity автоматически создаст NNModel asset
// 3. В компоненте BehaviorParameters на агенте:

// Inspector:
//   Behavior Type: Inference Only  (или Default для auto-switch)
//   Model: [перетащите NNModel asset]
//   Inference Device: GPU  (для максимальной скорости)

// Программная настройка:
using Unity.MLAgents;

public class DeployedAgent : Agent
{
    public override void Initialize()
    {
        // Модель уже подключена через Inspector
        // Agent автоматически использует ONNX для принятия решений
    }
    
    public override void CollectObservations(VectorSensor sensor)
    {
        // Те же наблюдения, что и при обучении!
        sensor.AddObservation(transform.localPosition);
        sensor.AddObservation(rb.velocity);
        sensor.AddObservation(target.localPosition);
    }
    
    public override void OnActionReceived(ActionBuffers actions)
    {
        // Те же действия, что и при обучении
        float moveX = actions.ContinuousActions[0];
        float moveZ = actions.ContinuousActions[1];
        rb.AddForce(new Vector3(moveX, 0, moveZ) * speed);
    }
}`}
          </CyberCodeBlock>
        </section>

        {/* Optimization */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Оптимизация модели</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-3 text-foreground font-semibold">Техника</th>
                  <th className="text-left p-3 text-foreground font-semibold">Эффект</th>
                  <th className="text-left p-3 text-foreground font-semibold">Потеря качества</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr><td className="p-3 text-muted-foreground">Уменьшение hidden_units</td><td className="p-3 text-muted-foreground">Меньше модель, быстрее инференс</td><td className="p-3 text-muted-foreground">Средняя</td></tr>
                <tr><td className="p-3 text-muted-foreground">Уменьшение num_layers</td><td className="p-3 text-muted-foreground">Меньше параметров</td><td className="p-3 text-muted-foreground">Средняя</td></tr>
                <tr><td className="p-3 text-muted-foreground">Float16 квантизация</td><td className="p-3 text-muted-foreground">Размер ×0.5, скорость ×1.5</td><td className="p-3 text-muted-foreground">Минимальная</td></tr>
                <tr><td className="p-3 text-muted-foreground">INT8 квантизация</td><td className="p-3 text-muted-foreground">Размер ×0.25, скорость ×2</td><td className="p-3 text-muted-foreground">Заметная</td></tr>
                <tr><td className="p-3 text-muted-foreground">ONNX graph optimization</td><td className="p-3 text-muted-foreground">Объединение слоёв, удаление дубликатов</td><td className="p-3 text-muted-foreground">Нулевая</td></tr>
              </tbody>
            </table>
          </div>
          <CyberCodeBlock language="python" filename="quantize.py">
{`from onnxruntime.quantization import quantize_dynamic, QuantType

# Float16 квантизация (рекомендуется для игр)
quantize_dynamic(
    "model.onnx",
    "model_fp16.onnx",
    weight_type=QuantType.QUInt8  # или QInt8
)

# Проверка размера
import os
orig = os.path.getsize("model.onnx") / 1024
quant = os.path.getsize("model_fp16.onnx") / 1024
print(f"Original: {orig:.1f} KB → Quantized: {quant:.1f} KB")
print(f"Compression: {(1 - quant/orig)*100:.1f}%")`}
          </CyberCodeBlock>
        </section>

        {/* Platform Builds */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-primary" />
            Сборка под целевые платформы
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-primary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">🖥️ PC / Mac</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>GPU Inference — максимальная скорость</li>
                  <li>Нет ограничений по размеру модели</li>
                  <li>Build Settings → PC/Mac Standalone</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-secondary mb-2">📱 Mobile</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Обязательна квантизация (FP16/INT8)</li>
                  <li>CPU Inference (GPU опционально)</li>
                  <li>hidden_units ≤ 128 рекомендуется</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-accent mb-2">🌐 WebGL</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Только CPU Inference</li>
                  <li>Минимизировать размер модели</li>
                  <li>Sentis WebGL backend</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="border-primary/20 bg-primary/5 mt-8">
          <CardContent className="p-5 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">Полный мастер-класс по ONNX → Sentis</p>
              <p className="text-sm text-muted-foreground mb-3">
                Подробный гайд с UnityONNXWrapper, C#-кодом инференса и разбором типичных ошибок.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/advanced/onnx-sentis">Открыть мастер-класс →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Quiz title="Тест: Деплой модели" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson3_5;
