export const initLocalStorage = (key: string, value: any) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};