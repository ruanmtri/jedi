console.log("actors!! ")

class player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    console.log("0", texture, frame)
    super(scene, x, y, texture, frame);
    console.log("2")
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);


    this.move_enable = true;
    this.attack_enable = true;
    this.facing = [0, 1];
    this.create_animations(texture);
  }

  create_animations(texture){
    this.anims.create({
        key: 'walk_up',
        frames: this.anims.generateFrameNumbers(texture, {start: 104, end: 112}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_left',
        frames: this.anims.generateFrameNumbers(texture, {start: 117, end: 125}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_down',
        frames: this.anims.generateFrameNumbers(texture, {start: 130, end: 138}),
        frameRate: 20,
        repeat: -1
        });
    this.anims.create({
        key: 'walk_right',
        frames: this.anims.generateFrameNumbers(texture, {start: 143, end: 151}),
        frameRate: 20,
        repeat: -1
        });

    this.anims.create({
        key: 'attack_up',
        frames: this.anims.generateFrameNumbers(texture, {start: 208, end: 220}),
        frameRate: 20,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_left',
        frames: this.anims.generateFrameNumbers(texture, {start: 221, end: 233}),
        frameRate: 20,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_down',
        frames: this.anims.generateFrameNumbers(texture, {start: 234, end: 246}),
        frameRate: 20,
        repeat: 0
        });
    this.anims.create({
        key: 'attack_right',
        frames: this.anims.generateFrameNumbers(texture, {start: 247, end: 259}),
        frameRate: 20,
        repeat: 0
        });

    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers(texture, {start: 260, end: 265}),
        frameRate: 20,
        repeat: 0
        });    
  }

  set_player_velocity(){
    if (this.scene.keyD?.isDown) {
        this.setVelocityX(210);
    }
    else if (this.scene.keyA?.isDown) {
        this.setVelocityX(-210);
    }
    else{
        this.setVelocityX(0); 
    }

    // velocidade vertical
    if (this.scene.keyW.isDown) {
        this.setVelocityY(-210);
    }
    else if (this.scene.keyS.isDown) {
        this.setVelocityY(210);
    }
    else{
        this.setVelocityY(0); 
    }    
  }

  set_walk_animation(){
    if (this.body.velocity.x > 0){
      this.anims.play('walk_right', true);
      this.facing = [1, 0];
    }
    else if (this.body.velocity.x < 0){
      this.anims.play('walk_left', true);
      this.facing = [-1, 0];      
    }
    else if (this.body.velocity.y > 0){
      this.anims.play('walk_down', true);
      this.facing = [0, 1];
    }
    else if (this.body.velocity.y < 0){
      this.anims.play('walk_up', true);
      this.facing = [0, -1];
    }
    else{
      this.anims.stop();
    }
  }

  attack(){ 
    console.log('attack', this.facing, this.facing[0])
    this.attack_enable = false;
    this.move_enable = false;
    this.on('animationcomplete', this.re_enable);
      if (this.facing[0] == 1)
        this.anims.play('attack_right');
      else if (this.facing[0] == -1)
        this.anims.play('attack_left');
      else if (this.facing[1] == 1)
        this.anims.play('attack_down');
      else
        this.anims.play('attack_up');

  }

  re_enable(){
    this.attack_enable = true;
    this.move_enable = true;

  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);

    if (this.move_enable){
      this.set_player_velocity();
      this.set_walk_animation();
    }
    else{
      this.setVelocityX(0); 
      this.setVelocityY(0); 
    }

    if (this.scene.keySPACE.isDown && this.attack_enable) {
      this.attack();
    }


  }

}

