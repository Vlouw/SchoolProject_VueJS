const CANVAS_HEIGHT_DUCK = 60
const CANVAS_WIDTH_DUCK = 60
const POSITION_INI_X_DUCK = -60
const POSITION_INI_Y_DUCK = 580

class duck {
    constructor(){
        // New audio
        this.son = new Audio("sound/Duck Hunt SFX (11).wav")

        // Random color
        this.randomcolor = Math.floor(Math.random() * 3)

        if (this.randomcolor === 0) {
            this.color = "img/blue_duck.png"
        }
        else if (this.randomcolor === 1) {
            this.color = "img/black_duck.png"
        }
        else{
            this.color = "img/red_duck.png"
        }


        // Création de la balise canvas pour le canard
        this.element = document.createElement('canvas')
        this.element.setAttribute("id", "duck")
        this.element.setAttribute("width", CANVAS_WIDTH_DUCK)
        this.element.setAttribute("height", CANVAS_HEIGHT_DUCK)

        // Ajouter la balise canvas à l'élément animation-block
        this.Animation_ID = document.getElementById('background-top')
        this.Animation_ID.appendChild(this.element); 

        // Animation du canard avec tiledImage.js
        this.columnCount = 4;
		this.rowCount = 4;
		this.refreshDelay = 200; 			// msec
		this.loopColumns = true; 			// or by row?
		this.scale = 1.5;
        this.tiledImage = new TiledImage( this.color, this.columnCount, this.rowCount,
                                          this.refreshDelay, this.loopColumns, this.scale, null);
        this.tiledImage.changeMinMaxInterval(0, 4); 	// Loop from which column to which column?
                                          
        // Random direction
        this.randomdirection = Math.floor(Math.random() * 2)

        if (this.randomdirection === 0) {
            this.tiledImage.changeRow(0);
            this.x = POSITION_INI_X_DUCK
            this.y = Math.floor(Math.random() * 461) + 30            
        }
        else{
            this.tiledImage.changeRow(2)
            this.x = Math.floor(Math.random() * 1001) + 86
            this.y = POSITION_INI_Y_DUCK            
        }        
        
        // Création du canvas pour l'animation du canard
        this.ctx = this.element.getContext("2d")
        
        //Bool
        this.isAliveDuck = true
        this.isAliveChien = true
        this.isClicked = false

        // Initialiser la position du canard
        this.move()

        // On click tuer le canard, donc changer l'image à la 4e row et augmenter le score
        this.element.onclick = () => { 
            this.isClicked = true
            this.tiledImage.changeRow(3);
            this.tiledImage.changeMinMaxInterval(0, 0);
            this.son.play()
            score += 1
        }
    }

    // Fonction move
    move () {
        this.element.style.top = `${this.y}px`
        this.element.style.left = `${this.x}px`
    }

    // Fonction tick du canard
    tick() {
        // Vider le canvas et activer le tick de l'image
        this.ctx.clearRect(0, 0, CANVAS_WIDTH_DUCK, CANVAS_HEIGHT_DUCK)
        this.tiledImage.tick(CANVAS_HEIGHT_DUCK/2, CANVAS_WIDTH_DUCK/2, this.ctx);

        // Condition normal, isClicked false
        if (!this.isClicked && this.randomdirection === 0) {  
            // Faire déplace le canard jusqu'à ce qu'il quitte le block animation et l'enlever de la liste
            this.x += (speed * 1.5)

            if (this.x > 1272) {
                this.isAliveDuck = false
                this.element.remove()
            }
        }
        else if (!this.isClicked && this.randomdirection === 1) {  
            // Faire déplace le canard jusqu'à ce qu'il quitte le block animation et l'enlever de la liste
            this.y -= (speed * 1.5)

            if (this.y < -60) {
                this.isAliveDuck = false
                this.element.remove()
            }
        }
        else {
            // Faire déplace le canard jusqu'à ce qu'il quitte le block animation et l'enlever de la liste
            this.y += (speed * 1.5)

            if (this.y > 580) {
                this.isAliveDuck = false
                this.element.remove()
            }
        }
                
        // Faire bouger le chien avec la fonction move
        this.move()
    }
}