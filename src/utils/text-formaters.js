export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
export const pluralizer = (text, count) => text + (count !== 1 ? 's' : '');