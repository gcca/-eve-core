export class GList {
  private next: GList | null;
  private prev: GList | null;

  constructor(public data: any) {
    this.next = null;
    this.prev = null;
  }
}
