import { useControlsStore } from "./useControls/useControlsStore";
import { HiArrowSmUp, HiArrowSmDown, HiArrowSmLeft, HiArrowSmRight} from "react-icons/hi";


const MobileControls = () => {
  const setDirection = useControlsStore((s) => s.setDirection);

  const handleStart = (dir) => () => setDirection(dir);
  const handleEnd = () => setDirection(null);

  return (
    <div className="fixed bottom-10 left-3 z-50 grid grid-cols-3 gap-2 w-40 touch-none">
      <div></div>
      <button
        onPointerDown={handleStart('forward')}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
        className=" !bg-blue-600 w-13 h-13 rounded-full flex items-center justify-center text-white"
      >
        <HiArrowSmUp className=" text-xl" />

      </button>
      <div></div>

      <button
        onPointerDown={handleStart('left')}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
        className="!bg-blue-600 w-13 h-13 rounded-full flex items-center justify-center text-white"
      >
        <HiArrowSmLeft className=" " />
      </button>
      <div></div>
      <button
        onPointerDown={handleStart('right')}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
        className="!bg-blue-600 w-13 h-13 rounded-full flex items-center justify-center text-white"
      >
        <HiArrowSmRight className=" " />
      </button>

      <div></div>
      <button
        onPointerDown={handleStart('backward')}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
        className="!bg-blue-600 w-13 h-13 rounded-full flex items-center justify-center text-white"
      >
        <HiArrowSmDown className=" " />
      </button>
      <div></div>
    </div>
  );
};

export default MobileControls;
