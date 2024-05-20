import { useMemo } from "react";
import { useThreads } from "../../liveblocks.config";

// Returns the highest z-index of all threads
export const useMaxZIndex = () => {
  // get all threads
  const { threads } = useThreads();

  // calculate the max z-index
  return useMemo(() => {
    if (!threads) {
      return 0; // or any default value you prefer when threads is undefined
    }

    let max = 0;
    for (const thread of threads) {
      if (thread.metadata?.zIndex > max) {
        max = thread.metadata.zIndex;
      }
    }
    return max;
  }, [threads]);
};
