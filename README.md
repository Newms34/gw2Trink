# Guild Wars 2 Trinket Manager
---
#### Contents: 
 - [About](#about)
 - [Instructions](#instructions)
 - [Credits](#credits)

---
#### About:
Guild Wars 2 Trinket Manager (GW2Trink) lists all the trinkets for every character on an account, as well as whether those trinkets match a predefined stat "goal". Everything's stored locally, so it's safe.

----
#### Instructions:
##### Getting a Key
1. Head on over to [account.arena.net](https://account.arena.net) and click the `Applications` tab. 
2. Click `New Key`. I need the Characters, Inventories, and Account permissions, and I'll probably use the Builds permissions later. You can of course just elect to pick all. Remember: the GW2 API is read-only, so don't worry about giving too much permission
3. Click `Create API Key`
4. Copy that API key. You'll be asked for that when you first visit GW2Trink.

##### Using GW2Trink
1. When you first visit GW2Trink, you'll be asked for an API key. This is stored locally (i.e., I never see it).
2. Click Okay once you've pasted in your API key, and your characters will load.
3. Once your characters have loaded, you'll need to pick a target stat "type" for each character. For example, my scourge uses the "Condition" stat type, which can include Viper's, Grieving, or even Rabid.
4. Characters that are "complete" (have all ascended trinkets, and all trinket stats fall within the required target stat type) will be faded out. 

---
#### Credits:
 - Credit of course goes to amazing people over at ArenaNet, who not only made an awesome game with some really great stories (go [get it](http://buy.guildwars2.com) if you don't have it!), but also gave us one of the easiest, most straightforward APIs ever. Seriously, no CORS nonsense makes me a happy dev.
 - I made this app. [Hi](https://github.com/Newms34)!