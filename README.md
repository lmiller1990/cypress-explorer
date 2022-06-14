## Cypress Explorer

WIP.

### Usage

1. Install the plugin (`cypress.config.ts`)

```ts
import { defineConfig } from 'cypress'
import { startExplorerServer } from 'cypress-explorer/server'

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      startExplorerServer()
    }
  }
})
```

2. Install the command (`cypress/commands/e2e.ts`)

```ts
import { registerCypressExplorer } from 'cypress-explorer'

registerCypressExplorer()
```
