import { PageTemplate } from '@/components/layout/PageTemplate';
import Loader from '@/components/loaders/Loader';

export default function Loading({ useTemplate = true }) {
  const content = (
    <div className="flex">
      <article className="flex-grow">
        <div className="py-5">
          <Loader lines={15} className="mb-16" />
          <Loader lines={15} />
        </div>

        <div className="block py-5 lg:hidden">
          <Loader image />
          <Loader lines={10} />
        </div>

        <div className="py-5">
          <Loader lines={10} />
        </div>
      </article>

      <aside className="hidden py-5 lg:block">
        <div className="lg:ml-10 lg:w-96">
          <Loader lines={1} className="mb-10" />
          <Loader lines={10} />
        </div>
      </aside>
    </div>
  );

  return useTemplate ? <PageTemplate>{content}</PageTemplate> : content;
}
