export function arrayRotate(arr: Array<any>, reverse?: boolean) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}
