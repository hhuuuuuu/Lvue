import Lvue from "./instance/index";

const config: any = {
  data(): object {
    return {
      f: 2
    };
  },

  render(): void {
    console.log(this.f, "render");
  },

  beforeCreate(): void {
    console.log("call beforeCreate");
  },

  created() {
    console.log("call created");
  },

  mounted() {
    setTimeout(() => {
      this.f = 6;
    }, 10);
  }
};

const vm: any = new Lvue(config);

export default Lvue;
