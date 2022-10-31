export const secretFromUrl = (url: string) => {
  const m = url.match(/secret=([^&]+)/);

  if (!m || m.length < 2) {
    throw Error("Couldn't read the secret");
  }

  return m[1];
};
