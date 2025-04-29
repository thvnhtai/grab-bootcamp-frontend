export function withPrefix(path: string) {
  return path;
}

export const PageURLs = {
  ofIndex: () => withPrefix('/'),

  // home
  ofHome: () => withPrefix('/home'),

  // auth
  ofAuth: () => withPrefix('/auth'),

  // search
  ofSearch: () => withPrefix('/search'),
  ofSearchResult: () => withPrefix('/search/result'),

  // internal server error
  of500: () => withPrefix('/500'),

  // not found
  of404: () => withPrefix('/404'),

  // forbidden
  of403: () => withPrefix('/403')
};
