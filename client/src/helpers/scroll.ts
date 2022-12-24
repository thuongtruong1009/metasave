export function onScrolToBottom(element: string, direction: string) {
  var container = document.querySelector(element) as HTMLElement;
  if (direction === "down") {
    container && (container.scrollTop = container?.scrollHeight);
    return;
  }
  if (direction === "up") {
    container && (container.scrollTop = 0);
    return;
  }
}
