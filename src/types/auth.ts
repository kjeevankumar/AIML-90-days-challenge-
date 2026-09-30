import { UserProgressState } from './roadmap';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'student';
  avatarColor: string;
  createdAt: string;
  lastLoginAt: string;
  loginCount: number;
  progress: UserProgressState;
}

export interface AdminAnalytics {
  totalLearners: number;
  totalLogins: number;
  averageProgress: number;
  completedGraduates: number;
  phaseDistribution: Record<number, number>; // phaseId -> count of students in or completed
}
