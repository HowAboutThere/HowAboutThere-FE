import { PunnelContext } from "@/components/Punnel/Punnel";
import { ReactNode, useCallback, useContext, useMemo } from "react";

export type Punnel = {
  punnelId: string;
  punnelComponent: ReactNode;
};

export const usePunnel = () => {
  const value = useContext(PunnelContext);
  if (!value)
    throw new Error(
      "usePunnel를 사용하려면 PunnelProvider 내부에서 선언하여야 합니다. PunnelProvider가 상위 컴포넌트에 존재하는지 확인해주세요."
    );

  const { flow, punnelState, setPunnelState } = value;

  const getCurrentPunnel = useCallback(() => flow[punnelState].punnelComponent, [flow, punnelState]);

  const isLastPunnelState = useCallback(() => punnelState == flow.length - 1, [flow, punnelState]);
  const isFirstPunnelState = useCallback(() => punnelState == 0, [punnelState]);

  const getNextPunnel = useCallback(() => {
    if (isLastPunnelState()) return;
    setPunnelState((prev) => ++prev);
  }, [isLastPunnelState, setPunnelState]);

  const getPrevPunnel = useCallback(() => {
    if (isFirstPunnelState()) return;
    setPunnelState((prev) => --prev);
  }, [isFirstPunnelState, setPunnelState]);

  const getFirstPunnel = useCallback(() => {
    setPunnelState(0);
  }, [setPunnelState]);

  return useMemo(
    () => ({
      getCurrentPunnel,
      getNextPunnel,
      getPrevPunnel,
      getFirstPunnel,
      punnel: flow[punnelState].punnelComponent,
    }),
    [flow, getCurrentPunnel, getFirstPunnel, getNextPunnel, getPrevPunnel, punnelState]
  );
};
