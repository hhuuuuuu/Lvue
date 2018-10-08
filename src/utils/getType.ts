export default function getType(value: any): string {
  return Object.prototype.toString
    .call(value)
    .split(" ")[1]
    .split("]")[0];
}

export function isObject(value: any): boolean {
  return getType(value) === "Object";
}
