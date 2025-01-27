'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useThemeContext } from '@/context/ThemeContext';

export default function ToggleTheme({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className={className}>
      <Icon
        icon={theme === 'dark' ? 'ph:sun-duotone' : 'ph:moon-duotone'}
        className="text-3xl text-gray-950 transition-transform duration-500 hover:scale-125 dark:text-white"
      />
    </button>
  );
}
