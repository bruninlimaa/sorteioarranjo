// =====================================
// SORTEIO ESPECIAL GLAMUROSO ARRANJO
// VERSÃO FINAL OTIMIZADA
// =====================================


let participants =
JSON.parse(localStorage.getItem("arranjos")) || [];


let lastWinner =
localStorage.getItem("ultimoVencedor") || "-";




// ELEMENTOS

const nameInput = document.getElementById("nameInput");
const numberInput = document.getElementById("numberInput");
const addButton = document.getElementById("addButton");

const participantsList = document.getElementById("participantsList");
const searchInput = document.getElementById("searchInput");

const totalParticipants = document.getElementById("totalParticipants");
const totalNumbers = document.getElementById("totalNumbers");
const lastWinnerElement = document.getElementById("lastWinner");

const drawButton = document.getElementById("drawButton");
const clearButton = document.getElementById("clearButton");

const countdownOverlay = document.getElementById("countdownOverlay");
const countNumber = document.getElementById("countNumber");

const winnerOverlay = document.getElementById("winnerOverlay");

const winnerNumber = document.getElementById("winnerNumber");
const winnerName = document.getElementById("winnerName");

const closeWinner = document.getElementById("closeWinner");

const themeButton = document.getElementById("themeButton");









// =====================================
// SALVAR DADOS
// =====================================


function saveData(){

    localStorage.setItem(
        "arranjos",
        JSON.stringify(participants)
    );

}









// =====================================
// ATUALIZAR LISTA
// =====================================


function updateScreen(){


    participantsList.innerHTML = "";


    let search =
    searchInput.value.toLowerCase();




    let filtered =
    participants.filter(item=>{


        return (

            item.name
            .toLowerCase()
            .includes(search)

            ||

            item.number
            .toString()
            .includes(search)

        );


    });






    filtered.forEach(item=>{


        let div =
        document.createElement("div");



        div.className="participant";



        div.innerHTML = `


        <span>

        🌸 ${item.number} - ${item.name}

        </span>



        <button
        class="delete"
        onclick="removeParticipant(${item.number})">


        <i class="fa-solid fa-trash"></i>


        </button>


        `;



        participantsList.appendChild(div);



    });








    totalParticipants.innerText =
    participants.length;



    totalNumbers.innerText =
    participants.length;



    lastWinnerElement.innerText =
    lastWinner;



    saveData();


}









// =====================================
// ADICIONAR PARTICIPANTE
// =====================================


addButton.onclick=function(){



    let name =
    nameInput.value.trim();



    let number =
    numberInput.value;






    if(name==="" || number===""){


        alert(
        "Preencha nome e número!"
        );


        return;


    }







    let exists =
    participants.some(item=>{


        return item.number == number;


    });







    if(exists){


        alert(
        "Esse número já está cadastrado!"
        );


        return;


    }






    participants.push({


        name:name,


        number:Number(number)


    });







    nameInput.value="";


    numberInput.value="";



    updateScreen();



};









// =====================================
// REMOVER PARTICIPANTE
// =====================================


function removeParticipant(number){



    participants =

    participants.filter(item=>{


        return item.number != number;


    });



    updateScreen();


}









// =====================================
// PESQUISA
// =====================================


searchInput.oninput=function(){


    updateScreen();


};









// =====================================
// LIMPAR LISTA
// =====================================


clearButton.onclick=function(){


    if(confirm(
    "Deseja apagar todos os participantes?"
    )){


        participants=[];


        updateScreen();


    }


};
// =====================================
// CONTAGEM 3 2 1
// =====================================


function countdown(){


return new Promise(resolve=>{


    countdownOverlay
    .classList
    .remove("hidden");



    let count = 3;



    countNumber.innerText = count;



    let timer = setInterval(()=>{


        count--;



        if(count === 0){


            clearInterval(timer);



            countdownOverlay
            .classList
            .add("hidden");



            resolve();


        }

        else{


            countNumber.innerText = count;


        }



    },1000);



});


}









// =====================================
// EMBARALHAMENTO JUSTO
// TODOS OS NÚMEROS COM A MESMA CHANCE
// =====================================


function shuffle(array){



    let newArray = [...array];



    for(let i = newArray.length - 1; i > 0; i--){



        let randomIndex =

        Math.floor(
        Math.random() * (i + 1)
        );




        [
            newArray[i],
            newArray[randomIndex]

        ] = [

            newArray[randomIndex],
            newArray[i]

        ];



    }



    return newArray;


}









