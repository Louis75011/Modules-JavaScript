function insertHtmlVisualisateur() {
    // MODULE VISUALISATEUR AUDIO - INJECTION HTML
    const docHtmlV = document.getElementById("app");
    let htmlV = `
        <section>
          <h2>Visualisateur audio</h2>
            <canvas id="canvas"></canvas>
            <audio src="assets/RodrigoyGabriela-Tamacun.mp3" controls></audio>
            <div class="info"></div>
        </section>
            `;
    docHtmlV.innerHTML += htmlV;
  }
  insertHtmlVisualisateur();

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

  /*
  function insertHtmlVisualisateur() {
    // MODULE VISUALISATEUR AUDIO - INJECTION HTML
    const docHtmlV = document.getElementById("app");
    let htmlV = `
        <section>
          <h2>Visualisateur audio</h2>
            <canvas id="canvas"></canvas>
            <audio src="assets/RodrigoyGabriela-Tamacun.mp3" controls></audio>
            <div class="info"></div>
        </section>
            `;
    docHtmlV.innerHTML += htmlV;
  }
  insertHtmlVisualisateur();
  */