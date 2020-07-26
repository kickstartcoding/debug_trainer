# Debug Trainer

Randomly break your code and then use your debugging skills to fix it!

## Installation

```bash
npm install -g debug_trainer
```

## Usage:

Randomly introduce an error into the specified file:
```bash
debug_trainer break <filepath>
```

Randomly introduce three errors into the specified file:
```bash
debug_trainer break --count 3 <filepath>
```

Display a hint that explains what type of error(s) were introduced into the specified file:
```bash
debug_trainer error-type-hint <filepath>
```

Display a hint that tells you the line number where the error(s) were introduced into the specified file:
```bash
debug_trainer line-hint <filepath>
```

Describe exactly what part(s) of the specified file were broken and how:
```bash
debug_trainer explain <filepath>
```

Change the specified file back to its original, unbroken state:
```bash
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

- == vs = swap
- underscore vs hyphen swap
- messing with presence of the `this` keyword in JavaScript, `self` in Python, `@`-variables in Ruby, etc.
