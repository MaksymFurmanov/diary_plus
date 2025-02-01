export const initializeLocalStorage = (key, defaultValue) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
};