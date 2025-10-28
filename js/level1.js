class level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("666");
        this.load.setPath('assets/sprites');
        this.load.image('bg','bg_green_tile.png');

        this.load.image('entry','spr_door_closed_0.png');

        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tilesets');   
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        //this.add.tileSprite(0,0,gamePrefs.level1Width,gamePrefs.level1Height,'bg')
        this.add.tileSprite(0,0,gamePrefs.gameWidth,gamePrefs.gameHeight,'bg')
        .setOrigin(0);
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_walls');
        this.map.addTilesetImage('tileset_moss');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_walls','tileset_walls');
        this.map.createLayer('layer_moss_up','tileset_moss');
        this.map.createLayer('layer_moss_left','tileset_moss');
        this.map.createLayer('layer_moss_right','tileset_moss');
        this.map.createLayer('layer_moss_down','tileset_moss');

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json
        this.map.setCollisionByExclusion(-1,true,true,'layer_walls');

        this.loadAnimations();

        this.entry = this.add.sprite(65,268,'entry');
        //this.entry = this.physics.add.sprite(65,268,'entry');
        //this.entry.body.setAllowGravity(false);
        //this.entry.body.setImmovable(true);
        
        this.hero = this.physics.add.sprite(65,100,'hero');        

        //this.physics.add.collider(this.hero,this.entry);
        this.physics.add.collider(this.hero,this.walls);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'run',
            frames:this.anims.generateFrameNumbers('hero', 
            {start:2, end: 5}),
            frameRate: 10,
            repeat: -1
        });    
    }

    update()
    {
        if(this.cursors.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);   
            this.hero.setFlipX(true); 
            this.hero.anims.play('run',true);   
        }else
        if(this.cursors.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED); 
            this.hero.setFlipX(false);      
            this.hero.anims.play('run',true);
        }else
        {
            this.hero.body.setVelocityX(0);  
            this.hero.anims.stop().setFrame(0); 
        }    
    }
} 