var gamePrefs = {
    PLAYER_SPEED:2,
    PLAYER_ACCELERATION: 50,
    PLAYER_SHIELD: 5,
    PLAYER_AUTOFIRERATE:50,
    BULLET_SPEED:-80,
    ENEMY_BULLET_SPEED: -100,
    ENEMY_SPEED: 25,
    ENEMY_HEALTH: 5,
    ENEMY_FIRERATE_MIN: 1.5,
    ENEMY_FIRERATE_MAX: 2,
    ENEMY_SPAWNRATE_MIN:1,
    ENEMY_SPAWNRATE_MAX:1.5,
    BACKGROUND_BACK_SPEED: 0.25,
    BACKGROUND_FRONT_SPEED: 3,
    POWER_UP_DROP_CHANGE:100,
    POWER_UP_TYPE_CHANGE:50,

    setData(key, value) {
        window.localStorage.setItem(key, Number(value));
    },

    getData(key, def = 0) {
        const raw = window.localStorage.getItem(key);
        const num = Number(raw);
        return isNaN(num) ? def : num;
    },

    deleteData(key) {
        window.localStorage.removeItem(key);
    }
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
            debug:true  
        }
    },
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }
}

var game = new Phaser.Game(config);

