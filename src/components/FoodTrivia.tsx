import { getTrivia } from '@/lib/api/api';

export default async function FoodTrivia({ className }: { className?: string }) {
  const trivia: { results?: { text: string }; pointsUsed?: number; error?: string } =
    await getTrivia();
  return (
    <div className={`mx-auto mt-12 w-full text-center ${className}`}>
      <h2 className="text-lg font-semibold">Did you know?</h2>

      {trivia.error && <p>{trivia.error}</p>}
      {trivia.results && <p>{trivia.results.text}</p>}
    </div>
  );
}
