# action-throttler

A utility to limit execution of similar actions. Useful when you have a rapidly reoccurring event and the action you call for that is a little expensive, so you want to limit its execution to ten times a second, for example.

## Installation
```
npm install action-throttler
```
OR
```
bun add action-throttler
```

## Usage
`Throttler(timeout: number)`

Create a new throttler instance by passing the execution interval to it. It won't call any action you pass to it more frequently than that (except for instant execution calls).

```js
const throttler = new Throttler(100);
```

`.push(action: Function)`

Push an action to be called. If there isn't a pending action it will create a timeout and call the action afterward. But if there was a pending action already, it simply replaces that instead.

```js
throttler.push(() => {
    console.log("this will be called after the timeout if no further push() call replaces it");
});
```

`.reset(action: Function)`

Cancel the current pending action and the timer (if there is any), and set a timer for this action instead.

```js
throttler.reset(() => {
    console.log("this will be called after a newly set timeout");
});
```

`.exec(action: Fuction)`

Cancel the current pending action and the timer (if there is any), and call this action immediately.

```js
throtter.exec(() => {
    console.log("this is super important, and will be called instantly")
});
```

`.cancel()`

Cancel the current pending action and the timer (if there is any).
