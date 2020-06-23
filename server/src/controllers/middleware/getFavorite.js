const { getFavoriteCourse, getUserById } = require('../../database/queries');
const { favoriteSchema } = require('../../utils');

const getFavorite = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await favoriteSchema.validate({ userId });
    if (userId > 0) {
      const checkUser = await getUserById(userId);
      if (checkUser.rowCount) {
        const { rows } = await getFavoriteCourse(userId);
        if (rows.length) {
          res.json(rows);
        } else {
          res.json({
            message: 'There is no favorite courses for this user id',
          });
        }
      } else {
        res.status(404).json({
          message: 'Invalid id',
        });
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs' });
    } else {
      next(err);
    }
  }
};

module.exports = getFavorite;