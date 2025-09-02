// lib/api.js

export async function fetchSherlock(username) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // ensure fresh results
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(`API Error ${res.status}: ${errorDetails}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ fetchSherlock failed:", err);
    throw err;
  }
}
