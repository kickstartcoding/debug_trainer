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