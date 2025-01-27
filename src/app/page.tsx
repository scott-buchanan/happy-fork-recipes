import { PageTemplate } from '../components/layout/PageTemplate';
import FoodTrivia from '@/components/FoodTrivia';
import FeaturedRecipes from '@/components/FeaturedRecipes';

export default function Home() {
  return (
    <PageTemplate>
      <p className="mb-8 mt-5 text-lg">
        Welcome to Happy Fork Recipes, where good food meets good times! Hungry for something
        delicious? We&apos;ve got your back. From <b>comforting classics</b> to{' '}
        <b>fresh new favorites</b>, or from <b>quick weeknight dinners</b> to{' '}
        <b>delightful desserts</b>, we&apos;re here to help you whip up something amazing.
        You&apos;ll find inspiration for every craving! So, grab a fork, check out our delicious
        recipes, and <i>make a meal tonight!</i>
      </p>

      <FeaturedRecipes />

      <FoodTrivia className="mb-8" />
    </PageTemplate>
  );
}
