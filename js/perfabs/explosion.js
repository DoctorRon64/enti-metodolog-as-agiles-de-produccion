class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tag = 'explosion') {
        super(scene, x, y, tag);

        scene.add.existing(this);
        this.anims.play('explosion_fire', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> 
        {
            this.setActive(false);
        },scene);
    }

    preUpdate(time, delta) {
        if(this.y<=0)
        {
            this.setActive(false);
        }
        super.preUpdate(time,delta);
    }
}