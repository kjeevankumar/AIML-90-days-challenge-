export type SkillCategory = 
  | 'python'
  | 'data'
  | 'ml'
  | 'deep-learning'
  | 'genai'
  | 'agents'
  | 'deployment';

export interface DayTask {
  day: number;
  phaseId: number;
  title: string;
  topic: string;
  summary: string;
  category: SkillCategory;
  whatIsIt: string;
  whyNeedIt: string;
  whereUsed: string;
  learn: string[];
  practice: string;
  build: string;
  deliverable: string;
  estimatedTime: string;
  isProjectDay?: boolean;
  projectId?: string;
  keyConceptTag?: string; // yellow highlight concept
}

export interface ProjectInfo {
  id: string;
  number: number;
  title: string;
  phaseId: number;
  day: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  outcome: string;
  skills: string[];
  architecture: {
    steps: string[];
    diagramFlow: string;
  };
  features: string[];
  deliverable: string;
  githubPromptTemplate: string;
}

export interface PhaseInfo {
  id: number;
  numberStr: string;
  title: string;
  daysRange: string;
  startDay: number;
  endDay: number;
  iconName: string;
  category: SkillCategory;
  outcome: string;
  projectTitle: string;
  color: string;
  learnOutcomes: string[];
}

export interface UserDayProgress {
  learn: boolean;
  practice: boolean;
  build: boolean;
  completedAt?: string;
}

export interface UserProgressState {
  completedDays: Record<number, UserDayProgress>;
  currentDay: number;
  bookmarkedDays: number[];
  notes: Record<number, string>;
  lastUpdated: string;
}

export type FilterCategory = 'all' | 'python' | 'data' | 'ml' | 'deep-learning' | 'genai' | 'agents' | 'projects';
