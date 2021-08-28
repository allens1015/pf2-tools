// import bestiary1 from "@/assets/bestiary1.json";
// import av from "@/assets/abomination-vaults-combined.json";
// import aoe from "@/assets/agents-of-edgewatch-bestiary-combined.json";
// import aoa from "@/assets/age-of-ashes-combined.json";
// import aprilFools from "@/assets/age-of-ashes-combined.json";
// import blog from "@/assets/blog-bestiary-combined.json";
// import ec from "@/assets/extinction-curse-bestiary-combined.json";
// import plaguestone from "@/assets/fall-of-plaguestone-combined.json";
// import fists from "@/assets/fists-of-the-ruby-phoenix-bestiary-combined.json";
// import littleTrouble from "@/assets/fists-of-the-ruby-phoenix-bestiary-combined.json";
// import menace from "@/assets/menace-under-otari-bestiary-combined.json";
// import npcGallery from "@/assets/npc-gallery-combined.json";
// import oneShot from "@/assets/one-shot-bestiary-combined.json";
// import bestiary2 from "@/assets/pathfinder-bestiary-2-combined.json";
// import bestiary3 from "@/assets/pathfinder-bestiary-3-combined.json";
// import pfs1 from "@/assets/pfs-season-1-bestiary-combined.json";
// import pfs2 from "@/assets/pfs-season-2-bestiary-combined.json";
// import thousands from "@/assets/strength-of-thousands-bestiary-combined.json";
// import slithering from "@/assets/the-slithering-bestiary-combined.json";
// import otari from "@/assets/troubles-in-otari-bestiary-combined.json";

// const monsters = {
//   bestiary1
// }

// const monstersHolding = [];
// const monsters = monstersHolding.concat(bestiary1,bestiary2,bestiary3,av,aoe,aoa,aprilFools,blog,ec,plaguestone,fists,littleTrouble,menace,npcGallery,oneShot,pfs1,pfs2,thousands,slithering,otari);

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