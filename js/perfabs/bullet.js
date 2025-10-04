class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');  

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);
        this.setActive(false);
        this.setVisible(false);
    }

    shoot(x, y, speed) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(speed);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
            this.setVelocity(0, 0);
        }
    }
}
