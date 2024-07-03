const SPEED_CHIEN = 3
const POSITION_INI_X = -100
const POSITION_INI_Y = 535
const POSITION_INI_Y_JUMP = 1.5
const CANVAS_HEIGHT_CHIEN = 55
const CANVAS_WIDTH_CHIEN = 60

class chien {
    constructor(){
        // New Audio
        this.son = new Audio("sound/Duck Hunt SFX (9).wav")
        
        // Création de la balise canvas pour le chien
        this.element = document.createElement('canvas')
        this.element.setAttribute("id", "chien")
        this.element.setAttribute("width", CANVAS_WIDTH_CHIEN)
        this.element.setAttribute("height", CANVAS_HEIGHT_CHIEN)

        // Ajouter la balise canvas à l'élément animation-block
        this.Animation_ID = document.getElementById('animation-block')
        this.Animation_ID.appendChild(this.element); 

        // Animation du chien avec tiledImage.js
        this.columnCount = 5;
		this.rowCount = 2;
		this.refreshDelay = 200; 			// msec
		this.loopColumns = true; 			// or by row?
		this.scale = 1.0;
		this.tiledImage = new TiledImage(   "img/chien.png", this.columnCount, this.rowCount,
                                            this.refreshDelay, this.loopColumns, this.scale, null);
		this.tiledImage.changeRow(0);					// One row per animation
        this.tiledImage.changeMinMaxInterval(0, 5); 	// Loop from which column to which column?
        
        // Création du canvas pour l'animation du chien
        this.ctx = this.element.getContext("2d")
        
        // Position x, y initial du chien
        this.x = POSITION_INI_X
        this.y = POSITION_INI_Y

        //Bool
        this.isAliveDuck = true
        this.isAliveChien = true
        this.isClicked = false

        // Initialiser la position du chien
        this.move()

        // Initialiser un compteur
        this.counter = 0

        // On click faire sauter le chien, donc changer l'image à la deuxième row
        this.element.onclick = () => { 
            this.isClicked = true
            this.tiledImage.changeRow(1);
            this.tiledImage.changeMinMaxInterval(0, 2);
            this.son.play()
        }
    }

    // Fonction move
    move () {
        this.element.style.top = `${this.y}px`
        this.element.style.left = `${this.x}px`
    }

    // Fonction tick du chien
    tick() {
        // Vider le canvas et activer le tick de l'image
        this.ctx.clearRect(0, 0, CANVAS_WIDTH_CHIEN, CANVAS_HEIGHT_CHIEN)
        this.tiledImage.tick(CANVAS_HEIGHT_CHIEN/2, CANVAS_WIDTH_CHIEN/2, this.ctx);

        // Condition normal, isClicked false
        if (!this.isClicked) {  
            // Faire déplace le chien jusqu'à ce qu'il quitte le block animation et l'enlever de la liste
            this.x += SPEED_CHIEN      
            if (this.x > 1272) {
                this.isAliveChien = false
                this.element.remove()
            }
        }
        // Donner un compteur de 25 pour permettre l'animation du saut et apres enlever de la liste
        else if (this.counter >= 25) {             
            this.isAliveChien = false  
            this.element.remove()
        }
        // Faire augmenter le compeur pour permettre l'animation du chien et déplace vers le haut
        else {
            this.counter++
            this.y -= POSITION_INI_Y_JUMP
        }    
        
        // Faire bouger le chien avec la fonction move
        this.move()
    }
}