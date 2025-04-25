export function objectToQueryString(
  query: Record<string, string | number | boolean | undefined | null>,
  prefix = true
): string {
  const list: string[] = Object.entries(query).reduce(
    (arr: string[], [key, value]) => {
      if (value !== undefined && value !== null) {
        arr.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        );
      }
      return arr;
    },
    []
  );

  return list.length ? `${prefix ? '?' : ''}${list.join('&')}` : '';
}

export const getCssVariableValue = (variable: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};
