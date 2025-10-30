const gamePrefs = {
    gameWidth:960,
    gameHeight:540,
    level1Width:1280, //40*32
    level1Height:800, //25*32
    GRAVITY:1000,
    PLAYER_SPEED:200,
    PLAYER_JUMP:-450,
    JUMPER_SPEED:100
}

var config = {
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[level1], //array con las escenas
    render:
    {
        pixelArt:true
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.GRAVITY},
            debug:true
        }
    },    
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gamePrefs.gameWidth/2,
        height: gamePrefs.gameHeight/2
    }
}

var juego = new Phaser.Game(config);