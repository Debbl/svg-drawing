import usePanelStore from "~/store/usePanelStore";
import useSvgStore from "~/store/useSvgStore";

const SvgPreviewer: React.FC = () => {
  const { svg } = useSvgStore((s) => ({
    svg: s.svg,
  }));
  const { width, height } = usePanelStore((s) => ({
    width: s.width,
    height: s.height,
  }));

  if (!svg) return;

  return (
    <div
      fixed
      pos="bottom-10 left-10"
      border
      overflow-hidden
      rounded-6
      style={{
        width: `${width * 0.25}px`,
        height: `${height * 0.25}px`,
      }}
    >
      <div
        full
        relative
        style={{
          scale: "0.25",
          top: `${-(height * 0.25 * 0.5 - height * 0.25 * 0.25 * 0.5)}px`,
          left: `${-(width * 0.25 * 0.5 - width * 0.25 * 0.25 * 0.5)}px`,
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </div>
  );
};

export default SvgPreviewer;
