export function truncate(str: String, n: number) {
  return str.length > n ? str.slice(0, n - 1) + " . . ." : str;
}
