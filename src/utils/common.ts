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

export function getCssVariableValue(variable: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price);
}

export function formatScorePercentage(
  score: number | null | undefined
): string {
  const value = (score ?? 0) * 100;
  return `${value.toFixed(1)}%`;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

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

export function snakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`)
    .replace(/^_/, '');
}

export function snakeObject<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(snakeObject) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        snakeCase(key),
        snakeObject(value)
      ])
    ) as T;
  }
  return obj;
}

export function createGoogleMapsSearchUrl(address: string): string {
  if (!address) {
    return '';
  }
  const searchQuery = address.replace(/ /g, '+');
  return `https://www.google.com/maps/search/${searchQuery}`;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateDistanceHaversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number | null {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  const R = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const radLat1 = degreesToRadians(lat1);
  const radLat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(2));
}
