import services from "@/handlers/services.js";

class Monsters {
  constructor() {
    this.monsterNames = [];
    this.monster;
  }
  async loadMonsterNames() {
    const res = await services.monsters.fetchMonsterNames();

    res.forEach((data) => {
        this.monsterNames.push(data);
    });
  }
  async loadMonster(uriEncodeString) {
    const res = await services.monsters.fetchMonster(uriEncodeString);

    res.forEach((data) => {
      this.monster = data;
    });
  }

}

const monsters = new Monsters();

export default monsters;