import Stack from "./Stack";

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

export function parseTokens(src: string): Stack<Token> {
  let r: Stack<Token> = new Stack();
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

const priorityMap: Record<string, number> = {
  "(": 0,
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

//l<=r?
function priority(l: string, r: string): boolean {
  return priorityMap[l] <= priorityMap[r];
}

export function excahnge(tk: Stack<Token>): Stack<Token> {
  let r: Stack<Token> = new Stack();
  let st: Stack<Token> = new Stack();
  for (let i = 0; i < tk.size(); ++i) {
    if (tk.at(i).type === "num") {
      r.push(tk.at(i));
    } else if (tk.at(i).type === "op") {
      if (st.empty() || tk.at(i).op === "(") {
        st.push(tk.at(i));
      } else {
        if (tk.at(i).op === ")") {
          while (!st.empty() && st.top().op !== "(") {
            r.push(st.pop());
          }
          st.pop();
        } else {
          if (priority(tk.at(i).op, st.top().op)) {
            r.push(st.pop());
            while (!st.empty()) {
              if (priority(tk.at(i).op, st.top().op)) {
                r.push(st.pop());
              } else break;
            }
            st.push(tk.at(i));
          } else {
            st.push(tk.at(i));
          }
        }
      }
    }
  }
  while (!st.empty()) {
    r.push(st.pop());
  }
  return r;
}

function operate(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return NaN;
  }
}

export function calculate(tk: Stack<Token>): number {
  let st: Stack<Token> = new Stack();
  for (let i = 0; i < tk.size(); ++i) {
    if (tk.at(i).type === "num") {
      st.push(tk.at(i));
    } else if (tk.at(i).type === "op") {
      let a = st.pop();
      let b = st.pop();
      st.push(
        new Token().setNum(operate(b?.num || 0, a?.num || 0, tk.at(i).op))
      );
    }
  }
  return st.empty() ? NaN : st.top().num;
}

export function calc(src: string): number {
  let tokens = parseTokens(src);
  console.log("tokens: ", tokens);
  let tailTokens = excahnge(tokens);
  console.log("tailTokens", tailTokens);
  let result = calculate(tailTokens);
  console.log("result", result);
  return result;
}
