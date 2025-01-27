'use client';
import { Pagination } from '@mantine/core';
import { cardCount } from '@/lib/constants/constants';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchPagination({
  total,
  pageButtonsRight = false,
}: {
  total: number;
  pageButtonsRight?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const totalPages = Math.ceil(total / cardCount);

  function changePageParam(value: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    router.push(`/search?${params}`);
  }

  const summary = `Page ${page} of ${totalPages}`;

  return (
    <div className={`mt-6 flex flex-wrap ${totalPages > 1 ? 'justify-between' : 'justify-center'}`}>
      <div className="order-2">{summary}</div>
      {totalPages > 1 && (
        <div className={pageButtonsRight ? 'order-3' : 'order-1'}>
          <Pagination
            value={parseInt(page)}
            total={total / cardCount}
            onChange={changePageParam}
            radius="100"
          />
        </div>
      )}
    </div>
  );
}
