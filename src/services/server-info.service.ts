import * as http from 'http';
import { AddressInfo } from 'dgram';
import { format as formatUrl } from 'url';

export interface ServerInfo {
  address: string;
  family: string;
  url: string;
  subscriptionsUrl: string;
  port: number | string;
  subscriptionsPath: string;
  server: http.Server;
}

export const getServerInfo = (server: http.Server, subscriptionsPath?: string): ServerInfo => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const serverInfo: any = {
    ...(server.address() as AddressInfo),
    server,
    subscriptionsPath,
  };

  let hostForUrl = serverInfo.address;
  if (serverInfo.address === '' || serverInfo.address === '::') hostForUrl = 'localhost';

  serverInfo.url = formatUrl({
    protocol: 'http',
    hostname: hostForUrl,
    port: serverInfo.port,
  });

  serverInfo.subscriptionsUrl = formatUrl({
    protocol: 'ws',
    hostname: hostForUrl,
    port: serverInfo.port,
    slashes: true,
    pathname: subscriptionsPath,
  });

  return serverInfo;
};
