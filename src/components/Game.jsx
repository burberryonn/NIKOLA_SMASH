// Game.js
import { useState } from "react";
import './Game.css';

function Game() {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);

  // Функция для добавления новой частицы
  const createParticle = (event) => {
    const randomX = Math.random() * 200 - 100; // Случайное смещение по X от -100 до 100
    const randomY = Math.random() * 200 - 100; // Случайное смещение по Y от -100 до 100

    const newParticle = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY,
      offsetX: randomX,
      offsetY: randomY,
    };

    setParticles((prev) => [...prev, newParticle]);

    // Удаляем частицу через время
    setTimeout(() => {
      setParticles((prev) => prev.filter((particle) => particle.id !== newParticle.id));
    }, 1000); // Частица исчезнет через 1 секунду
  };

  return (
    <>
      <img
        className="nikola"
        style={{ width: "287px", height: "300px", position: 'relative' }}
        src="./img/nikola.png"
        alt=""
        onClick={(e) => {
          setCount((prev) => prev + 1);
          createParticle(e);
        }}
      />
      <p>{count}</p>

      {/* Отображение частиц */}
      {particles.map((particle) => (
        <img
          key={particle.id}
          src="./img/nikola.png"
          alt=""
          className="particle"
          style={{
            top: particle.y,
            left: particle.x,
            "--offsetX": `${particle.offsetX}px`,
            "--offsetY": `${particle.offsetY}px`,
          }}
        />
      ))}
    </>
  );
}

export default Game;