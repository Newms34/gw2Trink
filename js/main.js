import * as storage from './store.js';
import data from './data.js'
const mainComp = new Vue({
    el: '#main',
    data: {
        allChars: [],
        searchTerms:null,
        slots: ['Accessory1', 'Accessory2', 'Backpack', 'Ring1', 'Ring2', 'Amulet'].sort(),
        apiKey: null,
        panelBg: '#333',
        sortStuff: {
            col: 'name',
            reverse: false
        },
        displayHalp: {
            all: false,
            api: false,
            usage: false,
        },
        hideCompleted: false,
        hideSubEighty: false,
        loaded: false,
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
        },
        getTrinketStuff: {
            active: false,
            showWallet:false,
            showCollectable:false,
            slot: 'Backpack',
            stat: 'Power',
            char:'Bob',
            gender:'Female',
            oldStat:'ERROR',
            options: []//array of options for this trinket
        },
    },
    methods: {
        getApiKey: function () {
            // console.log('storage', storage, storage.getStore, storage.getStore('gw2trink'))
            // console.log(storage)
            let usrData = storage.getStore('gw2trink'),
                self = this;
            if (usrData && typeof usrData == 'string') {
                usrData = JSON.parse(usrData)
            }
            // console.log(usrData, storage)
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
                // console.log('Your user is', usrData)
                self.apiKey = usrData.key;
                self.chars = usrData.chars
                self.hideCompleted = !!usrData.thc;
                self.hideSubEighty = !!usrData.hsm;
                // Vue.http.headers.common['Authorization'] = 'Bearer ' + usrData.key;
                this.getTrinkets(usrData.key, usrData.chars);
            }
        },
        newUser: function (key, chars) {
            // console.log('new user stuff', key, chars)
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
                    hsm: false,
                    thc: false
                })
            storage.setStore('gw2trink', val, true)
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
                hsm: self.hideSubEighty,
                thc: self.hideCompleted
            })
            storage.setStore('gw2trink', val, true)
        },
        getTrinkets: function (k, u) {
            // console.log('getting trinkets for characters', u, 'of account', k)
            const self = this,
                charProms = u.map(uc => {
                    return self.$http.get('https://api.guildwars2.com/v2/characters/' + (typeof uc == 'object' ? uc.name : uc) + '?access_token=' + k)
                });
            Promise.all(charProms).then(r => {
                // console.log('DATA after geTrinkets', r, k, u, typeof u);
                //NOTE: should PROBLY have some sort of method, via traits, to detect which specialization this uses.
                self.allChars = r.map(ru => {
                    // console.log('CHAR', ru.body.name, 'DATA', ru.body)
                    let theProf = ru.body.profession, profPic = data.nonEliteIcons[ru.body.profession];
                    ru.body.specializations.pve.forEach(ps => {
                        if (ps && data.eliteSpecIds[ps.id]) {
                            theProf = data.eliteSpecIds[ps.id].name;
                            profPic = data.eliteSpecIds[ps.id].icon;
                        }
                    })
                    return { name: ru.body.name, level: ru.body.level, gender: ru.body.gender, race: ru.body.race, prof: theProf, profPic: profPic, generalProf: ru.body.profession, equip: ru.body.equipment.filter(q => !!self.slots.includes(q.slot)), desiredStat: u.find(p => p.name == ru.body.name).desiredStat, bags: ru.body.bags }
                });
                //we got all trinkets for this user. We now need to check all trinkets for attributes, as non-stat-selectable-items do not have viewable stats
                self.checkAttribs();
                self.sumAllCurrencies();
            })
        },
        sumAllCurrencies: function () {
            const self = this;
            self.$http.get('https://api.guildwars2.com/v2/account/wallet?access_token=B9DE7B9E-9DAD-2C40-BECD-12F9BA931FE0851EA3EB-B1AA-4FBB-B4BE-CCDD28F51644').then(wlts => {
                //wallet and
                self.$http.get('https://api.guildwars2.com/v2/account/materials?access_token=B9DE7B9E-9DAD-2C40-BECD-12F9BA931FE0851EA3EB-B1AA-4FBB-B4BE-CCDD28F51644').then(mats => {
                    //mats!
                    data.collectableCurrencies.forEach(cr => {
                        self.allChars.forEach(ch => {
                            // console.log('CUrrency',cr.name,'Char',ch.name,'bags?',!!ch.bags)
                            ch.bags.forEach(bg => {
                                //now we have a single bag, on a single char, looking for a single currency
                                if (!bg || !bg.inventory) {
                                    return false;
                                }
                                // console.log(ch.name,'BAG',bg)
                                let theCurrency = bg.inventory.find(it => {
                                    // console.log('CHECKING BAG',it,cr)
                                    return !!it && it.id == cr.id
                                });
                                if (theCurrency) {
                                    cr.amount += theCurrency.count;
                                }
                            })
                        })
                        cr.amount += mats.body.find(ac => ac.id == cr.id).count;
                    });
                    //got all collectable currencies on chars and on account
                    //now just wallet currencies
                    data.walletCurrencies.forEach(wc => {
                        wc.amount += wlts.body.find(wlc => wlc.id == wc.id).value;
                    });
                    // console.log('CURRENCIES', data.walletCurrencies, data.collectableCurrencies)
                });
            });
            // console.log('CURRENCIES!',self.collectableCurrencies)
        },
        checkAttribs: function () {
            const needsCheck = [],
                self = this,
                allIds = [];
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
                    if (che.infusions && che.infusions.length) {
                        allIds.push(...che.infusions)
                    }
                    allIds.push(che.id);
                })
            });
            // console.log('allInfusions',infus)
            // const needsUniq = _.uniqBy(needsCheck, 'id').map(q => q.id).concat(_.uniq(infus))
            //example:13459
            self.$http.get('https://api.guildwars2.com/v2/items?ids=' + _.uniq(allIds).join(',')).then(ur => {
                console.log('items response', ur);
                self.allChars = self.allChars.map(chd => {
                    chd.equip = chd.equip.map(chde => {
                        if (!self.slots.includes(chde.slot)) {
                            //this is not a trinket!
                            return false;
                        }
                        let yourItem = ur.body.find(q => q.id == chde.id),
                            noHazStat = !chde.stats || !chde.stats.attributes;//boolean to tell us if the item has no stats (i.e., is like stat selectable, such as a lws3 trinket).


                        if (noHazStat) {
                            //this item doesnt haz stats, so we need to supply it!
                            // console.log('item', chde, 'with id', chde.id, 'has no recorded stats yet and its theItem obj should be', theItem)
                            chde.stats = {
                                attributes: {
                                },
                                theItem: 'Unknown',
                                rarity: yourItem.rarity
                            }
                            yourItem.details.infix_upgrade.attributes.forEach(at => {
                                chde.stats.attributes[at.attribute] = at.modifier;
                            })
                            // console.log('Stats now', chde.stats)
                        } else {
                            // console.log(chde)
                            chde.stats.rarity = yourItem && yourItem.rarity;
                            console.log('RAN THE ELSE FOR', chde)
                            chde.stats.theItem = 'Unknown';
                        }
                        //fix for Armbrace of Truth until ANet fixes their API :P
                        if (chde.id == 39241) {
                            chde.stats.rarity = 'Ascended';
                        }
                        chde.stats.theItem = self.getStatCombo(chde.stats.attributes);
                        if (chde.infusions && chde.infusions.length) {
                            chde.infusions = chde.infusions.map(chdef => {
                                let tin = ur.body.find(q => q.id == chdef),
                                    hazAr = tin.details.infix_upgrade.attributes.find(q => q.attribute == 'AgonyResistance');

                                return {
                                    plusAgony: hazAr && hazAr.modifier
                                }
                            })
                        }
                        //finally, give us a name and a piksher
                        if (!!yourItem) {
                            chde.name = yourItem.name;
                            chde.icon = yourItem.icon;
                        }

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
            });
            this.loaded = true;
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
        sum: function (it) {
            if (!it || !it.length) {
                return 0;
            }
            let allAgony = 0;
            it.forEach(n => {
                if (n.plusAgony && !isNaN(n.plusAgony)) {
                    allAgony += n.plusAgony;
                }
            })
            return allAgony
        },
        getStatCombo: function (a) {
            const atNames = Object.keys(a),
                unsortedVals = atNames.map(aq => a[aq]),
                maxVal = Math.max(...unsortedVals),
                minVal = Math.min(...unsortedVals);
            if (atNames.length > 5) {
                return { name: 'Celestial', type: 'Random' };
            }
            let bigVals = atNames.filter(ab => a[ab] == maxVal),
                smallVals = atNames.filter(as => a[as] < maxVal && a[as] != maxVal);
            // console.log('Getting items for stats', a, 'returns bigVals of', bigVals, 'and smallVals of', smallVals)
            let finalCombo = data.statCombos.find(q => {
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
            return `${char}'s ${item.slot} has ${item.stats.theItem.name} stats (a ${item.stats.theItem.type} stat combo).`
        },
        getFinished: function (char) {
            // let ds = char.desiredStat;
            if (char.name == 'Portable Boo Unit') {
                console.log('BOO IS', char)
                char.equip.forEach(ec => {
                    console.log('ITEM:', ec.name, ec.stats)
                    console.log(ec.stats && ec.stats.theItem && ec.stats.theItem.type, char.desiredStat, ec.stats && ec.stats.rarity)
                })
            }
            return !char.equip.filter(eq => (eq.stats && eq.stats.theItem && eq.stats.theItem.type != char.desiredStat) || (eq.stats && (eq.stats.rarity != 'Ascended' && eq.stats.rarity != 'Legendary'))).length;//no remaining "Not Recommended" items
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
                    storage.deleteStore('gw2trink');
                    window.location.reload();
                }
            })
        },
        showPickStat: function (c) {
            let maybeSpefStat = data.statCombos.find(q => q.name == c.desiredStat);
            this.pickingStat.picking = true;
            this.pickingStat.char = c;
            this.pickingStat.statCategory = maybeSpefStat ? maybeSpefStat.type : c.desiredStat;//if user picked a specific stat, category should be that stat's type. otherwise, it'll be the stat they picked (specific)
            this.pickingStat.specificStat = maybeSpefStat ? maybeSpefStat : data.statCombos.find(q => q.name == "Berserker's")
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
            // console.log('Specific Stat Boolean thinger',data.statCombos.find(q))
            return !!data.statCombos.find(q => q.name == c)
        },
        spaceless: function (t) {
            return t.replace(' ', '-')
        },
        trinketGet: function (c,e) {
            const cats = _.uniqBy(data.statCombos,'type').map(q=>q.type),
            theSlot = e.slot.replace('1','').replace('2','');//categories
            let isCat = !!cats.includes(c.desiredStat),
            statOpts = [],
            core=false,
            pof=false,
            hot=false; 
            console.log(`Character ${c.name} wants a trinket for ${e.slot} with ${c.desiredStat} stats! Category?${isCat}. Old item?${JSON.stringify(e)}`);
            if(isCat){
                //category, so can use multiple options
                statOpts =data.statCombos.filter(sc=>sc.type==c.desiredStat).map(q=>q.name.replace("'s",''));
            }else{
                statOpts = [c.desiredStat.replace("'s",'')];//only one, since this is a specific stat.
            }
            core = !!statOpts.filter(cs=>data.coreStats.includes(cs)).length;
            hot = !!statOpts.filter(hs=>data.hotStats.includes(hs)).length;
            pof = !!statOpts.filter(ps=>data.pofStats.includes(ps)).length;
            // console.log('Checked if this exists in each "game": core',core,', hot:',hot,', pof:',pof,'\nStat Opts are',statOpts,'\nCats',cats)
            const opts = data.trinketOptions[theSlot].filter(ot=>{
                return (ot.stats.includes('pof') && pof) || (ot.stats.includes('core') && core) || (ot.stats.includes('hot') && hot)
            });//the options for this trinket
            // console.log(`Options are: ${opts.map(a=>a.loc+" "+theSlot)}`)
            //so we should now have a list of trinkets that are "available" for our chosen slot and stat.
            //now let's get the total remaining cost of each option!
            this.getTrinketStuff.options = opts.map(o=>{
                let mainCost = data.collectableCurrencies.find(cc=>cc.id==o.cur),
                secondCost = data.walletCurrencies.find(wc=>wc.id==o.secondCur);
                // console.log('Main Cost',mainCost,'secondary cost',secondCost)
                let oc = _.cloneDeep(o);
                oc.firstCost = Math.max(o.cost - mainCost.amount,0);
                oc.fullCostOne=o.cost;
                oc.costName = mainCost.name;
                oc.fullCostTwo = o.secondCost;
                oc.secondCost = Math.max(o.secondCost - secondCost.amount,0);
                oc.secondCostName = secondCost.name;
                return oc;
            });
            this.getTrinketStuff.wc = _.cloneDeep(data.walletCurrencies);
            this.getTrinketStuff.cc = _.cloneDeep(data.collectableCurrencies);
            this.getTrinketStuff.active = true;
            this.getTrinketStuff.gender = c.gender;
            this.getTrinketStuff.slot = theSlot;
            this.getTrinketStuff.stat = c.desiredStat;
            this.getTrinketStuff.oldStat = e.stats && e.stats.theItem && !e.noTrink?`${e.stats.theItem.name} (${e.stats.theItem.type})`:false;
            this.getTrinketStuff.char = c.name 
            console.log('Options with Costs:',JSON.stringify(this.getTrinketStuff),JSON.stringify(data.walletCurrencies),JSON.stringify(data.collectableCurrencies))
        },
        aAn:function(s){
           return ['a','e','i','o','u'].includes(s[0].toLowerCase())?'an':'a';
        }
    },
    created: function () {
        console.log('THING IS',data||'UNKNOWN')
        this.loaded = false;
        this.getApiKey();
        this.$http.get('https://api.guildwars2.com/v2/specializations/' + Math.ceil(Math.random() * 63)).then(q => {
            console.log('BG IMG RESP', q)
            this.panelBg = `url(${q.body.background})`
        })
    },
    computed: {
        userListFiltered:function(){
            const self = this;
            let usrList = self.allChars.sort((a, b) => {
                let baseRef = 0;
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
            if(!self.searchTerms){
                return usrList;
            }
            let listOTerms = self.searchTerms.split(',').map(t=>t.trim()).filter(f=>!!f && f.length);
            if(!listOTerms.length){
                return usrList;
            }
            return usrList.filter(q=>{
                return listOTerms.filter(st=>{
                    // console.log('Looking at char',q.name,'terms',st)
                    return !!q.name.toLowerCase().includes(st.toLowerCase());
                }).length;
            })
        },
        // userList: function () {
        //     const self = this;
        //     return self.allChars.sort((a, b) => {
        //         let baseRef = 0;
        //         if (a[self.sortStuff.col] > b[self.sortStuff.col]) {
        //             baseRef = 1;
        //         } else if (a[self.sortStuff.col] < b[self.sortStuff.col]) {
        //             baseRef = -1;
        //         }
        //         if (self.sortStuff.reverse) {
        //             baseRef *= -1;
        //         }
        //         //all about that baseref
        //         return baseRef;
        //     })
        // },
        specifStatList: function () {
            const self = this;
            return data.statCombos.filter(q => self.pickingStat.statCategory == 'All' || q.type == self.pickingStat.statCategory);
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
                if (minor) {
                    fullStr += `| Minor: ${minor}`
                }
                return fullStr;
            }
        },
        numHidden: function () {
            let num = 0, self = this;
            if (self.hideCompleted) {
                num += self.userListFiltered.filter(q => !!self.getFinished(q)).length;
            }
            if (self.hideSubEighty) {
                num += self.userListFiltered.filter(a => a.level < 80).length;
            }
            return num;
        }
    }
})

