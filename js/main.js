var config = {
    type:Phaser.AUTO,
    width:128,
    height:256,
    scene:[gameState], 
    render:{
        pixelArt: true
    }
}

var game = new Phaser.Game(config);

