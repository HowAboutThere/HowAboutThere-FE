import { ReactNode, useState } from "react";

export type Punnel = {
  punnelId: string;
  punnelComponent: ReactNode;
};

export const usePunnel = (flow: Punnel[], initPunnelState: number = 0) => {
  const [punnelState, setPunnelState] = useState<number>(initPunnelState);

  const getCurrentPunnel = () => flow[punnelState];

  const getNextPunnel = () => {
    if (isLastPunnelState()) return;
    setPunnelState((prev) => prev++);
  };

  const getPrevPunnel = () => {
    if (isFirstPunnelState()) return;
    setPunnelState((prev) => prev--);
  };

  const isLastPunnelState = () => punnelState == flow.length - 1;
  const isFirstPunnelState = () => punnelState == 0;

  return {
    getCurrentPunnel,
    getNextPunnel,
    getPrevPunnel,
    punnel: flow[punnelState].punnelComponent,
  };
};
