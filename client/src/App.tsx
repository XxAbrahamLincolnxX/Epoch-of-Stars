import * as React from 'react';
import { GameContainer } from "@/systems/shared/GameContainer";
import { GameProvider } from "@/systems/shared/GameStateProvider"; // or GameStateProvider if renamed


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