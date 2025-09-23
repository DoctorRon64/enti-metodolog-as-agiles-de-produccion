class gameState extends Phaser.Scene {
    constructor() {
        super({key:"gameState"});
    }
    preload() {
        //load images
        this.cameras.main.setBackgroundColor("fc02a9");

        this.load.setPath('/resources/img');
        this.load.image('bgback', 'background_back.png');
        this.load.image('bgfront', 'background_frontal.png');
        
        this.load.spritesheet('player', 'spr_player.png', {frameWidth:17, frameHeight:12} );
    }
    create() {
        this.bgback = this.add.tileSprite(0,0, config.width, config.height, 'bgback').setOrigin(0);
        this.bgfront = this.add.tileSprite(0,0, config.width, config.height, 'bgfront').setOrigin(0);
        this.player = this.add.sprite(config.width/2, config.height/2, 'player').setScale(2);

        this.loadAnimations();
        this.cursores = this.input.keyboard.createCursorKeys();

        // this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // this.player.anims.play('fly');
    }
    loadAnimations() {
        // this.anims.create({
        //     key:'fly',
        //     frames:this.anims.generateFrameNumbers('player', {start:0,end:2}),
        //     frameRate:10,
        //     repeat:-1,
        //     yoyo:true
        // })
    }
    update() {

        this.bgback.tilePositionY -= 3;
        this.bgfront.tilePositionY -= .24;

        // if (this.key_right.isDown) {     
        //     this.keyGetting(1,0);       
        // }
        // if (this.key_left.isDown) {     
        //     this.keyGetting(-1,0);       
        // }
        // if (this.key_up.isDown) {     
        //     this.keyGetting(0,-1);       
        // }
        // if (this.key_down.isDown) {     
        //     this.keyGetting(0,1);       
        // }
    }

    keyGetting(x, y) {
        var moveSpeed = 4;
        this.player.x += x * moveSpeed;
        this.player.y += y * moveSpeed;
    }
}