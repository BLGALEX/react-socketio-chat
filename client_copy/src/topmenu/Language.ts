const KEY = 'language';

export const setLanguage = (l:string) => {
    localStorage.setItem(KEY, l);
    const setLanguageChanged = new CustomEvent("setLanguageChanged", {
      "detail": l
    });
    document.dispatchEvent(setLanguageChanged);
};

export const getLanguage = () => {
  const l = localStorage.getItem(KEY); 
  return ( l ? l : "ENG" );
};
