export const loginCheck = () => {
  try {
    const decodeInfo = '1';
    if (decodeInfo) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
