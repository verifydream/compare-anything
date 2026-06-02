export type ActiveView = 
  | 'REGISTER' 
  | 'LOGIN' 
  | 'COMPARE' 
  | 'SAVED' 
  | 'HISTORY' 
  | 'SETTINGS' 
  | 'ERROR_404' 
  | 'LEGAL';

export interface UserProfile {
  displayName: string;
  email: string;
  avatarUrl: string;
}

export interface SaveSnapshot {
  id: string;
  title: string;
  language: string;
  updatedAt: string;
  originalText: string;
  modifiedText: string;
  stats: {
    added: number;
    removed: number;
    modified: number;
  };
}

export interface HistoryEntry {
  id: string;
  timestamp: string; // "14:22" or date representation
  formattedDateTime: string; // e.g. "config_v2.json vs config_v3.json"
  category: 'Today' | 'Yesterday' | 'Last Week';
  language: string;
  originalText: string;
  modifiedText: string;
  title: string;
  stats: {
    added: number;
    removed: number;
    modified: number;
  };
}

export interface DiffLine {
  type: 'addition' | 'deletion' | 'modification' | 'normal' | 'spacer';
  lineNumberLeft?: number;
  lineNumberRight?: number;
  content: string;
}
