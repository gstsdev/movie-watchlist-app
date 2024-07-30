"use client";

import { useEffect, useRef, useState } from "react";

export default function useThrottledValue<T>(
  value: T,
  throttleDelayInMs: number
) {
  const [throttledValue, setThrottledValue] = useState(value);

  const throttleTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    console.log("updated value");

    throttleTimeout.current = setTimeout(
      () => setThrottledValue(value),
      throttleDelayInMs
    );

    return () => clearTimeout(throttleTimeout.current);
  }, [value, throttleDelayInMs]);

  return throttledValue;
}
