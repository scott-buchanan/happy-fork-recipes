import { PageTemplate } from '@/components/layout/PageTemplate';
import Loader from '@/components/loaders/Loader';

export default function HomeLoader() {
  return (
    <PageTemplate>
      <Loader className="mt-20" lines={5} />

      <div className="mb-5 mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-video w-full">
            <Loader image />
          </div>
        ))}
      </div>

      <Loader className="my-8" lines={2} />
    </PageTemplate>
  );
}
