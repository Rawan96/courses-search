const { getcourseById } = require('./courseDetails');
const addFutureCourse = require('./addFutureCourses.js');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  getcourseById,
  addFutureCourse,
  addFavorite,
  deleteFavorite,
};
