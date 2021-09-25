export default (str) => {

  str = str.toLowerCase();
  if (str.slice(0, 2) === 'on') {
    str = str.replace(str.charAt(2), str.charAt(2).toUpperCase());
    return str
  }
  str = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
  return ('on' + str).trim()
}