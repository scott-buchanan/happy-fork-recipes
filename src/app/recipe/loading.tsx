import { PageTemplate } from '@/components/layout/PageTemplate';
import Loader from '@/components/loaders/Loader';

export default function RecipeLoader() {
  return (
    <PageTemplate>
      <article className="flex">
        <div className="flex-grow">
          <div className="py-5">
            <Loader lines={15} className="mb-16" />
            <Loader lines={15} />
          </div>

          {/* Ingredients - small screens */}
          <div className="block py-5 lg:hidden">
            <Loader image />
            <Loader lines={10} mb={10} />
          </div>

          {/* Similar Recipes */}
          <div className="py-5">
            <Loader lines={10} width="350px" />
          </div>
        </div>

        {/* Ingredients - right side large screens */}
        <aside className="hidden py-5 lg:block">
          <div className="lg:ml-10 lg:w-96">
            <Loader lines={1} height="200" width="100%" radius="sm" className="mb-10" />
            <Loader lines={10} />
          </div>
        </aside>
      </article>
    </PageTemplate>
  );
}
