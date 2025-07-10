const useTelegram = () => {
  const tg = (window as any).Telegram?.WebApp;

  const close = () => {
    tg?.close();
  };

  const expand = () => {
    tg?.expand();
  };

  const sendData = (data: any) => {
    tg?.sendData?.(JSON.stringify(data));
  };

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    close,
    expand,
    sendData,
    isReady: Boolean(tg),
  };
};

export default useTelegram;