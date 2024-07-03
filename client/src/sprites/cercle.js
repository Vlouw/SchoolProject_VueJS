const RAYON = 10

class cercle {
    constructor(x, y){
        // Définir une couleur aléatoire
        this.rouge = Math.floor(Math.random() * 256)
        this.vert = Math.floor(Math.random() * 256)
        this.bleu = Math.floor(Math.random() * 256)
        
        // Position x, y et rayon du cercle
        this.x = x
        this.y = y
        this.rayon = RAYON

        //Bool IsAliveCercle et Carre pour ne pas effacer les carrées dans page-register
        this.isAliveCercle = true
        this.isAliveCarre = true

        // Ajouter un compteur au cercle
        this.counter = 0

        // Dessiner un cercle
        this.drawCerc()
    }

    // Fonction dessiner un cercle
    drawCerc = () => {
        ctx.beginPath()
        //ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.arc(this.x, this.y, this.rayon, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(${this.rouge},${this.vert},${this.bleu}, 0.8)`
        ctx.fill();
    }

    // Fonction tick du cercle
    tick() {
        // Augmenter le compteur de 1
        this.counter++

        // Redéfinir une couleur aléatoire
        this.rouge = Math.floor(Math.random() * 256)
        this.vert = Math.floor(Math.random() * 256)
        this.bleu = Math.floor(Math.random() * 256)

        // Redessiner le cercle
        this.drawCerc()

        // Apres 50 tick, mettre isAlive à false
        if (this.counter > 50) {
            this.isAliveCercle = false
        }
    }
}