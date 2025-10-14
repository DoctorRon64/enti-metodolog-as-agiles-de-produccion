var gamePrefs = {
    gameWidth:960,
    gameHeight:540,
    levelWidth:1280,
    levelHeight:800,
    GRAVITY:1000
}

var config = {
    type:Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[level1], 
    render:{
        pixelArt: true
    },
    physics:{
        default:'arcade',
        arcade: {
            gravity:{y:gamePrefs.GRAVITY},
            debug:false
        }
    }
}

var game = new Phaser.Game(config);

