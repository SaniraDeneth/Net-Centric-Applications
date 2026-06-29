import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, KeyRound } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [token, setToken] = useState('');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 cursor-pointer group">
          <div className="bg-indigo-500/20 p-2 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            UniShowcase
          </span>
        </Link>

        <Card>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Join the Portal</h1>
            <p className="text-zinc-400">Exclusive access for university members. Please enter your invite token to register.</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              University Invite Token <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g. UNI-2026-XYZ"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            variant="google" 
            fullWidth 
            className={`flex items-center justify-center gap-3 ${!token ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!token}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Register with Google
          </Button>

          <div className="mt-8 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Log in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
