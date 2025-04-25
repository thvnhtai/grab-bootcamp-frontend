const metaEnv = import.meta.env;

export class AppEnv {
  constructor(
    public readonly clientHost: string,
    public readonly apiHost: string
  ) {}
}

export const appEnvs: Record<string, AppEnv> = {
  default: new AppEnv(metaEnv.VITE_CLIENT_HOST, metaEnv.VITE_API_HOST)
};
