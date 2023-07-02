import eventBus from 'eventBus/index';
import { allLevels } from './Level';
import { EventTypes } from 'eventBus/EventTypes';
import { ObjectGuards } from 'utils/Guards';

type FinishedLevels = Record<
  number,
  {
    withTip: boolean;
  }
>;

export class GameState {
  currentLevelId: number;
  tippedLevels: Set<number>;
  finishedLevels: FinishedLevels;

  constructor() {
    this.currentLevelId = 1;
    this.finishedLevels = {};
    this.tippedLevels = new Set();
    eventBus.subscribe(
      EventTypes.solvedWithTipLevel,
      this.saveTippedLevel.bind(this)
    );
  }

  saveTippedLevel(data: unknown) {
    if (ObjectGuards.hasProp(data, 'levelId')) {
      this.tippedLevels.add(Number(data.levelId));
    }
  }

  reset() {
    this.currentLevelId = 1;
    this.finishedLevels = {};
    this.tippedLevels = new Set();
  }

  saveCurrentLevelId(currentLevelId: number) {
    if (currentLevelId < 1) {
      this.currentLevelId = allLevels.getTotalCount();
    } else if (currentLevelId > allLevels.getTotalCount()) {
      this.currentLevelId = 1;
    } else {
      this.currentLevelId = currentLevelId;
    }
  }

  saveFinishedLevel(levelId: number) {
    this.finishedLevels[levelId] = {
      withTip: this.tippedLevels.has(levelId),
    };
  }

  saveToLocalStorage() {
    const finishedLevels = Array.from(this.tippedLevels).reduce(
      (acc: FinishedLevels, curr: number) => {
        const tippedLevel = acc[curr];
        acc[curr] = tippedLevel ? { withTip: true } : { withTip: false };
        return acc;
      },
      this.finishedLevels
    );
    const state = {
      currentLevelId: this.currentLevelId,
      finishedLevels: finishedLevels,
      tippedLevels: Array.from(this.tippedLevels),
    };
    const stateStringified = JSON.stringify(state);
    localStorage.setItem('state', stateStringified);
  }

  get() {
    return this;
  }

  getFromLocalStorage() {
    const stateStringified = localStorage.getItem('state');

    if (stateStringified) {
      const state = JSON.parse(stateStringified);
      this.currentLevelId = state.currentLevelId;

      this.tippedLevels = new Set(state.tippedLevels);

      if (Array.isArray(state.finishedLevels)) {
        this.finishedLevels = state.finishedLevels.reduce(
          (acc: FinishedLevels, curr: number) => {
            const isTipped = this.tippedLevels.has(curr);
            acc[curr] = { withTip: isTipped };
            return acc;
          },
          {}
        );
      } else {
        this.finishedLevels = state.finishedLevels;
      }
    }
  }
}

const gameState = new GameState();

export default gameState;
