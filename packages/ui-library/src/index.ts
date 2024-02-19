import { VNode, init } from 'snabbdom';

const patch = init([]);

type TemplateFunction = (state: any) => VNode;

export class UIComponent {
  private state: any;
  private template: TemplateFunction;
  private container: HTMLElement;

  constructor(template: TemplateFunction, initialState: any, containerSelector: string) {
    this.state = initialState;
    this.template = template;
    this.container = document.querySelector(containerSelector) as HTMLElement;
    this.render();
  }

  private render(): void {
    this.container.innerHTML = '';
    const newVNode = this.template(this.state);
    console.log(newVNode);
    patch(this.container, newVNode);
  }

  public updateState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  public getState(): any {
    return this.state;
  }
}
