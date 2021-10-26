export const capitalize = (string) => {
  string = string || "";

  const capitalizeWord = (string) =>
    string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();

  return string
    .split("-")
    .map((word) => capitalizeWord(word))
    .join("-");
};
