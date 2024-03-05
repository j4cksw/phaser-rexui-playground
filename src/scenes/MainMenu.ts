import { Scene, GameObjects } from "phaser";
import GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";
import ScrollablePanel from "phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

interface MenuItem {
  isSelected: boolean;
  text: string;
}
export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  rexUI: RexUIPlugin;

  private coordinateToArrayIndex = () =>
    this.currentVerticalSelectedIndex * this.gridSizer.columnCount +
    this.currentHorizontalSelectedIndex;

  constructor() {
    super("MainMenu");
  }

  //sizer: Sizer;
  scrollPanel: ScrollablePanel;
  gridSizer: GridSizer;

  menuItems = [
    { isSelected: true, text: "text1" },
    { isSelected: false, text: "text2" },
    { isSelected: false, text: "text3" },
    { isSelected: false, text: "text4" },
    { isSelected: false, text: "text5" },
    { isSelected: false, text: "text6" },
    { isSelected: false, text: "text7" },
    { isSelected: false, text: "text8" },
    { isSelected: false, text: "text9" },
    { isSelected: false, text: "text10" },
  ];

  currentVerticalSelectedIndex = 0;
  currentHorizontalSelectedIndex = 0;

  create() {
    // this.sizer = this.rexUI.add.sizergridSizer(0, 0, 1024, 100, {
    //   orientation: "y",
    // }).setOrigin(0, 0);

    this.menuItems = Array.from({ length: 3 }, (value, index) => {
      return { isSelected: index === 0, text: `text${index}` };
    });

    this.gridSizer = this.rexUI.add
      .gridSizer(0, 0, 1024, 768, {
        //     createCellContainerCallback: function(scene, x, y, config) {
        //     config.expand = true;
        // },
        column: 2,
        row: 1,
        columnProportions: 1,
        //rowProportions: 1,
      })
      .setOrigin(0, 0);

    this.scrollPanel = this.rexUI.add
      .scrollablePanel({
        scrollMode: 0,
        x: 0,
        y: 0,
        width: 1024,
        height: 768,
        panel: {
          child: this.gridSizer,
          mask: {
            //mask: true,
            padding: 1,
          },
        },
      })
      .setOrigin(0, 0)
      .layout();

    this.addSizer();

    this.input.keyboard?.on("keydown", (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          this.currentVerticalSelectedIndex -= 1;
          if (this.currentVerticalSelectedIndex < 0)
            this.currentVerticalSelectedIndex = this.gridSizer.rowCount - 1;
          break;
        case "ArrowDown":
          this.currentVerticalSelectedIndex += 1;
          
          if (this.currentVerticalSelectedIndex > this.gridSizer.rowCount - 1)
            this.currentVerticalSelectedIndex = 0;
          break;

        case "ArrowLeft":
          this.currentHorizontalSelectedIndex -= 1;
          if (this.coordinateToArrayIndex() > this.menuItems.length-1)
            break;
          if (this.currentHorizontalSelectedIndex < 0)
            this.currentHorizontalSelectedIndex =
              this.gridSizer.columnCount - 1;
          break;
        case "ArrowRight":
          this.currentHorizontalSelectedIndex += 1;
          if (this.coordinateToArrayIndex() > this.menuItems.length-1)
            break
          if (
            this.currentHorizontalSelectedIndex >
            this.gridSizer.columnCount - 1
          )
            this.currentHorizontalSelectedIndex = 0;
          break;
      }

      console.log(this.currentVerticalSelectedIndex);
      console.log(this.currentHorizontalSelectedIndex);

      if (this.coordinateToArrayIndex() > this.menuItems.length-1)
            this.currentVerticalSelectedIndex = 0;
      

      if (this.menuItems.length == 1) {
        this.currentHorizontalSelectedIndex = 0;
        this.currentVerticalSelectedIndex = 0;
      }

      this.menuItems = this.menuItems.map((mi, index) => {
        return {
          ...mi,
          isSelected: index === this.coordinateToArrayIndex() ? true : false,
        };
      });

      this.addSizer();

      this.scrollPanel.t =
        (this.currentVerticalSelectedIndex - 0) / (this.gridSizer.rowCount - 0);
      this.scrollPanel.layout();
      console.log(this.scrollPanel.t);
    });
  }

  addSizer() {
    this.gridSizer.clear(true);
    this.menuItems.forEach((menuItem) =>
      this.gridSizer.add(this.addText(menuItem), {
        align: "left",
        expand: true,
      })
    );
    this.gridSizer.layout();
    //.drawBounds(this.add.graphics(), 0xff0000);
  }

  addText(menuItem: MenuItem) {
    // return this.add.text(0, 0, menuItem.text, {
    //   fontSize: "100px",
    //   color: "white",
    // });
    return this.rexUI.add.label({
      //width: 100,
      height: 40,
      //menuItem.isSelected
      background: this.rexUI.add
        .roundRectangle(0, 0, 0, 0, 0, 0x7b5e57)
        .setVisible(menuItem.isSelected),
      //: undefined,
      text: this.add.text(0, 0, menuItem.text, {
        fontSize: 18,
      }),
      space: {
        left: 10,
        right: 10,
      },
    });
  }
}
