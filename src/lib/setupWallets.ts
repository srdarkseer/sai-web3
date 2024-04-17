// lib/setupWallets.ts
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseModule from "@web3-onboard/coinbase";
import dcentModule from "@web3-onboard/dcent";
import infinityWalletModule from "@web3-onboard/infinity-wallet";
import keystoneModule from "@web3-onboard/keystone";
import keepkeyModule from "@web3-onboard/keepkey";
import safeModule from "@web3-onboard/gnosis";
import sequenceModule from "@web3-onboard/sequence";
import tahoModule from "@web3-onboard/taho";
import trustModule from "@web3-onboard/trust";
import frontierModule from "@web3-onboard/frontier";
import trezorModule from "@web3-onboard/trezor";
import portisModule from "@web3-onboard/portis";
import fortmaticModule from "@web3-onboard/fortmatic";
import magicModule from "@web3-onboard/magic";

export default function setupWallets() {
  const wallets = [
    injectedModule(),
    coinbaseModule(),
    dcentModule(),
    infinityWalletModule(),
    keystoneModule(),
    keepkeyModule(),
    safeModule(),
    sequenceModule(),
    tahoModule(),
    trustModule(),
    frontierModule(),
    trezorModule({
      email: "test@test.com",
      appUrl: "https://www.blocknative.com",
    }),
    portisModule({
      apiKey: "apiKey",
    }),
    fortmaticModule({
      apiKey: "apiKey",
    }),
    magicModule({
      apiKey: "apiKey",
    }),
  ];

  return wallets;
}
