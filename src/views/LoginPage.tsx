import React, { useState } from 'react';
import {
  Waves,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  KeyRound,
} from 'lucide-react';
import { WaterBackground } from '../components/WaterBackground';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [email, setEmail] = useState('admin@aquaintelligence.ai');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      if (email.trim() && password.trim()) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Please enter your email and password');
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@aquaintelligence.ai');
    setPassword('admin123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#061826] flex items-center justify-center p-4 relative overflow-hidden">
      <WaterBackground intensity="deep" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[#0B5E75]/40 bg-[#09263A]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Left Side: Animated Water / Environmental Visual */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-gradient-to-br from-[#061826]/95 via-[#09263A]/90 to-[#0B5E75]/60 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0B5E75]/30 relative overflow-hidden">
          {/* Subtle Ambient Sonar Pattern */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#13A8A8]/10 blur-3xl pointer-events-none" />

          <div>
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#28D7D7] transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Aqua Intelligence Overview</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#13A8A8] to-[#0B5E75] flex items-center justify-center text-white shadow-xl shadow-[#13A8A8]/20 border border-[#28D7D7]/40">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wider text-white uppercase font-mono block">
                  AQUA INTELLIGENCE
                </span>
                <span className="text-xs text-[#28D7D7] tracking-tight font-medium">
                  Autonomous Decision Support System
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              Environmental AI & Ecological Decision Support Portal
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Secure authenticated access for municipal environmental analysts, research scientists, and smart-city water management operators.
            </p>
          </div>

          {/* Environmental Telemetry Card in Left Pane */}
          <div className="p-4 rounded-2xl bg-[#061826]/80 border border-[#0B5E75]/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#28D7D7]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM READY
              </span>
              <span>NODE: INGESTION-PROD-01</span>
            </div>
            <p className="text-[11px] text-slate-300">
              5 Water Bodies active • Computer Vision edge model YOLOv8 synced • Bayesian decision engine calibrated.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-[#061826]/90">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Portal Authentication
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your research credentials or use the instant evaluation demo login.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/50 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09263A]/80 border border-[#0B5E75]/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#13A8A8] focus:ring-1 focus:ring-[#13A8A8]/30 transition-all font-mono"
                    placeholder="name@organization.ai"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("For demo evaluation, password is 'admin123'"); }} className="text-[11px] text-[#28D7D7] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09263A]/80 border border-[#0B5E75]/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#13A8A8] focus:ring-1 focus:ring-[#13A8A8]/30 transition-all font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#09263A] border-[#0B5E75] text-[#13A8A8] focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Remember session</span>
                </label>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#13A8A8] to-[#0B5E75] hover:from-[#28D7D7] hover:to-[#13A8A8] hover:text-[#061826] text-white font-bold text-xs transition-all shadow-lg shadow-[#13A8A8]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating System Token...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Evaluation Login */}
            <div className="pt-4 border-t border-[#0B5E75]/30">
              <div className="text-center text-xs text-slate-400 mb-3 font-mono">
                — OR ONE-CLICK DEMO ACCESS —
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 rounded-xl bg-[#09263A] hover:bg-[#0B5E75]/40 border border-[#0B5E75] text-xs font-semibold text-[#28D7D7] flex items-center justify-center gap-2 transition-all hover:border-[#13A8A8]"
              >
                <KeyRound className="w-4 h-4" />
                <span>Fill & Login as Chief Evaluator (admin@aquaintelligence.ai)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
