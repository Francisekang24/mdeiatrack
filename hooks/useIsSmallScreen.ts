import { useSyncExternalStore } from "react";

export function useIsSmallScreen(breakpoint = 768) {
    return useSyncExternalStore(
        (cb) => {
            window.addEventListener("resize", cb);
            return () => window.removeEventListener("resize", cb);
        },
        () => window.innerWidth < breakpoint
    );
}