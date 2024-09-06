export const mapDiningTime = (diningTime: string): string => {
  switch (diningTime) {
    case "breakfast":
      return "Frühstück";
    case "lunch":
      return "Mittagessen";
    case "dinner":
      return "Abendessen";
    case "snack":
      return "Snack";
    default:
      return "";
  }
};
