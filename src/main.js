//Cargamos el Intellisense
/// <reference path="./types/phaser.d.ts" />

//Importamos la configuración del motor
import { buildConfig } from './core/config.js';
//Importamos las escenas
import { Level1 } from './scenes/Level1.js';
//import { Level2 } from './scenes/Level2.js';
//import { Hud } from './scenes/Hud.js';

const game = new Phaser.Game
(
    buildConfig({
    // Orden en el que se registran/arrancan
    scenes: [
      // Boot,    // si hay una escena de precarga
      Level1
      // Hud     // si se lanza luego en paralelo (ya lo veremos)
    ],
  })
);

