export class Token {
  setNum(num: number) {
    this.type = "num";
    this.num = num;
    return this;
  }
  setOp(op: string) {
    this.type = "op";
    this.op = op;
    return this;
  }
  type?: "op" | "num";
  num: number = 0;
  op: string = "";
}

export function parseTokens(src: string): Token[] {
  let r: Token[] = [];
  for (let i = 0; i < src.length; ++i) {
    if (src[i] >= "0" && src[i] <= "9") {
      let j = i;
      while (src[j] >= "0" && src[j] <= "9" && j < src.length) ++j;
      let n = parseInt(src.substring(i, j));
      r.push(new Token().setNum(n));
      i = j - 1;
    } else if (
      src[i] === "+" ||
      src[i] === "-" ||
      src[i] === "*" ||
      src[i] === "/" ||
      src[i] === "(" ||
      src[i] === ")"
    ) {
      r.push(new Token().setOp(src[i]));
    }
  }
  return r;
}

function priority(l: string, r: string): boolean {
  if (r === "(") return false;
  if (l === "+" || l === "-") return true;
  if ((l === "*" || l === "/") && (r === "*" || r === "/")) return true;
  return false;
}

export function excahnge(tk: Token[]): Token[] {
  let r: Token[] = [];
  let st: Token[] = [];
  for (let i = 0; i < tk.length; ++i) {
    if (tk[i].type === "num") {
      r.push(tk[i]);
    } else if (tk[i].type === "op") {
      if (st.length === 0 || tk[i].op === "(") {
        st.push(tk[i]);
      } else {
        if (tk[i].op === ")") {
          while (st.length > 0 && st[st.length - 1].op !== "(") {
            let p = st.pop();
            if (p) r.push(p);
          }
          st.pop();
        } else {
          if (priority(tk[i].op, st[st.length - 1].op)) {
            while (st.length > 0 && st[st.length - 1].op !== "(") {
              let p = st.pop();
              if (p) r.push(p);
            }
            st.push(tk[i]);
          } else {
            st.push(tk[i]);
          }
        }
      }
    }
  }
  while (st.length > 0) {
    let p = st.pop();
    if (p) r.push(p);
  }
  return r;
}

function operate(a: number, b: number, op: string): number {
  let r = 0;
  switch (op) {
    case "+":
      r = a + b;
      break;
    case "-":
      r = a - b;
      break;
    case "*":
      r = a * b;
      break;
    case "/":
      r = a / b;
      break;
    default:
      break;
  }
  return r;
}

export function calculate(tk: Token[]): number {
  let st: Token[] = [];
  for (let i = 0; i < tk.length; ++i) {
    if (tk[i].type === "num") {
      st.push(tk[i]);
    } else if (tk[i].type === "op") {
      let a = st.pop();
      let b = st.pop();
      st.push(new Token().setNum(operate(b?.num || 0, a?.num || 0, tk[i].op)));
    }
  }
  return st.length > 0 ? st[st.length - 1].num : 0;
}
