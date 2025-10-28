class level1 extends Phaser.Scene {
    constructor() {
        super({key:'level1'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("666");
        this.load.setPath('resources/img/sprites');
        this.load.image('bg', 'bg_green_tile.png');

        this.load.image('entry','spr_door_closed_0.png');

        this.load.spritesheet('player','hero.png', {frameWidth:32,frameHeight:32});

        this.load.setPath('resources/img/tilesets');   
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('resources/levels');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create() {
        this.add.tileSprite(0,0, gamePrefs.gameWidht, gamePrefs.gameHeight, 'bg').setOrigin(0);

        this.map = this.add.tilemap('level1');

        this.map.addTilesetImage('tileset_walls');
        this.map.addTilesetImage('tileset_moss');

        this.walls = this.map.createLayer('layer_walls','tileset_walls');
        this.map.createLayer('layer_moss_up','tileset_moss');
        this.map.createLayer('layer_moss_left','tileset_moss');
        this.map.createLayer('layer_moss_right','tileset_moss');
        this.map.createLayer('layer_moss_down','tileset_moss');

        this.map.setCollisionByExclusion(-1,true,true,'layer_walls');
        this.loadAnimations();

        this.entry = this.add.sprite(65,268,'entry');
        this.player = this.physics.add.sprite(65,100,'hero');        

        this.physics.add.collider(this.player,this.walls);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    loadAnimations() {
        this.anims.create({
            key: 'run',
            frames:this.anims.generateFrameNumbers('player', 
            {start:2, end: 5}),
            frameRate: 10,
            repeat: -1
        });    
    }
    
    update() {
        if(this.cursors.left.isDown) { 
            this.player.body.setVelocityX(-gamePrefs.HERO_SPEED);   
            this.player.setFlipX(true); 
            this.player.anims.play('run',true);   
        } else if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(gamePrefs.HERO_SPEED); 
            this.player.setFlipX(false);      
            this.player.anims.play('run',true);
        } else {
            this.player.body.setVelocityX(0);  
            this.player.anims.stop().setFrame(0); 
        }    
    }
}