module.exports = (seconds = 0) =>
  Math.round(new Date().getTime() / 1000) + seconds
