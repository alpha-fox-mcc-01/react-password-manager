import { useState, useEffect } from 'react';

export default function usePassStr() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    minimumLength: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    specialCharacter: false,
  });

  useEffect(() => {
    setPasswordStrength({
      minimumLength: password.length > 4,
      lowerCase: /^(?=.*[a-z])/.test(password),
      upperCase: /^(?=.*[A-Z])/.test(password),
      number: /^(?=.*[0-9])/.test(password),
      specialCharacter: /^(?=.*[!@#$%^&*])/.test(password),
    });
  }, [password, setPasswordStrength]);

  return [password, setPassword, passwordStrength];
}
