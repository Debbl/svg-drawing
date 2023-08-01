import { useHistoryTravel } from "ahooks";
import { useEffect, useMemo, useState } from "react";

const useManualHistoryTravel = <T>(initialValue: T) => {
  const { value, setValue, back, forward } = useHistoryTravel<T>(initialValue);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => value && setState(value), [value]);

  const actions = useMemo(
    () => ({
      commit: () => {
        setValue(state);
      },
    }),
    [setValue, state]
  );

  return {
    value: state,
    setState,
    back,
    forward,
    ...actions,
  } as const;
};

export default useManualHistoryTravel;
