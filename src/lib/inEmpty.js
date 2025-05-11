export default function isEmpty(value) {
  if (value == null) return true;
  // String
  if (typeof value === 'string') return value.trim() === '';
  // Array
  if (Array.isArray(value)) return value.length === 0;
  // Map or Set
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  // Object
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
