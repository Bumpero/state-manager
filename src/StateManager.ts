export type State<T> = T;

export interface HistoryState<T> {
  past: State<T>[];
  present: State<T>;
  future: State<T>[];
}

export class StateManager<T> {
  private history: HistoryState<T>;

  constructor(initialState: T) {
    this.history = {
      past: [],
      present: initialState,
      future: [],
    };
  }

  public getState(): T {
    return this.history.present;
  }

  public setState(newState: T): void {
    const { present, past } = this.history;

    this.history = {
      past: [...past, present],
      present: newState,
      future: [],
    };
  }

  public undo(): void {
    const { past, present, future } = this.history;

    if (past.length === 0) return;

    const previousState = past[past.length - 1];

    this.history = {
      past: past.slice(0, past.length - 1),
      present: previousState,
      future: [present, ...future],
    };
  }

  public redo(): void {
    const { past, present, future } = this.history;

    if (future.length === 0) return;

    const nextState = future[0];

    this.history = {
      past: [...past, present],
      present: nextState,
      future: future.slice(1),
    };
  }

  public reset(state: T): void {
    this.history = {
      past: [],
      present: state,
      future: [],
    };
  }

  public getHistorySize(): { past: number; future: number } {
    return {
      past: this.history.past.length,
      future: this.history.future.length,
    };
  }
}
