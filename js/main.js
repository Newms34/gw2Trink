// import {storage} from './store.js';
const mainComp = new Vue({
    el: '#main',
    data: {
        allChars: [],
        slots: ['Accessory1', 'Accessory2', 'Backpack', 'Ring1', 'Ring2', 'Amulet'].sort(),
        apiKey: null,
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                "type": "Healing",
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
                // Vue.http.headers.common['Authorization'] = 'Bearer ' + usrData.key;
                this.getTrinkets(usrData.key, usrData.chars);
            }
        },
        newUser: function (key, chars) {
            console.log('new user stuff', key, chars)
            //this just creates "blank" chars. we'll then use a separate fn to actually get char info
            let val = JSON.stringify({
                key: key,
                chars: chars.map(t => {
                    return {
                        name: t,
                        desiredStat: 'Power'
                    }
                })
            })
            storage.set('gw2trink', val, true)
            // console.log('cookies now', storage.keys())
            this.getTrinkets(key, chars)
        },
        setDesired: function () {
            let self = this;
            // console.log(self.allChars.map(q=>q.desiredStat+':'+q.name))
            let val = JSON.stringify({
                key: self.apiKey,
                chars: self.allChars
            })
            storage.set('gw2trink', val, true)
        },
        getTrinkets: function (k, u) {
            // console.log('getting trinkets for characters', u, 'of account', k)
            const self = this,
                charProms = u.map(uc => {
                    return self.$http.get('https://api.guildwars2.com/v2/characters/' + uc.name + '?access_token=' + k)
                });
            Promise.all(charProms).then(r => {
                // console.log('DATA after geTrinkets', r, k, u, typeof u);
                //NOTE: should PROBLY have some sort of method, via traits, to detect which specialization this uses.
                self.allChars = r.map(ru => {
                    return { name: ru.body.name, gender: ru.body.gender, race: ru.body.race, prof: ru.body.profession, equip: ru.body.equipment.filter(q => !!self.slots.includes(q.slot)), desiredStat: u.find(p => p.name == ru.body.name).desiredStat }
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
                    }).filter(af => !!af).sort((a,b) => {
                        if(a.slot>b.slot){
                            return 1;
                        }else if(b.slot>a.slot){
                            return -1;
                        }
                        return 0;
                    });
                    console.log('THIS CHAR', chd.name, 'NOW', JSON.stringify(chd))
                    return chd;
                });
                console.log('Should now have equipment for all chars', self.allChars)
            })
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
            })
            if (!finalCombo) {
                // console.log('Could not find attrib combo for above item')
                return { name: 'Strange Attribute!', type: 'Random', bv: bigVals, sv: smallVals }
            }
            return finalCombo && { name: finalCombo.name, type: finalCombo.type };
        },
        getItemReport:function(char,item){
            return `${char}'s ${item.slot} has ${item.stats.statCombo.name} stats (a ${item.stats.statCombo.type} stat combo).`
        },
        getFinished:function(char){
            // let ds = char.desiredStat;
            return !char.equip.filter(eq=>eq.stats.statCombo.type!=char.desiredStat||eq.stats.isExotic).length;//no remaining "bad" items
        }
    },
    created: function () {
            this.getApiKey();
    }
})

