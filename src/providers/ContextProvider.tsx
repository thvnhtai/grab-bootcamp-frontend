import { ReactElement, useState } from 'react';
import { ApiService } from '../utils/api';
import { appEnvs } from '../utils/mapper';

function getAppEnv() {
  let appEnv = appEnvs[window.location.host];

  if (!appEnv) {
    console.info("Can't detect domain ENV, fallback to default ENV");
    appEnv = appEnvs.default;
  }
  return appEnv;
}

export function ContextProvider({ children }: { children: ReactElement }) {
  useState(() => {
    const appEnv = getAppEnv();

    window.context = {
      appEnv
    } as { appEnv: typeof appEnv };

    window.apiService = new ApiService(appEnv.apiHost);
  });

  return <>{children}</>;
}
