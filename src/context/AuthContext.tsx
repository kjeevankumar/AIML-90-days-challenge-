import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '../types/auth';
import { UserProgressState, UserDayProgress } from '../types/roadmap';

interface AuthContextType {
  currentUser: UserAccount | null;
  usersList: UserAccount[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalInitialMode: 'login' | 'signup';
  setAuthModalInitialMode: (mode: 'login' | 'signup') => void;
  login: (email: string, password?: string) => { success: boolean; message?: string };
  signup: (name: string, email: string, password?: string) => { success: boolean; message?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  updateUserProgress: (userId: string, progress: UserProgressState) => void;
  deleteUser: (userId: string) => void;
  resetUserProgressInDb: (userId: string) => void;
}

const USERS_STORAGE_KEY = 'ai_with_jeevan_users_db_v2';
const CURRENT_USER_ID_KEY = 'ai_with_jeevan_current_user_id_v2';

const ADMIN_ACCOUNT: UserAccount = {
  id: 'user-admin-jeevan',
  name: 'Jeevan (Admin)',
  email: 'admin@gmail.com',
  password: 'G1@kumar',
  role: 'admin',
  avatarColor: '#2563EB',
  createdAt: '2026-09-01T08:00:00.000Z',
  lastLoginAt: new Date().toISOString(),
  loginCount: 1,
  progress: {
    completedDays: {},
    currentDay: 1,
    bookmarkedDays: [],
    notes: {},
    lastUpdated: new Date().toISOString(),
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersList, setUsersList] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed: UserAccount[] = JSON.parse(stored);
        // Ensure the official admin with credentials admin@gmail.com / G1@kumar is always up to date
        const adminIndex = parsed.findIndex(u => u.email.toLowerCase() === 'admin@gmail.com');
        if (adminIndex >= 0) {
          parsed[adminIndex].password = 'G1@kumar';
          parsed[adminIndex].role = 'admin';
          return parsed;
        } else {
          return [ADMIN_ACCOUNT, ...parsed.filter(u => u.role !== 'admin')];
        }
      }
    } catch (e) {
      console.error('Failed to parse users db', e);
    }
    return [ADMIN_ACCOUNT];
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CURRENT_USER_ID_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'signup'>('login');

  // Persist users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
    } catch (e) {
      console.error('Failed to save users database', e);
    }
  }, [usersList]);

  // Persist current session
  useEffect(() => {
    try {
      if (currentUserId) {
        localStorage.setItem(CURRENT_USER_ID_KEY, currentUserId);
      } else {
        localStorage.removeItem(CURRENT_USER_ID_KEY);
      }
    } catch (e) {
      console.error('Failed to save current user id', e);
    }
  }, [currentUserId]);

  const currentUser = usersList.find(u => u.id === currentUserId) || null;

  const login = (email: string, password?: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // Check admin credentials explicitly
    if (cleanEmail === 'admin@gmail.com') {
      if (cleanPassword !== 'G1@kumar') {
        return { success: false, message: 'Invalid admin password.' };
      }
      // Ensure admin exists in usersList
      let adminUser = usersList.find(u => u.email.toLowerCase() === 'admin@gmail.com');
      if (!adminUser) {
        adminUser = ADMIN_ACCOUNT;
        setUsersList(prev => [adminUser!, ...prev]);
      } else {
        setUsersList(prev => prev.map(u => {
          if (u.email.toLowerCase() === 'admin@gmail.com') {
            return {
              ...u,
              loginCount: (u.loginCount || 0) + 1,
              lastLoginAt: new Date().toISOString(),
              role: 'admin',
              password: 'G1@kumar',
            };
          }
          return u;
        }));
      }
      setCurrentUserId(adminUser.id);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    // Regular student user login
    const user = usersList.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: 'No account found with this email. Please click Sign Up to register.' };
    }

    if (user.password && user.password !== cleanPassword) {
      return { success: false, message: 'Incorrect password.' };
    }

    // Increment login count and update timestamp
    setUsersList(prev => prev.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          loginCount: (u.loginCount || 1) + 1,
          lastLoginAt: new Date().toISOString(),
        };
      }
      return u;
    }));

    setCurrentUserId(user.id);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = (name: string, email: string, password?: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPassword = (password || '').trim();

    if (!cleanName) {
      return { success: false, message: 'Please provide your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please provide a valid email address.' };
    }
    if (!cleanPassword || cleanPassword.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    // Prevent signing up with admin email
    if (cleanEmail === 'admin@gmail.com') {
      return { success: false, message: 'This email is reserved. Please log in using the admin password.' };
    }

    const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const colors = ['#2563EB', '#16A34A', '#F4B400', '#9333EA', '#0284C7', '#EA580C', '#DC2626'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: 'student',
      avatarColor: randomColor,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      loginCount: 1,
      progress: {
        completedDays: {},
        currentDay: 1,
        bookmarkedDays: [],
        notes: {},
        lastUpdated: new Date().toISOString(),
      }
    };

    setUsersList(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUserId(null);
    try {
      localStorage.removeItem(CURRENT_USER_ID_KEY);
      localStorage.removeItem('ai_with_jeevan_progress_v1');
    } catch (e) {
      console.error(e);
    }
  };

  const switchUser = (userId: string) => {
    // Only allowed for admin
    if (currentUser?.role === 'admin') {
      const target = usersList.find(u => u.id === userId);
      if (target) {
        setCurrentUserId(target.id);
      }
    }
  };

  const updateUserProgress = (userId: string, progress: UserProgressState) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          progress: progress,
        };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    if (currentUserId === userId) {
      setCurrentUserId(null);
    }
  };

  const resetUserProgressInDb = (userId: string) => {
    const emptyProgress: UserProgressState = {
      completedDays: {},
      currentDay: 1,
      bookmarkedDays: [],
      notes: {},
      lastUpdated: new Date().toISOString(),
    };
    updateUserProgress(userId, emptyProgress);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalInitialMode,
        setAuthModalInitialMode,
        login,
        signup,
        logout,
        switchUser,
        updateUserProgress,
        deleteUser,
        resetUserProgressInDb,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
