import Lvue from "./instance/index";

const config: any = {
  data(): object {
    return {
      f: {
        b: 1
      }
    };
  },

  render(): void {
    console.log(this.f.b, "render");
  },

  beforeCreate(): void {
    console.log("call beforeCreate");
  },

  created() {
    console.log("call created");
  },

  mounted() {
    this.f.b = 22;
    setTimeout(() => {
      this.f = {
        b: 2
      };
    }, 10);
  }
};

const vm: any = new Lvue(config);

console.log(vm);

export default Lvue;
