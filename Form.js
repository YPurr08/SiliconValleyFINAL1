class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.title = createElement('h2');
      this.factorY = displayHeight/2 * - 1/3;
      this.link = createA('https://youtu.be/_IAD6ezoCF8', 'FirstResponders Game - My tribute', '_blank');
      this.link.position(window.innerWidth/2, 50);     



    }
    hide(){
      this.button.hide();
      this.input.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("First Responders");
      this.title.position(window.innerWidth/2, 0);
  
      this.input.visible = true;
      this.input.size(100, 40);
      this.input.position(window.innerWidth/2 - this.input.width/2, window.innerHeight/2);

      this.button.size(80, 50);
      this.button.position(window.innerWidth/2 - this.button.width/2, window.innerHeight/2 - this.factorY); 

  
      this.button.mousePressed(()=>{
        gameState = 2;
        this.input.hide();
        this.button.hide();
        playerName = this.input.value();
        
      });
    }

    focus(){
      this.input.attribute("autofocus");
      this.input.elt.focus();
    }

    async start(){
        if(gameState === 3){
            form = new Form();
            form.display();
            this.button.hide();
            this.input.hide();
            player.visible = false;
            enemyArray[0].visible = false;
        }
    }
}
  