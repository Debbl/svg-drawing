import { useHistoryTravel } from "ahooks";
import { useEffect, useMemo, useState } from "react";

const useManualHistoryTravel = <T>(initialValue: T) => {
  const { value, setValue, ..._actions } = useHistoryTravel<T>(initialValue);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => value && setState(value), [value]);

  const actions = useMemo(
    () => ({
      commit: (newState?: T) => {
        setValue(newState ?? state);
      },
    }),
    [setValue, state],
  );

  return {
    value: state,
    setState,
    ..._actions,
    ...actions,
  } as const;
};

export default useManualHistoryTravel;
