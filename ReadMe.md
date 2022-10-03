# ScrAdd - Script Adder

Adds script to a package.json file from the terminal or in scripts.

I've often seen the need to programmatically be able to add a script or two to a `package.json`, for example when writing instructions for a tutorial or lesson. With ScrAdd this is now just a `npx` command away.

ScrAdd will not overwrite existing scripts, but rather inform you that one of those exists already.

## Usage

```bash
npx scradd {path to package.json} {script name} {script content} -o'
```

* `-o` - overwrites an existing script. Default behavior is to not overwrite existing scripts

## Examples

* Add a simple script to a local `package.json`

  ```bash
  npx scradd . test "mocha ."
  ```

* Add a simple script to a non-local `package.json`

  ```bash
  npx scradd ~/projects/myproj/package.json test "mocha ."
  ```

* Adding a script with separators in the name requires quotes:

  ```bash
  npx scradd . "test:watch:integration" "mocha ."
  ```

* Adding script content just about always requires quotes, since it contains spaces:

  ```bash
  npx scradd . "test:watch" "npm t -- -R min -w ./src/"
  ```

* Overwrite an existing script using the `-o` flag, for example the `test` script that is created by default:

  ```bash
  npx scradd . "test" "mocha -R min" -o
  ```

## Contribute

This is a quick and dirty first version of the code. I wanted it to be workable but not perfect.

You can contribute to this package by forking the repository and clone it to your computer. Remember to add tests.
