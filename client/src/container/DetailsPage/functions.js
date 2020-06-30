import axios from 'axios';

export const addToFavorite = async ({ courseId, notification }) => {
  try {
    const { data } = await axios.post(`/api/v1/favorite/${courseId}`);
    const message =
      data.rowCount === 1 ? 'added to favorite' : 'already in favorite';
    notification.success({ message });
  } catch ({ response }) {
    const message = response.data.message || 'failed to add to favorite !';
    notification.error({ message });
  }
};

export const getCourseDetails = async ({
  courseId,
  setIsLoading,
  setErrorMessage,
  setCourseDetails,
  setComments,
}) => {
  try {
    const { data } = await axios.get(`/api/v1/courses/${courseId}`);
    setCourseDetails(data.courseDetails);
    setComments(data.comments);
    setIsLoading(false);
    setErrorMessage('');
  } catch ({ response }) {
    const message = response.data.message || 'sorry, something went wrong !';
    setIsLoading(false);
    setErrorMessage(message);
  }
};

export const addComment = async ({
  courseId,
  content,
  setIsPosting,
  comments,
  setComments,
  name,
  notification,
  setNewComment,
}) => {
  try {
    setIsPosting(true);
    const { data } = await axios.post(`/api/v1/comment/${courseId}`, {
      content,
    });
    setIsPosting(false);
    if (data.rowCount) {
      setComments([...comments, { name, content }]);
      setNewComment('');
      notification.success({
        message: 'your comment has been added successfuly !',
      });
    }
  } catch ({ response }) {
    const message = response.data.message || 'failed to add comment !';
    setIsPosting(false);
    notification.error({ message });
  }
};
