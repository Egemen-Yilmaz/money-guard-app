import React from 'react';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar component for password strength indication
 * Shows visual feedback based on password matching and length
 */
const ProgressBar = ({ password = '', confirmPassword = '' }) => {
  // Calculate password strength based on various criteria
  const calculateStrength = () => {
    if (!password || !confirmPassword) return 0;
    
    let strength = 0;
    
    // Check if passwords match
    const passwordsMatch = password === confirmPassword;
    
    // Check length (6-12 characters)
    const hasValidLength = password.length >= 6 && password.length <= 12;
    
    // Calculate progress
    if (confirmPassword.length > 0) {
      // Base progress on match percentage
      const matchLength = Math.min(password.length, confirmPassword.length);
      let matchCount = 0;
      
      for (let i = 0; i < matchLength; i++) {
        if (password[i] === confirmPassword[i]) {
          matchCount++;
        }
      }
      
      strength = (matchCount / Math.max(password.length, confirmPassword.length)) * 100;
      
      // Bonus points for valid length
      if (hasValidLength && passwordsMatch) {
        strength = 100;
      }
    }
    
    return Math.min(strength, 100);
  };

  const strength = calculateStrength();
  
  // Determine color based on strength
  const getColor = () => {
    if (strength === 100) return '#24CCA7'; // Green - perfect match
    if (strength >= 70) return '#FFC727'; // Yellow - good progress
    if (strength >= 40) return '#FF868D'; // Orange - some progress
    return '#FF6596'; // Red - weak
  };

  const getLabel = () => {
    if (!confirmPassword) return '';
    if (strength === 100) return 'Perfect match!';
    if (strength >= 70) return 'Almost there...';
    if (strength >= 40) return 'Keep going...';
    return 'Passwords don\'t match';
  };

  return (
    <div className={styles.container}>
      <div className={styles.barBackground}>
        <div 
          className={styles.barFill}
          style={{ 
            width: `${strength}%`,
            backgroundColor: getColor(),
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }}
        />
      </div>
      {confirmPassword && (
        <p className={styles.label} style={{ color: getColor() }}>
          {getLabel()}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
