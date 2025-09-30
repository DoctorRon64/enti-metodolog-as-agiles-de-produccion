class gameState extends Phaser.Scene {
    constructor() {
        super({key:"gameState"});
    }
    preload() {
        //load images
        this.cameras.main.setBackgroundColor("#010215ff");

        this.load.setPath('/resources/img');
        this.load.image('bgback', 'background_back.png');
        this.load.image('bgfront', 'background_frontal.png');
        this.load.image('bullet', 'spr_bullet_0.png');
        
        this.load.spritesheet('player', 'spr_player.png', {frameWidth:16, frameHeight:24} );
    }
    create() {
        this.bgback = this.add.tileSprite(0,0, config.width, config.height, 'bgback').setOrigin(0);
        this.bgfront = this.add.tileSprite(0,0, config.width, config.height, 'bgfront').setOrigin(0);
        this.player = this.physics.add.sprite(config.width/2, config.height/2, 'player').setScale(1);
        this.player.body.setCollideWorldBounds(true);

        this.loadAnimations();
        this.player.anims.play('idle');

        this.loadPools();

        this.cursores = this.input.keyboard.createCursorKeys();
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursores.space.on(
            'up',
            function() {
                this.createBullet();
            },
            this
        );
    }

    loadAnimations() {
        this.anims.create({
            key:'idle',
            frames:this.anims.generateFrameNumbers('player', {start:4,end:5}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
        this.anims.create({
            key:'fly_right',
            frames:this.anims.generateFrameNumbers('player', {start:2,end:3}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
        this.anims.create({
            key:'fly_left',
            frames:this.anims.generateFrameNumbers('player', {start:0,end:1}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
    }

    loadPools() {
        this.bulletPool = this.physics.add.group();
    }

    createBullet() {
        var bullet = this.bulletPool.getFirst(false); //tiene force
        if (!bullet) {
            console.log('create bullet');
            Bullet bullet = 
            bullet = this.add.image(this.player.x, this.player.body.top, 'bullet');
            bullet.setOrigin(.5,1);
            this.bulletPool.add(bullet);
        } else {
            console.log('reciclo bullet');
            bullet.setActive(true);
            bullet.body.reset(this.player.x, this.player.body.top);
        }
        bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
    }

    update() {
        this.bgback.tilePositionY -= .25;
        this.bgfront.tilePositionY -= 3;
        var speed = gamePrefs.PLAYER_SPEED;

        if (this.key_right.isDown) {     
            this.setDir(speed,0);  
            this.player.anims.play('fly_right', true);  
        }
        else if (this.key_left.isDown) {     
            this.setDir(-speed,0);   
            this.player.anims.play('fly_left', true);    
        }
        else if (this.key_up.isDown) {     
            this.setDir(0,-speed);    
            this.player.anims.play('idle', true);   
        }
        else if (this.key_down.isDown) {     
            this.setDir(0,speed);   
            this.player.anims.play('idle', true);    
        } else {
            this.player.anims.play('idle', true);
        }
    }

    setDir(x, y) {
        this.player.body.velocity.x += x;
        this.player.body.velocity.y += y;
    }
}