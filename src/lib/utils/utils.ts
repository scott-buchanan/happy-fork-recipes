export function capitalize(words: string): string {
  const capitalizeWord = (word: string) => {
    return `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)} `;
  };

  if (words) {
    const arr = words.trim().split(' ');
    if (arr.length > 0) {
      return arr
        .map((word) => capitalizeWord(word))
        .join(' ')
        .trim();
    }
  }
  return '';
}

export function roundToTenth(num: number): number {
  const rounded: number = parseFloat(num.toFixed(1));
  return rounded % 1 === 0 ? Math.floor(rounded) : rounded;
}
