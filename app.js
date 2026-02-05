const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const photo = document.getElementById("photo");
const actions = document.getElementById("actions");
const hint = document.getElementById("hint");

const yoFotos = [
  "assets/yo1.jpg",
  "assets/yo2.jpg",
  "assets/yo3.jpg",
  "assets/yo4.jpg",
  "assets/yo5.jpg",
  "assets/yo6.jpg",
];

const fotoNosotros = "assets/nosotros.jpg";

let step = 0;
let noCount = 0;

// Frases que van cambiando con el NO
const noPhrases = [
  "¿Segura, gordita? 🥺",
  "Piénsalo otra vez...",
  "Me vas a romper el corazón 💔",
  "Vamos, tú sabes que quieres decir que sí 😏",
  "Ya casi me convences de llorar 😭",
  "Ok... pero mira el botón de SÍ, está precioso 👀",
  "Última oportunidad, gordita... 🙃",
  "Yo no me rindo 😤❤️",
];

function setStartScreen(){
  step = 0;
  noCount = 0;
  title.textContent = "Hola gordita 🧡💜";
  subtitle.textContent = "Tengo algo importante que preguntarte...";
  photo.src = yoFotos[0];
  hint.textContent = "*(Toca “Continuar”)*";

  actions.innerHTML = `
    <button class="btn primary" id="btnStart">Continuar</button>
  `;

  document.getElementById("btnStart").addEventListener("click", () => {
    setQuestionScreen();
  });
}

function setQuestionScreen(){
  step = 1;
  noCount = 0;

  title.textContent = "Gordita...";
  subtitle.textContent = "¿Quieres ser mi San Valentín? 💘";
  photo.src = yoFotos[1] || yoFotos[0];
  hint.textContent = "*(Puedes responder con honestidad 😏)*";

  actions.innerHTML = `
    <button class="btn primary" id="btnYes">Sí 🧡</button>
    <button class="btn danger" id="btnNo">No</button>
  `;

  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");

  btnYes.addEventListener("click", () => setYesScreen());
  btnNo.addEventListener("click", () => handleNo(btnYes, btnNo));
}

function handleNo(btnYes, btnNo){
  noCount++;

  // Cambia frase
  const phrase = noPhrases[(noCount - 1) % noPhrases.length];
  title.textContent = phrase;

  // Cambia imagen (rota por tus fotos)
  const idx = (noCount + 1) % yoFotos.length;
  photo.src = yoFotos[idx];

  // Botón SÍ crece, NO se encoge
  const grow = Math.min(1 + noCount * 0.12, 2.2);      // hasta 2.2x
  const shrink = Math.max(1 - noCount * 0.08, 0.55);   // hasta 0.55x

  btnYes.style.transform = `scale(${grow})`;
  btnYes.style.boxShadow = `0 16px 40px rgba(37,99,235,${0.18 + noCount*0.03})`;

  btnNo.style.transform = `scale(${shrink})`;
  btnNo.style.opacity = `${Math.max(1 - noCount*0.08, 0.55)}`;

  // Cambia subtítulo también
  if(noCount >= 3 && noCount < 6){
    subtitle.textContent = "No te hagas la difícil 😌🧡 ¿Sí o sí?";
  } else if(noCount >= 6){
    subtitle.textContent = "Gordita… yo ya sé la respuesta 😏💘";
  }

  hint.textContent = `*(Intento #${noCount} de “No” 😭)*`;
}

function setYesScreen(){
  step = 2;

  title.textContent = "SABÍA QUE DIRÍAS QUE SÍ 🧡";
  subtitle.textContent = "Gracias por hacerme el hombre más feliz, sabía que dirías que sí 💜";
  photo.src = fotoNosotros;
  hint.textContent = "*(Te amo, gordita)*";

  actions.innerHTML = `
    <button class="btn primary" id="btnAgain">Ver otra vez 🥹</button>
  `;

  document.getElementById("btnAgain").addEventListener("click", () => {
    setStartScreen();
  });

  startHearts();
}

function startHearts(){
  // suelta corazones por 6 seg
  const start = Date.now();
  const interval = setInterval(() => {
    spawnHeart();
    if(Date.now() - start > 6000) clearInterval(interval);
  }, 180);
}

function spawnHeart(){
  const el = document.createElement("div");
  el.className = "heart";
  el.textContent = Math.random() > 0.5 ? "🧡" : "💜";
  el.style.left = `${Math.random() * 100}vw`;
  el.style.animationDuration = `${4 + Math.random()*3}s`;
  el.style.fontSize = `${14 + Math.random()*18}px`;
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 8000);
}

setStartScreen();
