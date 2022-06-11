function openModal(mn, name, question) {
    let modal = document.getElementById(mn);
    
    let userName = document.getElementById("contentHeader");
    let contentBody = document.getElementById("contentBody");
    userName.innerHTML = `Dúvida do usuário: ` + name;
    contentBody.innerHTML = question

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}