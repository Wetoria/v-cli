let apply = (action, ...args) => {
  require(`./${action}`)(...args);
};

export default apply;
