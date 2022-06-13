module.exports = {
  //make datestamp legible
  formatDate: function (date) {
    if (date) { return date.toDateString(); }

  },
  bar: function () {
    return "BAR!";
  }
}