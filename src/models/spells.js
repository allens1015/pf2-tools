import services from '../handlers/services';

class Spell {

    constructor(spell) {
        /**
         * TOP LEVEL INFO
         **/

        this.id = spell._id;
        this.name = spell.name;

        /**
         * ADDITIONAL DETAILS
         * Some details not included in model but
         * stubbed out with a comment for future use
         **/

        // ability
        // area
        // areasize
        // category (same as type?)
        // cost
        this.damage = spell.data.damage; // .applyMod and .value
        this.damageType = spell.data.damageType.value;
        this.description = spell.data.description.value;
        this.duration = spell.data.duration.value;
        // hasCounteractCheck
        this.isBasicSave = spell.data.save.basic === 'basic';
        this.level = spell.data.level.value;
        // location
        // materials
        // prepared
        // primarycheck
        this.range = spell.data.range.value;
        this.rarity = spell.data.traits.rarity.value;
        // rules
        this.save = spell.data.save.value;
        // scaling (already included in description probably)
        this.school = spell.data.school.value;
        // secondarycasters
        // secondarycheck
        // source
        this.spellType = spell.data.spellType.value;
        this.sustained = spell.data.sustained.value;
        this.tags = spell.data.traits.value;
        this.target = spell.data.target.value;
        this.time = spell.data.time.value;
        this.traditions = spell.data.traditions.value;
    }

}

class Spells {

    constructor() {
        this.all = [];
        // this.filtered = undefined;
    }

    fetchSpell(name) {
        return this.all.findIndex((spell) => spell.name === name);
    }

    /*applyFilters(filters) {
        // TODO: Filter spells here
        this.filtered = [...this.all];
    }

    removeFilters(filters) {
        this.filtered = undefined;
    }*/

    async loadSpells() {
        const res = await services.spell.fetchSpells();

        res.results.forEach((data) => {
            this.all.push(new Spell(data));
        });
    }
}

const spells = new Spells();

export default spells;
