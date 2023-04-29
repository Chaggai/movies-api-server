export type DupError = {
  message: string;
  code: number;
  keyValue: object;
};

export const createDuplicateKeyError = (err: DupError) => {
  const key = Object.keys(err.keyValue);
  const val = Object.values(err.keyValue);
  return `${key} ${val} is already in use`;
};
