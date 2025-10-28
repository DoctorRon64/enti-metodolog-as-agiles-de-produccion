class PowerUp extends Phaser.GameObjects.Sprite {
        constructor (scene, x, y) {
        super(scene, x, y, 'power_up');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);
        this.setActive(false);
        this.setVisible(false);

        this.powerType = null;
    }

    init (x, y, isAutoFire) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;

        if (isAutoFire) {
            this.setTexture('power_up');
            this.anims.play('power_up_idle');
            this.powerType = 1;  
        } else {
            this.setTexture('power_up_2');
            this.anims.play('power_up_2_idle');
            this.powerType = 2;
        }
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
            this.body.setVelocity(0, 0);
            this.body.enable = false;
        }
    }
}
