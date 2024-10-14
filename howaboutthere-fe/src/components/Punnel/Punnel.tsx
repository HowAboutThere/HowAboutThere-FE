import { PUNNELS } from "@/constant/punnel";
import { Punnel as PunnelType } from "@/hooks/usePunnel";
import { createContext, useMemo, useState } from "react";

type PunnelContextType = {
  flow: PunnelType[];
  punnelState: number;
  setPunnelState: React.Dispatch<React.SetStateAction<number>>;
};

export const PunnelContext = createContext<PunnelContextType | undefined>(undefined);

export type PunnelProviderProps = {
  punnelId: string;
};

export default function Punnel({ punnelId }: PunnelProviderProps) {
  const flow = PUNNELS[punnelId];
  const [punnelState, setPunnelState] = useState<number>(0);

  const value = useMemo(() => ({ flow, punnelState, setPunnelState }), [flow, punnelState, setPunnelState]);

  return <PunnelContext.Provider value={value}>{flow[punnelState].punnelComponent}</PunnelContext.Provider>;
}
