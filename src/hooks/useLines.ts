import { useEffect } from "react";
import useManualHistoryTravel from "./useManualHistoryTravel";
import useSvgStore from "~/store/useSvgStore";

const useLines = () => {
  const { lines, setLines } = useSvgStore((s) => ({
    lines: s.lines,
    setLines: s.setLines,
  }));

  const actions = useManualHistoryTravel(lines);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLines(actions.value), [actions.value]);

  return actions;
};

export default useLines;
