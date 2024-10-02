import { Icon } from '@iconify/react';

export function Loader() {
  return (
    <div className="mt-10 flex w-full justify-center">
      <Icon icon="line-md:loading-twotone-loop" className="text-[5rem] text-secondary" />
    </div>
  );
}
