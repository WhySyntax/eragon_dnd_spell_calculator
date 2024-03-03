window.onload = function() {
   update_stat("wisdom", "ch-wis");
   update_stat("charisma", "ch-ch");
}

function update_stat(stat_slider, output_id) {
   var stat = document.getElementById(stat_slider).value;
   document.getElementById(output_id).innerHTML = String(stat).padStart(2, "0");
}

var words = new Map();
{
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         console.log("retrieved file correctly");
         var raw = this.responseText.split('\n');
         for (var row of raw.slice(1)) {
            var curr_word = row.split(',');
            words.set(curr_word[0], curr_word.slice(1));
         }
         console.log(`File Contents: ${raw}`);
      } else {
         console.log(`Look up status code ${this.status}`);
      }
   };
   xhttp.open("POST", "data/all_words.csv", true);
   xhttp.send();
}

function calc_spell_stats() {
   var spell = document.getElementById("spell_phrase").innerHTML;
   var spell_dmg = [0, 0, 0, 0, 0, 0];
   var spell_cost = 0;
   var spell_range = 0;
   var spell_aoe = 0;
   var psychic = false;
   for (var word of spell.split(' ')) {
      //the way we're doing damage in our dnd campaign is a veritable clusterfuck, so I'm not dealing with that right now
      var word_stats = words.get(word);
      if (word_stats) {
         spell_cost += Number(word_stats[0]);
         spell_range = Math.max(spell_range, Number(word_stats[3]));
         spell_aoe = Math.max(spell_aoe, Number(word_stats[2]));
         if (word_stats[4] === 'true') {
            psychic = true
         }
      }
   }
   display_spell_stats(spell_dmg, spell_cost, spell_range, spell_aoe);
}

function display_spell_stats(dmg, cost, range, aoe) {
   let dmg_disp = document.getElementById("damage");
   let cost_disp = document.getElementById("cost");
   let range_disp = document.getElementById("range");
   let aoe_disp = document.getElementById("aoe");
   cost_disp.innerHTML = cost;
   if (range != 0) {
      range_disp.innerHTML = range + " feet range";
   } else {
      range_disp.innerHTML = "touch range";
   }
   if (aoe != 0) {
      aoe_disp.innerHTML = aoe + " feet diameter";
   } else {
      aoe_disp.innerHTML = "single target";
   }
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
      for (var character of characters.slice(1)) {
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
      for (var character of characters.slice(1)) {
         if (character_name != character.split(',')[0]) {
            csvData += character + '\n';
         }
      }
   }

   localStorage.setItem('dnd_characters', csvData);

   alert('Character has been saved');
}