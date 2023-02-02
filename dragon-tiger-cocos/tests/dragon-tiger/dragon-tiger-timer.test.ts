import { DragonTigerTimer } from "../../assets/dragon-tiger/scripts/dragon-tiger-timer";

describe(DragonTigerTimer.name, () => {
  let component: DragonTigerTimer;
  let timer = { text: "", color: "", node: { active: undefined } };

  beforeEach(() => {
    component = new DragonTigerTimer();

    component["timer"] = timer as any;
  });

  describe("onRemainingTimeUpdated", () => {
    describe("when called", () => {
      it("should set data to timer component", () => {
        // Act
        component.onRemainingTimeUpdated(1);

        // Assert
        expect(timer.text).toBe("01");
      });
    });

    describe("when input is undefined", () => {
      it("should set default value to timer component", () => {
        // Act
        component.onRemainingTimeUpdated(undefined);

        // Assert
        expect(timer.text).toBe("00");
      });
    });
  });

  describe("changeTimerColor", () => {
    describe("when called", () => {
      it("should set the color value to the timer component", () => {
        // Act
        component.changeTimerColor("WHITE");

        // Assert
        expect(timer.color).toBe("WHITE");
      });
    });
  });

  describe("toggleTimer", () => {
    describe("when the param is true", () => {
      it("should disable the timer node", () => {
        // Act
        component.toggleTimer(true);

        // Assert
        expect(timer.node.active).toBeFalsy();
      });
    });

    describe("when the param is false", () => {
      it("should enable the timer node", () => {
        // Act
        component.toggleTimer(false);

        // Assert
        expect(timer.node.active).toBeTruthy();
      });
    });
  });
});
