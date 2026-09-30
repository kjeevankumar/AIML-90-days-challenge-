import { PHASES } from './phases';
import { PROJECTS } from './projects';
import { DAYS_DATA } from './days';
import { DayTask, PhaseInfo, ProjectInfo, SkillCategory } from '../types/roadmap';

export { PHASES, PROJECTS, DAYS_DATA };

export const TOTAL_DAYS = 90;

export const SKILL_CATEGORIES: { id: SkillCategory; label: string; daysRange: string; color: string }[] = [
  { id: 'python', label: 'Python Foundations', daysRange: 'Days 1–15', color: '#2563EB' },
  { id: 'data', label: 'Data Analysis', daysRange: 'Days 16–25', color: '#F4B400' },
  { id: 'ml', label: 'Machine Learning & Evaluation', daysRange: 'Days 26–60', color: '#16A34A' },
  { id: 'deep-learning', label: 'Deep Learning', daysRange: 'Days 61–70', color: '#EA580C' },
  { id: 'genai', label: 'Generative AI & RAG', daysRange: 'Days 71–80', color: '#0284C7' },
  { id: 'agents', label: 'AI Agents', daysRange: 'Days 81–87', color: '#4F46E5' },
  { id: 'deployment', label: 'Deployment & Portfolio', daysRange: 'Days 88–90', color: '#10B981' },
];

export function getDayTask(dayNumber: number): DayTask | undefined {
  return DAYS_DATA.find(d => d.day === dayNumber);
}

export function getPhaseByDay(dayNumber: number): PhaseInfo | undefined {
  return PHASES.find(p => dayNumber >= p.startDay && dayNumber <= p.endDay);
}

export function getProjectByDay(dayNumber: number): ProjectInfo | undefined {
  return PROJECTS.find(p => p.day === dayNumber);
}

export function getProjectById(projectId: string): ProjectInfo | undefined {
  return PROJECTS.find(p => p.id === projectId);
}

export function searchRoadmap(query: string): DayTask[] {
  if (!query.trim()) return DAYS_DATA;
  const q = query.toLowerCase().trim();
  return DAYS_DATA.filter(day => {
    return (
      day.title.toLowerCase().includes(q) ||
      day.topic.toLowerCase().includes(q) ||
      day.summary.toLowerCase().includes(q) ||
      day.category.toLowerCase().includes(q) ||
      (day.keyConceptTag && day.keyConceptTag.toLowerCase().includes(q)) ||
      `day ${day.day}`.includes(q) ||
      `day-${day.day}`.includes(q) ||
      day.learn.some(l => l.toLowerCase().includes(q))
    );
  });
}
