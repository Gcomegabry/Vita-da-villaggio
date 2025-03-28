let currentRole = "";
let energy = 100;
let mood = 100;
let prestige = 0;
let currentStep = 0;

const scenarios = [
  {
    text: "È il primo giorno di stagione. Il capo équipe vi convoca per preparare i campi sportivi e l’anfiteatro. Cosa fai?",
    choices: [
      { text: "Ti metti subito al lavoro con entusiasmo.", effects: { energy: -10, mood: +5, prestige: +10 } },
      { text: "Fingi di darti da fare e ti nascondi dietro le quinte.", effects: { energy: -5, mood: -5, prestige: -15 } }
    ]
  },
  {
    text: "Il capo équipe organizza una riunione serale. Sei stanco morto ma sai che è importante. Che fai?",
    choices: [
      { text: "Partecipi e prendi appunti.", effects: { energy: -15, mood: -5, prestige: +15 } },
      { text: "Ti assenti e vai a dormire.", effects: { energy: +10, mood: +5, prestige: -20 } }
    ]
  },
  {
    text: "Durante il pranzo, siedi con gli ospiti. Una signora ti fa mille domande. Cosa fai?",
    choices: [
      { text: "Sorridi e rispondi con cortesia.", effects: { energy: -5, mood: +10, prestige: +10 } },
      { text: "Le dici che hai fretta e vai via.", effects: { energy: 0, mood: -10, prestige: -10 } }
    ]
  }
];

function selectRole(role) {
  currentRole = role;
  document.getElementById('character-selection').style.display = 'none';
  document.getElementById('gameplay').style.display = 'block';
  document.getElementById('role').innerText = role;
  showScenario();
}

function showScenario() {
  if (currentStep >= scenarios.length) {
    endGame();
    return;
  }
  const scenario = scenarios[currentStep];
  document.getElementById('scenario').innerHTML = `<p>${scenario.text}</p>`;
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = "";
  scenario.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => {
      applyEffects(choice.effects);
      currentStep++;
      showScenario();
    };
    choicesDiv.appendChild(btn);
  });
}

function applyEffects(effects) {
  energy += effects.energy;
  mood += effects.mood;
  prestige += effects.prestige;
  updateStats();
}

function updateStats() {
  document.getElementById('energy').innerText = energy;
  document.getElementById('mood').innerText = mood;
  document.getElementById('prestige').innerText = prestige;
}

function endGame() {
  document.getElementById('gameplay').style.display = 'none';
  document.getElementById('game-end').style.display = 'block';
  let message = "Hai concluso il turno come " + currentRole + ".<br>";
  message += "Energia: " + energy + "<br>";
  message += "Umore: " + mood + "<br>";
  message += "Prestigio: " + prestige + "<br>";
  if (prestige >= 30) {
    message += "<strong>Complimenti! Sei sulla buona strada per diventare capo équipe.</strong>";
  } else {
    message += "<strong>Dovrai impegnarti di più per farti notare.</strong>";
  }
  document.getElementById('final-message').innerHTML = message;
}
