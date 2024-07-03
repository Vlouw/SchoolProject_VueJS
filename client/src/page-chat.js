import * as api from './chat-api.js';
new Vue({
    el: '#app',
    data:{
        users: [],
        chatlist: [],
        colorlist: [
            {color: 'red'},
            {color: 'lime'},
            {color: 'tomato'},
            {color: 'yellow'},
            {color: 'purple'},
            {color: 'aqua'},
            {color: 'magenta'},
            {color: 'chocolate'},
            {color: 'maroon'},
            {color: 'springgreen'}
        ],
        whisperto: "",
    },
    methods: {
        /* NO TOUCH */
        async sendMessage(evt) { /* NO TOUCH */
            api.sendMessage(evt, this.$refs.el) /* NO TOUCH */
            this.whisperto = "" // Sry, I touched
        }, /* NO TOUCH */
        signout() { /* NO TOUCH */
            api.signout() /* NO TOUCH */
        }, /* NO TOUCH */
        /* FIN NO TOUCH */
        
        // Lorsqu'un nouveau message doit être affiché à l'écran, cette fonction est appelée
        async newMessage(fromUser, message, isPrivate) {
            //console.log(fromUser, message, isPrivate, "---newMessage");

            // Afficher grey si private
            if (isPrivate) {
                this.chatlist.push({user: fromUser, text: message, color: 'grey'})
            }
            // Afficher blanc si chatroom
            else if (fromUser === "ChatRoom") {
                this.chatlist.push({user: fromUser, text: message, color: 'white'})
            }            
            // Afficher couleur du user sinon
            else {
                let index = this.users.findIndex(e => e.user == fromUser)
                let couleur = this.users[index].color
                this.chatlist.push({user: fromUser, text: message, color: couleur})
            }
        },
        
        // À chaque 2-3 secondes, cette fonction est appelée. Il faudra donc mettre à jour la liste des membres
        // connectés dans votre interface.
        memberListUpdate(members) {
            //console.log(members, "memberListUpdate");
            // Vider la liste de users et la remplir avec les noms et couleurs
            this.users = []
            for (let i = 0; i < members.length; i++) {
                this.users.push({user: members[i], color: this.colorlist[i].color})
            }

            // Ajuster les couleurs du chat si qqun quitte
            // Loop la chatlist
            for (let i = 0; i < this.chatlist.length; i++) {
                // Trouver la couleur du user à l'index
                let index = this.users.findIndex(e => e.user == this.chatlist[i].user)
                
                // Si discussion privée, couleur grey
                if (this.chatlist[i].color == "grey") {
                    this.chatlist[i].color = "grey"
                }
                // Si utilisateur chatroom, couleur white
                else if (this.chatlist[i].user === "ChatRoom") {
                    this.chatlist[i].color = "white"
                }
                // Si l'utilisateur est partie mettre en orange
                else if (index == -1) {
                    this.chatlist[i].color = 'orange'
                }
                // Sinon couleur user
                else {
                    this.chatlist[i].color = this.users[index].color
                }
            }
        },

        // Fonction si on click sur un user, ajoute le whisper dans la boite de clavardage
        whisper(user) {
            this.whisperto = "/w " + user
        },
    },
    
    /* NO TOUCH */
    mounted() { /* NO TOUCH */
        api.registerCallbacks(this.newMessage, this.memberListUpdate); /* NO TOUCH */
        api.chatMessageLoop(); /* NO TOUCH */
    } /* NO TOUCH */
    /* FIN NO TOUCH */
})