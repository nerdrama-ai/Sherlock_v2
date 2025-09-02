export async function fetchSherlock(username) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search?username=${username}`
  );
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}
