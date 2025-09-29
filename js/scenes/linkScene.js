class LinkScene extends Phaser.Scene {
  constructor() {
    super('Link');
  }

  preload() {
    this.cameras.main.setBackgroundColor('#fc02a9');

    this.load.setPath('./resources/img/');
    this.load.image('grass', 'grass.png');

    this.load.spritesheet('link', 'link.png', {
      frameWidth: 120,
      frameHeight: 130
    });
  }

  create() {
    const configWidth = config.width;
    const configHeight = config.height;
    this.grass = this.add.tileSprite(0, 0, configWidth, configHeight, 'grass').setOrigin(0);
    this.player = this.add.sprite(configWidth / 2, configHeight / 2, 'link').setScale(.5);

    this.loadAnims();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  }

  loadAnims() {
    this.createWalkAnim('walk-down', 0, 9);
    this.createWalkAnim('walk-left', 10, 19);
    this.createWalkAnim('walk-up', 20, 29);
    this.createWalkAnim('walk-right', 30, 39);
  }

  createWalkAnim(name, startFrame, endFrame) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers('link', {
        start: startFrame,
        end: endFrame
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    const speed = 4;
    if (this.cursors.right.isDown) {
      this.movePlayer(speed, 0);
      this.player.anims.play('walk-right', true);
    }
    else if (this.cursors.left.isDown) {
      this.movePlayer(-speed, 0);
      this.player.anims.play('walk-left', true);
    }
    else if (this.cursors.up.isDown) {
      this.movePlayer(0, -speed);
      this.player.anims.play('walk-up', true);
    }
    else if (this.cursors.down.isDown) {
      this.movePlayer(0, speed);
      this.player.anims.play('walk-down', true);
    } else {
      this.player.anims.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyOne)) {
      this.scene.start('Bird');
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyTwo)) {
      this.scene.start('Link');
    }
  }

  movePlayer(dx, dy) {
    this.player.x += dx;
    this.player.y += dy;
  }
}