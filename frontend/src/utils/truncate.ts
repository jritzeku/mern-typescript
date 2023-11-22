export const truncate = (text: string, limit = 140) => {
  // return text.length > 40 ? text.substring(0, 40) + '...' : text

  return text.substring(0, limit) + '...'
}
