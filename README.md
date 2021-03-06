# Debug Trainer

Randomly break your code and then use your debugging skills to fix it!

## What is it?

[The blog post](https://kickstartcoding.online/learn/articles/introducing-debug-trainer/) goes into more detail, but basically:

`debug_trainer` is a terminal program that helps you practice debugging by breaking your code in random ways, so that you can practice tracking down and fixing the errors.

## NEW Interactive Mode!

Running `debug_trainer` with no other arguments will run it in "interactive mode". Instead of having to run each command individually, it will ask you what to do in the console. If you give it a filename, as in `debug_trainer myFile.js`, it will break that file. If you just run `debug_trainer`, it will choose a file at random.

## Commands

### Note: if you use the new interactive mode, you don't need to know these commands anymore

The `break` command will introduce an error to a file of your choosing.

The `error-type-hint` and `line-hint` commands will give you hints about what was broken.

The `explain` command will tell you in words exactly what the change was if you can't find it.

And when you're done, the `reset` command will set the file back to normal.

This package should work well for files in many different languages; I've tried to keep the changes it makes as generalizable as is reasonably possible.

## Installation

```bash
npm install -g debug_trainer
```

## Usage

### Interactive mode usage

Randomly introduce an error into a file called `myFile.js`:
```bash
debug_trainer myFile.js
```

Randomly introduce an error into a randomly chosen file in your current working directory:
```bash
debug_trainer
```

### Old non-interactive-mode usage

Replace `myFile.js` in any of these examples with one of the files in a project of yours (it does not have to be a JavaScript file).

Randomly introduce an error into a file called `myFile.js`:
```bash
debug_trainer break myFile.js
```

Randomly introduce three errors into a file called `myFile.js`:
```bash
debug_trainer break --count 3 myFile.js
```

Display a hint that explains what type of error(s) were introduced into `myFile.js`:
```bash
debug_trainer error-type-hint myFile.js
```

Display a hint that tells you the line number where the error(s) were introduced into `myFile.js`:
```bash
debug_trainer line-hint myFile.js
```

Describe exactly what part(s) of `myFile.js` were broken and how:
```bash
debug_trainer explain myFile.js
```

Change `myFile.js` back to its original, unbroken state:
```bash
debug_trainer reset myFile.js
```

## Development

To build the program:
```bash
npm run build
```

To run in development mode:
```bash
npm run dev
```

To run all tests:
```bash
npm run test
```

To run the compiled program:
```bash
node bin/debug_trainer
```

## Possible future features

- Command to revert file to broken state, without any user changes made while debugging
- Command to console log content of the original, working file
- Command to console log content of the original broken state without any user changes made while debugging
- Command to explain what error was introduced
- Command to reset *all* broken files
- Command to remove break data without resetting any files
- Ability to run the file to confirm the original isn't broken, or to confirm that the broken version is actually broken
- Add more encouragements (perhaps using Leslie Knope compliments for inspiration?)

## Possible future error possibilities to introduce

- == vs = swap
- underscore vs hyphen swap
- messing with presence of the `this` keyword in JavaScript, `self` in Python, `@`-variables in Ruby, etc.
