export function isSafari(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}

export function getIntVal(prop: string | number): number {
  if (typeof prop === 'number') {
    return prop;
  }

  return parseInt(prop);
}

export function convertToParamCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export async function getDataUrlFromBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = new FileReader();

    file.onload = (e) => {
      if (typeof e.target.result === 'string') {
        return resolve(e.target.result);
      }

      reject();
    };

    file.onerror = () => {
      reject();
    };

    file.readAsDataURL(blob);
  });
}

export async function getBase64Image(url: string): Promise<string> {
  const blob = await fetch(url).then((res) => res.blob());
  return await getDataUrlFromBlob(blob);
}
