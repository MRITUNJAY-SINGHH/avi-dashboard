import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLock, FiShield, FiUser, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { loginStart, loginSuccess, loginFailure, clearAuthError } from '../store/authSlice';

const LoginPage = () => {
   const dispatch = useDispatch();
   const { loading, error } = useSelector((state) => state.auth);
   const baseUrl = useSelector((state) => state.api.baseUrl);

   const [userName, setUserName] = useState('');
   const [passwordHash, setPasswordHash] = useState('');

   const handleLogin = async (e) => {
      e.preventDefault();

      if (!userName.trim() || !passwordHash.trim()) {
         dispatch(loginFailure('Please enter both username and password.'));
         return;
      }

      dispatch(loginStart());

      try {
         const response = await fetch(`${baseUrl}/login-user`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Basic ${btoa(`${userName}:${passwordHash}`)}`,
            },
            body: JSON.stringify({ userName, passwordHash }),
         });

         const raw = await response.text();
         let parsed = null;
         if (raw) {
            try {
               parsed = JSON.parse(raw);
            } catch {
               parsed = raw;
            }
         }

         if (!response.ok) {
            const message =
               typeof parsed === 'string'
                  ? parsed
                  : parsed?.message || `Login failed (${response.status})`;
            dispatch(loginFailure(message));
            return;
         }

         dispatch(
            loginSuccess({
               username: userName,
               password: passwordHash,
               userData: parsed,
            }),
         );
      } catch (err) {
         dispatch(
            loginFailure(err.message || 'Network error. Please try again.'),
         );
      }
   };

   return (
      <div className='login-page'>
         {/* Animated background orbs */}
         <div className='login-orb login-orb-1' />
         <div className='login-orb login-orb-2' />
         <div className='login-orb login-orb-3' />

         <div className='login-card'>
            {/* Header */}
            <div className='login-header'>
               <div className='login-logo'>
                  <div className='login-logo-icon'>
                     <FiShield />
                  </div>
                  <div className='login-logo-ring' />
               </div>
               <h1 className='login-title'>Admin Panel</h1>
               <p className='login-subtitle'>
                  Secure access for authorized administrators only
               </p>
            </div>

            {/* Error */}
            {error && (
               <div className='login-error'>
                  <FiAlertCircle className='login-error-icon' />
                  <span>{error}</span>
                  <button
                     className='login-error-close'
                     onClick={() => dispatch(clearAuthError())}
                     aria-label='Dismiss error'
                  >
                     ×
                  </button>
               </div>
            )}

            {/* Form */}
            <form className='login-form' onSubmit={handleLogin}>
               <div className='login-field'>
                  <label className='login-label' htmlFor='admin-username'>
                     Username
                  </label>
                  <div className='login-input-wrap'>
                     <FiUser className='login-input-icon' />
                     <input
                        id='admin-username'
                        className='login-input'
                        type='text'
                        placeholder='Enter admin username'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        autoComplete='username'
                        disabled={loading}
                     />
                  </div>
               </div>

               <div className='login-field'>
                  <label className='login-label' htmlFor='admin-password'>
                     Password
                  </label>
                  <div className='login-input-wrap'>
                     <FiLock className='login-input-icon' />
                     <input
                        id='admin-password'
                        className='login-input'
                        type='password'
                        placeholder='Enter admin password'
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        autoComplete='current-password'
                        disabled={loading}
                     />
                  </div>
               </div>

               <button
                  type='submit'
                  className='login-btn'
                  disabled={loading}
               >
                  {loading ? (
                     <>
                        <FiLoader className='login-btn-spinner' />
                        Authenticating...
                     </>
                  ) : (
                     <>
                        <FiShield />
                        Sign In to Admin
                     </>
                  )}
               </button>
            </form>

            {/* Footer */}
            <div className='login-footer'>
               <FiLock className='login-footer-icon' />
               <span>Protected by TIB secure authentication</span>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
