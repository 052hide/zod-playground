export const formattedNumberString = (value: string) => {
  return value
    .replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
    .replaceAll(',', '')
    .trim()
}