// =====================================
// ANIMAÇÃO RÁPIDA DO RESULTADO
// TERMINA NO VENCEDOR REAL
// =====================================


function raffleAnimation(finalWinner){



return new Promise(resolve=>{


    let duration = 1200;


    let start = Date.now();





    let animation =

    setInterval(()=>{



        let randomParticipant =


        participants[

            Math.floor(

            Math.random() *

            participants.length

            )

        ];






        // subida suave


        winnerNumber.style.transform =

        "translateY(-25px)";


        winnerName.style.transform =

        "translateY(-25px)";




        winnerNumber.style.opacity = "0";


        winnerName.style.opacity = "0";






        setTimeout(()=>{



            winnerNumber.innerText =

            randomParticipant.number;



            winnerName.innerText =

            randomParticipant.name;





            winnerNumber.style.transform =

            "translateY(0)";



            winnerName.style.transform =

            "translateY(0)";





            winnerNumber.style.opacity = "1";


            winnerName.style.opacity = "1";



        },80);







        if(Date.now() - start >= duration){



            clearInterval(animation);




            // garante mostrar o vencedor correto


            winnerNumber.innerText =

            finalWinner.number;



            winnerName.innerText =

            finalWinner.name;





            resolve();



        }





    },90);



});


}









// =====================================
// CHUVA DE FLORES PREMIUM
// =====================================


function createFlowers(){



    let flowers = [


        "🌸",

        "🌺",

        "🌷",

        "🌹",

        "✨",

        "💮"


    ];







    for(let i=0;i<100;i++){



        let flower =

        document.createElement("div");



        flower.innerHTML =


        flowers[

            Math.floor(

            Math.random() *

            flowers.length

            )

        ];






        flower.style.position = "fixed";



        flower.style.top = "-50px";



        flower.style.left =


        Math.random()*100+"vw";





        flower.style.fontSize =


        (Math.random()*25+15)+"px";





        flower.style.zIndex = "3000";



        flower.style.pointerEvents = "none";





        let duration =


        Math.random()*5+5;






        flower.style.animation =


        `fall ${duration}s linear`;







        document.body.appendChild(flower);






        setTimeout(()=>{


            flower.remove();



        },duration*1000);



    }



}
// =====================================
// REALIZAR SORTEIO
// =====================================


drawButton.onclick = async function(){



    if(participants.length === 0){


        alert(
        "Adicione participantes primeiro!"
        );


        return;


    }






    // Contagem 3 2 1

    await countdown();







    // Escolhe o vencedor antes da animação

    let shuffledParticipants =

    shuffle(participants);





    let winner =

    shuffledParticipants[0];







    // Faz animação terminando no vencedor real

    await raffleAnimation(winner);








    winnerNumber.innerText =

    winner.number;



    winnerName.innerText =

    winner.name;








    lastWinner =

    winner.name;






    localStorage.setItem(

    "ultimoVencedor",

    lastWinner

    );








    updateScreen();







    winnerOverlay

    .classList

    .remove("hidden");








    createFlowers();



};









// =====================================
// FECHAR RESULTADO
// =====================================


closeWinner.onclick=function(){



    winnerOverlay

    .classList

    .add("hidden");


};









// =====================================
// MODO NOTURNO
// =====================================


let darkMode =

localStorage.getItem("darkMode");







if(darkMode === "true"){



    document.body

    .classList

    .add("dark");



    themeButton.innerHTML = "☀️";


}








themeButton.onclick=function(){



    document.body

    .classList

    .toggle("dark");







    let enabled =


    document.body

    .classList

    .contains("dark");








    localStorage.setItem(

    "darkMode",

    enabled

    );








    themeButton.innerHTML =


    enabled ? "☀️" : "🌙";



};









// =====================================
// ANIMAÇÕES
// =====================================


let style =

document.createElement("style");





style.innerHTML = `



#winnerNumber,

#winnerName{


transition:

transform .25s ease,

opacity .25s ease;


}





@keyframes fall{



0%{


transform:

translateY(-50px)

translateX(0)

rotate(0deg);



opacity:1;


}




50%{


transform:

translateY(50vh)

translateX(50px)

rotate(180deg);


}




100%{


transform:

translateY(120vh)

translateX(-50px)

rotate(360deg);



opacity:0;


}



}



`;





document.head.appendChild(style);









// =====================================
// INICIAR SISTEMA
// =====================================


updateScreen();