// Gestion de tableau
const pays = ["Unknow", "France", "Ghana", "Allemagne", "Italie", "Espagne"];

pays[0] = "EUA";
pays[6] = "Portugal";
const eua = pays[0];
pays.unshift("Libéria");

let pos = pays.indexOf("France");
console.log("L'indice de la position de la France est la suivante : " + pos);

console.log(eua);
console.log(pays);
console.log("------------");

let paysListe2 = [
  "Togo",
  "Maroc",
  "Belgique",
  "Burkina Fasso",
  "Suisse",
  "Nouvelle-Calédonie",
];

// A partir de la position 2 on supprime 3 éléments
let p = 3;
n = 3;
let suppr = paysListe2.splice(p, n);
console.log("Les trois derniers pays ont disparu : " + paysListe2);
console.log("------------");

const villes = [
  "Paris",
  "Lyon",
  "Bordeaux",
  "Montpellier",
  "Pékin",
  "Buenos Aires",
];

for (let i = 0; i < villes.length; i++) {
  {
    console.log("Villes : " + villes[i]);
  }
}
// for(let ville of villes) {log("affichage" + ville)}
// for(let ville2 in villes2) {log("affichage autre" + villes[ville])}
console.log("------------");

let tab = new Array("Style", 10, "Marché");
console.log(tab);

// Autre méthode
let newTab = new Array(4);
newTab[0] = 1;
newTab[1] = "Cristiano Ronaldo";
newTab[2] = "Charles Péguy";
newTab[3] = false;
console.log(newTab);

// Remplir un tableau
let nums = [];
nums[0] = 1;
nums[1] = 3;
nums[2] = 5;
// Séparation du tableau
nums.length = 2;
console.log(
  "La taille du tableau suivant est de : " + nums.length + " éléments !",
); // Le 5 tombe
console.log(nums);
console.log("------------");

// Tableau multidimentionnel
let matrix = [[1, 2, 3], [(4, 5, 6)], [7, 8, 9]];
console.log("3e chiffre du 3e tableau : " + matrix[2][2]); // On récup. le nombre 9

// Objets
let obj = new Object(); // Objet constructeur

console.log("------------");
// Objet littéral
let utilisateur = {
  nom: "Prince",
  taille: 181,
  poids: 90,
  // Objets imbriqués
  notes: {
    anglais: 14,
    math: 13,
  },
};
// nomObj.propriété pour y avoir accès
console.log("Mon personnage et ses stats :");
console.log(utilisateur.nom);
console.log(utilisateur.taille + " mètre");
console.log(utilisateur.poids + " kilogramme");
console.log("Note : " + utilisateur.notes.anglais + " en anglais");
console.log("Note : " + utilisateur.notes.math + " en math");
console.log("------------");

const animal = {
  bruit: "waou waou",
  ndp: 4,
  // Méthode d'objets
  presentation: function () {
    console.log(
      "Mon aboyement est " + this.bruit + " et j'ai " + this.ndp + " pattes.",
    );
  },
};
animal.presentation();
console.log("------------");

// 1) Getter : pour obtenir la valeur d'une propriété
// 2) Setter : pour fixer/changer la valeur d'une propriété

// 1)
const student = {
  // data property
  firstName: "Monica",

  // accessor property(getter)
  get getName() {
    return this.firstName;
  },
};

// accessing data property
console.log(student.firstName); // Monica
// accessing getter methods
console.log(student.getName); // Monica
console.log("------------");

// 2)
const student2 = {
  firstName: "Monica",

  //accessor property(setter)
  set changeName(newName) {
    this.firstName = newName;
  },
};
console.log("Mon ancien prénom est : " + student2.firstName); // Monica
// change(set) object property using a setter
student2.changeName = "Sarah";
console.log("Mon nouveau prénom est : " + student2.firstName); // Sarah
console.log("------------");

// Définition de Classe (aire d'un rectangle)
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur;
    this.largeur;
  }
  hauteur = 10;
  largeur = 15;
  aire() {
    return this.hauteur * this.largeur;
  }
}
const rect = new Rectangle();
console.log("Aire = " + rect.aire());

// Autres exercices
// Inverser les variables de deux valeurs
let a = 1
let b = 5
console.log("A : " + a + " " + "B : " + b);
a = 5 // Réaffection de valeurs
b = 1
console.log(a + " " + b);

// Afficher des types dans les variables et les afficher
nom = "toto" 
age = 30
homme = true 
console.log("Nom : " + nom + " " + ". Age : " + age);
if (!homme) {
    console.log("Sexe : femme");
} else {
    console.log("Sexe : homme");
}

// Variable et fonction
let l = "lol1";
console.log(l);

function lol(test) {
  console.log("lol2");
}
lol();
console.log("------------");