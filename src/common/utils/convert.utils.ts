// 转换
export const sourceToTarget = (source, target) => {
  if (!source) {
    return null;
  }
  if (!target) {
    return source;
  }
  const targetObject = {};
  for (const key in target) {
    targetObject[key] = source[key];
  }
  return targetObject;
};
