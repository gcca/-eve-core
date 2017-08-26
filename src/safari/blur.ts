export function blur(callback: Function): void {
  function bodyClick(event: Event) {
    callback.apply(event.target, arguments);
    document.body.removeEventListener('click', bodyClick);
  }
  document.body.addEventListener('click', bodyClick, true);
}
