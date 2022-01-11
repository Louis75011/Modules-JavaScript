// Fonction lancée au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  insertHtml();
});

function insertHtml() {
  
  const docHtml = document.getElementById("app");
  let html = `
  <header>
    <h1>Modules JavaScript</h1>
  </header>

  // MODULE JEU DU MORPION - INJECTION HTML
  <section>
    <h2>Jeu du morpion</h2>
        <div class="container">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <p class="info"></p>
    </section>

    // MODULE VISUALISATEUR AUDIO - INJECTION HTML
    <section>
          <h2>Visualisateur audio</h2>
            <canvas id="canvas"></canvas>
            <audio src="assets/RodrigoyGabriela-Tamacun.mp3" controls></audio>
            <div class="info"></div>
    </section>

    // MODULE TYPING GAME - INJECTION HTML
    <section>
        <h2>Typing game</h2>
        <p class="temps">Temps restant :</p>
        <p class="score">Points acumulés :</p>
    
        <div class="container-tg">
            <div class="phraseAEcrire"></div>
            <textarea class="phrase-test" autofocus></textarea>
        </div>
        <div class="info"></div>
    </section>
          `;
  docHtml.innerHTML += html;
  // console.log(html)

  // MODULE JEU DU MORPION - PROGRAMMATION JAVASCRIPT
  const info = document.querySelector(".info"); // Affichage de la partie en cours
  const cellules = document.querySelectorAll(".cell"); // Sélection de toutes les cellules

  let verouillage = true; // Fige la partie en cas de victoire
  let joueurEnCours = "X";

  info.innerHTML = `Au tour du joueur de ${joueurEnCours}`;

  const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // Cases gagnantes

  let partieEnCours = ["", "", "", "", "", "", "", "", ""]; // Strings vides qui attendent une valeur du joueur

  cellules.forEach((cell) => {
    cell.addEventListener("click", clicSurCase); // Boucler sur toutes les cases cliquables
  });

  // Gestion du clic sur les cases
  function clicSurCase(e) {
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute("data-index"); // Gestion de stockage des clics et des cases

    if (partieEnCours[caseIndex] !== "" || !verouillage) {
      return;
    } // Si le tableau du morpion est cliqué par un joueur, la case se remplie

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours);

    validationResultats();
    // changementDeJoueur();
  }

  // Validation du résultat de la partie
  function validationResultats() {
    let finDePartie = false; // La partie continue

    for (let i = 0; i < alignementsGagnants.length; i++) {
      // Itérer sur les 8 combinaisons gagnantes

      const checkWin = alignementsGagnants[i];
      let a = partieEnCours[checkWin[0]];
      let b = partieEnCours[checkWin[1]];
      let c = partieEnCours[checkWin[2]]; // Placements trois fois égales à X ou à O sur le tableau

      if (a === "" || b === "" || c === "") {
        continue; // Tant que le tableau n'est pas plein on continu
      }
      if (a === b && b === c) {
        finDePartie = true;
        break;
      }
    }
    // Gestion de la victoire du joueur concerné
    if (finDePartie) {
      info.innerText = `Le joueur ${joueurEnCours} a gagné !`;
      verouillage = false;
      return;
    }
    // Gestion de l'égalité
    let matchNul = !partieEnCours.includes(""); // Si toutes les cases sont remplies sans aucun vainqueur
    if (matchNul) {
      info.innerText = "Match nul !";
      verouillage = false;
      return;
    }
    changementDeJoueur();
  }

  // Tour alterné des joueurs
  function changementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X"; // Si joueur 2 le rond sinon la croix
    info.innerText = `Au tour du joueur de ${joueurEnCours}`;
  }

  // MODULE VISUALISATEUR AUDIO - PROGRAMMATION JAVASCRIPT
  const audioPlayer = document.querySelector("audio");
  audioPlayer.addEventListener("play", () => {
    //   Evènement déclanché par l'utilisateur
    const contexteAudio = new AudioContext();
    const src = contexteAudio.createMediaElementSource(audioPlayer);
    const analyseur = contexteAudio.createAnalyser(); // Donne des informations

    // Introduction du HTML Canvas
    const canvas = document.getElementById("canvas");
    // Tout espace d'utilisation
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Lancement du HTML Canvas
    const ctx = canvas.getContext("2d");

    // Connexion de l'analyseur au visualisateur
    src.connect(analyseur);
    analyseur.connect(contexteAudio.destination);

    // Fournir une fréquence
    analyseur.fftSize = 2048;

    const frequencesAudio = analyseur.frequencyBinCount; // Envoie de la moitié de la fréquence fixée
    // console.log(frequencesAudio); // soit 512 !

    // Tableau de fréquencesjouées converties en multiples rectangles sur notre écran
    const tableauFrequences = new Uint8Array(frequencesAudio);
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const largeurBarre = WIDTH / tableauFrequences.length + 2;
    let hauteurBarre;
    let x;

    function dessineBarres() {
      requestAnimationFrame(dessineBarres);
      x = 0;
      analyseur.getByteFrequencyData(tableauFrequences);

      // Dessin du fond en noir
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < frequencesAudio; i++) {
        hauteurBarre = tableauFrequences[i];
        let r = 150;
        let g = 80;
        let b = i;

        // Code couleur
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        // Placement des barres et leur action
        ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre);

        // Caller les rectangles les uns à la suite des autres
        x += largeurBarre + 1;
      }
    }
    dessineBarres();
  });

  // MODULE TYPING GAME - PROGRAMMATION JAVASCRIPT
  const APICALL = "http://api.quotable.io/random";
  // Affichage complet de nos paragraphes
  const tempsAffichage = document.querySelector(".temps");
  const scoreAffichage = document.querySelector(".score");

  const phraseAEcrire = document.querySelector(".phraseAEcrire");
  const phraseTest = document.querySelector(".phrase-test");

  let temps = 60; // Timer d'une minute
  let score = 0; // Initialiser point à zéro
  let phrasePourScore;

  tempsAffichage.innerText = `Temps : ${temps}`;
  scoreAffichage.innerText = `Score : ${score}`;

  let timer = setInterval(time, 1000);

  // Décrémentation progressive du minuteur
  function time() {
    temps--;
    tempsAffichage.innerText = `Temps : ${temps}`;
    scoreAffichage.innerText = `Score : ${score}`;
    if (temps === 0) {
      clearInterval(timer); // Le timer s'arrête à 0 seconde
    }
  }

  // Prendre une phrase de l'API
  async function afficherNvPhrase() {
    const appel = await fetch(APICALL); // Attendre le résultat de notre API
    const resultats = await appel.json();
    // console.log(resultats);
    const phrase = resultats.content;

    phrasePourScore = phrase.length;
    phraseAEcrire.innerHTML = "";

    // Couper chaque caractère dans un tableau à afficher en span
    phrase.split("").forEach((carac) => {
      // Prendre la phrase
      const caracSpan = document.createElement("span");
      caracSpan.innerText = carac;
      phraseAEcrire.appendChild(caracSpan); // Ajout pour chaque phrase
    });

    phraseTest.value = null;
  }

  afficherNvPhrase();

  // Quand on écrit dans l'input
  phraseTest.addEventListener("input", () => {
    const tableauPhrase = phraseAEcrire.querySelectorAll("span");
    const tableauTest = phraseTest.value.split("");
    let correct = true;

    // tableau de chaque vérification de phrase
    tableauPhrase.forEach((caracSpan, index) => {
      // console.log(caracSpan);
      const caractere = tableauTest[index]; // Checker chaque lettre

      if (caractere === undefined) {
        // Lettre correcte en vert et incorrecte en rouge
        caracSpan.classList.remove("correct");
        caracSpan.classList.remove("incorrect");
        correct = false;
      } else if (caractere === caracSpan.innerText) {
        caracSpan.classList.add("correct");
        caracSpan.classList.remove("incorrect");
      } else {
        caracSpan.classList.remove("correct");
        caracSpan.classList.add("incorrect");
        correct = false;
      }
    });

    if (correct) {
      afficherNvPhrase();
      score += phrasePourScore;
    }
  });
}
