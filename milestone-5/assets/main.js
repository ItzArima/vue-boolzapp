const app  = new Vue({
    el : '#root',
    data: {
        index: 0,
        actionReset: 0,
        deleted:0,
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
                lastSent:'',
                lastReceived:''
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
                lastSent:'',
                lastReceived:''
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
                lastSent:'',
                lastReceived:''
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
                lastSent:'',
                lastReceived:''
            },
        ]    
    },
    methods:{
        display(i){
            this.index = i
        },
        newMessage(){
            var input = document.getElementById("new").value
            if (input != ""){
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
                setTimeout(setData,3010)
            }    
        },
        actions(i){
            if(this.deleted == 0){
                var message = document.getElementsByClassName("message-actions")
                if(this.actionReset == 0){
                    message[i].id = "shown"
                    this.actionReset = 1
                }
                else{
                    for(let i = 0;i<message.length;i++){
                        message[i].id="hidden"
                        this.actionReset = 0
                    }    
                }
                console.log(this.actionReset);
            } 
            else{
                this.deleted = 0;
            }   
        },
        informations(i){
            var date =this.contacts[this.index].messages[i].date
            var status = this.contacts[this.index].messages[i].status
            var message = document.getElementsByClassName("message-actions")
            console.log(status);
            console.log(date);
            alert("message " + status + " on " + date)
        },
        deleteMessage(i){
            this.contacts[this.index].messages.splice(i , 1)
            this.deleted = 1;
            this.actionReset = 0
            var messages = this.contacts[this.index].messages.length
            setTimeout(function(){
                for(i=0;i<messages;i++){
                    var actions = document.getElementsByClassName("message-actions")
                    actions[i].id = "hidden"
                }
            },10)    
        }
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

setData();

function setData(){
    var userDate = document.getElementsByClassName("contact-info")
    for(let i =0;i<userDate.length;i++){
        let sent = ""
        let received = ""
        var messagesNumber  = app.contacts[i].messages.length
        console.log(messagesNumber);
        for(let j=0;j<messagesNumber;j++){
            if(app.contacts[i].messages[j].status == "sent"){
                sent = app.contacts[i].messages[j].date
            }
            else{
                received = app.contacts[i].messages[j].date
            }
        }
        console.log(sent);
        console.log(received);
        app.contacts[i].lastSent = sent;
        app.contacts[i].lastReceived = received
    }
}    