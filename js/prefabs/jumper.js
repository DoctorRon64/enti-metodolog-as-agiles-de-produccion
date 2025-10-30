class Jumper extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y , texture='Jumper') {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
        this.Jumper = this;
        this.Jumper.anims.play('run_' + texture, true);
        this.Jumper.direction = 1;
        this.Jumper.body.setVelocityX(gamePrefs.JUMPER_SPEED*this.Jumper.direction);
        this.setColliders();
    }

    setColliders() {
        this.scene.physics.add.collider(
            this.Jumper,
            this.scene.walls
        )
    }

    preUpdate(time, delta) {
        super.preUpdate(time,delta);
        
        if (this.Jumper.body.blocked.left || this.Jumper.body.blocked.right) {
            this.Jumper.direction *= -1;
            this.Jumper.flipX = !this.Jumper.flipX;
            this.Jumper.body.setVelocityX(gamePrefs.JUMPER_SPEED * this.Jumper.direction);
        }
    }
}

