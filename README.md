# Debug Trainer

Randomly break your code and then use your debugging skills to fix it!

## Installation

```
npm install -g debug_trainer
```

## Usage:

Randomly introduce an error into the specified file:
```
debug_trainer break <filepath>
```

Display a hint about the error that was introduced into the specified file:
```
debug_trainer hint <filepath>
```

Change the specified file back to its original, unbroken state:
```
debug_trainer reset <filepath>
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

- underscore vs hyphen swap
- open or closing paren/bracket deletion or addition
- messing with presence of the `this` keyword in JavaScript, `self` in Python, `@`-variables in Ruby, etc.
