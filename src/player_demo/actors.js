console.log("actors !! ");

class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.hp = 100;
    this.bar_bg =  scene.add.rectangle(x, y-20, 105, 8, 0x000000);
    this.bar_bg.setScale(0.8);
    this.bar_fg =  scene.add.rectangle(x-32, y-20, 100, 6, 0x00ff00);
    this.bar_fg.setScale(0.8);
    this.bar_fg.setOrigin(0.1, 0.5);
    this.draw_bar();
x
    // Timer de 2 segundos
    this.attackTimer = scene.time.addEvent({
      delay: 1500,
      callback: this.enableAttack,
      callbackScope: this,
      loop: false
    });

    this.canBeAttacked = true; // Define se o ator pode ser atacado ou não
    this.blinkInterval = null; // Variável para controlar o intervalo de piscagem
  }

  getDamage(value){
    // Verifica se o ator pode ser atacado
    if (!this.canBeAttacked) {
        return;
    }

    // Desativa temporariamente a possibilidade de sofrer outro ataque por 2 segundos
    this.canBeAttacked = false;
    this.scene.time.delayedCall(2000, () => {
        this.stopBlinking(); 
        this.canBeAttacked = true;
    });

    // Reduz a saúde do ator
    this.hp -= value;

    // Garante que a saúde não ultrapasse 0
    if (this.hp < 0) {
        this.hp = 0;
    }

    // Calcula a largura da barra de progresso baseada na saúde atual
    this.bar_fg.width = 100 * this.hp / 100;

    // Verifica se o ator está vivo
    if (this.hp <= 0) {
        this.hp = 0;
        this.bar_fg.setVisible(false);
        this.bar_bg.setVisible(false);
    }

    // Volta ao normal se o ator estiver vivo e não estiver mais invulnerável
    if (this.hp > 0 && this.canBeAttacked) {
        this.stopBlinking();
    }

    // Inicia a piscagem apenas se o ator estiver vivo e invulnerável
    if (this.hp > 0 && !this.canBeAttacked) {
        this.startBlinking();
    }
}

  getHPValue(){
    return this.hp;
  }

  preUpdate (time, delta)
  {
      super.preUpdate(time, delta);
      this.draw_bar();
  }

  draw_bar()
  {
    //this.bar.originX = 0.9
    this.bar_bg.x = this.x;
    this.bar_bg.y = this.y-20;
    this.bar_fg.x = this.x-32;
    this.bar_fg.y = this.y-20;
  }

  // Função para habilitar o ataque após o tempo especificado
  enableAttack() {
    this.canBeAttacked = true;
    // Para a piscagem
    this.stopBlinking();
    // Garante que o ator seja visível quando a invulnerabilidade terminar
    this.setVisible(true);
  }

  // Função para iniciar a piscagem
  startBlinking() {
    // Certifica-se de que a piscagem não está ativa antes de iniciar
    if (this.blinkInterval === null) {
        this.blinkInterval = setInterval(() => {
            this.toggleVisibility();
        }, 250); // Intervalo de 250ms para piscar
    }
  }

  // Função para parar a piscagem
  stopBlinking() {
    // Para a piscagem apenas se estiver ativa
    if (this.blinkInterval !== null) {
        clearInterval(this.blinkInterval);
        this.blinkInterval = null;
        this.setVisible(true); // Garante que o ator seja visível quando a piscagem parar
    }
  }

  // Função para alternar a visibilidade do ator
  toggleVisibility() {
    this.setVisible(!this.visible);
  }
}
