class level1 extends Phaser.Scene
{
    constructor() {
        super({key:'level1'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("666");
        this.load.setPath('resources/img/sprites');
        this.load.image('bg','bg_green_tile.png');
        this.load.image('door','spr_door_closed_0.png');
        this.load.spritesheet('Jumper', 'jumper.png', {frameWidth:32,frameHeight:32});
        this.load.spritesheet('player','hero.png', {frameWidth:32,frameHeight:32});

        this.load.setPath('resources/img/tilesets');   
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('resources/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create() {
        this.add.tileSprite(0,0,gamePrefs.level1Width,gamePrefs.level1Height,'bg').setOrigin(0);
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
        
        this.door = this.add.sprite(65,268,'door');
        this.player = this.physics.add.sprite(65,100,'player');        
        this.Jumper = new Jumper(this,200,300);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,gamePrefs.level1Width, gamePrefs.level1Height);
        this.physics.add.collider(this.player, this.walls);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    loadAnimations() {
        this.anims.create({
            key: 'run',
            frames:this.anims.generateFrameNumbers('player', {start:2, end: 5}),
            frameRate: 10,
            repeat: -1
        });  
        this.anims.create({
            key: 'run_Jumper',
            frames:this.anims.generateFrameNumbers('Jumper', {start:0, end: 3}),
            frameRate: 10,
            repeat: -1,
            yoyo:true
        });   
    }

    update(){
        if(this.cursors.left.isDown)        {
            this.player.body.setVelocityX(-gamePrefs.PLAYER_SPEED);   
            this.player.setFlipX(true); 
            this.player.anims.play('run',true);   
        }else if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(gamePrefs.PLAYER_SPEED); 
            this.player.setFlipX(false);      
            this.player.anims.play('run',true);
        }else {
            this.player.body.setVelocityX(0);  
            this.player.anims.stop().setFrame(0); 
        }

        if (this.cursors.space.isDown && this.player.body.onFloor() && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250)) {
            this.player.body.setVelocityY(gamePrefs.PLAYER_JUMP);
        }

        if (!this.player.body.onFloor()) {
            this.player.anims.stop().setFrame(6);
        }
    }
} 