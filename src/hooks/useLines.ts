import { useEffect } from "react";
import useManualHistoryTravel from "./useManualHistoryTravel";
import useSvgStore from "~/store/useSvgStore";

const useLines = () => {
  const { lines, setLines } = useSvgStore((s) => ({
    lines: s.lines,
    setLines: s.setLines,
  }));

  const actions = useManualHistoryTravel(lines);

  useEffect(() => setLines(actions.value), [actions.value, setLines]);

  return actions;
};

export default useLines;
