export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
