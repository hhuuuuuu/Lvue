import Lvue from "./instance/index";

const config: any = {
  el: "#app",
  data(): object {
    return {
      ff: [7, 8],
      b: 2,
      a: {
        c: 1
      }
    };
  },

  render(): string | void {
    // return createElement({
    //   tagName: "div",
    //   attrs: {
    //     innerText: this.f[0].a
    //   }
    // });
    return `
      <%for (a of this.ff){%>
          <div><%a%></div>
      <%}%>
    `;
  },

  beforeCreate(): void {
    console.log("call beforeCreate");
  },

  created() {
    console.log("call created");
  },

  mounted() {
    setTimeout(() => {
      this.ff = [4, 5];
    }, 1000);
  }
};

const vm: any = new Lvue(config);

console.log(vm);

export default Lvue;
