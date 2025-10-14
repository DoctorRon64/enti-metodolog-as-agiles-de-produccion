class level1 extends Phaser.Scene {
    constructor() {
        super({key:'level1'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("666");

        this.preload.setPath('resources/img/sprites');
        this.load.image('bg', 'bg_green_tile.png');
    }

    create() {
        this.add.tileSprite(0,0, gamePrefs.gameWidht, gamePrefs.gameHeight, 'bg').setOrigin(0);
    }
    
    update() {

    }
}