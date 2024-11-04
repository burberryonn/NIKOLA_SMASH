import { useState, useEffect } from "react";
import "./App.css";
import CryptoJS from "crypto-js"; // Импортируем библиотеку
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState(null);
  const [onGame, setOnGame] = useState(false);
  const navigate = useNavigate();
  const play = () => {
    setOnGame(!onGame);
    navigate("/game");
  };
  useEffect(() => {
    if (window.Telegram) {
      const data_check_string = window.Telegram.WebApp.initData;

      const secret_key = "7389532998:AAGby3TxdbBs1saGQ9kLJd_bwaFzTyOv0Us"; // Ваш секретный ключ
      const hash = CryptoJS.HmacSHA256(data_check_string, secret_key).toString(
        CryptoJS.enc.Hex
      );

      const computedHmac = CryptoJS.HmacSHA256(data_check_string, secret_key);
      const hexHmac = computedHmac.toString(CryptoJS.enc.Hex); // Преобразуем в строку в шестнадцатеричном формате

      if (hexHmac === hash) {
        console.log("HMAC проверен успешно. Получаем данные пользователя.");
        window.Telegram.WebApp.ready();

        const user = window.Telegram.WebApp.initDataUnsafe.user; // Получение данных пользователя из Telegram
        console.log("User data:", user); // Логируем данные пользователя

        if (user) {
          setUserData(user);
        } else {
          console.error("Данные о пользователе недоступны.");
        }
      }
    }
  }, []);

  return (
    <div className="App">
      {onGame ? (
        <>
          <Outlet></Outlet>
          <button onClick={() => play()}>назад</button>
        </>
      ) : (
        <>
          <h1>NIKOLA SMASH</h1>
          {userData ? (
            <div>
              <p>
                Привет, {userData?.first_name} {userData?.last_name}!
              </p>
              <p>Ваш username: @{userData.username}</p>
            </div>
          ) : (
            <p>Не удалось получить данные пользователя</p>
          )}

          <button onClick={() => play()}>начать</button>
        </>
      )}
    </div>
  );
}

export default App;
