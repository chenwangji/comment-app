import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

// CommentListContainer
class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  state = {
    username: ''
  }

  componentWillMount() {
    this._loadUsername()
  }

  _loadUsername() {
    let username = localStorage.getItem('username')
    this.setState({ username })
  }

  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  handleUsernameInputBlur(username) {
    this._saveUsername(username)
  }

  handleAddComment(comment) {
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')

    const { comments, onSubmit } = this.props

    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))

    if (onSubmit) {
      onSubmit(comment)
    }
  }

  render() { 
    return <CommentInput 
      username={this.state.username}
      onUserNameInputBlur={this.handleUsernameInputBlur.bind(this)}
      onSubmit={this.handleAddComment.bind(this)} />
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: comment => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)
