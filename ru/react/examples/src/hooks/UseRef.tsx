import { useEffect, useRef, useState } from "react";

export const UseRef = () => {
  const [time, setTime] = useState("");
  const interval = useRef<string>();

  useEffect(() => {
    const id = setInterval(() => {
      setTime((time) => (time = new Date().toLocaleTimeString()));
    }, 1000);

    interval.current = id.toString();

    return () => clearInterval(interval.current);
  }, [time]);

  return (
    <>
      <p>Текущее время:</p>
      <time>{time}</time>
    </>
  );
};
