class Stack<T> {
  constructor() {
    this.l = [];
  }
  l: T[];
  get length() {
    return this.l.length;
  }
  at(index: number): T {
    let v = this.l[index];
    if (v) return v;
    else throw Error("index overflow.");
  }
  empty(): boolean {
    return this.l.length === 0;
  }
  push(...items: T[]): number {
    return this.l.push(...items);
  }
  top(): T {
    if (this.empty()) {
      throw Error("empty stack.");
    } else return this.l[this.l.length - 1];
  }
  pop(): T {
    let p = this.l.pop();
    if (p) return p;
    else throw Error("empty stack.");
  }
}

export default Stack;
