import {useRef, useLayoutEffect} from "react";
import {gsap} from "gsap";

export function useGsap(
  scope: React.RefObject<HTMLElement | null>,
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;

    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    }, scope.current);

    return () => {
      ctxRef.current?.revert();
    };
  }, deps);
}
