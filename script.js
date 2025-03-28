let player = {
  name: "",
  gender: "",
  role: ""
};

function startGame() {
  document.getElementById("splash-screen").style.display = "none";
  document.getElementById("character-creation").style.display = "block";
}

function confirmCharacter() {
  const name = document.getElementById("playerName").value;
  const gender = document.getElementById("playerGender").value;
  const role = document.getElementById("playerRole").value;

  if (!name.trim()) {
    alert("Inserisci il tuo nome per proseguire.");
    return;
  }

  player.name = name;
  player.gender = gender;
  player.role = role;

  document.getElementById("character-creation").style.display = "none";
  document.getElementById("intro-story").style.display = "block";

  const story = `
    <h2>Ciao ${player.name}, benvenut${player.gender === 'Donna' ? 'a' : 'o'} a Saméria!</h2>
    <p>Sei appena arrivat${player.gender === 'Donna' ? 'a' : 'o'} nel villaggio turistico dove lavorerai tutta l’estate come <strong>${player.role}</strong>.</p>
    <p>La struttura si affaccia su una splendida spiaggia del sud Italia. Le camere sono piene di famiglie, coppie e gruppi in vacanza. L’équipe è composta da altri animatori come te, ognuno con il suo carattere, la sua esperienza e i suoi problemi.</p>
    <p>Dovrai affrontare missioni quotidiane, gestire gli imprevisti, fare amicizia (o discutere) con colleghi, conquistare il pubblico durante gli spettacoli serali e – se ti farai notare – scalare i ranghi fino a diventare Capo Équipe.</p>
    <p>Inizia la tua avventura e preparati a vivere un’estate indimenticabile!</p>
  `;
  document.getElementById("story-text").innerHTML = story;
}

function beginAdventure() {
  document.getElementById("intro-story").style.display = "none";
  document.getElementById("gameplay").style.display = "block";
  document.getElementById("statName").innerText = player.name;
  document.getElementById("statRole").innerText = player.role;
  document.getElementById("statGender").innerText = player.gender;

  document.getElementById("sceneText").innerText = "Appena svegliat* nel tuo alloggio condiviso, senti bussare alla porta. È il Capo Équipe che vi chiama per l'accoglienza dei nuovi ospiti. Cosa fai?";
  const choices = document.getElementById("choices");
  choices.innerHTML = "";
  ["Ti prepari e scendi sorridente", "Fai finta di dormire", "Vai ma sei ancora in pigiama"].forEach((text) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => alert(`Hai scelto: ${text}`);
    choices.appendChild(btn);
  });
}
