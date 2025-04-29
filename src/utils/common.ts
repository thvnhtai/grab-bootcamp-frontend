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

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function camelObject<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(camelObject) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        camelCase(key),
        camelObject(value)
      ])
    ) as T;
  }
  return obj;
}

export function camelCase(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}
