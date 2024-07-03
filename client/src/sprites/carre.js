const DROPSPEED = 2
const SIDESIZE = 5
const RANGE = 50

class carre {
    constructor(x, y){
        // Définir une position aléatoire à l'intérieur de RANGE pixels du point d'origine
        let MoveX = Math.floor(Math.random()*RANGE)
        let MoveY = Math.floor(Math.random()*RANGE)
        let MoveXPN = Math.floor(Math.random()*2)
        let MoveYPN = Math.floor(Math.random()*2)

        // Choisir si positif ou negatif aléatoirement
        if (MoveXPN === 0)
            MoveX *= -1

        if (MoveYPN === 0)
            MoveY *= -1

        // Position et grosseur du carré
        this.x = MoveX + x
        this.y = MoveY + y 
        this.sidesize = SIDESIZE     
        
        // Définir une couleur aléatoire
        this.rouge = Math.floor(Math.random() * 256)
        this.vert = Math.floor(Math.random() * 256)
        this.bleu = Math.floor(Math.random() * 256)

        //Bool IsAliveCercle et Carre pour ne pas effacer les cercles dans page-register
        this.isAliveCercle = true
        this.isAliveCarre = true

        // Ajouter un compteur au cercle
        this.counter = 0

        // Dessiner les carrées
        this.drawRect()
    }

    // Fonction dessinées rectangles
    drawRect = () => {
        ctx.fillStyle = `rgba(${this.rouge},${this.vert},${this.bleu}, 1)`
        ctx.fillRect(this.x, this.y, this.sidesize, this.sidesize)
    }

    // Fonction tick du carrée
    tick() {
        // Augmenter le compteur de 1
        this.counter++

         // Faire tomber le carrée
        this.y += DROPSPEED

        // Redessiner le carrée
        this.drawRect()

        // Apres 50 tick, enlever le carrée
        if (this.counter > 50) {
            this.isAliveCarre = false
        }
    }
}