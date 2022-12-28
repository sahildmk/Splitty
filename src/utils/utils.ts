export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + " . . ." : str;
}

export function ParseDateAUS(dateString: string): Date {
  const splitDate = dateString.split("/").map((v) => parseInt(v));
  return new Date(splitDate[2], splitDate[1], splitDate[0]);
}
