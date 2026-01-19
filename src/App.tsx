import { useEffect, useState } from "react";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export function App() {
  const [data, setData] = useState<Joke>();
  // Url til at lave et fetch på
  const url = "https://official-joke-api.appspot.com/random_joke";

  // UseEffect hook der kun kører når komponentet mounter
  useEffect(() => {
    // Fetch funktion der kun kører én gang inde i useEffect
    async function doFetchOnMount() {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    }
    doFetchOnMount();
  }, []);

  return (
    <div>
      <h1>Random Joke</h1>
      {data && (
        <div>
          <p>
            <strong>Setup:</strong> {data.setup}
          </p>
          <p>
            <strong>Punchline:</strong> {data.punchline}
          </p>
          <button onClick={() => window.location.reload()}>Get New Joke</button>
        </div>
      )}
    </div>
  );
}
