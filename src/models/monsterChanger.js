import monsterChangerData from "@/assets/monsterChanger.json";

class MonsterChanger {
    constructor() {
        this.crFrom= 0;
        this.crTo= 1;
        this.perceptionFrom= 0;
        this.skillsFrom= [];
        this.statsFrom = [0,0,0,0,0,0];
        this.statsLabels = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
        this.addingSkillName= "";
        this.addingSkillValue= 0;
        this.abilityModifiers= monsterChangerData.abilityModifiers;
        this.ac= monsterChangerData.ac;
        this.hp= monsterChangerData.hp;
        this.perception= monsterChangerData.perception;
        this.resistAndWeakness= monsterChangerData.resistAndWeakness;
        this.safeItemLevel= monsterChangerData.safeItemLevel;
        this.saves= monsterChangerData.saves;
        this.skills= monsterChangerData.skills;
        this.spellAttack= monsterChangerData.spellAttack;
        this.spellDC= monsterChangerData.spellDC;
        this.strikeAttack= monsterChangerData.strikeAttack;
        this.strikeDamage= monsterChangerData.strikeDamage;
    }
}

const monsterChanger = new MonsterChanger();

export default monsterChanger;