import { useState } from "react";
import "./Game.css";

function Game() {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [level, setLevel] = useState("");

  const click = () => {
    switch (count) {
      case 10:
        setLevel("./img/nikola1.jpeg");
        break;
      case 20:
        setLevel("./img/nikola2.jpeg");
        break;
      case 30:
        setLevel("./img/nikola3.jpeg");
        break;
      default:
        break;
    }
  };

  // Функция для создания частицы, которая вылетает из головки пистолета к месту клика
  const createParticle = (event) => {
    const gun = document.querySelector(".gun");
    const gunRect = gun.getBoundingClientRect();

    // Вычисляем начальные координаты вылета из головки
    const startX = gunRect.left + gunRect.width * 0.8; // X-координата головки
    const startY = gunRect.top + gunRect.height * 0.2; // Y-координата головки

    const newParticle = {
      id: Date.now(),
      startX,
      startY,
      targetX: event.clientX - startX,
      targetY: event.clientY - startY,
    };

    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((particle) => particle.id !== newParticle.id)
      );
    }, 5000); // Частица исчезнет через 1 секунду
  };

  return (
    <>
      <img
        className="nikola"
        style={{ width: "287px", height: "300px", position: "relative" }}
        src={count <= 10 ? "./img/nikola.png" : level}
        alt=""
        onClick={(e) => {
          click();
          setCount((prev) => ++prev);
          createParticle(e);
        }}
      />
      <h1>{count}</h1>

      <img className="gun" src={"./img/penis.png"} alt="" />
        <button onClick={() => setCount(0)}>сбросить счет</button>
      {particles.map((particle) => (
        <img
          key={particle.id}
          src={"./img/sperm.png"}
          alt=""
          className="particle"
          style={{
            position: "absolute",
            left: `${particle.startX -40}px`,
            top: `${particle.startY -40}px`,
            "--targetX": `${particle.targetX}px`,
            "--targetY": `${particle.targetY}px`,
          }}
        />
      ))}
    </>
  );
}

export default Game;