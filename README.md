# Debug Trainer

Randomly break your code and then use your debugging skills to fix it!

## What is it?

`debug_trainer` is a terminal program that can introduce a random error (or errors if you're feeling adventurous) into a file of your choosing (the `break` command), so that you can practice debugging. It can give you hints if you get stuck (the `error-type-hint` and `line-hint` commands). It can tell you in words exactly what the change was if you can't find it (the `explain` command). And when you're done, it can set the file back to normal with the `reset` command so you can do it all again with a different error!

This package should work well for files in many different languages; I've tried to keep the changes it makes as generalizable as is reasonably possible.

## Installation

```bash
npm install -g debug_trainer
```

## Usage:

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

## Possible future features:

- Command to revert file to broken state, without any user changes made while debugging
- Command to console log content of the original, working file
- Command to console log content of the original broken state without any user changes made while debugging
- Command to explain what error was introduced
- Command to reset *all* broken files
- Command to remove break data without resetting any files
- Ability to run the file to confirm the original isn't broken, or to confirm that the broken version is actually broken

## Possible future error possibilities to introduce:

- == vs = swap
- underscore vs hyphen swap
- messing with presence of the `this` keyword in JavaScript, `self` in Python, `@`-variables in Ruby, etc.
