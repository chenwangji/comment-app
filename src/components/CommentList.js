import React, { Component } from 'react'
import propTypes from 'prop-types'
import Comment from './Comment'

class CommentList extends Component {
  static propTypes = {
    onDeleteComment: propTypes.func
  }

  handleDeleteComment(index) {
    const { onDeleteComment } = this.props
    if (onDeleteComment) {
      onDeleteComment(index)
    }
  }

  render() {
    return (
      <div className='comment-list'>
        {this.props.comments.map((comment, i) => {
          return (
            <Comment 
              comment={comment} 
              key={i} 
              index={i} 
              onDeleteComment={this.handleDeleteComment.bind(this)} />
          )
        })}
      </div>
    )
  }
}

export default CommentList
