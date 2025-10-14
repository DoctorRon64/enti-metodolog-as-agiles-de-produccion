var gamePrefs = {
    PLAYER_SPEED:2,
    PLAYER_ACCELERATION: 50,
    PLAYER_SHIELD: 5,
    BULLET_SPEED:-80,
    ENEMY_BULLET_SPEED: -100,
    ENEMY_SPEED: 25,
    ENEMY_HEALTH: 5,
    BACKGROUND_BACK_SPEED: 0.25,
    BACKGROUND_FRONT_SPEED: 3
}

var config = {
    type:Phaser.AUTO,
    width:128,
    height:256,
    scene:[menuScene, gameScene], 
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

