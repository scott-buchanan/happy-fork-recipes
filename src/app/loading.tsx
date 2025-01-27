import { PageTemplate } from '@/components/layout/PageTemplate';
import Loader from '@/components/loaders/Loader';

export default function HomeLoader() {
  return (
    <PageTemplate>
      <Loader lines={5} className="mb-16" />

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-video w-full">
            <Loader lines={1} radius="md" height="100%" width="100%" />
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
