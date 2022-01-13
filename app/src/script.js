// Fonction lancée au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  insertHtml();
});

// MODULES - INJECTION HTML
function insertHtml() {
  const docHtml = document.getElementById("app");
  let html = `
  <header>
    <h1>Modules JavaScript</h1>
  </header>
  <section id="jm">
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

    <section id="cb">
      <h2>Le casse-briques</h2>

      <canvas class="canvas2"></canvas>
      <p>Jouer avec la sourris</p>
      <p class="score2">Score</p>
      <div class="info"></div>
    </section>

    <section id="tg">
      <h2>Typing game</h2>

      <p class="temps">Temps restant :</p>
      <p class="score">Points acumulés :</p>
      <div class="container-tg">
          <div class="phraseAEcrire"></div>
          <textarea class="phrase-test" autofocus></textarea>
      </div>
      <div class="info"></div>
    </section>

    <section id="dd">
      <h2>Drag & Drop application :</h2>
      
      <div class="container-choix">
          <div class="case" id="premiere-case">
              <div class="base" draggable="true"></div>
          </div>
          <div id="destroy" class="destroy">Supprimer</div>
      </div>
      <!-- Trois cases à remplir -->
      <div class="container-cases">
          <div class="case"></div>
          <div class="case"></div>
          <div class="case"></div>
      </div>
      <p>Sélectionnez vos 3 photos aléatoires préférées</p>
      <div class="info"></div>
    </section>

    <section id="ms">
    <h2>Mon slider :</h2>

      <div class="slider">
        <div class="cont-slides">
          <img src="./assets/imgs/img1.jpg" class="active">
          <img src="./assets/imgs/img2.jpg" >
          <img src="./assets/imgs/img3.jpg" >
        </div>
      <div class="commandes">
        <button class="left">
          <img src="./assets/imgs/left.svg">
        </button>
        <button class="right">
          <img src="./assets/imgs/right.svg">
        </button>
      </div>
      <div class="cercles">
        <button data-clic="1" class="cercle active-cercle"></button>
        <button data-clic="2" class="cercle"></button>
        <button data-clic="3" class="cercle"></button>
      </div>
    </div>
    <div class="info"></div>
  </section>

    <section id="va">
      <h2>Visualisateur audio</h2>

      <canvas id="canvas"></canvas>
      <audio src="assets/RodrigoyGabriela-Tamacun.mp3" controls></audio>
      <div class="info"></div>
    </section>

    <section id="lv">
      <h2>Lecteur vidéo</h2>
      
      <div class="container-video">
          <video src="assets/ressources/video.mp4" class="video"></video>
          <div class="controls">
              <div class="barre-orange">
                  <div class="juice"></div>
              </div>
              <div class="buttons">
                  <button id="play-pause">
                      <img src="assets/ressources/play.svg">
                  </button>
                  <button id="mute">Mute</button>
                  <input type="range" id="volume-slider" min="0" max="100" value="50" step="1">
                  <button id="fullscreen">
                      <img src="assets/ressources/fullscreen.svg">
                  </button>
              </div>
          </div>
      </div>
      <div class="info"></div>
    </section>

    <section id="si">
      <h2>Jeu Space-Invaders</h2>

      <div class="grille"></div>
      <p>Jouer avec fleches horizontales et barre espace</p>
      <p id="si-score">Score : </p>
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

  // MODULE JEU DU CASSE-BRIQUE (Arkanoid) - PROGRAMMATION JAVASCRIPT
  // Selection et dessin du canevas
  const canvas2 = document.querySelector(".canvas2");
  const ctx = canvas2.getContext("2d");
  const affichageScore = document.querySelector(".score2");

  // Définition de balle, barre, briques
  const rayonBalle = 5,
    barreHeight = 5,
    barreWidth = 65,
    nbCol = 6,
    nbRow = 2,
    largeurBrique = 35,
    hauteurBrique = 15;

  // Position vertical et horizontal
  let x = canvas2.width / 2,
    y = canvas2.height - 30,
    barreX = (canvas2.width - barreWidth) / 2,
    fin = false,
    vitesseX = 1,
    vitesseY = -1,
    score2 = 0;

  function dessineBalle() {
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, Math.PI * 2); // Cercle entier grâce à PI*2
    ctx.fillStyle = "crimson"; // Couleur de l'élément
    ctx.fill();
    ctx.closePath();
  }
  // dessineBalle();

  function dessineBarre() {
    ctx.beginPath();
    ctx.rect(barreX, canvas2.height - barreHeight - 2, barreWidth, barreHeight); // Rectangle pour la barre
    ctx.fillStyle = "crimson";
    ctx.fill();
    ctx.closePath();
  }
  // dessineBarre();

  // Tableau vide récupérant toutes les briques
  const briques = [];
  for (let i = 0; i < nbRow; i++) {
    briques[i] = [];
    for (let j = 0; j < nbCol; j++) {
      // Objets avec un statut qui montre que la brique n'est pas détruite
      briques[i][j] = {
        x: 0,
        y: 0,
        statut: 1,
      };
    }
  }
  // console.log(briques);

  function dessineBriques() {
    for (let i = 0; i < nbRow; i++) {
      for (let j = 0; j < nbCol; j++) {
        if (briques[i][j].statut === 1) {
          // Tailles des briques à casser
          let briqueX = j * (largeurBrique + 10) + 22;
          let briqueY = i * (hauteurBrique + 10) + 18;

          briques[i][j].x = briqueX;
          briques[i][j].y = briqueY;

          // Dessin à réaliser
          ctx.beginPath();
          ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
          ctx.fillStyle = "crimson";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  // dessineBriques();

  function dessine() {
    if (fin === false) {
      // Si on perd effacer et remettre à zéro
      ctx.clearRect(0, 0, canvas2.width, canvas2.height);
      // Redessiner tout plus gestion collision
      dessineBriques();
      dessineBalle();
      dessineBarre();
      collisionDetection();

      // Si la balle cogne les murs ou une brique
      if (
        x + vitesseX > canvas2.width - rayonBalle ||
        x + vitesseX < rayonBalle
      ) {
        vitesseX = -vitesseX;
      }

      if (y + vitesseY < rayonBalle) {
        vitesseY = -vitesseY;
      }

      if (y + vitesseY > canvas2.height - rayonBalle) {
        // un intervalle de 0 à 75
        if (x > barreX && x < barreX + barreWidth) {
          // Si la balle à bas une brique elle accelère
          vitesseX = vitesseX + 0.1;
          vitesseY = vitesseY + 0.1;
          vitesseY = -vitesseY;
        } else {
          fin = true;
          affichageScore.innerHTML = `Tu as perdu !`;
        }
      }

      // Délai avec sensation d'animation
      x += vitesseX;
      y += vitesseY;
      requestAnimationFrame(dessine);
    }
  }
  dessine();

  function collisionDetection() {
    for (let i = 0; i < nbRow; i++) {
      for (let j = 0; j < nbCol; j++) {
        let b = briques[i][j];
        // La balle se cogne et détruit une brique concernée
        if (b.statut === 1) {
          if (
            x > b.x &&
            x < b.x + largeurBrique &&
            y > b.y &&
            y < b.y + hauteurBrique
          ) {
            vitesseY = -vitesseY;
            b.statut = 0;

            score2++;
            affichageScore.innerHTML = `Score : ${score2}`;

            // Vous gagnez si vous détruisez toutes les briques
            if (score2 === nbCol * nbRow) {
              affichageScore.innerHTML = `Bravo tu as gagné !`;
              fin = true;
            }
          }
        }
      }
    }
  }
  // Mouvement de la barre
  document.addEventListener("mousemove", mouvementSouris);

  function mouvementSouris(e) {
    let posXBarreCanvas = e.clientX - canvas2.offsetLeft;
    // e.clienX = de la gauche jusqu'à la souris
    // canvas2.offsetLeft = décalage par rapport à la gauche
    // console.log(posXBarreCanvas);

    if (posXBarreCanvas > 35 && posXBarreCanvas < canvas2.width - 35) {
      barreX = posXBarreCanvas - barreWidth / 2;
    }
  }

  // Recommencer
  canvas2.addEventListener("click", () => {
    if (fin === true) {
      fin = false;
      document.location.reload();
    }
  });

  // MODULE JEU SPACE-INVADERS - PROGRAMMATION JAVASCRIPT
  const container = document.querySelector(".grille");
  const affichage = document.querySelector("#si-score");

  let resultats = 0;
  let toutesLesDivs;
  let alienInvaders = [];
  let tireurPosition = 229; // Position de pixel
  let direction = 1;
  let width = 20;

  function creationGrilleEtAliens() {
    // Index des grilles
    let indexAttr = 0;

    // 240 car 20 petits carrés entrent sur la largeur d'une ligne
    for (i = 0; i < 240; i++) {
      // Si on vient de démarrer
      if (indexAttr === 0) {
        const bloc = document.createElement("div");
        bloc.setAttribute("data-left", "true");
        container.appendChild(bloc);
        indexAttr++;
        // Quand on arrive au dernier div, on remet l'index à 0 sur une nouvelle ligne
      } else if (indexAttr === 19) {
        const bloc = document.createElement("div");
        bloc.setAttribute("data-right", "true");
        container.appendChild(bloc);
        indexAttr = 0;
      } else {
        const bloc = document.createElement("div");
        container.appendChild(bloc);
        // On crée un petit bloc puis passe à celui d'à côté
        indexAttr++;
      }
    }

    // Création des aliens
    for (i = 1; i < 53; i++) {
      if (i === 13) {
        i = 21;
        // Push notre 1ère rangée
        alienInvaders.push(i);
      } else if (i === 33) {
        i = 41;
        // Push notre 2e rangée
        alienInvaders.push(i);
      } else {
        // Push notre 3e rangée
        alienInvaders.push(i);
      }
    }
    // console.log(alienInvaders);

    // Pour chaque alien créé (mis dans le tableau) on ajoute l'image
    toutesLesDivs = document.querySelectorAll(".grille div");
    alienInvaders.forEach((invader) => {
      toutesLesDivs[invader].classList.add("alien");
    });

    toutesLesDivs[tireurPosition].classList.add("tireur");
  }
  creationGrilleEtAliens();

  // Animation tireur
  function deplacerLeTireur(e) {
    // Tous les carrés qui correspondent à l'espace de notre tireur
    toutesLesDivs[tireurPosition].classList.remove("tireur"); // L'image disparé

    // On peut aller à gauche tant que l'on ne touche pas le bord
    if (e.keyCode === 37) {
      if (tireurPosition > 220) {
        tireurPosition -= 1;
      }
      // On peut aller à droite tant que l'on ne touche pas le bord
    } else if (e.keyCode === 39) {
      if (tireurPosition < 239) {
        tireurPosition += 1;
      }
    }
    toutesLesDivs[tireurPosition].classList.add("tireur"); // On redeplace le tireur
  }
  document.addEventListener("keydown", deplacerLeTireur);

  // Bouger les aliens
  let descendreRight = true;
  let descendreLeft = true;

  function bougerLesAliens() {
    // Si la moyenne des aliens arrivent au bout
    for (let i = 0; i < alienInvaders.length; i++) {
      if (
        // Les faire disparaître
        toutesLesDivs[alienInvaders[i]].getAttribute("data-right") === "true"
      ) {
        if (descendreRight) {
          // Laisser le temps à la boucle for de se terminer
          direction = 20;
          setTimeout(() => {
            descendreRight = false;
          }, 50);
        } else if (descendreRight === false) {
          direction = -1;
        }
        descendreLeft = true;
      } else if (
        toutesLesDivs[alienInvaders[i]].getAttribute("data-left") === "true"
      ) {
        // 20 est égale à la longueur d'une ligne, pour les faire descendre tous d'une ligne
        if (descendreLeft) {
          direction = 20;
          setTimeout(() => {
            descendreLeft = false;
          }, 50);
          // Inverser pour descendre du côté droit comme le gauche
        } else if (descendreLeft === false) {
          direction = 1;
        }
        descendreRight = true;
      }
    }

    // Gestion du déplacement idem au tireur mais avec les groupes d'aliens
    for (let i = 0; i < alienInvaders.length; i++) {
      toutesLesDivs[alienInvaders[i]].classList.remove("alien");
    }
    // Décaler sur le côté
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }
    for (let i = 0; i < alienInvaders.length; i++) {
      toutesLesDivs[alienInvaders[i]].classList.add("alien");
    }

    // Si les aliens arrivent tout en bas ou nosu touche sur votre case, on perd
    if (toutesLesDivs[tireurPosition].classList.contains("alien", "tireur")) {
      affichage.textContent = "Game Over";
      toutesLesDivs[tireurPosition].classList.add("boom"); // Héro meurt
      clearInterval(invaderId);
    }
    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > toutesLesDivs.length - width) {
        affichage.textContent = "Game Over";
        clearInterval(invaderId);
      }
    }
  }
  // Déplacement tous les 400 millisecondes
  invaderId = setInterval(bougerLesAliens, 400);

  // Le laser
  function tirer(e) {
    let laserId;
    let laserEnCours = tireurPosition;

    function deplacementLaser() {
      // Déplacement le laser avec le vaisseau
      toutesLesDivs[laserEnCours].classList.remove("laser");
      laserEnCours -= width;
      toutesLesDivs[laserEnCours].classList.add("laser");

      // Si le laser tombe sur une case div ennemie
      if (toutesLesDivs[laserEnCours].classList.contains("alien")) {
        toutesLesDivs[laserEnCours].classList.remove("laser"); // Un tir tue un alien
        toutesLesDivs[laserEnCours].classList.remove("alien");
        toutesLesDivs[laserEnCours].classList.add("boom"); // Mort de l'ennemi

        // Filtre un nouveau tableau en passant un nouveau élement
        alienInvaders = alienInvaders.filter((el) => el !== laserEnCours);

        setTimeout(
          () => toutesLesDivs[laserEnCours].classList.remove("boom"),
          350, // L'animation de mort est temporaire
        );
        clearInterval(laserId);

        // +1 point à chaque alien abbatu
        resultats++;
        // Si toutes les div détrutes
        if (resultats === 36) {
          affichage.textContent = "Bravo, c'est gagné !";
          clearInterval(invaderId);
        } else {
          affichage.textContent = `Score : ${resultats}`;
        }
      }

      // Check chaque déplacement de laser, on retire la classe ou elle était
      if (laserEnCours < width) {
        clearInterval(laserId);
        setTimeout(() => {
          toutesLesDivs[laserEnCours].classList.remove("laser");
        }, 100);
      }
    }

    // 100 ml seconde de temps de déplacement
    if (e.keyCode === 32) {
      laserId = setInterval(() => {
        deplacementLaser();
      }, 100);
    }
  }
  document.addEventListener("keyup", tirer);

  // MODULE DRAG & DROP - PROGRAMMATION JAVASCRIPT
  let base = document.querySelector(".base");
  const premiereCase = document.getElementById("premiere-case");
  const boxs = document.querySelectorAll(".case");
  const destroy = document.querySelector(".destroy");
  const allCases = [];
  // Cases et photos choisies
  const choix = [];
  let photoEnCours;

  for (i = 0; i < boxs.length; i++) {
    allCases.push(boxs[i]);
    // Toutes nos cases sont ajoutés dans un tableau
  }
  allCases.push(destroy);
  let indexPhoto = 1;

  // Image de chats aléatoires
  base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
  photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;

  function nvBase() {
    // On crée cet élément et il doit être possible de le "drag"
    const newBase = document.createElement("div");
    newBase.setAttribute("class", "base");
    newBase.setAttribute("draggable", "true");
    // Nouvelle valeur pour la photo suivante
    indexPhoto++;
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    premiereCase.appendChild(newBase);
    base = newBase;
  }

  // Ecouter l'évnèment de toutes nos cases
  for (const vide of allCases) {
    vide.addEventListener("dragover", dragOver);
    vide.addEventListener("dragenter", dragEnter);
    vide.addEventListener("drop", dragDrop);
  }

  // Créer les fonctions ajouter en second paramètre de notre AddEventListener
  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }

  function dragDrop() {
    // Permet de lâcher l'élément
    if (this.id === "premiere-case") {
      return;
    }
    // Si l'image est à la poubelle, on la supprime
    console.log(this.id === "destroy");
    // destroy
    if (this.id === "destroy") {
      base.remove();
      nvBase(); // Pour qu'une nouvelle image revienne en case de base ensuite
      return;
    }

    // Verouillage (l'image se fixera dans les 3 emplacements)
    this.removeEventListener("drop", dragDrop);
    this.removeEventListener("dragenter", dragEnter);
    this.removeEventListener("dragover", dragOver);

    this.appendChild(base);
    // Rien ne peut être "drag" sur le premier enfant (cases du bas)
    this.childNodes[0].setAttribute("draggable", false);
    nvBase();

    // Actualiser 3 choix maximal dans notre tableau
    choix.push(photoEnCours);
    if (choix.length === 3) {
      setTimeout(() => {
        alert("Votre sélection est terminée !");
      }, 200);
    }
  }

  // MODULE SLIDER - PROGRAMMATION JAVASCRIPT
  // Sélection de toutes les images, boutons et cercles
  const imgs = document.querySelectorAll(".cont-slides img");
  const suivant = document.querySelector(".right");
  const precedent = document.querySelector(".left");
  const cercles = document.querySelectorAll(".cercle");

  // Index à zéro, qui passe au suivant à chaque clic
  let index = 0;
  suivant.addEventListener("click", slideSuivante);

  function slideSuivante() {
    // Slide fonctionne tant qu'on ne dépasse pas trois éléments
    if (index < 2) {
      imgs[index].classList.remove("active");
      index++;
      imgs[index].classList.add("active");
    } else if (index === 2) {
      // On revient à l'image zéro quand on a fait le tour
      imgs[index].classList.remove("active");
      index = 0;
      imgs[index].classList.add("active");
    }

    // Actualiser l'image lorsque les cercles sont cliqués et non les boutons
    for (i = 0; i < cercles.length; i++) {
      if (cercles[i].getAttribute("data-clic") - 1 === index) {
        cercles[i].classList.add("active-cercle");
      } else {
        cercles[i].classList.remove("active-cercle");
      }
    }
  }

  // Même application pour la slide précédente
  precedent.addEventListener("click", slidePrecedente);

  function slidePrecedente() {
    if (index > 0) {
      imgs[index].classList.remove("active");
      index--;
      imgs[index].classList.add("active");
    } else if (index === 0) {
      imgs[index].classList.remove("active");
      index = 2;
      imgs[index].classList.add("active");
    }
    for (i = 0; i < cercles.length; i++) {
      if (cercles[i].getAttribute("data-clic") - 1 === index) {
        cercles[i].classList.add("active-cercle");
      } else {
        cercles[i].classList.remove("active-cercle");
      }
    }
  }
  // Possible de slider avec les fleches horizontales
  document.addEventListener("keydown", keyPressed);

  function keyPressed(e) {
    if (e.keyCode === 37) {
      slidePrecedente();
    } else if (e.keyCode === 39) {
      slideSuivante();
    }
  }

  // Cercles pour slider
  // Pour chaque cercle on est à l'écoute d'un clic
  cercles.forEach((cercle) => {
    cercle.addEventListener("click", function () {
      // Quand on clic sur un cercle, la classe active est retirée de tous les cercles
      for (let i = 0; i < cercles.length; i++) {
        cercles[i].classList.remove("active-cercle");
      }
      this.classList.add("active-cercle");

      imgs[index].classList.remove("active");
      // On met la nouvelle image cliquée
      index = this.getAttribute("data-clic") - 1;
      imgs[index].classList.add("active");
    });
  });

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
  scoreAffichage.innerText = `Points : ${score}`;

  let timer = setInterval(time, 1000);

  // Décrémentation progressive du minuteur
  function time() {
    temps--;
    tempsAffichage.innerText = `Temps : ${temps}`;
    scoreAffichage.innerText = `Points : ${score}`;
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

  // MODULE LECTEUR VIDÉO - PROGRAMMATION JAVASCRIPT
  const video = document.querySelector(".video");
  const btnPausePlay = document.getElementById("play-pause");
  const img = document.querySelector("#play-pause img");
  const barreOrange = document.querySelector(".barre-orange");
  const juice = document.querySelector(".juice");
  const muteBtn = document.getElementById("mute");
  const fullScreen = document.getElementById("fullscreen");
  const volumeSlider = document.getElementById("volume-slider");

  // Au clic sur la vidéo, si la vidéo et sur pause alors play, et inversement
  btnPausePlay.addEventListener("click", togglePlayPause);
  video.addEventListener("click", togglePlayPause);
  function togglePlayPause() {
    if (video.paused) {
      img.src = "../app/assets/ressources/pause.svg";
      video.play();
    } else {
      img.src = "../app/assets/ressources/play.svg";
      video.pause();
    }
  }

  // La barre orange à chaque fois que la vidéo tourne
  video.addEventListener("timeupdate", () => {
    // Récupérer le moment de la vidéo
    let juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";

    // Si la vidéo s'arrête alors l'icône de play revient
    if (video.ended) {
      img.src = "../assets/ressources/play.svg";
    }
  });

  // Gestion du volume d'un range de 0 à 1
  volumeSlider.addEventListener("change", () => {
    video.volume = volumeSlider.value / 100;
    // console.log(video.volume);
  });

  // Gestion de l'affichage de mute
  muteBtn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      muteBtn.innerText = "Mute";
    } else {
      video.muted = true;
      muteBtn.innerText = "Unmute";
    }
  });

  // Clic sur la barre
  let rect = barreOrange.getBoundingClientRect(); // Donne dimension et position par rapport à la barre
  let largeur = rect.width;

  // Barre d'avancée de la vidéo en temps
  barreOrange.addEventListener("click", (e) => {
    let x = e.clientX - rect.left; // Différence entre élément et côté gauche
    let widthPercent = (x * 100) / largeur; // Calcule du pourcentage du placement de la sourris sur la barre
    // console.log(widthPercent);
    let durationVideo = video.duration;
    // Position en seconde par rapport au pourcentage
    video.currentTime = durationVideo * (widthPercent / 100);
  });

  window.addEventListener("resize", () => {
    let rect = barreOrange.getBoundingClientRect();
    let largeur = rect.width;
  });
  // Le double clic fait passer en plein écran
  video.addEventListener("dblclick", () => {
    video.requestFullscreen();
  });
  fullScreen.addEventListener("click", () => {
    video.requestFullscreen();
  });

  /*
  <div class="container-video">
          <video src="assets/ressources/video.mp4" class="video"></video>
          <div class="controls">
              <div class="barre-orange">
                  <div class="juice"></div>
              </div>
              <div class="buttons">
                  <button id="play-pause">
                      <img src="assets/ressources/play.svg">
                  </button>
                  <button id="mute">Mute</button>
                  <input type="range" id="volume-slider" min="0" max="100" value="50" step="1">
                  <button id="fullscreen">
                      <img src="assets/ressources/fullscreen.svg">
                  </button>
              </div>
          </div>
      </div>
  */
}
