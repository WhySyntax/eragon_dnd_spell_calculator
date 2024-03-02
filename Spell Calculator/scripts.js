window.onload = function() {
   update_stat("wisdom", "ch-wis");
   update_stat("charisma", "ch-ch");
}

function update_stat(stat_slider, output_id) {
   var stat = document.getElementById(stat_slider).value;
   document.getElementById(output_id).innerHTML = String(stat).padStart(2, "0");
}

function calc_effect() {
   // var data = localStorage.getItem('dnd_characters');
   // if (data) {
   //    for (const character of (data.split('\n'))) {
   //       console.log(`${character}`);
   //    }
   // } // artifact from when I used this function to make sure that characters were stored properly
}

function retrieve_character() {
   // Get the values of the inputs
   var character_name = document.getElementById('ch_name').value;
   if (character_name == "") {
      alert("Can't retrieve a nameless character");
      return;
   }

   var existingCharacters = localStorage.getItem('dnd_characters');

   if (existingCharacters) {
      let characters = existingCharacters.split('\n');
      for (const character of characters.slice(1)) {
         let ch = character.split(',');
         if (character_name == ch[0]) {
            document.getElementById("wisdom").value = ch[1];
            document.getElementById("charisma").value = ch[2];
            update_stat("wisdom", "ch-wis");
            update_stat("charisma", "ch-ch");
            return;
         }
      }
   }
   alert("Character with that name doesn't exist");
}

function clear_characters() {
   if (localStorage.getItem('dnd_characters')) {
      localStorage.removeItem('dnd_characters');
      alert("Local storage has been cleared");
   } else {
      alert("No characters are currently saved");
   }
}

function save_character() {
   // Get the values of the inputs
   var character_name = document.getElementById('ch_name').value;
   if (character_name == "") {
      alert("Won't save stats of nameless characters");
      return;
   }

   var ch_wis = document.getElementById('wisdom').value;
   var ch_ch = document.getElementById('charisma').value;

   // Create a CSV string
   var csvData = "Character Name,Wisdom,Charisma\n";
   csvData += `${character_name},${ch_wis},${ch_ch}\n`;

   // Check if there's existing data in localStorage
   var existingData = localStorage.getItem('dnd_characters');

   if (existingData) {
      let characters = existingData.split('\n');
      for (const character of characters.slice(1)) {
         if (character_name != character.split(',')[0]) {
            csvData += character + '\n';
         }
      }
   }

   localStorage.setItem('dnd_characters', csvData);

   alert('Character has been saved');
}