import { useEffect, useState } from "react";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export function App() {
  const [data, setData] = useState<Joke>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  async function fetchJoke(category?: string) {
    const url = category ? `https://official-joke-api.appspot.com/jokes/${category}/random` : "https://official-joke-api.appspot.com/random_joke";

    const res = await fetch(url);
    const jokeData = await res.json();
    // API returns array for category, single object for random
    setData(Array.isArray(jokeData) ? jokeData[0] : jokeData);
  }

  // Fetch random joke on mount
  useEffect(() => {
    fetchJoke();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://official-joke-api.appspot.com/types");
      const types = await res.json();
      setCategories(types);
    }
    fetchCategories();
  }, []);

  // Add this useEffect to update body class
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <h1>Random Joke</h1>

      {/* Theme toggle */}
      <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? "☀️" : "🌙"} Toggle Theme</button>

      {/* Category selector */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {data && (
        <div>
          <p>
            <strong>Setup:</strong> {data.setup}
          </p>
          <p>
            <strong>Punchline:</strong> {data.punchline}
          </p>
          <button onClick={() => fetchJoke(selectedCategory)}>Get New Joke</button>
        </div>
      )}
    </div>
  );
}
