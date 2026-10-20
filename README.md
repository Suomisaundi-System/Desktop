# Suomisaundi System — Desktop

This is a public, independent subsystem foundation of Suomisaundi System.

- `index.html` loads `index.js` as a module.
- `index.js` shows a subsidiary notice and redirects visitors to the central website after ten seconds.
- `system.js` exports browser capability detection and basic browser-runtime helpers.

Public entry point: https://suomisaundi-system.github.io/

## Implementation status
Foundation only. Capability detection is not an implementation of all supported browser APIs. Browser workers are not Node.js servers, hardened sandboxes, or provisioned cloud instances. Durable backend sessions and serverless execution require a trusted provider.

## Desktop initialization
Import `desktop.js` and call `initializeDesktop({container})`. It detects a fine-pointer desktop viewport, renders a desktop launcher with SVG icons, and integrates the Window subsystem as an in-page window manager. Use `force:true` for manual previews. This is not a native operating system; desktop detection is heuristic.
