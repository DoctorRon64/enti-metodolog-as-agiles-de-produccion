var config = {
    type:Phaser.AUTO,
    width:370,
    height:680,
    scene:[gameState], 
    render:{
        pixelArt: true
    }
}

var game = new Phaser.Game(config);

