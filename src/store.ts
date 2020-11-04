import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import DiscoveryExtension from '@rc-ex/discovery';

// const redirectUri = window.location.origin + window.location.pathname;
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
};

const store = SubX.proxy<StoreType>({
  ready: false,
  async init() {
    await discoveryExtension.discover();
  },
});

export default store;
