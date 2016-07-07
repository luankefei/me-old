const UPLOAD = 'post/UPLOAD';
const UPLOAD_SUCCESS = 'post/UPLOAD_SUCCESS';
const UPLOAD_FAIL = 'post/UPLOAD_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case UPLOAD:
    case UPLOAD_FAIL:
      return state;
    case UPLOAD_SUCCESS:
      console.log('upload success', action.result);
      return state;
    default:
      return state;
  }
}
export function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/upload', { raw: formData })
  };
}
