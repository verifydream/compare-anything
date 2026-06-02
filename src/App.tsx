import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Files, 
  History, 
  Gavel, 
  Settings, 
  LogOut, 
  LogIn, 
  Bug, 
  Info, 
  Menu, 
  X,
  Plus
} from 'lucide-react';
import { ActiveView, UserProfile, SaveSnapshot, HistoryEntry } from './types';
import { 
  initialCodeOriginal, 
  initialCodeModified, 
  initialHistory, 
  initialSaved 
} from './initialData';

// Component imports
import CompareTool from './components/CompareTool';
import SavedView from './components/SavedView';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import LegalView from './components/LegalView';
import ErrorView from './components/ErrorView';
import AuthScreens from './components/AuthScreens';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('COMPARE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticated User state
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    displayName: 'Alex Rivera',
    email: 'alex.rivera@dev.local',
    avatarUrl: 'https://lh3.googleusercontent.com/cb/AD5-3clW4T_2pExKscs-p8Jk6vV1eR5JvGIs-NOnxS9E2Y'
  });

  // Snapshot list state
  const [savedSnapshots, setSavedSnapshots] = useState<SaveSnapshot[]>(initialSaved);

  // History tracking list state
  const [historyList, setHistoryList] = useState<HistoryEntry[]>(initialHistory);

  // Workspace code cache
  const [leftCode, setLeftCode] = useState(initialCodeOriginal);
  const [rightCode, setRightCode] = useState(initialCodeModified);

  // Authentication callbacks
  const handleAuthSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveView('COMPARE');
  };

  const logoutUser = () => {
    if (confirm("Are you sure you want to sign out of your current session?")) {
      setUserProfile(null);
      setActiveView('LOGIN');
    }
  };

  // Saved snapshots handlers
  const handleSaveSnapshot = (title: string, leftText: string, rightText: string, stats: any) => {
    const freshSnapshot: SaveSnapshot = {
      id: 's_' + Date.now(),
      title,
      language: 'TEXT',
      updatedAt: 'Updated just now',
      originalText: leftText,
      modifiedText: rightText,
      stats: {
        added: stats.added,
        removed: stats.removed,
        modified: stats.modified
      }
    };
    setSavedSnapshots(prev => [freshSnapshot, ...prev]);
  };

  const handleDeleteSnapshot = (id: string) => {
    if (confirm("Do you want to permanently delete this snapshot?")) {
      setSavedSnapshots(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleLoadSnapshot = (item: SaveSnapshot) => {
    setLeftCode(item.originalText);
    setRightCode(item.modifiedText);
    setActiveView('COMPARE');
  };

  // History handlers
  const handleAddHistory = (leftText: string, rightText: string, stats: any) => {
    const entryId = 'h_' + Date.now();
    const freshHistory: HistoryEntry = {
      id: entryId,
      category: 'Today',
      title: `Compare track - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      formattedDateTime: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Manual run`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'TEXT',
      originalText: leftText,
      modifiedText: rightText,
      stats: {
        added: stats.added,
        removed: stats.removed,
        modified: stats.modified
      }
    };
    setHistoryList(prev => [freshHistory, ...prev]);
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistoryList([]);
  };

  const handleLoadHistory = (item: HistoryEntry) => {
    setLeftCode(item.originalText);
    setRightCode(item.modifiedText);
    setActiveView('COMPARE');
  };

  // Full data purge callback from Settings
  const handleDeleteAllData = () => {
    setUserProfile(null);
    setSavedSnapshots([]);
    setHistoryList([]);
    setLeftCode('');
    setRightCode('');
    setActiveView('REGISTER');
    alert("Profile and local caches successfully deleted.");
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col font-sans relative overflow-x-hidden" id="app-root-container">
      {/* Ambient background glow effect for Bento vibe */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bento-glow-indigo pointer-events-none opacity-40 z-0" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bento-glow-purple pointer-events-none opacity-30 z-0" />

      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#222222] select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & title brand info */}
          <div className="flex items-center gap-3">
            <button 
              id="header-brand-logo"
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-indigo-600/20"
              onClick={() => setActiveView('COMPARE')}
            >
              C
            </button>
            <span 
              onClick={() => setActiveView('COMPARE')}
              className="text-sm font-bold tracking-tight text-[#F5F5F5] cursor-pointer font-display"
            >
              Compare Anything
            </span>
          </div>

          {/* Desktop Navigation Links (styled with gorgeous bento-grid rounded-full style) */}
          <nav className="hidden md:flex items-center bg-[#141414] border border-[#222222] rounded-full p-1 gap-1">
            <button
              id="nav-link-compare"
              onClick={() => setActiveView('COMPARE')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold leading-none transition-all ${
                activeView === 'COMPARE' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Workspace
            </button>

            <button
              id="nav-link-saved"
              onClick={() => setActiveView('SAVED')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold leading-none transition-all flex items-center gap-1.5 ${
                activeView === 'SAVED' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Files className="w-3.5 h-3.5" />
              Saved Snapshots
            </button>

            <button
              id="nav-link-history"
              onClick={() => setActiveView('HISTORY')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold leading-none transition-all flex items-center gap-1.5 ${
                activeView === 'HISTORY' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History Trail
            </button>

            <button
              id="nav-link-legal"
              onClick={() => setActiveView('LEGAL')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold leading-none transition-all flex items-center gap-1.5 ${
                activeView === 'LEGAL' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Gavel className="w-3.5 h-3.5" />
              TOS &amp; Privacy
            </button>

            <button
              id="nav-link-error404"
              onClick={() => setActiveView('ERROR_404')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold leading-none transition-all flex items-center gap-1.5 ${
                activeView === 'ERROR_404' 
                  ? 'bg-red-950/40 text-red-400 border border-red-500/10' 
                  : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              Test 404
            </button>
          </nav>

          {/* User auth and dashboard setup */}
          <div className="flex items-center gap-3">
            {userProfile ? (
              <div className="flex items-center gap-3 border-l border-[#222222] pl-4">
                <div className="hidden lg:block text-right">
                  <div className="text-xs font-bold text-[#F5F5F5] font-sans">{userProfile.displayName}</div>
                  <div className="text-[10px] text-[#A3A3A3] font-mono leading-none mt-0.5">{userProfile.email}</div>
                </div>
                
                {/* Visual Avatar dropdown option */}
                <button
                  id="btn-settings-header"
                  onClick={() => setActiveView('SETTINGS')}
                  className="w-8 h-8 rounded-full border border-[#222222] overflow-hidden hover:border-indigo-500 hover:scale-105 transition-all cursor-pointer bg-[#141414]"
                  title="Account Settings"
                >
                  <img src={userProfile.avatarUrl} alt="Avatar profile" className="w-full h-full object-cover" />
                </button>

                <button
                  id="btn-logout-header"
                  onClick={logoutUser}
                  className="p-1.5 hover:bg-[#222222] hover:text-red-400 rounded text-gray-400 transition-colors cursor-pointer"
                  title="Sign out of workspace"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-[#222222] pl-4">
                <button
                  id="btn-switch-login"
                  onClick={() => setActiveView('LOGIN')}
                  className="px-4 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] text-xs font-bold rounded-lg transition-colors cursor-pointer font-sans"
                >
                  Sign In
                </button>
                <button
                  id="btn-switch-register"
                  onClick={() => setActiveView('REGISTER')}
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer hover:bg-indigo-500 font-sans shadow-md shadow-indigo-600/20"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 hover:bg-[#282a30] rounded text-[#94a3b8] md:hidden transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2d3140] bg-[#111319] p-4 flex flex-col gap-2 font-sans select-none">
            <button
              onClick={() => { setActiveView('COMPARE'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#1a1d27]"
            >
              Workspace Editor
            </button>
            <button
              onClick={() => { setActiveView('SAVED'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#1a1d27] flex items-center gap-2"
            >
              <Files className="w-4 h-4" />
              Saved Snapshots
            </button>
            <button
              onClick={() => { setActiveView('HISTORY'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#1a1d27] flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              History Trail
            </button>
            <button
              onClick={() => { setActiveView('LEGAL'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#1a1d27] flex items-center gap-2"
            >
              <Gavel className="w-4 h-4" />
              Legal Documentation
            </button>
            <button
              onClick={() => { setActiveView('ERROR_404'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-[#2a1315]/30 text-[#ef4444] hover:bg-[#2a1315]/50 flex items-center gap-2"
            >
              <Bug className="w-4 h-4" />
              Trigger 404 Route
            </button>
          </div>
        )}
      </header>

      {/* Main View Workspace Routing */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        
        {/* Workspace banner intro */}
        {activeView === 'COMPARE' && (
          <div className="pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#222222] mb-6 relative z-10 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#F5F5F5] font-display">Compare Workspace</h2>
              <p className="text-xs text-[#A3A3A3] font-sans">Paste structured configurations or documents side-by-side to compute high-precision diff lines immediately.</p>
            </div>
            
            {/* Action buttons list */}
            <div className="flex items-center gap-2">
              <button 
                id="btn-clear-workspace"
                onClick={() => {
                  if (confirm("Reset current content variables back to blank?")) {
                    setLeftCode('');
                    setRightCode('');
                  }
                }}
                className="bg-[#141414] hover:bg-[#1A1A1A] text-[#F5F5F5] px-4 py-2 border border-[#222222] text-xs font-sans font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer animate-fade-in"
              >
                Clear Panels
              </button>
              <button 
                id="btn-saved-add-trigger"
                onClick={() => {
                  const title = prompt("Save Snapshot Name", "Snapshot - " + new Date().toLocaleTimeString());
                  if (title) {
                    handleSaveSnapshot(title, leftCode, rightCode, { added: 12, removed: 4, modified: 1 });
                    alert("Snapshot successfully captured to 'Saved' tab!");
                  }
                }}
                className="bg-white hover:bg-neutral-200 text-black font-bold px-4 py-2 text-xs font-sans rounded-xl flex items-center gap-1.5 transition-all cursor-pointer animate-fade-in"
              >
                <Plus className="w-3.5 h-3.5" />
                Capture Snapshot
              </button>
            </div>
          </div>
        )}

        {/* View Switching */}
        {activeView === 'COMPARE' && (
          <CompareTool 
            initialLeftText={leftCode}
            initialRightText={rightCode}
            onSaveSnapshot={handleSaveSnapshot}
            onAddHistory={handleAddHistory}
          />
        )}

        {activeView === 'SAVED' && (
          <SavedView 
            saved={savedSnapshots}
            onLoadSaved={handleLoadSnapshot}
            onDeleteSaved={handleDeleteSnapshot}
            onAddNewTrigger={() => {
              setLeftCode('');
              setRightCode('');
              setActiveView('COMPARE');
            }}
          />
        )}

        {activeView === 'HISTORY' && (
          <HistoryView 
            history={historyList}
            onLoadHistory={handleLoadHistory}
            onDeleteHistory={handleDeleteHistory}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeView === 'LEGAL' && <LegalView />}

        {activeView === 'SETTINGS' && userProfile && (
          <SettingsView 
            profile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteAllData={handleDeleteAllData}
          />
        )}

        {activeView === 'ERROR_404' && <ErrorView onGoHome={() => setActiveView('COMPARE')} />}

        {activeView === 'LOGIN' && (
          <AuthScreens 
            initialScreen="LOGIN"
            onAuthSuccess={handleAuthSuccess}
            onSwitchScreen={(sc) => setActiveView(sc === 'LOGIN' ? 'LOGIN' : 'REGISTER')}
          />
        )}

        {activeView === 'REGISTER' && (
          <AuthScreens 
            initialScreen="REGISTER"
            onAuthSuccess={handleAuthSuccess}
            onSwitchScreen={(sc) => setActiveView(sc === 'LOGIN' ? 'LOGIN' : 'REGISTER')}
          />
        )}
      </main>

      {/* Global Minimalist Footer Frame */}
      <footer className="border-t border-[#222222] bg-[#0A0A0A] py-8 select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A3A3A3] font-sans">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F5F5F5] font-display">Compare Anything</span>
            <span className="opacity-20">|</span>
            <span>Technical diff utility</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveView('LEGAL')} className="hover:text-white transition-all cursor-pointer">Privacy Policy</button>
            <button onClick={() => setActiveView('LEGAL')} className="hover:text-white transition-all cursor-pointer">Terms of Service</button>
            <button onClick={() => setActiveView('SETTINGS')} className="hover:text-white transition-all cursor-pointer">Preferences</button>
          </div>
          <div className="text-[10px] font-mono tracking-wider opacity-40">
            COMPILER v2.14 // OFFLINE SESSION
          </div>
        </div>
      </footer>
    </div>
  );
}

