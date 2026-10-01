export type EcosystemType = 'hutan' | 'laut' | 'gurun' | 'sawah';

export type ComponentType = 'biotik' | 'abiotik';

export interface SceneObject {
  id: string;
  name: string;
  type: ComponentType;
  emoji: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale?: number;
  description: string;
  hint: string;
  discovered?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  imageEmoji?: string;
}

export interface MatchItem {
  id: string;
  name: string;
  type: ComponentType;
  emoji: string;
  detail: string;
}

export interface RescueMission {
  id: string;
  title: string;
  scenario: string;
  problemImage: string;
  solvedImage: string;
  trashItems: { id: string; name: string; emoji: string; x: number; y: number }[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moralLesson: string;
}

export interface GuessQuestion {
  id: string;
  clue: string;
  options: { name: string; type: EcosystemType; emoji: string }[];
  correctType: EcosystemType;
  explanation: string;
  features: string[];
}

export interface WheelChallenge {
  id: string;
  category: string;
  color: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardPoints: number;
}

export interface EcosystemData {
  id: EcosystemType;
  name: string;
  levelNumber: number;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  keyFeatures: string[];
  sceneObjects: SceneObject[];
  quizQuestions: QuizQuestion[];
  rescueMission: RescueMission;
}

export interface PlayerProfile {
  name: string;
  avatar: string;
  points: number;
  stars: number;
  hearts: number;
  completedLevels: EcosystemType[];
  completedMinigames: Record<string, boolean>; // e.g. "hutan_find": true
  badges: string[];
}

export type ScreenState = 
  | 'welcome'
  | 'world_map'
  | 'ecosystem_hub'
  | 'minigame_find'
  | 'minigame_match'
  | 'minigame_hunt'
  | 'minigame_quiz'
  | 'minigame_rescue'
  | 'minigame_guess'
  | 'minigame_wheel'
  | 'victory';
