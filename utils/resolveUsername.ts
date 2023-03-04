export function resolveUserName(
  name: string,
  displayName: string | null | undefined
): string {
  if (!displayName) return name
  if (name === displayName.toLowerCase()) return displayName
  return name
}
