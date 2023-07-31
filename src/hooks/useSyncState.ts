import { useRef, useState } from "react";

const useSyncState = <T>(defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);
  const syncStateRef = useRef<T>(state);

  const setSyncState = (newState: T) => {
    syncStateRef.current = newState;
    setState(newState);
  };

  return [state, setSyncState, syncStateRef] as const;
};

export default useSyncState;
