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
        this.load.image('score', 'spr_score_0.png');

        this.load.spritesheet('power_up', 'spr_power_up.png', { frameWidth:16,frameHeight:16});
        this.load.spritesheet('power_up_2', 'spr_power_up_2.png', { frameWidth:16,frameHeight:16});

        this.load.spritesheet('player', 'spr_player.png', {frameWidth:16, frameHeight:24} );
        this.load.spritesheet('enemy', 'enemy-medium.png', {frameWidth:32, frameHeight:16});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth:16 , frameHeight:16});
        this.load.spritesheet('shield', 'spr_armor.png', {frameWidth:66, frameHeight:28});

        this.load.setPath('/resources/audio');
        this.load.audio('explosion_sfx', [ 'explosion.wav' ]);
        this.load.audio('enemy_laser_sfx', [ 'snd_enemy_laser.wav' ]);
        this.load.audio('explode_sfx', [ 'snd_explode.wav' ]);
        this.load.audio('hit_sfx', [ 'snd_hit.wav' ]);
        this.load.audio('laser_sfx', [ 'snd_laser.mp3' ]);
        this.load.audio('powerup_sfx', [ 'snd_powerup.wav' ]);
        this.load.audio('ship_hit_sfx', [ 'snd_ship_hit.wav' ]);
        this.load.audio('shoot_sfx', [ 'snd_shoot.mp3' ]);
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
        this.loadCollision();
        this.loadSFX();

        this.spawnEnemy();
        
        this.shieldHits = 0;
        this.autofire = false;
        this.fireRate = gamePrefs.PLAYER_AUTOFIRERATE;
        this._lastFire = 0;
        
        this.currentScore = 0;
        gamePrefs.deleteData('Score');
        
        this.loadUI();
        this.updateScoreUI();
    }

    loadInput() {
        this.cursores = this.input.keyboard.createCursorKeys();
        this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursores.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.cursores.space.on('up', () => {
            if (!this.autofire) {
                this.createBullet();
            }
        });
    }

    loadSFX() {
        this.laserSfx = this.sound.add('laser_sfx', { volume: 0.5, loop: false, rate: 1});
        this.enemyLaserSfx = this.sound.add('enemy_laser_sfx', { volume: 0.4, loop: false });
        this.explosionSfx = this.sound.add('explosion_sfx', {  volume: 0.7, loop: false });
        this.powerupSfx = this.sound.add('powerup_sfx', { volume: 0.6,  loop: false });
        this.hitSfx   = this.sound.add('hit_sfx',   { volume: 0.5, loop: false });
        this.shipHitSfx = this.sound.add('ship_hit_sfx', { volume: 0.5, loop: false });
        this.shootSfx = this.sound.add('shoot_sfx', { volume: 0.5, loop: false });
    }

    updateScoreUI() {
        gamePrefs.getData('Score', this.currentScore);
        this.scoreText.setText(this.currentScore.toString());
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

        this.physics.add.overlap(
            this.powerPool,
            this.player,
            this.CollectPowerUp,
            null,
            this
        );
    }

    loadUI() {
        this.shield = this.add.sprite(0, 0, 'shield').setOrigin(0, 0).setScrollFactor(0).setScale(.8).setDepth(100);
        this.scoreIcon = this.add.sprite(config.width - 55, 0, 'score').setOrigin(0, 0).setScrollFactor(0).setScale(.8).setDepth(100);
        this.scoreText = this.add.text(
            config.width - 28,
            13,
            `${this.currentScore}`, 
            {
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                color: '#ffffff',
                stroke: '#0037ff',
                strokeThickness: 4,
                fontSize: '13px',
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(100);
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
        this.anims.create({
            key: 'power_up_idle',
            frames: this.anims.generateFrameNumbers('power_up', {start:0, end:1}),
            frameRate:10,
            repeat:-1,
            yoyo:true
        })
        this.anims.create({
            key: 'power_up_2_idle',
            frames: this.anims.generateFrameNumbers('power_up_2', {start:0, end:1}),
            frameRate:10,
            repeat:-1,
            yoyo:true
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
        this.powerPool = this.physics.add.group();
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

        this.laserSfx.play();  
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
        this.enemyLaserSfx.play();     
        eBullet.hasHit = false;
    }

    createPowerUp(x, y) {
        if (Phaser.Math.Between(0, 100) > gamePrefs.POWER_UP_DROP_CHANGE) {
            return;
        }

        const isTypeOne = Phaser.Math.Between(0, 1) === 0;
        let powerup = this.powerPool.getFirst(false);
        if (powerup) {
            powerup.setActive(true);
            powerup.setVisible(true);
            powerup.body.enable = true;
            powerup.body.reset(x, y);
        } else {
            const tex = isTypeOne ? 'power_up' : 'power_up_2';
            powerup = new PowerUp(this, x, y, tex).setOrigin(0.5).setScale(.8);
            this.powerPool.add(powerup);
        }

        if (isTypeOne) {
            powerup.setTexture('power_up');
            powerup.anims.play('power_up_idle');
            powerup.powerType = 1;
        } else {
            powerup.setTexture('power_up_2');
            powerup.anims.play('power_up_2_idle');
            powerup.powerType = 2;
        }

        console.log('spawned powerup', powerup);
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
            delay: Phaser.Math.FloatBetween(gamePrefs.ENEMY_FIRERATE_MIN, gamePrefs.ENEMY_FIRERATE_MAX) * 1000,
            callback: () => {
                if (enemy.active) {
                    this.createEnemyBullet(enemy.x, enemy.y);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: Phaser.Math.Between(gamePrefs.ENEMY_SPAWNRATE_MIN, gamePrefs.ENEMY_SPAWNRATE_MAX) * 1000,
            callback: this.spawnEnemy,
            callbackScope: this
        });
    }

    createExplosion(source) {
        var explosion = this.explosionPool.getFirst(false);
        this.explosionSfx.play();

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
            this.currentScore += 100;
            gamePrefs.setData('Score', this.currentScore);
            this.updateScoreUI();

            if (Phaser.Math.Between(0, 100) <= gamePrefs.POWER_UP_DROP_CHANGE) {
                this.createPowerUp(enemy.x, enemy.y);
            }

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

        this.hitSfx.play();  
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

    CollectPowerUp (player, powerUp) {
        if (powerUp.powerType === 1) { 
            this.startAutoFire();
        } else if (powerUp.powerType === 2) {
            this.resetShield();
        }

        this.powerupSfx.play();  

        powerUp.setActive(false);
        powerUp.setVisible(false);
        powerUp.body.enable = false;
    }
    
    startAutoFire () {
        if (this.autoFireTimer) this.autoFireTimer.remove();

        this.autofire = true;

        this.autoFireTimer = this.time.addEvent({
            delay: 10 * 1000,
            callback: () => { this.autofire = false; },
            callbackScope: this
        });
    }

    resetShield () {
        this.shieldHits = 0;
        this.shield.setFrame(0);
    }

    CrashPlayer(player) {
        this.createExplosion(player);
        this.RestartLevel();
    }

    RestartLevel() {
        gamePrefs.setData('Score', this.currentScore);
        const storedHigh = gamePrefs.getData('HighScore', 0);
        if (this.currentScore > storedHigh) {
            gamePrefs.setData('HighScore', this.currentScore);
        }
        this.scene.start('menuScene');
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

        if (this.autofire && this.cursores.space.isDown) {
            if (this.time.now > this._lastFire + this.fireRate) {
                this.createBullet();
                this._lastFire = this.time.now;
            }
        }
    }

    setDir(x, y) {
        this.player.setVelocity(x * gamePrefs.PLAYER_ACCELERATION, y * gamePrefs.PLAYER_ACCELERATION);
    }
}