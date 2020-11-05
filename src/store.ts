import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import DiscoveryExtension from '@rc-ex/discovery';
import AuthorizeUriExtension from '@rc-ex/authorize-uri';
import localforage from 'localforage';
import {TokenInfo} from '@rc-ex/core/lib/definitions';

const redirectUri = window.location.origin + window.location.pathname;
const urlSearchParams = new URLSearchParams(
  new URL(window.location.href).search
);
const code = urlSearchParams.get('code');

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
});
const discoveryExtension = new DiscoveryExtension({
  discoveryServer: process.env.RINGCENTRAL_DISCOVERY_SERVER!,
});
rc.installExtension(discoveryExtension);

export type StoreType = {
  ready: boolean;
  init: Function;
  authorizeUri?: string;
  token?: TokenInfo;
};

const store = SubX.proxy<StoreType>({
  ready: false,
  authorizeUri: undefined,
  async init() {
    await discoveryExtension.discover();
    if (code === null) {
      const authorizeUriExtension = new AuthorizeUriExtension(
        discoveryExtension.initialDiscovery!.authApi.authorizationUri
      );
      rc.installExtension(authorizeUriExtension);
      this.authorizeUri = authorizeUriExtension.buildUri({
        discovery: true,
        redirect_uri: redirectUri,
        code_challenge_method: 'S256',
      });
      const codeVerifier = authorizeUriExtension.codeVerifier;
      localforage.setItem('code_verifier', codeVerifier);
    } else {
      this.token = await rc.authorize({
        code,
        redirect_uri: redirectUri,
        code_verifier: (await localforage.getItem('code_verifier')) as string,
      });
      console.log(JSON.stringify(this.token, null, 2));
    }
  },
});

export default store;
