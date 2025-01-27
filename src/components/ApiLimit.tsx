'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';
import { Modal } from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';

const LIMIT = 150;

export default function ApiLimit({
  hide = false,
  newLimit = null,
  className = '',
}: {
  hide?: boolean;
  newLimit?: number | null;
  className?: string;
}) {
  const { apiUsed, setApiUsed } = useGlobalContext();
  const [percentage, setPercentage] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (newLimit !== null) {
      console.log(newLimit);
      setApiUsed(newLimit);
    }
  }, [newLimit]);

  useEffect(() => {
    if (apiUsed) {
      console.log('percentage used: ', (apiUsed / LIMIT) * 100);
      setPercentage((apiUsed / LIMIT) * 100);
    }
  }, [apiUsed]);

  return (
    !hide && (
      <div className={`flex items-center text-sm ${className}`}>
        <span>
          Daily API limit used: <b className="text-base">{`${percentage.toFixed(1)}%`}</b>{' '}
        </span>
        <button onClick={() => setModalOpen(true)} aria-label="API Limit Information">
          <Icon icon="mingcute:question-line" className="inline-block text-xl" />
        </button>
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="API Limit"
          size="lg"
          classNames={{ content: 'text-gray-900' }}
        >
          <p>
            This app uses the free tier of the{' '}
            <a
              href="https://spoonacular.com/food-api"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-gray-900 dark:hover:text-gray-900"
            >
              Spoonacular API
            </a>
            , which comes with a daily usage limit. The limit resets at midnight UTC each day. If we
            happen to reach that limit, don&apos;t worry! The site will switch to an offline mode
            where you can still explore cached recipes by browsing the featured recipes section or
            finding similar recipes on any recipe page.
          </p>
        </Modal>
      </div>
    )
  );
}
