const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
};
