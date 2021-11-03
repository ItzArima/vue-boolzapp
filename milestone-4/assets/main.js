const app  = new Vue({
    el : '#root',
    data: {
        index: 0,
        contacts: [
            {
                name: 'Michele',
                avatar: './assets/img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Hai portato a spasso il cane?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 16:15:22',
                    text: 'Tutto fatto!',
                    status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './assets/img/avatar_2.jpg',
                visible: true,
                messages: [
                {
                    date: '20/03/2020 16:30:00',
                    text: 'Ciao come stai?',
                    status: 'sent'
                    },
                    {
                    date: '20/03/2020 16:30:55',
                    text: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                    },
                    {
                    date: '20/03/2020 16:35:00',
                    text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './assets/img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                    date: '28/03/2020 10:10:40',
                    text: 'La Marianna va in campagna',
                    status: 'received'
                    },
                    {
                    date: '28/03/2020 10:20:10',
                    text: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                    },
                    {
                    date: '28/03/2020 16:15:22',
                    text: 'Ah scusa!',
                    status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: './assets/img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                    }
                ],
            },
        ]    
    },
    methods:{
        display(i){
            this.index = i
        },
        newMessage(){
            var input = document.getElementById("new").value
            var date = dayjs().format('DD/MM/YYYY hh:mm:ss')            
            var message = {
                date: date,
                text: input,
                status :'sent'
            }
            this.contacts[this.index].messages.push(message)
            reset = document.getElementById("new")
            reset.value = "",
            setTimeout(function(){
                var replyDate=dayjs().format('DD/MM/YYYY hh:mm:ss')
                var reply = {
                    date: replyDate,
                    text: 'ok',
                    status:'received'
                }
                app.contacts[app.index].messages.push(reply)
            } ,3000)
        },
    }
})


document.getElementById("new").addEventListener("keyup",function(){
    if (event.keyCode === 13) {
        event.preventDefault();
        app.newMessage();
    }
})


document.getElementById("search").addEventListener("keydown",function(){
    setTimeout(function(){
        var insertion = document.getElementById("search").value
        var insert = insertion.toUpperCase()
        var contactsNumber = app.contacts.length
        var insertLenght = insert.length      
        for (i = 0; i < app.contacts.length; i++) {
            var name = app.contacts[i].name
            let compare =""
            for(let j=0;j<insertLenght;j++){
                letterGeneric = name.charAt(j)
                letter = letterGeneric.toUpperCase()
                compare += letter
            }; 
            var contacts = document.getElementsByClassName("contact")
            if(insert == compare)  {
                console.log(compare);
                console.log(name);
                contacts[i].id="shown"
            }
            else{
                contacts[i].id = "hidden"
            }            
        } 
    },10)
})