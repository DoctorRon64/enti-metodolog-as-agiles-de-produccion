class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.cameras.main.setBackgroundColor('#000000ff');
  }

  create() {
    const configWidth = config.width;
    const configHeight = config.height;
    
    const txtStyle = {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2
    };

    const lineGap = 40;
    const option1 = this.add.text(configWidth / 2, configHeight / 2 - lineGap /2, 'Press 1 for BirdScene', txtStyle).setOrigin(0.5);
    const option2 = this.add.text(configWidth / 2, configHeight / 2 + lineGap /2, 'Press 2 for LinkScene', txtStyle).setOrigin(0.5);

    this.tweens.add({
      targets: [option1, option2],
      alpha: { from: 0.5, to: 1 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.keyOne = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ONE
    );
    this.keyTwo = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.TWO
    );
  }


  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyOne)) {
      this.scene.start('Bird');
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyTwo)) {
      this.scene.start('Link');
    }
  }
}