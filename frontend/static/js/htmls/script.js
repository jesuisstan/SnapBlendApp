export function changeLocation(url) {
  window.history.pushState({}, '', url);
}