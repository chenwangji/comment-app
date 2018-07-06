// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// reducer
export default function (state = { comments: [] }, action) {
  switch (action.type) {
    case INIT_COMMENTS:
      return { comments: action.comments }
    case ADD_COMMENT:
      return { comments: [ ...state.comments, action.comment ] }
    case DELETE_COMMENT:
      return { comments: [...state.comments.slice(0, action.index), ...state.comments.slice(action.index + 1)] }
    default:
      return state
  }
}

// action creator
export const initComments = comments => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = comment => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = index => {
  return { type: DELETE_COMMENT, index }
}