
function isPrime(n: number): boolean {
  if (n < 2) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}

export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("andrew id")) return "ahmadp";
  if (q.includes("name")) return "AP";
  if (q.includes("age")) return "21";

  // Largest number and prime number questions
  const numbersPart = q.split(":")[1];

  if (numbersPart) {
    const numbers = (numbersPart.match(/-?\d+/g) || [])
      .map(Number);

    if (q.includes("largest") && numbers.length > 0) {
      return String(Math.max(...numbers));
    }

    if (q.includes("are primes")) {
      return numbers.filter(isPrime).join(", ");
    }
  }

  // Arithmetic questions
  const expression = q.match(/^what is (.+)\?$/)?.[1];

  if (expression) {
    const parts = expression.split(
      /\s+(plus|minus|multiplied by|to the power of)\s+/
    );

    if (parts.length >= 3 && parts.length % 2 === 1) {
      const values: number[] = [];
      const operators: string[] = [];
      let valid = true;

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          if (!/^-?\d+$/.test(parts[i])) {
            valid = false;
            break;
          }
          values.push(Number(parts[i]));
        } else {
          operators.push(parts[i]);
        }
      }

      if (valid) {
        // Powers first, from right to left
        for (let i = operators.length - 1; i >= 0; i--) {
          if (operators[i] === "to the power of") {
            values.splice(
              i, 2, Math.pow(values[i], values[i + 1])
            );
            operators.splice(i, 1);
          }
        }

        // Multiplication second
        for (let i = 0; i < operators.length;) {
          if (operators[i] === "multiplied by") {
            values.splice(i, 2, values[i] * values[i + 1]);
            operators.splice(i, 1);
          } else {
            i++;
          }
        }

        // Addition and subtraction last
        let result = values[0];

        for (let i = 0; i < operators.length; i++) {
          if (operators[i] === "plus") {
            result += values[i + 1];
          } else if (operators[i] === "minus") {
            result -= values[i + 1];
          }
        }

        return String(result);
      }
    }
  }

  return "";
}
