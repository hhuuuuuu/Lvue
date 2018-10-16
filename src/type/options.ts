export interface options {
  data(): object;
  render(): string | void;
  beforeCreate(): void;
  el: string;
}
