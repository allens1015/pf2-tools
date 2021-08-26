import monsterChangerData from "@/assets/monsterChanger.json";

class MonsterChanger {
    constructor() {
        this.shaker = 0;
        this.crFrom = 0;
        this.crTo= 1;
        this.perceptionFrom = 0;
        this.perceptionTo = 0;
        this.skillsFrom = [];
        this.statsFrom = [0,0,0,0,0,0];
        this.strFrom = 0;
        this.dexFrom = 0;
        this.conFrom = 0;
        this.intFrom = 0;
        this.wisFrom = 0;
        this.chaFrom = 0;
        this.fortFrom = 0;
        this.refFrom = 0;
        this.willFrom = 0;
        this.acFrom = 10;
        this.hpFrom = 1;
        this.savesFrom = [10,10,10];
        this.savesLabels = ["Fortitude","Reflex","Will"];
        this.statsLabels = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma"];
        this.addingSkillName= "";
        this.addingSkillValue= 0;
        this.addingAttackName="";
        this.addingAttackModifier="";
        this.addingAttackDamage="";
        this.attacksFrom = [];
        this.spellDCFrom = 0;
        this.spellAttackFrom = 0;
        this.stats= monsterChangerData.stats;
        this.ac= monsterChangerData.ac;
        this.hp= monsterChangerData.hp;
        this.perception= monsterChangerData.perception;
        this.resistAndWeakness= monsterChangerData.resistAndWeakness;
        this.safeItemLevel= monsterChangerData.safeItemLevel;
        this.saves= monsterChangerData.saves;
        this.skills= monsterChangerData.skills;
        this.spellAttack= monsterChangerData.spellAttack;
        this.spellDC= monsterChangerData.spellDC;
        this.attacks= monsterChangerData.strikeAttack;
        this.damage= monsterChangerData.strikeDamage;
    }
}

const monsterChanger = new MonsterChanger();

export default monsterChanger;