export interface MenuItem {
  isSelected?: boolean;
  text?: string;
}

export enum Directions {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
}

export function nextCursor(
  point: { x: number; y: number },
  items: MenuItem[],
  key: string
): { x: number; y: number } {
  if (items.length <= 1) return point;

  let x = point.x;
  switch (key) {
    case Directions.LEFT:
      if (isLastRow(point, items) && isEven(items) && isOverLeft(x)) {
        x = 0;
        break;
      }
      if (isOverLeft(x)) {
        x = 1;
        break;
      }
      x -= 1;
      break;
    case Directions.RIGHT:
      if (isLastRow(point, items) && isEven(items) && x + 1 > 0) {
        x = 0;
        break;
      }
      if (isOverRight(x)) {
        x = 0;
        break;
      }
      x += 1;
      break;
  }

  let y = point.y;
  switch (key) {
    case Directions.UP:
      if (isOnRightColumn(point) && isWillOverTop(y)) {
        y = getLastRowIndex(items, x);
        break;
      }
      if (isWillOverTop(y)) {
        y = getLastRowIndex(items, x);
        break;
      }
      y -= 1;
      break;
    case Directions.DOWN:
      if (y + 1 > getLastRowIndex(items, point.x)) {
        y = 0;
        break;
      }
      y += 1;
      break;
  }

  return {
    y: y,
    x: x,
  };
}

function isOnRightColumn(point: { x: number; y: number; }) {
    return point.x === 1;
}

function isWillOverTop(y: number) {
    return y - 1 < 0;
}

function getLastRowIndex(items: MenuItem[], column: number): number {
    if (column === 0) {
        return coutRow(items) - 1
    }
    return isEven(items) ? coutRow(items) -2: coutRow(items) -1
}

function coutRow(items: MenuItem[]) {
    return Math.round(items.length / 2);
}

function isOverRight(x: number) {
  return x + 1 > 1;
}

function isOverLeft(x: number) {
  return x - 1 < 0;
}

function isLastRow(point: { x: number; y: number }, items: MenuItem[]) {
  return point.y === Math.round(items.length / 2) - 1;
}

function isEven(items: MenuItem[]) {
  return items.length % 2 !== 0;
}
