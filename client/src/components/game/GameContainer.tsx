import * as React from 'react';
import { GameCanvas } from './GameCanvas';
import { GameUI } from './GameUI';

export function GameContainer() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GameCanvas />
      <GameUI />
    </div>
  );
}