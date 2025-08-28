import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { login } from '../Services/authService';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';



const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ username, password });
      navigate('/');
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center h-screen w-screen overflow-hidden fixed top-0 left-0">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 items-center px-4 max-h-screen">
        
        {/* Left Side - Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-xl border border-white/20 max-h-[90vh] overflow-y-auto">
          {/* Logo */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-orange-500">EcomStore</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-1">Welcome back !!!</p>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sign in</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="emilys"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Forgot Password ?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 pr-12"
                  placeholder="emilyspass"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight size={16} />
                </>
              )}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-3">
              <span className="text-gray-500 text-sm">
                I don't have an account ?{' '}
                <button
                  type="button"
                  // onClick={() => navigate('/register')}
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>
        </div>

      
        <div className="hidden lg:flex items-center justify-center">
          <img 
            src="/login.png" 
            alt="Login Illustration" 
            className="w-full max-w-sm h-auto object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

