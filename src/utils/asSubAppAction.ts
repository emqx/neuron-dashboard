type ActionFunction = (...args: any[]) => void

type ActionsObject = {
  onGlobalStateChange: ActionFunction
  setGlobalState: ActionFunction
}

function emptyAction(): void {
  console.warn('Current execute action is empty!')
}

class Actions {
  actions: ActionsObject

  // The default value is an empty Action
  constructor() {
    this.actions = {
      onGlobalStateChange: emptyAction,
      setGlobalState: emptyAction,
    }
  }

  // Set actions
  setActions(actions: ActionsObject): void {
    this.actions = actions
  }

  // Mapping
  onGlobalStateChange(...args: any[]): void {
    return this.actions.onGlobalStateChange(...args)
  }

  // Mapping
  setGlobalState(...args: any[]): void {
    return this.actions.setGlobalState(...args)
  }
}

const action = new Actions()

export default action
