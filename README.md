# Eragon DnD Campaign Spell Effect Calculator
At the start of college, a friend of mine asked if I wanted to join a dnd campaign with him. The campaign was set in the world of Alagaesia, from the Inheritance cycle book series. The two of us worked with the DM to make a compeltely custom magic system based on the magic from the inheritance cycle.<br>
More information about the homebrewed aspect of the magic system can be found [here](https://homebrewery.naturalcrit.com/share/xgBay-APU2Lc).
## Issues
Creating the magic system wasn't too bad, the issue was balancing. As of the moment that I am writing this, we are still balancing the system as we play through sessions. The first 6 sessions of the campaign, two us didn't take damage a single time as we tore our way through enemies.<br>
A big part of why this was the case was that, while our magic system was comprehensive regarding what we wanted to be able to do with it, we didn't have very concrete rules about how.<br>
After session 4, me and the other player who made the system hammered out some concrete rules, such as how damage worked, and the limits of various words in spells, but now we had a new problem. There was too much we had to remember and keep on hand to play spells properly.
### My Solution
I was originally going to just make a spreadsheet with all the words and their stats and use some formulas to calculate the stats of any given spell, but my CS 290 class gave me another option. Make a webapp for it.<br>
This repo is just a single page where you put in relevant character stats and the spell you want to cast, and it will spit out the stats of the spell in question. Since I am now turning this in for a grade, I decided to make it a bit less barebones by adding in the following features.<br>
- You can save character stats to local storage so that you don't have to fnagle with the sliders every time you want to check the stats of a spell
- All individual word stats will be stored server-side. Since we're still actively balancing this system, this way I'd only have to change what's stored in a single location whenever we make a change.