'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTheme } from 'next-themes';
import { useMantineColorScheme } from '@mantine/core';

export default function ToggleTheme({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { setColorScheme } = useMantineColorScheme();

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    // for mantine components
    setColorScheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme" className={className}>
      <Icon
        icon={theme === 'dark' ? 'ph:sun-duotone' : 'ph:moon-duotone'}
        className="text-3xl text-gray-950 transition-transform duration-500 hover:scale-125 dark:text-white"
      />
    </button>
  );
}
