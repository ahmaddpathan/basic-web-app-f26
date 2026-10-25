export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "AP";
  }

  if (query.toLowerCase().includes("age")) {
    return "21";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "ahmadp";
  }

  const addition = query.toLowerCase().match(
    /what is (\d+) plus (\d+)/ 
  );

  if (addition) {
    const num1 = Number(addition[1]);
    const num2 = Number(addition[2]);

    return String(num1 + num2);
  }

  return "";
}
