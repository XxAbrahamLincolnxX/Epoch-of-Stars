import * as React from 'react';
import { GameContainer } from '@/components/game/GameContainer';
import { GameProvider } from '@/components/game/GameProvider';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
}

export default App;