var gamePrefs = {
    PLAYER_SPEED:2,
    BULLET_SPEED:-100
}

var config = {
    type:Phaser.AUTO,
    width:128,
    height:256,
    scene:[gameState], 
    render:{
        pixelArt: true
    },
    physics:{
        default:'arcade',
        arcade: {
            gravity:{y:0},
            debug:false
        }
    },
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }
}

var game = new Phaser.Game(config);

