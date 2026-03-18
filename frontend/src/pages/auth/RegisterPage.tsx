import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: 'STUDENT',
      });
      // On success, redirect to login so the user can sign in
      navigate('/login', { state: { message: 'Account activated! Please log in.' } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Illustration */}
      <div className="auth-left">
        <div className="max-w-md text-white">
          {/* Calendar Illustration */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl mb-8 transform -rotate-3">
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="text-gray-400 py-1">{day}</div>
              ))}
              {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                <div
                  key={day}
                  className={`py-1 ${day === 13 ? 'bg-blue-500 text-white rounded-full' : 'text-gray-600'}`}
                >
                  {day}
                </div>
              ))}
              {[15, 16, 17, 18, 19, 20, 21].map((day) => (
                <div
                  key={day}
                  className={`py-1 ${day === 18 ? 'bg-yellow-400 text-gray-800 rounded-full' : 'text-gray-600'}`}
                >
                  {day}
                </div>
              ))}
              {[22, 23, 24, 25, 26, 27, 28].map((day) => (
                <div key={day} className="text-gray-600 py-1">{day}</div>
              ))}
              {[29, 30, 31, 32, 33, 34, 35].map((day) => (
                <div key={day} className="text-gray-400 py-1">{day}</div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 font-heading">
            Streamline Your Academic Journey
          </h1>
          <p className="text-white/80 text-lg">
            Access your examination portal with ease. Manage your academic schedule,
            view results, and stay connected with the University of Jaffna.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="auth-right">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-primary font-semibold text-lg">Dept. Calendar</span>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Email</label>
              <div className="input-group">
                <Mail className="input-icon w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.edu"
                  className="input-field input-with-icon"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon-right"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="input-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-icon-right"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full btn-lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
