# Installation

We're using PNPM `pnpm add -g pnpm` to manage packages. Fast! https://pnpm.io/

- `pnpm install`
- `pnpm dev`

  * will run `watch` and `browsersync` in parallel

During the Lint0staged tasks, if you get an error like `eslint —-fix [FAILED]` and you were only committing a config file like .eslintc.js i.e. not a theme js file, then you can use the `--no-verify` flag on your commit message to bypass lint-stages tasks.

Example:

```
    git commit -m "feat: suggest eslint settings" --no-verify
```
