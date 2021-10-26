export function saveToStorage(storageKey, item) {
  localStorage.setItem(storageKey, JSON.stringify(item));
}

export function appendToStorage(storageKey, item, limit = undefined) {
  let items = getItemsFromStorage(storageKey);
  if (items === undefined) items = [];
  items.unshift(item);
  if (limit !== undefined) {
    if (items.length >= limit) items.pop();
  }

  localStorage.setItem(storageKey, JSON.stringify(items));
}

export function getItemsFromStorage(key) {
  const storage = localStorage.getItem(key);
  if (storage === null) return undefined;

  const data = JSON.parse(storage);
  return data;
}
