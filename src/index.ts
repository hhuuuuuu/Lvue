import Lvue from "./instance/index";

const config: any = {
  data(): object {
    return {
      f: [{ a: 1 }]
    };
  },

  render(): void {
    console.log(this.f[0].a, "render");
  },

  beforeCreate(): void {
    console.log("call beforeCreate");
  },

  created() {
    console.log("call created");
  },

  mounted() {
    this.f[0].a = { v: 333 };
  }
};

const vm: any = new Lvue(config);

console.log(vm);

export default Lvue;
