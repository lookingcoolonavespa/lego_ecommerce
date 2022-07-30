export const testAlphabet = (min = 1, max?: number) => {
  return (val: string) =>
    val.length > min &&
    val.length < (max || Infinity) &&
    /^[a-zA-Z\s]+$/.test(val);
};

export const testCity = (min = 1, max?: number) => {
  return (val: string) =>
    val.length > min &&
    val.length < (max || Infinity) &&
    /^[a-zA-Z\s.]+$/.test(val);
};

export const testState = (val: string) => {
  return val.length <= 2 && /^[a-zA-Z]+$/.test(val);
};

export const testNumeric = {
  betweenLength:
    (min = 1, max: number) =>
    (val: string) =>
      val.length > min && val.length < max && /^[0-9]+$/.test(val),
  haveLength: (num: number) => (val: string) =>
    val.length === num && /^[0-9]+$/.test(val),
};

export const testMMYY = (val: string) => {
  const validFormat = /\d{2}\/\d{2}/.test(val);
  if (!validFormat) return false;

  const month = val.slice(0, 2);
  if (Number(month) > 12) return false;

  const year = val.slice(-2);
  const currYear = new Date().getFullYear().toString().slice(-2);
  if (Number(year) > Number(currYear)) return false;

  return true;
};
export const testEmail = (val: string) => /\S+@\S+\.\S+/.test(val);
