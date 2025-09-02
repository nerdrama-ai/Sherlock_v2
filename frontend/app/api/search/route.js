import { NextResponse } from "next/server";
import { runSherlockMock } from "../../../lib/sherlock";

// Helper to extract profile picture from page metadata
async function fetchProfilePic(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // cache for 1 min
    if (!res.ok) return null;

    const html = await res.text();

    // Look for og:image or twitter:image
    const ogImageMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogImageMatch) return ogImageMatch[1];

    const twitterImageMatch = html.match(
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (twitterImageMatch) return twitterImageMatch[1];

    // Fallback: try favicon
    const faviconMatch = html.match(
      /<link[^>]+rel=["'](?:shortcut icon|icon)["'][^>]+href=["']([^"']+)["']/i
    );
    if (faviconMatch) {
      const faviconUrl = faviconMatch[1];
      return faviconUrl.startsWith("http")
        ? faviconUrl
        : new URL(faviconUrl, url).href;
    }

    return null;
  } catch (err) {
    console.error(`Failed to fetch profile pic for ${url}`, err);
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const sherlockResults = await runSherlockMock(username);

    // Fetch profile pics in parallel
    const results = await Promise.all(
      sherlockResults.map(async (site) => {
        const profilePic = await fetchProfilePic(site.url);

        return {
          site: site.name,
          url: site.url,
          icon: site.icon || `/icons/${site.name.toLowerCase()}.png`,
          username: site.username || username,
          profilePic: profilePic || null,
        };
      })
    );

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Sherlock search failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
