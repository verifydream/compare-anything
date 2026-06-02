import { HistoryEntry, SaveSnapshot } from './types';

export const initialCodeOriginal = `const user = {
  id: "usr_12345",
  name: "Alex Rivera",
  status: "pending",
};`;

export const initialCodeModified = `const user = {
  id: "usr_12345",
  displayName: "Alex Rivera",
  status: "active",
  lastLogin: Date.now(),
};`;

export const initialHistory: HistoryEntry[] = [
  {
    id: 'h1',
    category: 'Today',
    title: 'config_v2.json vs config_v3.json',
    formattedDateTime: '14:22 • config_v2.json vs config_v3.json',
    timestamp: '14:22',
    language: 'JSON',
    originalText: `{\n  "api_version": "1.0"\n}`,
    modifiedText: `{\n  "api_version": "2.0",\n  "experimental": true\n}`,
    stats: { added: 2, removed: 1, modified: 1 }
  },
  {
    id: 'h2',
    category: 'Today',
    title: 'README.md (Unsaved Edit)',
    formattedDateTime: '09:15 • README.md (Unsaved Edit)',
    timestamp: '09:15',
    language: 'MARKDOWN',
    originalText: `# Project Title\n... Legacy architecture notes.`,
    modifiedText: `# Project Title\n... Updated architecture diagram section...`,
    stats: { added: 1, removed: 1, modified: 0 }
  },
  {
    id: 'h3',
    category: 'Yesterday',
    title: 'useAuth.ts Refactor',
    formattedDateTime: 'Oct 23, 17:45 • useAuth.ts Refactor',
    timestamp: 'Oct 23, 17:45',
    language: 'TYPESCRIPT',
    originalText: `const [user, setUser] = useState(null);`,
    modifiedText: `const { user, isAuthenticated } = useStore(state => state.auth);`,
    stats: { added: 42, removed: 38, modified: 2 }
  }
];

export const initialSaved: SaveSnapshot[] = [
  {
    id: 's1',
    title: 'Config v1 vs v2',
    language: 'JSON',
    updatedAt: 'Updated 2h ago',
    originalText: `{\n  "version": "1.0.2",\n  "enable_cache": false,\n  "timeout": 3000\n}`,
    modifiedText: `{\n  "version": "1.0.2",\n  "enable_cache": true,\n  "timeout": 3000\n}`,
    stats: { added: 12, removed: 4, modified: 1 }
  },
  {
    id: 's2',
    title: 'Production vs Staging Env',
    language: 'YAML',
    updatedAt: 'Updated Oct 24',
    originalText: `environment:\n  host: prod.api.local\n  replicas: 5`,
    modifiedText: `environment:\n  host: staging.api.local\n  replicas: 2`,
    stats: { added: 0, removed: 0, modified: 8 }
  },
  {
    id: 's3',
    title: 'User Auth Logic Refactor',
    language: 'TEXT',
    updatedAt: 'Updated Oct 20',
    originalText: `function validateUser() {\n  return false;\n}`,
    modifiedText: `async function validate() {\n  const user = await db.getUser();\n  return user.isValid;\n}`,
    stats: { added: 104, removed: 0, modified: 1 }
  }
];
