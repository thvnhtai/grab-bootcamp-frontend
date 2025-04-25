declare interface Window {
  context: {
    appEnv: import('@/utils/mapper').AppEnv;
  };
  apiService: import('@/utils/api').ApiService;
}

declare const apiService: Window['apiService'];
declare const context: Window['context'];
