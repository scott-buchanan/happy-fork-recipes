'use client';
import { Pagination } from '@mantine/core';
import { cardCount } from '@/lib/constants/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { primary } from '@/theme/colours';

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
  const totalText = `Recipes found: ${total}`;

  function changePageParam(value: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    router.push(`/search?${params}`);
  }

  return (
    <div
      className={`my-6 flex flex-wrap justify-center ${totalPages > 1 ? 'sm:justify-between' : 'sm:justify-center'}`}
    >
      <div className="order-2 my-4 sm:my-auto">{totalText}</div>
      {totalPages > 1 && (
        <div className={`${pageButtonsRight ? 'sm:order-3' : 'sm:order-1'} flex justify-center`}>
          <Pagination
            value={parseInt(page)}
            total={totalPages}
            onChange={changePageParam}
            radius="100"
            color={primary}
            autoContrast
          />
        </div>
      )}
    </div>
  );
}
