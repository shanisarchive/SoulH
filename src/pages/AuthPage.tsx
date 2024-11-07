import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/app');
      } else {
        if (!name) {
          setError('Name is required');
          return;
        }
        await signup(name, email, password);
        navigate('/onboarding');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-10 w-10 text-white animate-pulse" />
            <span className="text-3xl font-bold text-white ml-2">Soul Health</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-purple-600 rounded-lg py-2 font-semibold hover:bg-white/90 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;