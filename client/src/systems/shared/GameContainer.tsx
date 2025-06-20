import * as React from 'react';
import { Phase0Canvas } from '../phase0/Phase0Canvas';
import { GameUI } from './GameUI';

export function GameContainer() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Phase0Canvas />
      <GameUI />
    </div>
  );
}