import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      if (trailRef.current) {
        setTimeout(() => {
          if (trailRef.current) {
            trailRef.current.style.left = `${e.clientX}px`;
            trailRef.current.style.top = `${e.clientY}px`;
          }
        }, 80);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          background: "hsl(210 80% 55% / 0.7)",
          boxShadow: "0 0 12px hsl(210 80% 55% / 0.4)",
        }}
      />
      <div
        ref={trailRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          border: "1px solid hsl(230 65% 55% / 0.2)",
          background: "hsl(230 65% 55% / 0.03)",
        }}
      />
    </>
  );
};

export default CustomCursor;
