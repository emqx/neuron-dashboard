// Define a type for the action functions
type ActionFunction = (...args: any[]) => void

// Define a type for the actions object
type ActionsObject = {
  onGlobalStateChange: ActionFunction
  setGlobalState: ActionFunction
}

function emptyAction(): void {
  // Warning: prompt that the current use is an empty Action
  console.warn('Current execute action is empty!')
}

// We first set an Actions class for communication

class Actions {
  // Declare the actions property with the ActionsObject type
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
