const KEY = 'sendOnEnter';

const isSendOnEnter = () => !!localStorage.getItem(KEY);

export const toggleSendOnEnter = () => {
  const newValue = !isSendOnEnter();
  if (newValue) {
    localStorage.setItem(KEY, 'true');
  }
  else {
    localStorage.removeItem(KEY);
  }
};

export const getSendOnEnter = () => {
  return isSendOnEnter() ; 
};
