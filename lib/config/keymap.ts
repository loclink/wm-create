const actions = require('enquirer/lib/combos');
const customKeys = { h: 'left', j: 'down', k: 'up', l: 'right' };
const searchAction = { ...actions };
actions.keys = { ...actions.keys, ...customKeys };
actions.shift = { ...actions.shift, k: 'shiftUp', j: 'shiftDown' };
searchAction.shift = { ...searchAction.shift, j: 'down', k: 'up' };
export { actions, searchAction };
