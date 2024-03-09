import { Directions, nextCursor } from "./cursor";

describe("cursor", () => {
  it("should return 0,0 for empty list", () => {
    expect(nextCursor({ x: 0, y: 0 }, [], Directions.UP)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [], Directions.DOWN)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [], Directions.LEFT)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [], Directions.RIGHT)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("should return 0,0 for single item", () => {
    expect(nextCursor({ x: 0, y: 0 }, [{}], Directions.UP)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [{}], Directions.DOWN)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [{}], Directions.LEFT)).toEqual({
      x: 0,
      y: 0,
    });
    expect(nextCursor({ x: 0, y: 0 }, [{}], Directions.RIGHT)).toEqual({
      x: 0,
      y: 0,
    });
  });

  describe("2 items", () => {
    it("when currrent is on the left should move to correct position", () => {
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}], Directions.UP)).toEqual({
        x: 0,
        y: 0,
      });
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}], Directions.DOWN)).toEqual({
        x: 0,
        y: 0,
      });
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}], Directions.LEFT)).toEqual({
        x: 1,
        y: 0,
      });
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}], Directions.RIGHT)).toEqual({
        x: 1,
        y: 0,
      });
    });
  });

  describe("Top left with 3 items", () => {
    it("move up will circulate to bottom left", () => {
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}, {}], Directions.UP)).toEqual({
        x: 0,
        y: 1,
      });
    });

    it("move down will move to bottom left", () => {
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}, {}], Directions.DOWN)).toEqual(
        {
          x: 0,
          y: 1,
        }
      );
    });

    it("move left will circulate to top right", () => {
      expect(nextCursor({ x: 0, y: 0 }, [{}, {}, {}], Directions.LEFT)).toEqual(
        {
          x: 1,
          y: 0,
        }
      );
    });

    it("move right will move to top right", () => {
      expect(
        nextCursor({ x: 0, y: 0 }, [{}, {}, {}], Directions.RIGHT)
      ).toEqual({
        x: 1,
        y: 0,
      });
    });
  });

  describe("Top right with 3 items", () => {
    it("move up should not move", () => {
      expect(nextCursor({ x: 1, y: 0 }, [{}, {}, {}], Directions.UP)).toEqual({
        x: 1,
        y: 0,
      });
    });

    it("move down should not move", () => {
      expect(nextCursor({ x: 1, y: 0 }, [{}, {}, {}], Directions.DOWN)).toEqual(
        {
          x: 1,
          y: 0,
        }
      );
    });

    it("move left will move to top left", () => {
      expect(nextCursor({ x: 1, y: 0 }, [{}, {}, {}], Directions.LEFT)).toEqual(
        {
          x: 0,
          y: 0,
        }
      );
    });

    it("move right will circulate to top left", () => {
      expect(
        nextCursor({ x: 1, y: 0 }, [{}, {}, {}], Directions.RIGHT)
      ).toEqual({
        x: 0,
        y: 0,
      });
    });
  });

  describe("Bottom left with 3 items", () => {
    it("can move up", () => {
      expect(nextCursor({ x: 0, y: 1 }, [{}, {}, {}], Directions.UP)).toEqual({
        x: 0,
        y: 0,
      });
    });

    it("move down should circular to top left item", () => {
      expect(nextCursor({ x: 0, y: 1 }, [{}, {}, {}], Directions.DOWN)).toEqual(
        { x: 0, y: 0 }
      );
    });

    it("move left should not change position", () => {
      expect(nextCursor({ x: 0, y: 1 }, [{}, {}, {}], Directions.LEFT)).toEqual(
        { x: 0, y: 1 }
      );
    });

    it("move right should not change position", () => {
      expect(
        nextCursor({ x: 0, y: 1 }, [{}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 0, y: 1 });
    });
  });

  describe("Bottom left with 4 items", () => {
    it("can move up", () => {
      expect(
        nextCursor({ x: 0, y: 1 }, [{}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 0, y: 0 });
    });

    it("move down should circular to top left", () => {
      expect(
        nextCursor({ x: 0, y: 1 }, [{}, {}, {}, {}], Directions.DOWN)
      ).toEqual({ x: 0, y: 0 });
    });

    it("move left should circular to the right", () => {
      expect(
        nextCursor({ x: 0, y: 1 }, [{}, {}, {}, {}], Directions.LEFT)
      ).toEqual({ x: 1, y: 1 });
    });

    it("move right should move to the bottom right", () => {
      expect(
        nextCursor({ x: 0, y: 1 }, [{}, {}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 1, y: 1 });
    });
  });

  describe("Bottom right with 4 items", () => {
    it("can move up", () => {
      expect(
        nextCursor({ x: 1, y: 1 }, [{}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 1, y: 0 });
    });

    it("move down should circular to top right", () => {
      expect(
        nextCursor({ x: 1, y: 1 }, [{}, {}, {}, {}], Directions.DOWN)
      ).toEqual({ x: 1, y: 0 });
    });

    it("move left should be able to move th the left", () => {
      expect(
        nextCursor({ x: 1, y: 1 }, [{}, {}, {}, {}], Directions.LEFT)
      ).toEqual({ x: 0, y: 1 });
    });

    it("move right should circular to the left", () => {
      expect(
        nextCursor({ x: 1, y: 1 }, [{}, {}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 0, y: 1 });
    });
  });

  describe("Top right with 4 items", () => {
    it("move up will circulate to bottom right", () => {
      expect(
        nextCursor({ x: 1, y: 0 }, [{}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 1, y: 1 });
    });

    it("move down will move to bottom right", () => {
        expect(
          nextCursor({ x: 1, y: 0 }, [{}, {}, {}, {}], Directions.DOWN)
        ).toEqual({ x: 1, y: 1 });
      });
  });

  describe("Bottom left with 5 items", () => {
    it("can move up", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 0, y: 1 });
    });

    it("move down should circulate to top left", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}], Directions.DOWN)
      ).toEqual({ x: 0, y: 0 });
    });

    it("move left should not change position", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}], Directions.LEFT)
      ).toEqual({ x: 0, y: 2 });
    });

    it("move right should not change position", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 0, y: 2 });
    });
  });

  describe("Bottom left with 6 items", () => {
    it("can move up", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 0, y: 1 });
    });

    it("moving down should circulate to top left", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.DOWN)
      ).toEqual({ x: 0, y: 0 });
    });

    it("moving left should circulate to the bottom right", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.LEFT)
      ).toEqual({ x: 1, y: 2 });
    });

    it("moving right should move to the bottom right", () => {
      expect(
        nextCursor({ x: 0, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 1, y: 2 });
    });
  });

  describe("Bottom right with 6 items", () => {
    it("can move up", () => {
      expect(
        nextCursor({ x: 1, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.UP)
      ).toEqual({ x: 1, y: 1 });
    });

    it("move down will circulate to top right", () => {
      expect(
        nextCursor({ x: 1, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.DOWN)
      ).toEqual({ x: 1, y: 0 });
    });

    it("move left will move to bottom left", () => {
      expect(
        nextCursor({ x: 1, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.LEFT)
      ).toEqual({ x: 0, y: 2 });
    });

    it("move right will circulate to bottom left", () => {
      expect(
        nextCursor({ x: 1, y: 2 }, [{}, {}, {}, {}, {}, {}], Directions.RIGHT)
      ).toEqual({ x: 0, y: 2 });
    });
  });
});
