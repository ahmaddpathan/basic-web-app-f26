
function isPrime(n: number): boolean {
  if (n < 2) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}

export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase().trim();

  // Shakespeare
  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  // Personal questions
  if (q.includes("andrew id")) {
    return "ahmadp";
  }

  if (q.includes("name")) {
    return "AP";
  }

  if (q.includes("age")) {
    return "21";
  }

  // Addition and subtraction
  const math = q.match(
    /what is (-?\d+)\s+(plus|minus)\s+(-?\d+)/
  );

  if (math) {
    const num1 = Number(math[1]);
    const operation = math[2];
    const num2 = Number(math[3]);

    if (operation === "plus") {
      return String(num1 + num2);
    }

    if (operation === "minus") {
      return String(num1 - num2);
    }
  }

  // Questions containing a list of numbers
  const numbersPart = q.split(":")[1];

  if (numbersPart) {
    const numbers = (numbersPart.match(/-?\d+/g) || [])
      .map(Number);

    // Largest number
    if (q.includes("largest") && numbers.length > 0) {
      return String(Math.max(...numbers));
    }

    // Prime numbers
    if (q.includes("are primes")) {
      const primes = numbers.filter(isPrime);
      return primes.join(", ");
    }
  }

  return "";
}
