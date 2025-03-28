let currentEnergy = 0;
let currentMood = 0;
let currentPrestige = 0;
let currentSceneIndex = 0;
let characterName = "";
const scenes = [
  { text: "Ti svegli al mattino. Che fai?",
    choices: [
      { text: "Doveri quotidiani", effects: { energy: -20, mood: -5, prestige: +10 } },
      { text: "Pausa rilassante", effects: { energy: +10, mood: +10, prestige: -10 } }
    ]
  },
  { text: "Una signora chiede aiuto. Che fai?",
    choices: [
      { text: "Aiutala", effects: { energy: -15, mood: +10, prestige: +15 } },
      { text: "La ignori", effects: { energy: 0, mood: -5, prestige: -15 } }
    ]
  }
];
function updateStats() {
  currentEnergy = Math.max(0, Math.min(100, currentEnergy));
  currentMood = Math.max(0, Math.min(100, currentMood));
  currentPrestige = Math.max(0, Math.min(100, currentPrestige));
  document.getElementById('energyBar').style.width = currentEnergy + "%";
  document.getElementById('moodBar').style.width = currentMood + "%";
  document.getElementById('prestigeBar').style.width = currentPrestige + "%";
}
function showScene() {
  const scene = scenes[currentSceneIndex];
  document.getElementById('sceneText').textContent = scene.text;
  const choicesContainer = document.getElementById('choices');
  choicesContainer.innerHTML = "";
  scene.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.onclick = () => chooseOption(index);
    choicesContainer.appendChild(btn);
  });
}
function applyEffects(effects) {
  currentEnergy += effects.energy;
  currentMood += effects.mood;
  currentPrestige += effects.prestige;
  updateStats();
}
function chooseOption(index) {
  applyEffects(scenes[currentSceneIndex].choices[index].effects);
  currentSceneIndex++;
  currentSceneIndex < scenes.length ? showScene() : endGame();
}
function endGame() {
  document.getElementById('gameScreen').style.display = "none";
  document.getElementById('endScreen').style.display = "block";
  let text = "";
  text += currentPrestige >= 70 ? "Ammirato." : currentPrestige >= 40 ? "Rispetatto." : "Ignorato.";
  text += currentEnergy >= 70 ? " Energico." : currentEnergy >= 30 ? " Stanco." : " Esausto.";
  text += currentMood >= 70 ? " Felice." : currentMood >= 30 ? " Neutro." : " Depresso.";
  text += "<br><br>Energia " + currentEnergy + ", Umore " + currentMood + ", Prestigio " + currentPrestige + ".";
  document.getElementById('endMessage').innerHTML = text;
}
document.querySelectorAll('.charBtn').forEach(btn => {
  btn.onclick = () => {
    characterName = btn.dataset.name;
    currentEnergy = parseInt(btn.dataset.energy);
    currentMood = parseInt(btn.dataset.mood);
    currentPrestige = parseInt(btn.dataset.prestige);
    document.getElementById('charSelect').style.display = "none";
    document.getElementById('gameScreen').style.display = "block";
    updateStats(); currentSceneIndex = 0; showScene();
  };
});
document.getElementById('restartBtn').onclick = () => location.reload();
