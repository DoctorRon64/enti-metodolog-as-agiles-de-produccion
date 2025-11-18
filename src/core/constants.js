/**
* Constantes globales del juego.
* No dependen de Phaser ni de instancias específicas.
* Son valores inmutables que describen el "mundo" del juego.
*/

export const GAME_SIZE = 
{
    WIDTH: 960,
    HEIGHT: 540
};

export const LEVEL_SIZE = 
{
    LEVEL1_WIDTH: 1280,  // 40 * 32
    LEVEL1_HEIGHT: 800   // 25 * 32
};

export const PHYSICS = 
{
    TYPE:'arcade',
    GRAVITY: 1000,
    DEBUG: true
};

export const HERO = 
{
    SPEED: 200,
    JUMP_FORCE: -450,
    MAX_LIVES: 7
};

export const ENEMY = 
{
    SPEED: 150,
    // Si luego cada tipo de enemigo necesita su propia constante:
    // JUMPER_SPEED: 150,
    // SLIME_SPEED: 120
};

export const RENDER = 
{
    PIXEL_ART: true
};

export const SCALE = 
{
    MODE: 'FIT',                // Phaser.Scale.FIT
    AUTO_CENTER: 'CENTER_BOTH', // Phaser.Scale.CENTER_BOTH
    ZOOM: 2                     //Para pixelart: escala lógica x2 sin deformar
}