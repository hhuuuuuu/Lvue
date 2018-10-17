import Lvue from "./instance/index";

const config: any = {
  el: "#app",
  data(): object {
    return {
      ff: [7, 8],
      b: 2,
      a: {
        c: 1
      },
      test: 1
    };
  },

  render(): string | void {
    return `
    <div>
        {%if test > 2%}
              if
        {%else if test > 1%}
            else
        {% else %}
          88
        {%endif%}
</div>
    `;
  },

  beforeCreate(): void {},

  created() {},

  mounted() {
    setTimeout(() => {
      this.a.c = 66;
    }, 1000);
  }
};

const vm: any = new Lvue(config);

export default Lvue;
