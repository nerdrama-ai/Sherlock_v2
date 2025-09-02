// Mock implementation for demo
// Replace with real Sherlock backend integration later

export async function runSherlockMock(username) {
  return [
    {
      site: "GitHub",
      url: `https://github.com/${username}`,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg",
    },
    {
      site: "Twitter",
      url: `https://twitter.com/${username}`,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg",
    },
    {
      site: "Instagram",
      url: `https://instagram.com/${username}`,
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    },
  ];
}
