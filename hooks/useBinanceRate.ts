import { useEffect, useState } from "react";

export function useBinanceRate(from: string, to: string) {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    setRate(1);

    if (!from || !to || from === to) {
      setRate(1);
      return;
    }
    let isCancelled = false;

    async function fetchRate() {
      const directPair = `${from}${to}`;
      const invertPair = `${to}${from}`;

      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${directPair}`);
        const data = await res.json();
        if (!isCancelled && data.price) {
          setRate(Number(data.price));
          return;
        }
      } catch {}

      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${invertPair}`);
        const data = await res.json();
        if (!isCancelled && data.price) {
          setRate(1 / Number(data.price));
          return;
        }
      } catch {}

      if (from !== "USDT" && to !== "USDT") {
        try {
          const [fromRes, toRes] = await Promise.all([
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${from}USDT`),
            fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${to}USDT`),
          ]);
          const fromData = await fromRes.json();
          const toData = await toRes.json();
          if (!isCancelled && fromData.price && toData.price) {
            setRate(Number(fromData.price) / Number(toData.price));
            return;
          }
        } catch {}
      }

      setRate(null);
    }

    fetchRate();
    return () => {
      isCancelled = true;
    };
  }, [from, to]);

  return rate;
}