class BirdScene extends Phaser.Scene {
    constructor() {
        super('Bird');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#fc02a9');

        this.load.setPath('./resources/img/');
        this.load.image('bg_bird', 'bg_bird.jpg');
        this.load.spritesheet('furiousflapper', 'birdAnim.png', {
            frameWidth: 17,
            frameHeight: 12
        });
    }

    create() {
        const configWidth = config.width;
        const configHeight = config.height;
        this.bg = this.add.tileSprite(0, 0, configWidth, configHeight, 'bg_bird').setOrigin(0);
        this.player = this.add.sprite(configWidth / 2, configHeight / 2, 'furiousflapper').setScale(3);

        this.loadAnims();
        this.player.play('flap');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyOne = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ONE
        );
        this.keyTwo = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.TWO
        );
    }

    loadAnims() {
        this.anims.create({
            key: 'flap',
            frames: this.anims.generateFrameNumbers('furiousflapper', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        const bgScrollSpeed = 2;
        this.bg.tilePositionX += bgScrollSpeed;

        if (this.cursors.right.isDown) {
            this.movePlayer(1, 0);
        } else if (this.cursors.left.isDown) {
            this.movePlayer(-1, 0);
        }

        if (this.cursors.up.isDown) {
            this.movePlayer(0, -1);
        } else if (this.cursors.down.isDown) {
            this.movePlayer(0, 1);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyOne)) {
            this.scene.start('Bird');
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyTwo)) {
            this.scene.start('Link');
        }
    }

    movePlayer(dx, dy) {
        const speed = 4;
        this.player.x += dx * speed;
        this.player.y += dy * speed;
    }
}