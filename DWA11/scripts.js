// State
let counterValue = 0;

// Action creators
const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

// Reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case 'RESET':
            return 0;
        default:
            return state;
        
    }
}

const createStore = (reducer) => {
    let state;
    const listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    function subscribe(listener) {
        listeners.push(listener);
    }

    // Initialize the state
    state = reducer(undefined, {});

    return { getState, dispatch, subscribe };
}

// Create a store with the counter reducer
const tallyStore = createStore(counter);

// Subscribe to state changes and log to the console
tallyStore.subscribe(() => {
    console.log('State:', tallyStore.getState());
});

//Scenario 1
  console.log('Scenario 1:');
  console.log('State:', tallyStore.getState());
  
  // Scenario 2
  console.log('Scenario 2:');
  tallyStore.dispatch({ type: 'INCREMENT' });
  tallyStore.dispatch({ type: 'INCREMENT' });
  
  // Scenario 3
  console.log('Scenario 3:');
  tallyStore.dispatch({ type: 'DECREMENT' });
  
  // Scenario 4
  console.log('Scenario 4:');
  tallyStore.dispatch({ type: 'RESET' });
  
