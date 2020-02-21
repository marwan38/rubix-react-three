export const keys = {
  "-": 189,
  "+": 187,
  q: 81,
  w: 87,
  e: 69,
  "1": 49,
  "2": 50,
  "3": 51
};

export function isPressed(event) {
  return code => {
    const codeOrKey = typeof code === 'string' ? keys[code] : code;
    if (typeof event === "number") return event === codeOrKey;
    return event.keyCode === codeOrKey;
  };
}
