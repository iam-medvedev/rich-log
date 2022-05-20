export function isSafari() {
  if (typeof window === 'undefined') {
    return false;
  }

  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}

export function getIntVal(prop: string | number) {
  if (typeof prop === 'number') {
    return prop;
  }

  return parseInt(prop);
}

export function convertToParamCase(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
