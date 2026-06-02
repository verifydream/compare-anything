import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthScreensProps {
  initialScreen: 'LOGIN' | 'REGISTER';
  onAuthSuccess: (profile: UserProfile) => void;
  onSwitchScreen: (screen: 'LOGIN' | 'REGISTER') => void;
}

export default function AuthScreens({
  initialScreen,
  onAuthSuccess,
  onSwitchScreen
}: AuthScreensProps) {
  const [screen, setScreen] = useState<'LOGIN' | 'REGISTER'>(initialScreen);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage("Security restriction: Password must be at least 8 characters long.");
      return;
    }

    // Capture user profile details
    const finalName = screen === 'REGISTER' ? fullName : (email.split('@')[0]);
    const finalProfile: UserProfile = {
      displayName: finalName.trim() || 'Alex Rivera',
      email: email.trim() || 'alex.rivera@dev.local',
      avatarUrl: `https://lh3.googleusercontent.com/aida-public/AB6AXuCJcRImeJ1CQJ9SiRdf5RnnZcB7Y9BCAa69o9w5sOhBr-pPcso0UeuIbmcuAhVtwue4Y14u_zybWrhXGOwof_vhIcTvAgMmtpMmoDR3GzZoqcwBvZcrJvgjOPB2nlb_clx8bqwopZMMN5eSwwa6SZqbCAwHq26E_blQbmZuZDeRZsBJAVVmkJ3P9FbvgQSXZ6W5xkCMbAJv-gKXY3mhhcVKAnGo2goKxwy39gz8Ca9_t33Es9D1iySDZqn9N2yH2Wn5JEK1sZGcokjD`
    };

    onAuthSuccess(finalProfile);
  };

  const signInWithGoogle = () => {
    // Elegant immediate profile auth
    const googleProfile: UserProfile = {
      displayName: 'Alex Rivera (Google)',
      email: 'alex.rivera@gmail.com',
      avatarUrl: `https://lh3.googleusercontent.com/cb/AD5-3clW4T_2pExKscs-p8Jk6vV1eR5JvGIs-NOnxS9E2Y`
    };
    onAuthSuccess(googleProfile);
  };

  return (
    <div className="min-h-[580px] w-full flex items-center justify-center p-4" id="auth-workspace">
      <div className="w-full max-w-[420px] bg-[#1a1d27] border border-[#2d3140] rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Subtle decorative glow effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#adc6ff] via-[#4d8eff] to-[#adc6ff]"></div>

        <div className="p-8 space-y-6">
          {/* Brand Heading */}
          <header className="text-center space-y-2">
            <div className="inline-flex p-2.5 bg-[#4d8eff]/10 rounded-xl text-[#adc6ff] border border-[#4d8eff]/20 mb-1 select-none">
              <GitPullRequest className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#f1f5f9] font-sans">
              {screen === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs text-[#94a3b8] font-sans">
              {screen === 'LOGIN' 
                ? 'Sign in to access your saved coding snapshot repositories' 
                : 'Configure your credentials to synchronize compilation tracks'
              }
            </p>
          </header>

          {/* Social login integration */}
          <button
            id="btn-google-auth"
            type="button"
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-[#111319] hover:bg-[#1a1d27] border border-[#2d3140] hover:border-[#adc6ff]/50 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#f1f5f9] transition-all duration-200 cursor-pointer"
          >
            {/* Custom vector Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="font-sans">Continue with Google</span>
          </button>

          {/* Inline divider */}
          <div className="flex items-center gap-3 select-none">
            <div className="h-[1px] flex-1 bg-[#2d3140]"></div>
            <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold font-mono">or email credentials</span>
            <div className="h-[1px] flex-1 bg-[#2d3140]"></div>
          </div>

          {/* Form Actions */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMessage && (
              <div className="flex items-start gap-2.5 bg-[#2a1315]/70 border border-[#ef4444]/30 rounded-xl p-3 text-xs text-[#ef4444] leading-relaxed font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Full name (Sign up only) */}
            {screen === 'REGISTER' && (
              <div className="space-y-1.5" id="group-fullname">
                <label className="text-xs text-[#94a3b8] font-semibold font-sans">Full Name</label>
                <div className="relative">
                  <input
                    id="auth-input-fullname"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#111319] border border-[#2d3140] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f1f5f9] placeholder-[#94a3b8]/30 focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] transition-all font-sans"
                  />
                  <User className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            )}

            {/* 2. Email */}
            <div className="space-y-1.5" id="group-email">
              <label className="text-xs text-[#94a3b8] font-semibold font-sans">Email Address</label>
              <div className="relative">
                <input
                  id="auth-input-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111319] border border-[#2d3140] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f1f5f9] placeholder-[#94a3b8]/30 focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] transition-all font-sans"
                />
                <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* 3. Password */}
            <div className="space-y-1.5" id="group-password">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#94a3b8] font-semibold font-sans">Password</label>
                {screen === 'LOGIN' && (
                  <button 
                    type="button" 
                    onClick={() => alert("Verification code sent to email profile preset.")} 
                    className="text-[10px] font-semibold text-[#4d8eff] hover:underline cursor-pointer font-sans"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="auth-input-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111319] border border-[#2d3140] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#f1f5f9] placeholder-[#94a3b8]/30 focus:outline-none focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] tracking-widest font-mono"
                />
                <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#94a3b8] hover:text-[#f1f5f9] absolute right-3 top-2.5 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-[#94a3b8] flex items-center gap-1 font-sans">
                <AlertCircle className="w-3 h-3 text-[#adc6ff]" />
                Password must be at least 8 characters long.
              </span>
            </div>

            {/* Submit */}
            <button
              id="btn-auth-submit"
              type="submit"
              className="w-full mt-2 bg-[#4d8eff] hover:brightness-110 active:scale-[0.98] text-[#00285d] font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg font-sans"
            >
              <span>{screen === 'LOGIN' ? 'Login to Dashboard' : 'Complete Integration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Screen Flow */}
          <footer className="text-center text-xs text-[#94a3b8] pt-2 border-t border-[#2d3140]/50 font-sans">
            {screen === 'LOGIN' ? (
              <span>
                New to the workspace?{' '}
                <button
                  id="btn-switch-to-register"
                  type="button"
                  onClick={() => {
                    setScreen('REGISTER');
                    onSwitchScreen('REGISTER');
                  }}
                  className="text-[#4d8eff] font-bold hover:underline cursor-pointer"
                >
                  Create custom identity
                </button>
              </span>
            ) : (
              <span>
                Already possess coordinates?{' '}
                <button
                  id="btn-switch-to-login"
                  type="button"
                  onClick={() => {
                    setScreen('LOGIN');
                    onSwitchScreen('LOGIN');
                  }}
                  className="text-[#4d8eff] font-bold hover:underline cursor-pointer"
                >
                  Sign in instead
                </button>
              </span>
            )}
          </footer>

        </div>
      </div>
    </div>
  );
}
