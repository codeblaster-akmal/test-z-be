exports.diff_minutes = (dt1) => {
  var d = new Date();
  var diff = (dt1.getTime() - d.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

exports.diff_days = (dt1, dt2) => {
  const date1 = new Date(dt1);
  const date2 = new Date(dt2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

exports.addDateFunc = (data, num) => {
  let dayDate = new Date(data);
  dayDate.setDate(dayDate.getDate() + num);
  return dayDate;
};

exports.dateToNum = (date) => {
  let month = date.getUTCMonth() + 1; //months from 1-12
  let day = date.getUTCDate();
  let year = date.getUTCFullYear().toString().substr(-2);

  return year+''+month+''+day;
};
