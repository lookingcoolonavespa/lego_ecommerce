export function capitalizeEachWord(str: string) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export function capitalizeStr(str: string) {
  return str
    .split('')
    .map((char) => char.toUpperCase())
    .join('');
}
