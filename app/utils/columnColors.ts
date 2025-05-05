export type Col = "length" | "stars" | "bpm" | "ar" | "cs" | "hp" | "accuracy";

export function getColumnColor(col: Col, modsList: string[]): string {
  const [hasDT, hasHR, hasHT, hasEZ] = [
    modsList.includes("DT"),
    modsList.includes("HR"),
    modsList.includes("HT"),
    modsList.includes("EZ"),
  ];

  if (modsList.length === 1) {
    if (hasDT) {
      if (["length", "stars", "bpm", "ar", "accuracy"].includes(col))
        return "text-orange-400";
      return "";
    }
    if (hasHT) {
      if (["length", "stars", "bpm", "ar", "accuracy"].includes(col))
        return "text-blue-400";
      return "";
    }
    if (hasHR) {
      if (["cs", "hp", "stars", "ar", "accuracy"].includes(col))
        return "text-red-400";
      return "";
    }
    if (hasEZ) {
      if (["cs", "hp", "stars", "ar", "accuracy"].includes(col))
        return "text-green-400";
      return "";
    }
  }

  if (modsList.length === 2) {
    if (hasDT && hasHR) {
      if (["length", "bpm"].includes(col)) return "text-orange-400";
      if (["cs", "hp"].includes(col)) return "text-red-400";
      if (["stars", "ar", "accuracy"].includes(col)) return "text-red-500";
    }
    if (hasDT && hasEZ) {
      if (["length", "bpm"].includes(col)) return "text-orange-400";
      if (["cs", "hp"].includes(col)) return "text-green-400";
      if (["stars", "ar", "accuracy"].includes(col)) return "text-amber-300";
    }
    if (hasHT && hasHR) {
      if (["length", "bpm"].includes(col)) return "text-blue-400";
      if (["cs", "hp"].includes(col)) return "text-red-400";
      if (["stars", "ar", "accuracy"].includes(col)) return "text-purple-300";
    }
    if (hasHT && hasEZ) {
      if (["length", "bpm"].includes(col)) return "text-blue-400";
      if (["cs", "hp"].includes(col)) return "text-green-400";
      if (["stars", "ar", "accuracy"].includes(col)) return "text-sky-200";
    }
  }

  return "";
}
