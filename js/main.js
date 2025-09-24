var config = {
    type:Phaser.AUTO,
    width:370,
    height:550,
    scene:[MenuScene, BirdScene, LinkScene], 
    render:{
        pixelArt: true
    }
}

var game = new Phaser.Game(config);

