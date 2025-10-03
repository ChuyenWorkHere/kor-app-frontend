import { diffWords } from "diff";

export function capitalizeWords(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function removeVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function checkMatchPercentage(original, userAnswer) {
  const diff = diffWords(original, userAnswer);

  let total = 0;
  let matched = 0;

  diff.forEach(part => {
    if (part.removed) {
      total += part.count;
    } else if (part.added) {
    } else {
      matched += part.count;
      total += part.count;
    }
  });

  return total > 0 ? (matched / total) * 100 : 0;
}