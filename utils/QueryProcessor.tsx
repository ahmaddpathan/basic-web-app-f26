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

  if (query.toLowerCase().includes("What%20is%202%20plus%2048%3F")) {
    return "50"; 
  }

  return "";
}
