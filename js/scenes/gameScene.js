class gameScene extends Phaser.Scene {
    constructor() {
        super({key:"gameScene"});
    }
    preload() {
        this.cameras.main.setBackgroundColor("#010215ff");

        this.load.setPath('/resources/img');
        this.load.image('bgback', 'background_back.png');
        this.load.image('bgfront', 'background_frontal.png');
        this.load.image('bullet', 'spr_bullet_0.png');
        this.load.image('enemyBullet', 'spr_enemy_bullet_0.png');

        this.load.spritesheet('player', 'spr_player.png', {frameWidth:16, frameHeight:24} );
        this.load.spritesheet('enemy', 'enemy-medium.png', {frameWidth:32, frameHeight:16});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth:16 , frameHeight:16});
        this.load.spritesheet('shield', 'spr_armor.png', {frameWidth:66, frameHeight:28});
    }

    create() {
        this.physics.world.setBounds(0, 0, config.width, config.height);

        this.bgback = this.add.tileSprite(0,0, config.width, config.height, 'bgback').setOrigin(0);
        this.bgfront = this.add.tileSprite(0,0, config.width, config.height, 'bgfront').setOrigin(0);
        this.player = this.physics.add.sprite(config.width/2, config.height, 'player').setScale(1);
        this.player.body.setCollideWorldBounds(true);

        this.loadAnimations();
        this.player.anims.play('idle');

        this.loadPools();
        this.loadInput();

        this.spawnEnemy();
        this.loadCollision();

        this.shield = this.add.sprite(0, 0, 'shield').setOrigin(0, 0).setScrollFactor(0).setScale(1).setDepth(100);
        this.shieldHits = 0;
    }

    loadInput() {
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

    loadCollision() {
        this.physics.add.overlap(
            this.bulletPool,
            this.enemyPool,
            this.KillEnemy,
            null,
            this
        );

        this.physics.add.overlap(
            this.enemyBulletPool,
            this.player,
            this.DamagePlayer,
            null,
            this
        );

        this.physics.add.overlap(
            this.enemyPool,
            this.player,
            this.CrashPlayer,
            null,
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
        this.anims.create({
            key:'enemy_idle',
            frames:this.anims.generateFrameNumbers('enemy', {start:0,end:1}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
        this.anims.create({
            key: 'explosion_fire',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true
        })
        this.anims.create({
            key: 'shield_change',
            frames: this.anims.generateFrameNumbers('shield', {start:0, end:4}),
            frameRate: 10,
            repeat: 0,
            showOnStart: true,
        })
    }

    loadPools() {
        this.bulletPool = this.physics.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        })
        this.explosionPool = this.add.group();
    }

    createBullet() {
        var bullet = this.bulletPool.getFirst(false);
        if (!bullet) {
            bullet = this.physics.add.sprite(this.player.x, this.player.body.top, 'bullet');
            bullet.setOrigin(.5,1);
            this.bulletPool.add(bullet);
        } else {
            bullet.setActive(true);
            bullet.body.reset(this.player.x, this.player.body.top);
        }
        bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
    }

    createEnemyBullet(posX, posY) {
        let eBullet = this.enemyBulletPool.getFirst(false);
        if (!eBullet) {
            eBullet = this.physics.add.sprite(posX, posY, 'enemyBullet');
            eBullet.setOrigin(0.5, 0.5);
            eBullet.angle = 180;
            eBullet.hasHit = false;
            this.enemyBulletPool.add(eBullet);
        }
        eBullet.setActive(true);
        eBullet.setVisible(true);
        eBullet.body.enable = true;
        eBullet.body.reset(posX, posY);
        eBullet.body.setVelocityY(-gamePrefs.ENEMY_BULLET_SPEED);
        eBullet.hasHit = false;
    }

    spawnEnemy() {
        const width = config.width;
        const height = config.height;
        const enemy = this.enemyPool.get();
        if (enemy) {
            const x = Phaser.Math.Between(0, width);
            const y = 0 + enemy.height;
            const vx = Phaser.Math.FloatBetween(-gamePrefs.ENEMY_SPEED, gamePrefs.ENEMY_SPEED);
            const vy = Phaser.Math.FloatBetween(gamePrefs.ENEMY_SPEED, gamePrefs.ENEMY_SPEED * 3);
            enemy.Initialize(x, y, vx, vy);
        }

        this.time.addEvent({
            delay: Phaser.Math.FloatBetween(0.8, 1.5) * 1000,
            callback: () => {
                if (enemy.active) {
                    this.createEnemyBullet(enemy.x, enemy.y);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: Phaser.Math.Between(0.5, 1.5) * 1000,
            callback: this.spawnEnemy,
            callbackScope: this
        });
    }

    createExplosion(source) {
        var explosion = this.explosionPool.getFirst(false);

        if (!explosion) {
            explosion = new Explosion(this, source.x, source.y, 'explosion');
            this.explosionPool.add(explosion);
        } else {
           explosion.active = true;
           explosion.setActive(true);
           explosion.setVisible(true);
           explosion.x= source.x;
           explosion.y= source.y;
           explosion.anims.play('explosion_fire');
        }
    }

    KillEnemy(bullet, enemy) {
        this.createExplosion(bullet);
        bullet.setActive(false);
        bullet.body.reset(-100,-100);

        if (enemy.health > 0) {
            enemy.health --;
        } else {
            enemy.setActive(false);
            enemy.die();
        }
    }

    DamagePlayer(player, enemyBullet) {
        if (enemyBullet.hasHit) return;
        enemyBullet.hasHit = true;

        this.createExplosion(enemyBullet);
        enemyBullet.setActive(false);
        enemyBullet.body.enable = false;
        enemyBullet.body.reset(-100, -100);

        this.shieldHits++;
        let frameIndex = Phaser.Math.Clamp(this.shieldHits, 0, gamePrefs.PLAYER_SHIELD - 1);
        this.shield.setFrame(frameIndex);

        this.tweens.add({
            targets: player,
            alpha: 0.3,
            duration: 100,
            yoyo: true,
            repeat: 1
        });

        player.alpha = 1;

        if (this.shieldHits >= gamePrefs.PLAYER_SHIELD) {
            this.RestartLevel();
        }

        this.time.delayedCall(1500, () => {
            enemyBullet.hasHit = false;
            enemyBullet.body.enable = true;
        });
    }

    CrashPlayer(player) {
        this.createExplosion(player);
        this.RestartLevel();
    }

    RestartLevel() {
        this.scene.restart();
    }

    update() {
        this.bgback.tilePositionY -= gamePrefs.BACKGROUND_BACK_SPEED;
        this.bgfront.tilePositionY -= gamePrefs.BACKGROUND_FRONT_SPEED;
        const speed = gamePrefs.PLAYER_SPEED;

        if (this.key_right.isDown) {     
            this.setDir(speed, 0);  
            this.player.anims.play('fly_right', true);  
        } else if (this.key_left.isDown) {     
            this.setDir(-speed, 0);   
            this.player.anims.play('fly_left', true);    
        } else if (this.key_up.isDown) {     
            this.setDir(0, -speed);    
            this.player.anims.play('idle', true);   
        } else if (this.key_down.isDown) {     
            this.setDir(0, speed);   
            this.player.anims.play('idle', true);    
        } else {
            this.player.setVelocity(0, 0);
            this.player.anims.play('idle', true);
        }
    }

    setDir(x, y) {
        this.player.setVelocity(x * gamePrefs.PLAYER_ACCELERATION, y * gamePrefs.PLAYER_ACCELERATION);
    }
}