var submit = document.getElementById("form")
var state = document.getElementById("state");
var service = document.getElementById("service");
var unit = document.getElementById("unit");
var date = document.getElementById("date");
var timeError = document.getElementById("timeError");
var hour = document.getElementById("hour");
var optionUnit = document.getElementById("optionUnit1")
var optionUnit2 = document.getElementById("optionUnit2")
service.style.color = "black"
unit.style.color = "black"
state.style.color = "black"
hour.style.color = "black"

function validHour(){
    let horas = hour.value.toString();
    console.log(horas)
    if(horas >= "06:00" && horas <= "18:30"){
        timeError.innerHTML = ""
    }else{
        timeError.innerHTML = "Horário não permitido, escolha um horário entre 6:00 e 18:00. "
        console.log("não permite")
    }
}

function getState(){
    if(state.value === "São Paulo"){
        optionUnit1.innerHTML = "São Paulo - Rua Carlos Paes  123"
        optionUnit1.value = "São Paulo - Rua Carlos Paes  123"

        optionUnit2.innerHTML = "São Paulo - Rua Bento Júnior 324"
        optionUnit2.value = "São Paulo - Rua Carlos Paes  123"
    }else if(state.value === "Rio de Janeiro"){
        optionUnit1.innerHTML = "Rio de Janeiro - Rua Xavier Alcantara 1988"
        optionUnit1.value = "Rio de Janeiro - Rua Xavier Alcantara 1988"

        optionUnit2.innerHTML = "Rio de Janeiro - Rua José do Verde 420"
        optionUnit2.value = "Rio de Janeiro - Rua José do Verde 420"

    }else if(state.value === "Bahia"){
        optionUnit1.innerHTML = "Bahia - Rua Gancho Enferrujado 778"
        optionUnit1.value = "Bahia - Rua Gancho Enferrujado 778"

        optionUnit2.innerHTML = "Bahia - Avenida dos Galantes 5444"
        optionUnit2.value = "Bahia - Avenida dos Galantes 5444"
    }else{
        optionUnit1.innerHTML = ""
        optionUnit1.value = ""

        optionUnit2.innerHTML = ""
        optionUnit2.value = ""
    }
}