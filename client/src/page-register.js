// Code Prof
import {register} from './chat-api.js'

// Variable globale
window.ctx = null
let canvas = null
let fireworks = []
let son = new Audio("sound/fireworks.mp3")

// On load
window.addEventListener("load", () => {
    // Code Prof
    document.querySelector("form").onsubmit = function () {
        return register(this);
    }

    // Définition du canvas 2D
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d")

    // Quand on click sur le canvas, ajouter un Cercle à la position du curseur
    canvas.onclick = e => {
        fireworks.push(new cercle(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop));        
    }   

    // Appeler la fonction tick
    tick()
})

// Tick
const tick = () => {
    // Vider le canvas
    ctx.clearRect(0,0,1272,520)

    // Pour chaque élément dans firework faire un tick de l'élément
    fireworks.forEach(s => {
        s.tick()
    
        // Si le cercle n'est plus valide ajouter 30 carrés dans Fireworks
        if (!s.isAliveCercle) {
            for (let i = 0; i < 30; i++) {
                // Ajouer un carrée, position de départ centre du cercle
                fireworks.push(new carre(s.x, s.y))
            }                
        }
    })        

    // Enlever les éléments qui ne sont plus valide de Fireworks
    fireworks = fireworks.filter(s => s.isAliveCercle)
    fireworks = fireworks.filter(s => s.isAliveCarre)

    // Jouer la trame sonor si un élément Fireworks est présent
    if (fireworks.length > 0) {
        son.play()
    }
    else {
        son.pause()
    }

    // Mettre à jour la fenêtre continuellement
    window.requestAnimationFrame(tick)
}