var gamePrefs = {
    PLAYER_SPEED:2,
    PLAYER_ACCELERATION: 50,
    PLAYER_SHIELD: 5,
    BULLET_SPEED:-150,
    ENEMY_BULLET_SPEED: -250,
    ENEMY_SPEED: 50,
    ENEMY_HEALTH: 5
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

