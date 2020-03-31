import allModules from '@state/modules'
import store from '@state/store'

export default function dispatchActionForAllModules(
  actionName: string,
  { modules = allModules, modulePrefix = '', dispatchGlobal = false } = {}
) {
  // For every module...
  for (const moduleName in modules) {
    const moduleDefinition = modules[moduleName]

    // If the action is defined on the module...
    if (moduleDefinition.actions && moduleDefinition.actions[actionName]) {
      // Dispatch the action if the module is namespaced. Otherwise,
      // set a flag to dispatch the action globally at the end.
      if (moduleDefinition.namespaced) {
        store.dispatch(`${modulePrefix}${moduleName}/${actionName}`)
      } else {
        dispatchGlobal = true
      }
    }

    // If there are any nested sub-modules...
    if (moduleDefinition.modules) {
      // Also dispatch the action for these sub-modules.
      dispatchActionForAllModules(actionName, {
        modules: moduleDefinition.modules,
        modulePrefix: modulePrefix + moduleName + '/',
        dispatchGlobal,
      })
    }
  }

  // If this is the root and at least one non-namespaced module
  // was found with the action...
  if (!modulePrefix && dispatchGlobal) {
    // Dispatch the action globally.
    store.dispatch(actionName)
  }
}