import { LitElement, html } from '../DWA14/lit-html';
//import { LitElement, html, css, property } from 'lit';

class CounterApp extends LitElement {
    static properties = {
        open: {type: 'boolean', state: true},

    };

    constructor() {
        super();
        this.open = true
    }
    
    render() {
        return html`<div>
        <h1>Tally Counter</h1>
        <p counter>0</p>
        <sl-button add-button>Add</sl-button>
        <sl-button subtract-button>Subtract</sl-button>
        <sl-button reset-button>Reset</sl-button>
    
    
        <script>
            const counterElement = document.querySelector("[counter]")
            const addButton = document.querySelector("[add-button]");
            const subtractButton = document.querySelector("[subtract-button]");
            const resetButton = document.querySelector("[reset-button]");
    
            let counterValue = 0;
    
            addButton.addEventListener("click", () => {
                counterValue++;
                updateCounter();
            });
    
            subtractButton.addEventListener("click", () => {
                counterValue--;
                updateCounter();
            });
    
            resetButton.addEventListener("click", () => {
                counterValue = 0;
                updateCounter();
                alert("Counter has been reset.");
            });
    
            function updateCounter() {
                counterElement.textContent = counterValue;
            }
            
        </script>
        </div>`
    }
}

customElements.define("counter-app", CounterApp)


//     //   @property({ type: Number }) count = 0;
// //   @property({ type: String }) state = "Normal";

// //   static styles = css`
// //     :host {
// //       display: block;
// //       text-align: center;
// //     }
// //   `;

// //   constructor() {
// //     super();
// //   }

// //   increment() {
// //     this.count++;
// //     this.updateState();
// //   }

// //   decrement() {
// //     this.count--;
// //     this.updateState();
// //   }

// //   updateState() {
// //     if (this.count === 0) {
// //       this.state = "Minimum Reached";
// //     } else if (this.count === 10) {
// //       this.state = "Maximum Reached";
// //     } else {
// //       this.state = "Normal";
// //     }
// //   }

// //   render() {
// //     return html`
// //     <div>
// //       <h1>Counter App</h1>
// //       <p>Count: ${this.count}</p>
// //       <p>State: ${this.state}</p>
// //       <button @click=${this.increment}>Increment</button>
// //       <button @click=${this.decrement} ?disabled=${this.count === 0}>Decrement</button>
// //     </div>
// //     `;
// //   }
// // }

// // customElements.define('counter-app', CounterApp);
