// Titles read "Type | Neighbourhood", locations "Street, City[, Portugal]"
export const splitTitle = (title: string) => {
  const [type, neighbourhood] = title.split('|').map((part) => part.trim());
  return { type, neighbourhood };
};

export const cityOf = (location: string) => {
  const parts = location.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1 && /^portugal$/i.test(parts[parts.length - 1])) parts.pop();
  return parts[parts.length - 1] ?? '';
};

// "Neighbourhood, City" without repeating a name that is both
export const placeOf = (title: string, location: string) => {
  const { neighbourhood } = splitTitle(title);
  const city = cityOf(location);
  return [neighbourhood, city].filter((part, i, all) => part && all.indexOf(part) === i).join(', ');
};
