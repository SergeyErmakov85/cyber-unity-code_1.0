import { BookOpen, Box, Brain, FolderGit2, Network, Sigma } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HubId = "pytorch" | "unity-ml-agents" | "deep-rl" | "project" | "math-rl" | "fca-rl";

export interface SupportHub {
  id: HubId;
  label: string;
  slug: string;
  shortDescription: string;
  icon: LucideIcon;
  colorAccent: string;
}

export const SUPPORT_HUBS: Record<HubId, SupportHub> = {
  pytorch: {
    id: "pytorch",
    label: "PyTorch",
    slug: "pytorch",
    shortDescription: "Основы тензоров, autograd, нейросетей и оптимизации в PyTorch.",
    icon: Brain,
    colorAccent: "text-orange-400",
  },
  "unity-ml-agents": {
    id: "unity-ml-agents",
    label: "Unity ML-Agents",
    slug: "unity-ml-agents",
    shortDescription: "Установка, настройка среды, сенсоры и тренировка агентов в Unity.",
    icon: Box,
    colorAccent: "text-emerald-400",
  },
  "deep-rl": {
    id: "deep-rl",
    label: "Deep RL",
    slug: "deep-rl",
    shortDescription: "Глубокое обучение с подкреплением: DQN, Policy Gradient, Actor-Critic.",
    icon: BookOpen,
    colorAccent: "text-sky-400",
  },
  project: {
    id: "project",
    label: "Проекты",
    slug: "project",
    shortDescription: "Практические проекты: от CartPole до мультиагентного футбола.",
    icon: FolderGit2,
    colorAccent: "text-violet-400",
  },
  "math-rl": {
    id: "math-rl",
    label: "Математика RL",
    slug: "math-rl",
    shortDescription: "Вероятности, MDP, уравнения Беллмана, градиенты политик.",
    icon: Sigma,
    colorAccent: "text-amber-400",
  },
  "fca-rl": {
    id: "fca-rl",
    label: "FCA + RL для NPC",
    slug: "fca-rl",
    shortDescription: "Применение Формального Анализа Понятий (FCA) для структурирования пространства состояний RL-агентов в Unity.",
    icon: Network,
    colorAccent: "text-yellow-400",
  },
};
