import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const { active, progress } = useProgress();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setHide(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4 animate-pulse">Loading Habla+</h1>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-purple-300">{Math.floor(progress)}%</p>
    </div>
  );
};

export default LoadingScreen;
