const KEY = 'timeFormat';

const is24HTime = () => !!localStorage.getItem(KEY);

export const toggle24HTime = () => {
  const newValue = !is24HTime();
  if (newValue) {
    localStorage.setItem(KEY, 'true');
    const setLanguageChanged = new CustomEvent("toggle24HTimeChanged", {
      "detail": true
    });
    document.dispatchEvent(setLanguageChanged);
  }
  else {
    localStorage.removeItem(KEY);
    const setLanguageChangedOff = new CustomEvent("toggle24HTimeChanged", {
      "detail": false
    });
    document.dispatchEvent(setLanguageChangedOff);
  }
};

export const get24HTime = () => {
  return is24HTime() ; 
};
