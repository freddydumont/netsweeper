import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';

function App() {
  useEffect(() => {
    createGame();
  }, []);

  return (
    <div id="phaser-game" style={{ position: 'relative' }}>
      <div
        id="menu"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <button style={{ width: 50, height: 50, background: 'red' }}>
          test
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
