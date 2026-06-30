import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Shield, User, Briefcase, RefreshCw, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleMockLogin = async (role) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      let email = 'student@university.edu';
      let name = 'Alice Student';
      if (role === 'Admin') {
        email = 'admin@university.edu';
        name = 'System Admin';
      } else if (role === 'Recruiter') {
        email = 'recruiter@techcorp.com';
        name = 'Bob Recruiter';
      }

      const res = await axios.get(`${backendUrl}/api/auth/google/callback`, {
        params: {
          mockEmail: email,
          mockName: name,
          mockRole: role,
          mockGoogleId: `mock-google-${role.toLowerCase()}`
        }
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/projects');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrorMsg('Please use the quick developer mock buttons to test different roles!');
  };

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
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-zinc-400">Sign in to access your projects and discover new talent.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-900/20 border border-red-800/50 text-red-400 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Button 
            variant="google" 
            fullWidth 
            onClick={handleGoogleLogin} 
            className="flex items-center justify-center gap-3 mb-6"
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          {/* Dev Mock Login Portal */}
          <div className="border-t border-zinc-800 pt-6">
            <p className="text-xs text-center text-zinc-500 font-semibold uppercase tracking-wider mb-4">
              Developer Quick Login
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleMockLogin('Admin')}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-5 py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 font-medium rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer text-sm"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Admin Account
                </span>
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>&rarr;</span>}
              </button>
              <button
                onClick={() => handleMockLogin('Student')}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-200 font-medium rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer text-sm"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" /> Student Account
                </span>
                <span>&rarr;</span>
              </button>
              <button
                onClick={() => handleMockLogin('Recruiter')}
                disabled={isLoading}
                className="w-full flex items-center justify-between px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-200 font-medium rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer text-sm"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-zinc-400" /> Recruiter Account
                </span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-zinc-400">
            Have an invite?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Register with invite token
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
