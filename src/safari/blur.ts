/**
 * Workaround to blur on iOS empty layers.
 *
 * Attaching listener on body does not cause click event on iOS Safari
 * when target has no click event listener.
 *
 * @see [Safari mouse emulation](https://developer.apple.com/library/content
 *   /documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents
 *   /HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW4)
 */
export function blur(callback: Function): void {
  function bodyClick(event: Event) {
    callback.apply(event.target, arguments);
    document.body.removeEventListener('click', bodyClick);
  }
  document.body.addEventListener('click', bodyClick, true);
}
