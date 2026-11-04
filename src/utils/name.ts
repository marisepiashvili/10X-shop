// "Mariam Sepiashvili" -> "Mariam"; the account keeps one name field
export function getFirstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0]
}
