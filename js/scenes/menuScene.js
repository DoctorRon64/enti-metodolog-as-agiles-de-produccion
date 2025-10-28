class menuScene extends Phaser.Scene { 
    constructor() {
        super({key:"menuScene"});
    }
    preload() { 
        this.load.setPath('/resources/img');
        this.load.image('bgback', 'background_back.png');
        this.load.image('bgfront', 'background_frontal.png');
        this.load.image('btn', 'btn.png');

        this.load.spritesheet('player', 'spr_player.png', {frameWidth:16, frameHeight:24} );
    }    
    create() {
        this.bgback = this.add.tileSprite(0,0, config.width, config.height, 'bgback').setOrigin(0);
        this.bgfront = this.add.tileSprite(0,0, config.width, config.height, 'bgfront').setOrigin(0);
        this.player = this.physics.add.sprite(config.width/2, config.height/2, 'player').setScale(1);

        this.loadAnims();
        this.player.anims.play('idle');

        this.title = this.add.text (
            config.width/2,
            config.height/2-75,
            "Shooter in 2D",
            {
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontSize: '20px',
                color: "#ffffffff",
                stroke: "#0037ffff",
                strokeThickness: 4,
            }
        ).setOrigin(.5);


        this.highScore = gamePrefs.getData('HighScore', 0);
        this.highScore = this.add.text (
            config.width/2,
            config.height/2-50,
            `HighScore ${this.highScore}`,
            {
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                color: "#ffffffff",
                fontSize: '14px',
            }
        ).setOrigin(.5);

        this.score = gamePrefs.getData('Score', 0);
        this.score = this.add.text (
            config.width/2,
            config.height/2-35,
            `Last Score ${this.score}`,
            {
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                color: "#ffffffff",
                fontSize: '14px',
            }
        ).setOrigin(.5);

        this.button = this.add.image(config.width/2, config.height/2+75, 'btn')
        .setScale(.25).setInteractive({ useHandCursor:true }).on(
            'pointerdown', () => this.onClick()
        )
    }

    onClick() {
        this.button.destroy();
        this.add.tween ({
            targets: this.title,
            duration: 2 * 1000,
            alpha: 0
        })

        this.add.tween ({
            targets: this.score,
            duration: 2 * 1000,
            alpha: 0
        })

        this.add.tween ({
            targets: this.highScore,
            duration: 2 * 1000,
            alpha: 0
        })

        this.add.tween ({
            targets: this.player,
            duration: 1 * 1000,
            y:config.height * 0.95,
            onComplete:this.cambiaScene,
            callbackScope:this
        })


    }

    cambiaScene() {
        this.scene.start('gameScene');
    }

    loadAnims() {
        this.anims.create({
            key:'idle',
            frames:this.anims.generateFrameNumbers('player', {start:4,end:5}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
    }

    update() {
        this.bgback.tilePositionY -= gamePrefs.BACKGROUND_BACK_SPEED;
        this.bgfront.tilePositionY -= gamePrefs.BACKGROUND_FRONT_SPEED;
    }
}