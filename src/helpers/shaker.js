import monsterChanger from "../models/monsterChanger";

export default () => {
  const perception = monsterChanger.perceptionFrom;
  monsterChanger.perceptionFrom = perception-1;
  monsterChanger.perceptionFrom = perception;
}