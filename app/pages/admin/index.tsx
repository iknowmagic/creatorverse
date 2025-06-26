import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import React, { useState } from 'react'
import { supabase } from '~/lib/client'

function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!password.trim()) {
      setError('Password required')
      return
    }

    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@creatorverse.local',
      password: password
    })

    if (error) {
      setError(error.message || 'Authentication failed')
    }
    setIsLoading(false)
    console.log('Login response:', data)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && password.trim()) {
      handleSubmit()
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-8 min-h-screen font-archivo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
        className="bg-white dark:bg-gray-800 shadow-lg p-6 sm:p-8 border border-gray-400 dark:border-gray-600 w-full max-w-sm sm:max-w-md"
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="mb-2 font-libre-bodoni text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl uppercase">
            Admin Access
          </h1>
          <div className="bg-gray-900 dark:bg-gray-100 mx-auto w-12 sm:w-16 h-0.5"></div>
          <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wide">
            Creatorverse Management
          </p>
        </div>

        {/* Login Fields */}
        <div className="space-y-5 sm:space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="flex items-center gap-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm uppercase tracking-wide"
            >
              <User size={14} className="sm:w-4 sm:h-4" />
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value="admin"
                readOnly
                className="bg-gray-100 dark:bg-gray-700 px-3 sm:px-4 py-3 sm:py-3 border border-gray-400 dark:border-gray-600 rounded-none focus:outline-none w-full text-gray-400 dark:text-gray-400 text-sm sm:text-base cursor-not-allowed"
                tabIndex={-1}
              />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Fixed admin account</p>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center gap-2 font-chivo font-medium text-gray-700 dark:text-gray-300 text-xs sm:text-sm uppercase tracking-wide"
            >
              <Lock size={14} className="sm:w-4 sm:h-4" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter admin password"
                className="dark:bg-gray-700 px-3 sm:px-4 py-3 sm:py-3 pr-10 sm:pr-12 border border-gray-400 focus:border-gray-600 dark:border-gray-600 dark:focus:border-gray-400 rounded-none focus:outline-none w-full text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-0 right-0 absolute flex justify-center items-center w-10 sm:w-12 h-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !password.trim()}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`
              w-full py-3 sm:py-3 px-4 border transition-all duration-200 font-chivo text-xs sm:text-sm font-medium uppercase tracking-wide min-h-[44px]
              ${
                isLoading || !password.trim()
                  ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
              }
            `}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="border-2 border-current border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                Authenticating...
              </div>
            ) : (
              'Access Admin Panel'
            )}
          </motion.button>
        </div>

        {/* Demo Info */}
        <div className="bg-gray-50 dark:bg-gray-700 mt-5 sm:mt-6 p-3 border border-gray-300 dark:border-gray-600 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-xs">Demo: Use password "welcome3"</p>
        </div>

        {/* Additional Styling */}
        <div className="mt-5 sm:mt-6 text-center">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
            <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
            <div className="bg-gray-400 dark:bg-gray-500 w-1 h-1"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
