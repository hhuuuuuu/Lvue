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
      <div>
    {{a}}

    {% if test > 1 %}
        {{ test }}{{dd}}
    {% endif %}
    {{b}}
</div>
    `;
  },

  beforeCreate(): void {},

  created() {},

  mounted() {
    setTimeout(() => {
      this.ff = [4, 5];
    }, 1000);
  }
};

const vm: any = new Lvue(config);

export default Lvue;
