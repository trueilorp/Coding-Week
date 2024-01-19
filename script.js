const whatTimeIsIt = document.querySelector('.current-time');

function mostraOra(){
    var d = new Date();
    var ora = d.toLocaleTimeString();
    alert(ora);
}

whatTimeIsIt.addEventListener('click', mostraOra);


