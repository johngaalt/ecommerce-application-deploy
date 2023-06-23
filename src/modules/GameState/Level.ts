import { LEVELS } from './constants/levels';
import { ILevel } from './types/ILevel';

class Levels {
  private items = LEVELS;

  getTotalCount() {
    return this.items.length;
  }

  getItems() {
    return this.items;
  }

  getCurrentLevel(currentLevelId: number): ILevel {
    const currentLevel = LEVELS.find((level) => level.id === currentLevelId);

    if (!currentLevel) {
      throw new Error(`Level with id ${currentLevelId} was not found!`);
    }

    return currentLevel;
  }
}

export const allLevels = new Levels();
