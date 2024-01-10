// import { LitElement, html, css, property } from './lit-html';

// class CounterApp extends LitElement {
// //   @property({ type: Number }) ;
// //   @property({ type: String }) ;

//   static styles = css`
//     :host {
//       display: block;
//       text-align: center;
//     }
//   `;

//   constructor() {
//     super();
//     this.count = 0;
//     this.state = "Normal";

//   }

//   increment() {
//     this.count++;
//     this.updateState();
//   }

//   decrement() {
//     this.count--;
//     this.updateState();
//   }

//   updateState() {
//     if (this.count === 0) {
//       this.state = "Minimum Reached";
//     } else if (this.count === 10) {
//       this.state = "Maximum Reached";
//     } else {
//       this.state = "Normal";
//     }
//   }

//   render() {
//     return html`
    
//     <div class="counter-app">
//       <h1>Counter App</h1>
//       <p>Count: ${this.count}</p>
//       <p>State: ${this.state}</p>
//       <button @click=${this.increment}>Increment</button>
//       <button @click=${this.decrement} ?disabled=${this.count === 0}>Decrement</button>
//     </div>
//       `;
//   }
// }

// customElements.define('counter-app', CounterApp);
