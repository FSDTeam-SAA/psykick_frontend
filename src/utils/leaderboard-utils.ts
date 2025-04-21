// Generate random scores within a range
export function generateRandomScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random user data
export function generateRandomUser(): { name: string; username: string } {
  const names = [
    "Fivos papa",
    "Alex Smith",
    "Maria Johnson",
    "John Doe",
    "Emma Wilson",
    "James Brown",
    "Olivia Davis",
    "Robert Miller",
  ];

  const randomNameIndex = Math.floor(Math.random() * names.length);
  const name = names[randomNameIndex];
  const username = `@${name.toLowerCase().replace(" ", "")}${Math.floor(Math.random() * 100)}`;

  return { name, username };
}

// Get tier based on score
export function getTierFromScore(score: number): string {
  if (score >= 90) return "Expert";
  if (score >= 50) return "Advanced";
  if (score >= 0) return "Intermediate";
  return "Novice";
}
