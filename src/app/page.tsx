import { connection } from "next/server";

export default async function Home() {
  await connection(); // render on each request, like a real data page
  const items = ["DJI Mini 5 Pro"];

  return (
    <main>
      <h1>Gear Vault</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>Rendered on the server at {new Date().toISOString()}</p>
    </main>
  );
}
