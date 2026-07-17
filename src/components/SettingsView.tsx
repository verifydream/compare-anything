import React, { useState } from 'react';
import { 
  User, 
  Sliders, 
  Shield, 
  Edit, 
  AlertTriangle, 
  Info, 
  Upload, 
  Check, 
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onDeleteAllData: () => void;
}

export default function SettingsView({
  profile,
  onUpdateProfile,
  onDeleteAllData
}: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'security'>('account');
  
  // Profile edits state
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [email, setEmail] = useState(profile.email);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Preference switches state
  const [autoCompare, setAutoCompare] = useState(true);
  const [lineWrap, setLineWrap] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'Syntactic' | 'Paper' | 'Solarized'>('Syntactic');

  // Password fields state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Save profile trigger
  const saveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      displayName,
      email,
      avatarUrl: avatarIndex === 0 
        ? profile.avatarUrl 
        : `https://lh3.googleusercontent.com/aida-public/AB6AXuCJcRImeJ1CQJ9SiRdf5RnnZcB7Y9BCAa69o9w5sOhBr-pPcso0UeuIbmcuAhVtwue4Y14u_zybWrhXGOwof_vhIcTvAgMmtpMmoDR3GzZoqcwBvZcrJvgjOPB2nlb_clx8bqwopZMMN5eSwwa6SZqbCAwHq26E_blQbmZuZDeRZsBJAVVmkJ3P9FbvgQSXZ6W5xkCMbAJv-gKXY3mhhcVKAnGo2goKxwy39gz8Ca9_t33Es9D1iySDZqn9N2yH2Wn5JEK1sZGcokjD`
    });
    alert("Profile successfully updated!");
  };

  const discardProfileChanges = () => {
    setDisplayName(profile.displayName);
    setEmail(profile.email);
    alert("Changes discarded.");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      alert("Please fill out both password fields.");
      return;
    }
    alert("Password successfully verified and updated!");
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full animate-fade-in" id="settings-workspace">
      {/* Settings Header */}
      <header className="pb-4 border-b border-[#222222]">
        <h1 className="text-xl font-bold text-[#f1f5f9] tracking-tight font-display">System Settings</h1>
        <p className="text-xs text-gray-400 font-sans">Configure your high-precision comparison workspace options, account profiles, and security.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Side: Tabs Navigation Panel */}
        <div className="w-full md:w-56 flex flex-col gap-1.5 bg-[#141414] rounded-[24px] border border-[#222222] p-2 overflow-hidden shadow-md">
          <button
            id="settings-tab-account"
            onClick={() => setActiveTab('account')}
            className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-[#0A0A0A] text-[#F5F5F5] border border-[#222222] font-semibold shadow-inner'
                : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-sans font-bold">Account</span>
          </button>
          
          <button
            id="settings-tab-preferences"
            onClick={() => setActiveTab('preferences')}
            className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === 'preferences'
                ? 'bg-[#0A0A0A] text-[#F5F5F5] border border-[#222222] font-semibold shadow-inner'
                : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-sans font-bold">Preferences</span>
          </button>

          <button
            id="settings-tab-security"
            onClick={() => setActiveTab('security')}
            className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#0A0A0A] text-[#F5F5F5] border border-[#222222] font-semibold shadow-inner'
                : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-sans font-bold">Security</span>
          </button>
        </div>

        {/* Right Side: Tab Panels Container */}
        <div className="flex-grow w-full bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden min-h-[460px] shadow-lg">
          
          {/* 1. Account Details Tab */}
          {activeTab === 'account' && (
            <form onSubmit={saveProfileChanges} className="p-6 md:p-8 space-y-8 animate-fade-in" id="settings-panel-account">
              <h3 className="text-base font-bold text-[#f1f5f9] font-display pb-3 border-b border-[#222222]">Profile Details</h3>
              
              {/* Avatar upload custom mockup */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border-2 border-[#222222] overflow-hidden flex items-center justify-center">
                    <img 
                      alt="User avatar preview" 
                      className="w-full h-full object-cover" 
                      src={avatarIndex === 0 ? profile.avatarUrl : "https://lh3.googleusercontent.com/aida-public/AB6AXuCJcRImeJ1CQJ9SiRdf5RnnZcB7Y9BCAa69o9w5sOhBr-pPcso0UeuIbmcuAhVtwue4Y14u_zybWrhXGOwof_vhIcTvAgMmtpMmoDR3GzZoqcwBvZcrJvgjOPB2nlb_clx8bqwopZMMN5eSwwa6SZqbCAwHq26E_blQbmZuZDeRZsBJAVVmkJ3P9FbvgQSXZ6W5xkCMbAJv-gKXY3mhhcVKAnGo2goKxwy39gz8Ca9_t33Es9D1iySDZqn9N2yH2Wn5JEK1sZGcokjD"} 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setAvatarIndex(prev => 1 - prev);
                    }}
                    className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 text-white rounded-full shadow-lg border border-[#0A0A0A] hover:scale-105 transition-transform"
                    title="Change Avatar Preset"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#f1f5f9] font-sans">Avatar Image</h4>
                  <p className="text-xs text-gray-400 font-sans mb-3">Cycle the custom developer high-resolution vector avatar preset.</p>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setAvatarIndex(prev => 1 - prev)}
                      className="text-xs font-bold px-3.5 py-1.5 bg-[#0A0A0A] border border-[#222222] hover:bg-[#1C1C1C] text-[#f1f5f9] rounded-xl transition-colors cursor-pointer"
                    >
                      Cycle Preset
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setAvatarIndex(0);
                        alert("Reset back to default placeholder.");
                      }}
                      className="text-xs font-bold px-3.5 py-1.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-semibold font-sans">Display Name</label>
                  <input 
                    id="input-displayname"
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-4 py-2.5 text-xs text-[#f1f5f9] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-semibold font-sans">Email Address</label>
                  <input 
                    id="input-email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-4 py-2.5 text-xs text-[#f1f5f9] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="pt-6 border-t border-[#222222] flex justify-end gap-3 font-sans">
                <button 
                  type="button"
                  onClick={discardProfileChanges}
                  className="px-5 py-2 text-xs text-gray-400 hover:text-white transition-all cursor-pointer font-bold"
                >
                  Discard
                </button>
                <button 
                  id="btn-save-profile"
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-lg shadow-indigo-600/15"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* 2. Editor Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="p-6 md:p-8 space-y-6 animate-fade-in" id="settings-panel-preferences">
              <h3 className="text-base font-bold text-[#f1f5f9] font-display pb-3 border-b border-[#222222]">Editor Preferences</h3>

              {/* Auto Compare Toggle */}
              <div className="flex items-center justify-between p-4 bg-[#0A0A0A]/40 rounded-xl border border-[#222222]">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#0A0A0A] border border-[#222222] rounded-xl text-indigo-400 select-none">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#f1f5f9] font-sans">Auto-compare (debounce 500ms)</h4>
                    <p className="text-[11px] text-gray-400 font-sans">Automatically trigger continuous diff analysis while typing in original/modified panels.</p>
                  </div>
                </div>
                {/* Standard switch toggle */}
                <button 
                  id="toggle-autocompare"
                  type="button"
                  onClick={() => setAutoCompare(!autoCompare)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-all outline-none border focus:ring-0 cursor-pointer ${
                    autoCompare ? 'bg-indigo-600 border-indigo-600' : 'bg-[#222222] border-[#222222]'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white transition-all transform ${autoCompare ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Line wrap option */}
              <div className="flex items-center justify-between p-4 bg-[#0A0A0A]/40 rounded-xl border border-[#222222]">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#0A0A0A] border border-[#222222] rounded-xl text-indigo-400 select-none">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#f1f5f9] font-sans">Line wrap in editor</h4>
                    <p className="text-[11px] text-gray-400 font-sans">Wrap long structured lines with responsive soft carriage returns to preserve space boundaries.</p>
                  </div>
                </div>
                {/* Standard switch toggle */}
                <button 
                  id="toggle-linewrap"
                  type="button"
                  onClick={() => setLineWrap(!lineWrap)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-all outline-none border focus:ring-0 cursor-pointer ${
                    lineWrap ? 'bg-indigo-600 border-indigo-600' : 'bg-[#222222] border-[#222222]'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white transition-all transform ${lineWrap ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Custom Theme select presets exactly from spec */}
              <div className="space-y-3 pt-2">
                <label className="text-xs text-gray-400 font-semibold font-sans uppercase tracking-wider block">Workspace Theme presets</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Theme 1 */}
                  <button 
                    id="theme-syntactic"
                    type="button"
                    onClick={() => setActiveTheme('Syntactic')}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      activeTheme === 'Syntactic' 
                        ? 'bg-[#0A0A0A] border-indigo-500 shadow-lg shadow-indigo-600/10' 
                        : 'bg-[#0A0A0A]/30 border-[#222222]'
                    }`}
                  >
                    <div className="w-full h-12 bg-[#0a0a0a] rounded-lg mb-3 overflow-hidden flex flex-col gap-1 p-2 border border-[#222222]">
                      <div className="w-1/2 h-1 bg-[#222222] rounded" />
                      <div className="w-3/4 h-1 bg-indigo-500 rounded" />
                      <div className="w-2/3 h-1 bg-[#222222] rounded" />
                    </div>
                    <span className="text-xs font-sans font-bold text-[#f1f5f9]">Syntactic Depth</span>
                  </button>

                  {/* Theme 2 */}
                  <button 
                    id="theme-cleanpaper"
                    type="button"
                    onClick={() => setActiveTheme('Paper')}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      activeTheme === 'Paper' 
                        ? 'bg-[#eaeaea] border-indigo-500 shadow-md' 
                        : 'bg-[#0A0A0A]/30 border-[#222222]'
                    }`}
                  >
                    <div className="w-full h-12 bg-white rounded-lg mb-3 overflow-hidden flex flex-col gap-1 p-2 border border-slate-200">
                      <div className="w-1/2 h-1 bg-slate-300 rounded" />
                      <div className="w-3/4 h-1 bg-blue-500 rounded" />
                      <div className="w-2/3 h-1 bg-slate-300 rounded" />
                    </div>
                    <span className={`text-xs font-sans font-bold ${activeTheme === 'Paper' ? 'text-slate-800' : 'text-[#f1f5f9]'}`}>Clean Paper</span>
                  </button>

                  {/* Theme 3 */}
                  <button 
                    id="theme-solarized"
                    type="button"
                    onClick={() => setActiveTheme('Solarized')}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      activeTheme === 'Solarized' 
                        ? 'bg-[#1d1b11] border-indigo-500 shadow-lg shadow-amber-500/5' 
                        : 'bg-[#0A0A0A]/30 border-[#222222]'
                    }`}
                  >
                    <div className="w-full h-12 bg-[#090b10] rounded-lg mb-3 overflow-hidden flex flex-col gap-1 p-2 border border-[#f59e0b]/20">
                      <div className="w-1/2 h-1 bg-amber-500/20 rounded" />
                      <div className="w-3/4 h-1 bg-amber-500 rounded" />
                      <div className="w-2/3 h-1 bg-amber-500/20 rounded" />
                    </div>
                    <span className="text-xs font-sans font-bold text-[#f1f5f9]">Solarized Void</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Security Tab */}
          {activeTab === 'security' && (
            <div className="p-6 md:p-8 space-y-8 animate-fade-in" id="settings-panel-security">
              <h3 className="text-base font-bold text-[#f1f5f9] font-display pb-3 border-b border-[#222222]">Security &amp; Privacy</h3>

              {/* Password update mockup */}
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <h4 className="text-xs font-bold text-[#f1f5f9]/90 uppercase tracking-wider font-sans">Change Profile Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold font-sans">Current Password</label>
                    <input 
                      id="input-currentpass"
                      type="password" 
                      placeholder="••••••••"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-4 py-2.5 text-xs text-[#f1f5f9] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 tracking-widest font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold font-sans">New Password</label>
                    <input 
                      id="input-newpass"
                      type="password" 
                      placeholder="••••••••"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl px-4 py-2.5 text-xs text-[#f1f5f9] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 tracking-widest font-mono"
                    />
                  </div>
                </div>
                <button 
                  id="btn-update-password"
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer font-sans shadow-lg shadow-indigo-600/15"
                >
                  Update Password
                </button>
              </form>

              {/* Delete account Danger zone from picture 6 */}
              <div className="pt-6 border-t border-[#222222]">
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-[20px] p-5 md:p-6 shadow-inner">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rose-950 text-rose-300 rounded-full select-none border border-rose-500/10">
                      <AlertTriangle className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-sm font-bold text-rose-400 font-sans mb-1">Danger Zone: Delete Account</h4>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">
                        Once you delete your account, there is no going back. All saved snapshots, credentials, settings, and comparison histories will be permanently deleted from our local databases.
                      </p>
                      <button
                        id="btn-delete-profile-permanently"
                        type="button"
                        onClick={() => {
                          if (confirm("CRITICAL WARNING: This will immediately delete your account state and clear your client session data. Do you want to proceed?")) {
                            onDeleteAllData();
                          }
                        }}
                        className="mt-3 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-rose-950/10 cursor-pointer font-sans"
                      >
                        Delete Account Permanently
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
