import {signin} from './chat-api.js'

// Variables globales aussi utilisé dans duck
window.SPEED_ELEMENT = document.getElementById("speed-value")
window.speed = parseInt(SPEED_ELEMENT.innerHTML)
window.score = 0

// Variables locales
const START_STOP = document.getElementById("start-button")
let spriteList = []
let duckticker = null
let scorevalue = ""

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this)
    }

    // Augmenter la vitesse et mettre à jour la balise
    document.getElementById('speed-minus').onclick = () => {       
        // Vitesse min 1
        if (speed > 1) {
            speed -= 1
            SPEED_ELEMENT.innerHTML = speed
        } 
    }

    // Diminuer la vitesse et mettre à jour la balise
    document.getElementById('speed-plus').onclick = () => {
        // Vitess max 9
        if (speed < 9) {
            speed += 1
            SPEED_ELEMENT.innerHTML = speed
        }
    }

    // Commencer ou arreter le jeu et mettre à jour la balise
    document.getElementById('start-button').onclick = () => {
        if (START_STOP.innerHTML === 'START') {
            // Changer le texte pour stop
            START_STOP.innerHTML = "STOP"
            
            // Ajouter un chien
            spriteList.push(new chien());

            // Ajouter un canard à tous les x secondes
            duckticker = setInterval(spawnduck, 3000/speed)

            // Partir le tick
            tick()
        }
        else {
            // Changer le texte pour start
            START_STOP.innerHTML = "START"

            // Arreter les canards
            clearInterval(duckticker)
        }
    }   

    tick()
});

// Fonction tick ()
const tick = () => {
    // Boucler sur la spriteList
    spriteList.forEach(s => {
        s.tick()
        // Si le chien n'est plus alive, ajouter un autre chien
        if (!s.isAliveChien) {
            spriteList.push(new chien());         
        }
    }) 

    // Enlever les éléments Alive = false
    spriteList = spriteList.filter(s => s.isAliveChien)
    spriteList = spriteList.filter(s => s.isAliveDuck)
        
    // Boucler sur tick quand on click sur START
    if (START_STOP.innerHTML === 'STOP') {
        window.requestAnimationFrame(tick)
    }
    // Vider la spritelist, mettre le score à 0 et enlever les éléments avec id chien et duck
    else if (spriteList.length > 0) {
        spriteList = []
        score = 0
        document.getElementById('chien').remove()
        while (document.getElementById('duck')) {
            document.getElementById('duck').remove()
        }
    }

    // Affichage rétro du score
    scorevalue = ""
    for (let i = score.toString().length; i < 8; i++) { 
        scorevalue += "0"
    }
    scorevalue += score
    document.getElementById('score-value').innerHTML = scorevalue
}

//Fonction pour appeler un nouveau canard
const spawnduck = () => {
    spriteList.push(new duck())
}

