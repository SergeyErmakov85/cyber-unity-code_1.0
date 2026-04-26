import { useState, useEffect } from "react";

interface ScrollProgressBarProps {
  color?: string; // tailwind bg class
}

const ScrollProgressBar = ({ color = "bg-primary" }: ScrollProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-14 md:top-20 left-0 right-0 z-40 h-[3px] bg-white/10">
      <div
        className={`h-full ${color} transition-[width] duration-100 ease-out shadow-[0_0_8px_hsl(var(--primary)/0.6)]`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
