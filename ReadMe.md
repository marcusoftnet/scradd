# ScrAdd - Script Adder

Adds script to a package.json file from the terminal and in scripts.

I've often seen the need to programatically be able to add a script or two to a `package.json`, for example when writing instructions for a tutorial or lesson. With ScrAdd this is now just a `npx` command away.

ScrAdd will not overwrite existing scripts, but rather inform you that one of those exists already.

## Usage

```bash
npx scradd {path to package.json} {script name} {script content}'
```

## Examples

* Add a simple script to a local `package.json`

  ```bash
  npx scradd . test "mocha ."
  ```

* Add a simple script to a non-local `package.json`

  ```bash
  npx scradd ~/projects/myproj/package.json test "mocha ."
  ```

* Adding a script with a longer name requires quotes:

  ```bash
  npx scradd . "test:watch:integration" "mocha ."
  ```

* Adding script content just about always requires quotes, since it contains spaces:

```bash
  npx scradd . "test:watch" "npm t -- -R min -w ./src/"
  ```
