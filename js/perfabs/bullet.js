class bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, poxX, posY, spriteTag) {
        super(scene, posX, posY, spriteTag='bullet');
        scene.add.existing(this);
    }

    earlyUpdate() {
        if (this.y <= 0) {
            this.setActive(false);
        }
    }
}