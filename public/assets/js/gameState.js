class gameState extends Phaser.Scene {
    constructor() {
        super({key:"gameState"});
    }
    preload() {
        //preload images
        //this.preload.image('bg', '../assets/img/bg.jpg');
        //this.preload.image('player', '../assets/img/bird.png');
        //\this.preload.spriteSheet('birdAnim', '../assets/img/birdAnim.png');

        //load images
        this.cameras.main.setBackgroundColor("AAA");
        this.load.image('bg', '/resources/img/bg.jpg');
        this.load.spritesheet('player', '/resources/img/birdAnim.png', {frameWidth:17, frameHeight:12} );
    }
    create() {
        this.bg = this.add.tileSprite(0,0, config.width, config.height, 'bg').setOrigin(0);
        //.setScale(5).setFlipX(4);
        this.player = this.add.sprite(config.width/2, config.height/2, 'player').setScale(5);

        this.loadAnimations();
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.player.anims.play('fly');
    }
    loadAnimations() {
        this.anims.create({
            key:'fly',
            frames:this.anims.generateFrameNumbers('player', {start:0,end:2}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
    }
    update() {
        this.bg.tilePositionX += 3;

        if (this.key_right.isDown) {     
            this.keyGetting(1,0);       
        }
        if (this.key_left.isDown) {     
            this.keyGetting(-1,0);       
        }
        if (this.key_up.isDown) {     
            this.keyGetting(0,-1);       
        }
        if (this.key_down.isDown) {     
            this.keyGetting(0,1);       
        }
    }

    keyGetting(x, y) {
        var moveSpeed = 4;
        this.player.x += x * moveSpeed;
        this.player.y += y * moveSpeed;
    }
}