// import {storage} from './store.js';
const mainComp = new Vue({
    el: '#main',
    data: {
        allChars: [],
        slots: ['Accessory1', 'Accessory2', 'Backpack', 'Ring1', 'Ring2', 'Amulet'].sort(),
        apiKey: null,
        panelBg: '#333',
        statCombos: [
            {
                "name": "Mighty",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": []
            },
            {
                "name": "Precise",
                "type": "Precision",
                "maxVals": [
                    "Precision"
                ],
                "minVals": []
            },
            {
                "name": "Vital",
                "type": "Vitality",
                "maxVals": [
                    "Vitality"
                ],
                "minVals": []
            },
            {
                "name": "Resilient",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": []
            },
            {
                "name": "Lingering",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Vitality"
                ]
            },
            {
                "name": "Strong",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Precision"
                ]
            },
            {
                "name": "Ravaging",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Precision"
                ]
            },
            {
                "name": "Rejuvenating",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Power"
                ]
            },
            {
                "name": "Vigorous",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Vitality"
                ]
            },
            {
                "name": "Mending",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Vitality"
                ]
            },
            {
                "name": "Stout",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "ConditionDamage"
                ]
            },
            {
                "name": "Hearty",
                "type": "Vitality",
                "maxVals": [
                    "Vitality"
                ],
                "minVals": [
                    "Toughness"
                ]
            },
            {
                "name": "Potent",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "ConditionDamage"
                ]
            },
            {
                "name": "Penetrating",
                "type": "Precision",
                "maxVals": [
                    "Precision"
                ],
                "minVals": [
                    "CritDamage"
                ]
            },
            {
                "name": "Honed",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "CritDamage"
                ]
            },
            {
                "name": "Shaman's",
                "type": "Vitality",
                "maxVals": [
                    "Vitality"
                ],
                "minVals": [
                    "Healing",
                    "ConditionDamage"
                ]
            },
            {
                "name": "Rabid",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Precision",
                    "Toughness"
                ]
            },
            {
                "name": "Cleric's",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Power",
                    "Toughness"
                ]
            },
            {
                "name": "Magi's",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Precision",
                    "Vitality"
                ]
            },
            {
                "name": "Valkyrie",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Vitality",
                    "CritDamage"
                ]
            },
            {
                "name": "Knight's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Power",
                    "Precision"
                ]
            },
            {
                "name": "Rampager's",
                "type": "Condition",
                "maxVals": [
                    "Precision"
                ],
                "minVals": [
                    "Power",
                    "ConditionDamage"
                ]
            },
            {
                "name": "Carrion",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Power",
                    "Vitality"
                ]
            },
            {
                "name": "Berserker's",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Precision",
                    "CritDamage"
                ]
            },
            {
                "name": "Soldier's",
                "type": "Bad",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Toughness",
                    "Vitality"
                ]
            },
            {
                "name": "Healing",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": []
            },
            {
                "name": "Malign",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": []
            },
            {
                "name": "Celestial",
                "type": "All",
                "maxVals": [
                    "Power",
                    "Precision",
                    "Toughness",
                    "Vitality",
                    "CritDamage",
                    "Healing",
                    "ConditionDamage"
                ],
                "minVals": []
            },
            {
                "name": "Dire and Rabid",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Precision",
                    "Toughness",
                    "Vitality"
                ]
            },
            {
                "name": "Cavalier's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Power",
                    "CritDamage"
                ]
            },
            {
                "name": "Berserker's and Valkyrie",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Precision",
                    "Vitality",
                    "CritDamage"
                ]
            },
            {
                "name": "Rabid and Apothecary's",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Healing",
                    "Toughness",
                    "Precision"
                ]
            },
            {
                "name": "Apothecary's",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Toughness",
                    "ConditionDamage"
                ]
            },
            {
                "name": "Giver's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": []
            },
            {
                "name": "Giver's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Healing"
                ]
            },
            {
                "name": "Giver's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Healing",
                    "BoonDuration"
                ]
            },
            {
                "name": "Captain's",
                "type": "Precision",
                "maxVals": [
                    "Precision"
                ],
                "minVals": [
                    "Power",
                    "Toughness"
                ]
            },
            {
                "name": "Sentinel's",
                "type": "Bad",
                "maxVals": [
                    "Vitality"
                ],
                "minVals": [
                    "Power",
                    "Toughness"
                ]
            },
            {
                "name": "Settler's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Healing",
                    "ConditionDamage"
                ]
            },
            {
                "name": "Assassin's",
                "type": "Precision",
                "maxVals": [
                    "Precision"
                ],
                "minVals": [
                    "Power",
                    "CritDamage"
                ]
            },
            {
                "name": "Dire",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Toughness",
                    "Vitality"
                ]
            },
            {
                "name": "Hunter's",
                "type": "Precision",
                "maxVals": [
                    "Precision"
                ],
                "minVals": [
                    "Power"
                ]
            },
            {
                "name": "Zealot's",
                "type": "Heal",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Precision",
                    "Healing"
                ]
            },
            {
                "name": "Forsaken",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Toughness",
                    "Healing"
                ]
            },
            {
                "name": "Apostate's",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Toughness",
                    "Healing"
                ]
            },
            {
                "name": "Survivor's",
                "type": "Heal",
                "maxVals": [
                    "Healing"
                ],
                "minVals": [
                    "Toughness"
                ]
            },
            {
                "name": "Deserter's",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Toughness"
                ]
            },
            {
                "name": "Vagabond's",
                "type": "Power",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Toughness"
                ]
            },
            {
                "name": "Nomad's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness"
                ],
                "minVals": [
                    "Vitality",
                    "Healing"
                ]
            },
            {
                "name": "Bringer's",
                "type": "ConditionDuration",
                "maxVals": [
                    "ConditionDuration"
                ],
                "minVals": [
                    "Precision",
                    "Vitality"
                ]
            },
            {
                "name": "Sinister",
                "type": "Condition",
                "maxVals": [
                    "ConditionDamage"
                ],
                "minVals": [
                    "Power",
                    "Precision"
                ]
            },
            {
                "name": "Trailblazer's",
                "type": "Toughness",
                "maxVals": [
                    "Toughness",
                    "ConditionDamage"
                ],
                "minVals": [
                    "Vitality",
                    "ConditionDuration"
                ]
            },
            {
                "name": "Crusader",
                "type": "Toughness",
                "maxVals": [
                    "Power",
                    "Toughness"
                ],
                "minVals": [
                    "CritDamage",
                    "Healing"
                ]
            },
            {
                "name": "Marauder",
                "type": "Power",
                "maxVals": [
                    "Power",
                    "Precision"
                ],
                "minVals": [
                    "Vitality",
                    "CritDamage"
                ]
            },
            {
                "name": "Vigilant",
                "type": "Toughness",
                "maxVals": [
                    "Power",
                    "Toughness"
                ],
                "minVals": [
                    "BoonDuration",
                    "ConditionDuration"
                ]
            },
            {
                "name": "Minstrel's",
                "type": "Heal",
                "maxVals": [
                    "Toughness",
                    "Healing"
                ],
                "minVals": [
                    "Vitality",
                    "BoonDuration"
                ]
            },
            {
                "name": "Commander's",
                "type": "Boon",
                "maxVals": [
                    "Power",
                    "Precision"
                ],
                "minVals": [
                    "Toughness",
                    "BoonDuration"
                ]
            },
            {
                "name": "Viper's",
                "type": "Condition",
                "maxVals": [
                    "Power",
                    "ConditionDamage"
                ],
                "minVals": [
                    "Precision",
                    "ConditionDuration"
                ]
            },
            {
                "name": "Wanderer's",
                "type": "Boon",
                "maxVals": [
                    "Power",
                    "Vitality"
                ],
                "minVals": [
                    "Toughness",
                    "BoonDuration"
                ]
            },
            {
                "name": "Seraph",
                "type": "Random",
                "maxVals": [
                    "Precision",
                    "ConditionDamage"
                ],
                "minVals": [
                    "Healing",
                    "BoonDuration"
                ]
            },
            {
                "name": "Grieving",
                "type": "Condition",
                "maxVals": [
                    "Power",
                    "ConditionDamage"
                ],
                "minVals": [
                    "Precision",
                    "CritDamage"
                ]
            },
            {
                "name": "Marshal's",
                "type": "Heal",
                "maxVals": [
                    "Power",
                    "Healing"
                ],
                "minVals": [
                    "Precision",
                    "ConditionDamage"
                ]
            },
            {
                "name": "Harrier's",
                "type": "Heal",
                "maxVals": [
                    "Power"
                ],
                "minVals": [
                    "Healing",
                    "BoonDuration"
                ]
            },
            {
                "name": "Plaguedoctor's",
                "type": "Random",
                "maxVals": [
                    "Vitality",
                    "ConditionDamage"
                ],
                "minVals": [
                    "Healing",
                    "BoonDuration"
                ]
            },
            {
                "name": "Diviner's",
                "type": "Boon",
                "maxVals": [
                    "Power",
                    "BoonDuration"
                ],
                "minVals": [
                    "Precision",
                    "CritDamage"
                ]
            }
        ],
        sortStuff: {
            col: 'name',
            reverse: false
        },
        eliteSpecIds: {
            5: { name: "Druid", icon: "https://render.guildwars2.com/file/033CFD3270277F38215AE60574BCC2000873BDFF/1128575.png" },
            7: { name: "Daredevil", icon: "https://render.guildwars2.com/file/CEA6755F350FAAE9A7D8796CF8CC10FA1E33081D/1128571.png" },
            18: { name: "Berserker", icon: "https://render.guildwars2.com/file/3111C4ACA223F8B654B3453A42F7539D64EE953A/1128567.png" },
            27: { name: "Dragonhunter", icon: "https://render.guildwars2.com/file/4161C630AA50667FDCBF01042D07021CE44451C9/1128573.png" },
            34: { name: "Reaper", icon: "https://render.guildwars2.com/file/6E9C230241E83DFCAA0B0C11ED32ED0CB605C0EC/1128579.png" },
            40: { name: "Chronomancer", icon: "https://render.guildwars2.com/file/B0A3C5B4097705AE21E9CB78E53045E327F1C7C9/1128569.png" },
            43: { name: "Scrapper", icon: "https://render.guildwars2.com/file/5749382E61E622D8E9E00FA60D4CEAADA3E12715/1128581.png" },
            48: { name: "Tempest", icon: "https://render.guildwars2.com/file/BC1D0645C1304238F6154C9F366DEBD014FD7AD4/1128583.png" },
            52: { name: "Herald", icon: "https://render.guildwars2.com/file/0D29C2DC29FFD156082572B41310D00914029E6C/1128577.png" },
            55: { name: "Soulbeast", icon: "https://render.guildwars2.com/file/F80AC2AFAAF55C0F7F012C7EBECC90FD01F27FE9/1770215.png" },
            56: { name: "Weaver", icon: "https://render.guildwars2.com/file/C4B549D62A43E1BF490197E212B21879C4214008/1670506.png" },
            57: { name: "Holosmith", icon: "https://render.guildwars2.com/file/5DCFFC66A63466DFEBD29ACFA605CF00C708CBF3/1770225.png" },
            58: { name: "Deadeye", icon: "https://render.guildwars2.com/file/E4CDA974AF47D2336E02211E4667FE5C9579774F/1770213.png" },
            59: { name: "Mirage", icon: "https://render.guildwars2.com/file/52285431289AE4FE39E8A21D4333E137A5EF0921/1770217.png" },
            60: { name: "Scourge", icon: "https://render.guildwars2.com/file/B10D1AB5AA0B0CFE7D26A142E99414C26244359C/1770221.png" },
            61: { name: "Spellbreaker", icon: "https://render.guildwars2.com/file/C105F67C30BBD0FE0A26CB97E90B481419927D50/1770223.png" },
            62: { name: "Firebrand", icon: "https://render.guildwars2.com/file/A1287D0FD1159CAC3A58C212C94A4BD0AB32A8D3/1770211.png" },
            63: { name: "Renegade", icon: "https://render.guildwars2.com/file/A347E09ED9C6537C7D13EC212229468078C0F0E9/1770219.png" }
        },//'list' of all elite specs, and their icons
        nonEliteIcons: {
            Elementalist: 'https://render.guildwars2.com/file/77B793123251931AFF9FCA24C07E0F704BC4DA49/156630.png',
            Thief: 'https://render.guildwars2.com/file/F9EC00E23F630D6DB20CDA985592EC010E2A5705/156641.png',
            Mesmer: 'https://render.guildwars2.com/file/E43730AD49A903C3A1B4F27E41DE04EA51A775EC/156636.png',
            Necromancer: 'https://render.guildwars2.com/file/AE56F8670807B87CF6EEE3FC7E6CB9710959E004/156638.png',
            Ranger: 'https://render.guildwars2.com/file/49B10316B424F4E20139EB5E51ADCF24A8724E9B/156640.png',
            Engineer: 'https://render.guildwars2.com/file/5CCB361F44CCC7256132405D31E3A24DACCF440A/156632.png',
            Warrior: 'https://render.guildwars2.com/file/0A97E13F29B3597A447EEC04A09BE5BD699A2250/156643.png',
            Guardian: 'https://render.guildwars2.com/file/C32BE61FC55C962524624F643897ECF1A9C80462/156634.png',
            Revenant: 'https://render.guildwars2.com/file/7C9309BE7A2A48C6A9FBCC70CC1EBEBFD7593C05/961390.png',
        },
        displayHalp: {
            all: false,
            api: false,
            usage: false,
        },
        hideCompleted: false,
        hideSubEighty:false,
        pickingStat: {
            picking: false,
            char: {
                race: null,
                name: null,
                prof: null,
            },
            specific: false,
            statCategory: 'Power',
            specificStat: `Berserker's`
        }
    },
    methods: {
        getApiKey: function () {
            console.log('storage', storage)
            // console.log(storage)
            let usrData = storage.get('gw2trink'),
                self = this;
            if (usrData && typeof usrData == 'string') {
                usrData = JSON.parse(usrData)
            }
            console.log(usrData, storage)
            if (!usrData) {
                bulmabox.prompt(`New User`, `Hi! Looks like we don't have a GW2 API key stored for you. Since this tool works on a per-account basis, we can't really show you anything if we don't have any info. Don't worry; API keys are read-only, so this won't allow us to change anything!<hr/>Head over to <a href="https://account.arena.net" target="_blank">the ArenaNet site</a> and pick one up.<hr/><b>My API Key:</b>`, function (d) {
                    if (!d) {
                        //user didn't actually supply any data, so... just rerun this (assuming they're a dumbass) 
                        self.getApiKey();
                    } else {
                        self.$http.get(`https://api.guildwars2.com/v2/characters?access_token=${d}`)
                            .then(function (apiCheck) {
                                console.log('GW2 api response wuz', apiCheck)
                                self.newUser(d, apiCheck.body);
                                self.apiKey = d;
                            })
                            .catch(function (e) {
                                console.log('e', e)
                                bulmabox.alert('Invalid API Key', `Sorry, but your API key doesn't seem to work. Try again!`, () => {
                                    self.getApiKey();
                                })
                            })
                    }
                })
            } else {
                console.log('Your user is', usrData)
                self.apiKey = usrData.key;
                self.chars = usrData.chars
                self.hideCompleted = !!usrData.thc;
                self.hideSubEighty = !!usrData.hsm;
                // Vue.http.headers.common['Authorization'] = 'Bearer ' + usrData.key;
                this.getTrinkets(usrData.key, usrData.chars);
            }
        },
        newUser: function (key, chars) {
            console.log('new user stuff', key, chars)
            //this just creates "blank" chars. we'll then use a separate fn to actually get char info
            let theDoods = chars.map(t => {
                return {
                    name: t,
                    desiredStat: 'Power'
                }
            }),
                val = JSON.stringify({
                    key: key,
                    chars: theDoods,
                    hsm:false,
                    thc:false
                })
            storage.set('gw2trink', val, true)
            // console.log('cookies now', storage.keys())
            this.getTrinkets(key, theDoods)
        },
        setDesired: function () {
            let self = this;
            // console.log(self.allChars.map(q=>q.desiredStat+':'+q.name))
            let val = JSON.stringify({
                key: self.apiKey,
                chars: self.allChars.map(q => {
                    return { name: q.name, desiredStat: q.desiredStat }
                }),
                hsm:self.hideSubEighty,
                thc:self.hideCompleted
            })
            storage.set('gw2trink', val, true)
        },
        getTrinkets: function (k, u) {
            console.log('getting trinkets for characters', u, 'of account', k)
            const self = this,
                charProms = u.map(uc => {
                    return self.$http.get('https://api.guildwars2.com/v2/characters/' + (typeof uc == 'object' ? uc.name : uc) + '?access_token=' + k)
                });
            Promise.all(charProms).then(r => {
                // console.log('DATA after geTrinkets', r, k, u, typeof u);
                //NOTE: should PROBLY have some sort of method, via traits, to detect which specialization this uses.
                self.allChars = r.map(ru => {
                    console.log('CHAR', ru.body.name, 'DATA', ru.body)
                    let theProf = ru.body.profession, profPic = self.nonEliteIcons[ru.body.profession];
                    ru.body.specializations.pve.forEach(ps => {
                        if (ps && self.eliteSpecIds[ps.id]) {
                            theProf = self.eliteSpecIds[ps.id].name;
                            profPic = self.eliteSpecIds[ps.id].icon;
                        }
                    })
                    return { name: ru.body.name, level:ru.body.level, gender: ru.body.gender, race: ru.body.race, prof: theProf, profPic: profPic, generalProf: ru.body.profession, equip: ru.body.equipment.filter(q => !!self.slots.includes(q.slot)), desiredStat: u.find(p => p.name == ru.body.name).desiredStat }
                });
                //we got all trinkets for this user. We now need to check all trinkets for attributes, as non-stat-selectable-items do not have viewable stats
                self.checkAttribs();
            })
        },
        checkAttribs: function () {
            const needsCheck = [],
                self = this;
            //get attributes for non-stat-selectable items
            this.allChars.forEach(ch => {
                ch.equip.forEach(che => {
                    if ((!che.stats || !che.stats.attributes) && self.slots.includes(che.slot)) {
                        needsCheck.push({
                            char: ch.name,
                            id: che.id,
                            slot: che.slot
                        })
                    }
                })
            });
            const needsUniq = _.uniqBy(needsCheck, 'id').map(q => q.id)
            console.log('The following items need stat checks via gw2spidy (because we <3 official api and dont want to break it)', needsCheck, needsUniq)
            //example:13459
            self.$http.get('https://api.guildwars2.com/v2/items?ids=' + needsUniq.join(',')).then(ur => {
                console.log('items response', ur);
                self.allChars = self.allChars.map(chd => {
                    chd.equip = chd.equip.map(chde => {
                        if (!self.slots.includes(chde.slot)) {
                            return false;
                        }
                        let statCombo = ur.body.find(q => q.id == chde.id),
                            noHazStat = !chde.stats || !chde.stats.attributes;

                        if (noHazStat) {
                            // console.log('item', chde, 'with id', chde.id, 'has no recorded stats yet and its statCombo obj should be', statCombo)
                            chde.stats = {
                                attributes: {
                                },
                                statCombo: 'Unknown',
                                isExotic: statCombo.rarity && statCombo.rarity != 'Ascended'
                            }
                            statCombo.details.infix_upgrade.attributes.forEach(at => {
                                chde.stats.attributes[at.attribute] = at.modifier;
                            })
                            // console.log('Stats now', chde.stats)
                        } else {
                            // console.log(chde)
                            chde.stats.statCombo = 'Unknown';
                        }
                        chde.stats.statCombo = self.getStatCombo(chde.stats.attributes);
                        return chde;
                    }).filter(af => !!af).sort((a, b) => {
                        if (a.slot > b.slot) {
                            return 1;
                        } else if (b.slot > a.slot) {
                            return -1;
                        }
                        return 0;
                    });
                    chd.equip = this.fillEmpty(chd.equip);//fill empty trinket slots with a blank label so table doesnt break 
                    console.log('THIS CHAR', chd.name, 'NOW', JSON.stringify(chd))
                    return chd;
                });
                console.log('Should now have equipment for all chars', self.allChars)
            })
        },
        fillEmpty: function (e) {

            e = this.slots.map(sl => {
                let theTrink = e.find(q => q.slot == sl);
                if (!theTrink) {
                    theTrink = {
                        noTrink: true,
                        slot: sl
                    }
                }
                return theTrink
            })
            return e;
        },
        getStatCombo: function (a) {
            const atNames = Object.keys(a),
                unsortedVals = atNames.map(aq => a[aq]),
                maxVal = Math.max(...unsortedVals),
                minVal = Math.min(...unsortedVals);
            if (atNames.length > 5) {
                return { name: 'Celestial', type: 'All' };
            }
            let bigVals = atNames.filter(ab => a[ab] == maxVal),
                smallVals = atNames.filter(as => a[as] < maxVal && a[as] != maxVal);
            // console.log('Getting items for stats', a, 'returns bigVals of', bigVals, 'and smallVals of', smallVals)
            let finalCombo = this.statCombos.find(q => {
                //return where the primary attribs are equal to the ones in this attrib, and where the minor attributes either dont exist (for 1-attrib combos) OR the minor attrib is also equal
                return _.isEqual(q.maxVals.sort(), bigVals.sort()) && (!smallVals.length || _.isEqual(q.minVals.sort(), smallVals.sort()))
            });
            if (!finalCombo) {
                // console.log('Could not find attrib combo for above item')
                return { name: 'Strange Attribute!', type: 'Random', bv: bigVals, sv: smallVals }
            }
            return finalCombo && { name: finalCombo.name, type: finalCombo.type };
        },
        getItemReport: function (char, item) {
            return `${char}'s ${item.slot} has ${item.stats.statCombo.name} stats (a ${item.stats.statCombo.type} stat combo).`
        },
        getFinished: function (char) {
            // let ds = char.desiredStat;
            return !char.equip.filter(eq => (eq.stats && eq.stats.statCombo && eq.stats.statCombo.type != char.desiredStat) || (eq.stats && eq.stats.isExotic)).length;//no remaining "bad" items
        },
        changeSort: function (c) {
            if (this.sortStuff.col == c) {
                this.sortStuff.reverse = !this.sortStuff.reverse;
            } else {
                this.sortStuff.reverse = false;
                this.sortStuff.col = c;
            }
        },
        removeUser: function () {
            bulmabox.confirm("Remove API Key", `Are you sure you wish to remove this API key?`, (r) => {
                if (r && r !== null) {
                    storage.delete('gw2trink');
                    window.location.reload();
                }
            })
        },
        showPickStat: function (c) {
            let maybeSpefStat = this.statCombos.find(q => q.name == c.desiredStat);
            this.pickingStat.picking = true;
            this.pickingStat.char = c;
            this.pickingStat.statCategory = maybeSpefStat ? maybeSpefStat.type : c.desiredStat;//if user picked a specific stat, category should be that stat's type. otherwise, it'll be the stat they picked (specific)
            this.pickingStat.specificStat = maybeSpefStat ? maybeSpefStat : this.statCombos.find(q => q.name == "Berserker's")
            //NEEDS: stuff for picking either just statCategory (if general) or statCategory and specificStat (if... specific)
        },
        doPickStat: function () {
            const self = this,
                otherStuff = null;
            if (self.pickingStat.specific) {
                //user wants a specific stat (like berserkers)
                self.pickingStat.char.desiredStat = self.pickingStat.specificStat.name
            } else {
                self.pickingStat.char.desiredStat = self.pickingStat.statCategory;
            }
            self.pickingStat.picking = false;
            self.setDesired();
        },
        isSpef: function (c) {
            // console.log('Specific Stat Boolean thinger',this.statCombos.find(q))
            return !!this.statCombos.find(q => q.name == c)
        }
    },
    created: function () {
        this.getApiKey();
        this.$http.get('https://api.guildwars2.com/v2/specializations/' + Math.ceil(Math.random() * 63)).then(q => {
            console.log('BG IMG RESP', q)
            this.panelBg = `url(${q.body.background})`
        })
    },
    computed: {
        userList: function () {
            const self = this;
            return self.allChars.sort((a, b) => {
                let baseRev = 0;
                if (a[self.sortStuff.col] > b[self.sortStuff.col]) {
                    baseRef = 1;
                } else if (a[self.sortStuff.col] < b[self.sortStuff.col]) {
                    baseRef = -1;
                }
                if (self.sortStuff.reverse) {
                    baseRef *= -1;
                }
                //all about that baseref
                return baseRef;
            })
        },
        specifStatList: function () {
            const self = this;
            return self.statCombos.filter(q => q.type == self.pickingStat.statCategory);
        },
        statInfo: function () {
            const self = this,
                correctCat = self.pickingStat.specificStat && self.pickingStat.specificStat.type && self.pickingStat.specificStat.type == self.pickingStat.statCategory,
                statTrans = s => {
                    let out = s;
                    switch (s) {
                        case 'CritDamage':
                            out = 'Ferocity';
                            break;
                        case 'ConditionDamage':
                            out = 'Condition Damage';
                            break;
                        case 'BoonDuration':
                            out = 'Concentration';
                            break;
                        case 'ConditionDuration':
                            out = 'Expertise';
                            break;
                        default:
                            break;
                    }
                    return out;
                };
            if (!correctCat || !self.pickingStat.specific) {
                return " ";
            } else {
                let major = self.pickingStat.specificStat.maxVals.map(q => statTrans(q)).join(', '),
                    minor = self.pickingStat.specificStat.minVals.map(q => statTrans(q)).join(', '),
                    fullStr = `Major: ${major}`;
                if(minor){
                    fullStr +=`| Minor: ${minor}`
                }
                return fullStr;
            }
        }
    }
})

