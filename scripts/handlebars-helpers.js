module.exports = {
  formatDate: function (date) {
    if (date) { return date.toDateString(); }

  },
  bar: function () {
    return "BAR!";
  }
}