import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const storedDarkMode = typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true';
  
  const [darkMode, setDarkMode] = useState(storedDarkMode || true);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark'); 
      console.log('Mode sombre activé');
    } else {
      localStorage.setItem('darkMode', 'false');
      document.documentElement.classList.remove('dark');
      console.log('Mode sombre désactivé');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
