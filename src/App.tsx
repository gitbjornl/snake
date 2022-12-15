import {
  useEffect,
  useState,
} from 'react';

import { Dot } from './components';

import './App.css'

function App() {
  const [snake, setSnake] = useState({
    dots: [
      {
        top: 0,
        left: 0,
      },
    ],
    direction: 'right',
  });

  const moveSnake = (e: KeyboardEvent) => {
    setSnake(prevState => {
      let direction = prevState.direction;

      switch (e.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        default:
          break;
      };

      return ({
        ...prevState,
        direction,
      })
    });
  };

  const moveSnakeAuto = () => {
    setSnake(prevState => {
      let left = 0;
      let top = 0;

      switch (prevState.direction) {
        case 'right':
          left = 1;
          break;
        case 'left':
          left = -1;
          break;
        case 'up':
          top = -1;
          break;
        case 'down':
          top = 1;
          break;
        default:
          break;
      }

      return {
        ...prevState,
        dots: prevState.dots.map((snake) => ({
          top: snake.top + top,
          left: snake.left + left,
        })),
      };
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => moveSnake(e));
  
    return () => {
      window.removeEventListener('keydown', moveSnake);
      setInterval(moveSnakeAuto, 1000);
    };
  }, []);

  return (
    <div className="game">
      {snake.dots.map((snake, i) => (
        <div
          className="game__dot"
          key={`snake-dot-${i}`}
          style={{
            top: snake.top * 10,
            left: snake.left * 10,
          }}
        >
          <Dot />
        </div>
      ))}
    </div>
  )
}

export default App
