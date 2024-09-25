export function capitalize(words: string[] | string) {
  const capitalizeWord = (word: string) => {
    return word.slice(0, 1).toLocaleUpperCase();
  };

  if (words) {
    if (typeof words === 'string') {
      return capitalizeWord(words);
    } else {
      return words.map((word) => capitalizeWord(word));
    }
  }
}
