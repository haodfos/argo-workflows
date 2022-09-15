export enum KioskMode {
  Off = 'off',
  Full = 'full',
}

/**
 * Type to represent the value of a single query variable.
 *
 * @public
 */
export type UrlQueryValue = string | number | boolean | string[] | number[] | boolean[] | undefined | null;

/**
  * Type to represent the values parsed from the query string.
  *
  * @public
  */
export type UrlQueryMap = Record<string, UrlQueryValue>;

export function getKioskMode(queryParams: UrlQueryMap): KioskMode {
  switch (queryParams.kiosk) {
    case '1':
    case true:
      return KioskMode.Full;
    default:
      return KioskMode.Off;
  }
}

function tryDecodeURIComponent(value: string): string | undefined {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return undefined;
  }
}

export function shouldHide(location: any) {
  let queryParams = {};
  try {
      const { searchParams } = new URL(location.href);
      // @ts-ignore
      for (const [key, value] of searchParams) {
        // @ts-ignore
        queryParams[key] = value !== '' ? tryDecodeURIComponent(value as string) : true;
      }
  } catch(e) {
      console.log('new URL error: ', e);
  }

  const kiosk = getKioskMode(queryParams);

  if (kiosk !== KioskMode.Off) {
      return true;
  }

  return false;
}
