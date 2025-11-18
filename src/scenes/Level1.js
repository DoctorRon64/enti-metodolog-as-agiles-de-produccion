import { LEVEL_SIZE, HERO } from "../core/constants.js";
import { Jumper } from '../entities/enemies/Jumper.js';
import { Slime } from '../entities/enemies/Slime.js';

export class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor('#666');
        this.load.setPath('assets/sprites/backgrounds');
        this.load.image('bg','bg_green_tile.png');

        this.load.setPath('assets/sprites/static');
        this.load.image('entry','spr_door_closed_0.png');

        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('hero','hero.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('jumper','jumper.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('slime','slime.png',
        {frameWidth:32,frameHeight:32});

        this.load.setPath('assets/tiled/tilesets');   
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
        //this.load.tilemapTiledJSON('level'+nivelActual,'level'+nivelActual+'.json');
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        this.add.tileSprite(0,0,LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT,'bg')
        //this.add.tileSprite(0,0,gamePrefs.level1Width,gamePrefs.level1Height,'bg')
        //this.add.tileSprite(0,0,gamePrefs.gameWidth,gamePrefs.gameHeight,'bg')
        .setOrigin(0);
        //Pintamos el nivel
        //Cargo el JSON
        //this.map = this.add.tilemap('level1'); //DEPRECATED
        this.map = this.make.tilemap({key:'level1'});
        //Cargo los tilesets
        // IMPORTANTE: el primer argumento debe coincidir con el "Nombre del tileset" en Tiled.
        // El segundo argumento es la 'key' del asset cargado con this.load.image(...), que cambiamos
        // por el tileset_object del paso previo
        // Si coinciden, puedo dejar sólo 1
        const ts_walls = this.map.addTilesetImage('tileset_walls');
        //this.map.addTilesetImage('tileset_walls','tileset_walls');
        const ts_moss = this.map.addTilesetImage('tileset_moss');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_walls',ts_walls);
        this.map.createLayer('layer_moss_up',ts_moss);
        this.map.createLayer('layer_moss_left',ts_moss);
        this.map.createLayer('layer_moss_right',ts_moss);
        this.map.createLayer('layer_moss_down',ts_moss);

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json
        //this.map.setCollisionByExclusion(-1,true,true,'layer_walls');
        this.walls.setCollisionByExclusion([-1]);

        this.loadAnimations();

        this.entry = this.add.sprite(65,268,'entry');
        //this.entry = this.physics.add.sprite(65,268,'entry');
        //this.entry.body.setAllowGravity(false);
        //this.entry.body.setImmovable(true);
        
        this.hero = this.physics.add.sprite(65,100,'hero');        

        //this.physics.add.collider(this.hero,this.entry);
        this.physics.add.collider(this.hero,this.walls);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.jumper = new Jumper(this,240,304);
        this.slime = new Slime(this,656,272);

        //this.cameras.main.startFollow(this.hero);
        //this.cameras.main.setBounds(0,0,gamePrefs.level1Width,gamePrefs.level1Height);
        //this.cameras.main.startFollow(this.hero).setBounds(0,0,
        //gamePrefs.level1Width,gamePrefs.level1Height);
        this.cameras.main.startFollow(this.hero).setBounds(0,0,
            LEVEL_SIZE.LEVEL1_WIDTH,LEVEL_SIZE.LEVEL1_HEIGHT);
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
        
        this.anims.create(
        {
            key: 'run_jumper',
            frames:this.anims.generateFrameNumbers('jumper', 
            {start:0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'run_slime',
            frames:this.anims.generateFrameNumbers('slime', 
            {start:0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    update()
    {
        if(this.cursors.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.hero.body.setVelocityX(-HERO.SPEED); // ← negativo a la izquierda    
            this.hero.setFlipX(true); 
            this.hero.anims.play('run',true);   
        }else
        if(this.cursors.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.hero.body.setVelocityX(HERO.SPEED); 
            this.hero.setFlipX(false);      
            this.hero.anims.play('run',true);
        }else
        {
            this.hero.body.setVelocityX(0);  
            this.hero.anims.stop().setFrame(0); 
        }
        
        if(this.cursors.space.isDown
           && this.hero.body.onFloor()
           //&& this.hero.body.blocked.down  
           && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250))
           
        {
            this.hero.body.setVelocityY(HERO.JUMP_FORCE);    
        } 

        if(!this.hero.body.onFloor())
        {
            this.hero.anims.stop().setFrame(6);
        }
        
    }
} 