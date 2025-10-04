class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(1, 1);
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);

        this.setOrigin(0.5, 1);
        this.setActive(false);
        this.setVisible(false);
    }

    Initialize(x, y, vx, vy) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.setVelocity(vx, vy);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        const bounds = this.scene.physics.world.bounds;

        if (this.x - this.width / 2 <= bounds.x) {
            this.x = bounds.x + this.width / 2;
            this.body.velocity.x *= -1;
        }

        if (this.x + this.width / 2 >= bounds.width) {
            this.x = bounds.width - this.width / 2;
            this.body.velocity.x *= -1;
        }

        if (this.y - this.height <= bounds.y) {
            this.y = bounds.y + this.height;
            this.body.velocity.y *= -1;
        }

        if (this.y >= bounds.height) {
            this.y = bounds.height;
            this.setActive(false);
            this.setVisible(false);
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.body.enable = false;
        }
    }
}
