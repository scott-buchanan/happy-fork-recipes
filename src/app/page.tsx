import { PageTemplate } from '../components/layout/PageTemplate';
import FoodTrivia from '@/components/FoodTrivia';
import FeaturedRecipes from '@/components/recipeCards/FeaturedRecipes';

// async because FeaturedRecipes and FoodTrivia are async
export default async function Home() {
  return (
    <PageTemplate>
      <h1 className="mt-8">Welcome to Happy Fork Recipes</h1>
      <p className="mb-8 mt-5 text-lg">
        This is where good food meets good times! Hungry for something delicious? We&apos;ve got
        your back. From <b>comforting classics</b> to <b>fresh new favorites</b>, or from{' '}
        <b>quick weeknight dinners</b> to <b>delightful desserts</b>, we&apos;re here to help you
        whip up something amazing. You&apos;ll find inspiration for every craving! So, grab a fork,
        check out our delicious recipes, and <i>make a meal tonight!</i>
      </p>

      <FeaturedRecipes />

      <FoodTrivia className="mb-8" />
    </PageTemplate>
  );
}
