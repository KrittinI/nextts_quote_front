const ACCESS_TOKEN = "ACCESS_TOKEN";

export const setAccessToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN, token);
};
export const getAccessToken = (): string | null =>
    localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
