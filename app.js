const container = document.querySelector('.grille')
let toutesLesDivs
const affichage = document.querySelector('h3');
let resultats = 0 ;
let alienInvaders = []
let tireurposition = 229
let direction = 1
let width = 20;

function creationGrilleEtAliens(){

    let indexAttr = 0 
    for (let i = 0; i < 240; i++) {
        
        if(indexAttr === 0){
            const bloc = document.createElement('div')
            bloc.setAttribute('data-left', 'true')
            container.appendChild(bloc)
            indexAttr++
        }else if(indexAttr === 19){ 
            const bloc = document.createElement('div')
            bloc.setAttribute('data-right', 'true')
            container.appendChild(bloc)
            indexAttr = 0
        }else{
            const bloc = document.createElement('div')
            container.appendChild(bloc)
            indexAttr++
        }
    }

    for (let i = 1; i < 53; i++) {
        
        if(i === 13){
            i = 21 
            alienInvaders.push(i)
        }else if( i === 33){
            i = 41
            alienInvaders.push(i)
        }else{
            alienInvaders.push(i)
        }
    }

    toutesLesDivs = document.querySelectorAll('.grille div')
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien')
    });

    toutesLesDivs[tireurposition].classList.add('tireur')
}


creationGrilleEtAliens()



function deplacerLeTireur(e){
    toutesLesDivs[tireurposition].classList.remove('tireur')

    if(e.keyCode === 37){
        if(tireurposition > 220){
            tireurposition--
        }
    }else if(e.keyCode === 39){
        if(tireurposition < 239){
            tireurposition++
        }
    }
    toutesLesDivs[tireurposition].classList.add('tireur')
}


document.addEventListener('keydown', deplacerLeTireur)   

let descendreRight = true
let descendreLeft = true

function bougerLesAliens(){
    
    for (let i = 0; i < alienInvaders.length; i++) {
        if(toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true'){
            if (descendreRight) {
                direction = 20 
                setTimeout(() => {
                    descendreRight = false
                }, 50);
            }else if(descendreRight === false){
                direction  = -1 
            }

            descendreLeft = true
        }else if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true'){
            if (descendreLeft) {
                direction = 20 
                setTimeout(() => {
                    descendreLeft = false
                }, 50);
            }else if(descendreLeft === false){
                direction  = 1 
            }
            descendreRight = true
        }
    }


    for (let i = 0; i < alienInvaders.length; i++) {
        
        toutesLesDivs[alienInvaders[i]].classList.remove('alien')
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        
        toutesLesDivs[alienInvaders[i]].classList.add('alien')
    }

    if(toutesLesDivs[tireurposition].classList.contains('alien', 'tireur')){
        affichage.textContent = "Game Over"
        toutesLesDivs[tireurposition].classList.add('boom')
        clearInterval(invaderId)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > toutesLesDivs.length -width){
            affichage.textContent = 'Game Over'
            clearInterval(invaderId)
        }
        
        
    }
     
} 

invaderId = setInterval(bougerLesAliens,500);


function tirer(e){

    let laserId
    let laserEncours =  tireurposition

    function deplacementLaser(){
        toutesLesDivs[laserEncours].classList.remove('laser')
        laserEncours -= width
        toutesLesDivs[laserEncours].classList.add('laser')


        if(toutesLesDivs[laserEncours].classList.contains('alien')){
            toutesLesDivs[laserEncours].classList.remove('laser')
            toutesLesDivs[laserEncours].classList.remove('alien')
            toutesLesDivs[laserEncours].classList.add('boom')

            alienInvaders = alienInvaders.filter(el => el!== laserEncours)
            setTimeout(() => {
                toutesLesDivs[laserEncours].classList.remove('boom')
            }, 250);

            clearInterval(laserId)

            resultats++
            if(resultats === 36){
                affichage.textContent = "Bravo, c'est gagné !"
                clearInterval(invaderId)
            }else{
                affichage.textContent = `Score : ${resultats}`
            }
        }


        if(laserEncours < width){
            clearInterval(laserId)
            setTimeout(() => {
                toutesLesDivs[laserEncours].classList.remove('laser')
            }, 100);
        }
    }

    if(e.keyCode === 32){
        laserId = setInterval(() => {
            deplacementLaser()
        }, 100);
    }
}


document.addEventListener('keyup', tirer)