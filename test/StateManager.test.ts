import { StateManager } from '../src/StateManager';

interface MyState {
  counter: number;
}

describe('StateManager', () => {
  it('should initialize with the initial state', () => {
    const initialState: MyState = { counter: 0 };
    const stateManager = new StateManager(initialState);

    expect(stateManager.getState()).toEqual(initialState);
  });

  it('should update the state and clear future history', () => {
    const stateManager = new StateManager({ counter: 0 });

    stateManager.setState({ counter: 1 });
    stateManager.setState({ counter: 2 });

    expect(stateManager.getState()).toEqual({ counter: 2 });
    stateManager.undo();
    stateManager.setState({ counter: 3 });

    expect(stateManager.getHistorySize().future).toEqual(0);
  });

  it('should undo and redo state changes', () => {
    const stateManager = new StateManager({ counter: 0 });

    stateManager.setState({ counter: 1 });
    stateManager.setState({ counter: 2 });
    stateManager.undo();

    expect(stateManager.getState()).toEqual({ counter: 1 });

    stateManager.redo();

    expect(stateManager.getState()).toEqual({ counter: 2 });
  });

  it('should reset the state', () => {
    const stateManager = new StateManager({ counter: 0 });

    stateManager.setState({ counter: 1 });
    stateManager.reset({ counter: 10 });

    expect(stateManager.getState()).toEqual({ counter: 10 });
    expect(stateManager.getHistorySize().past).toEqual(0);
  });
});
