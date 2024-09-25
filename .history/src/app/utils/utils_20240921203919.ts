export function capitalize(words: string) {
  const capitalizeWord = (word: string) => {
    return word.slice(0, 1).toLocaleUpperCase();
  };

  if (words) {
    const arr = words.trim().split(' ');
    if (arr.length > 0) {
      return arr.map((word) => capitalizeWord(word));
    }
  }
}
