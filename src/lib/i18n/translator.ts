import { Dict } from "./getDictionnary";



function getFromDictionnary(keys: Array<string>, dict: Dict|string):Dict|string {

  if (typeof dict == "string") {
    return dict;
  }

  if (keys.length === 0) {
    return '';
  }

  if (!dict) {
    return '';
  }

  const key = keys.shift() || '';

  return getFromDictionnary(keys, dict[key]);
}



export const _t = (key: string, dict: Dict): string => {

  if (!key) { return ''; }

  const keys = key.split(".");

  // console.warn('Split keys is now ', keys);

  const ret = getFromDictionnary(keys, dict);

  if (!ret) {
    return key;
  }

  if (typeof ret !== 'string') {
    console.error('getFromDict returned a ' + (typeof ret ))
    return key;
  }

  return ret;
}