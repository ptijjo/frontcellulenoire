export function getCategoryColor(category?: string): string {
  switch (category?.toLowerCase()) {
    case "histoire":
      return "#8B6914";
    case "spiritualite":
      return "#5C4A7A";
    case "religion":
      return "#2E5266";
    case "philosophie":
      return "#4A5568";
    case "roman":
      return "#6B3A3A";
    case "langue":
    case "langues":
      return "#7A5C3E";
    case "sciences":
      return "#3D5C4A";
    case "jeunesse":
      return "#6B5344";
    default:
      return "#3D3A36";
  }
}

export const categoryLabels: Record<string, string> = {
  histoire: "Histoire",
  religion: "Religion",
  philosophie: "Philosophie",
  spiritualite: "Spiritualité",
  roman: "Roman",
  langue: "Langues",
  langues: "Langues",
  sciences: "Sciences",
  jeunesse: "Jeunesse",
};
