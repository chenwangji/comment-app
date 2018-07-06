import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number.isRequired
  }

  constructor() {
    super()
    this.state = {
      timeString: ''
    }
  }

  componentWillMount() {
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer)
    }
  }

  _updateTimeString() {
    const { createdTime } = this.props.comment
    const duration = (Date.now() - createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)}分钟前`
        : `${Math.round(Math.max(duration, 1))}秒前`
    })
  }

  _getProcessedContent(content) {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`([\s\S]+?)`/g, '<code>$1</code>')
  }

  handleDeleteComment() {
    const {onDeleteComment, index} = this.props
    if (onDeleteComment) {
      onDeleteComment(index)
    }
  }

  render() {
    const { username, content } = this.props.comment
    return <div className='comment'>
      <div className="comment-user">
        <span>{username}</span>：
      </div>
      <p 
        className="comment-content" 
        dangerouslySetInnerHTML={{__html: this._getProcessedContent(content)}}></p>
      <div className='comment-bottom'>
        <span className="comment-createdtime">{this.state.timeString}</span>
        <span className="comment-delete" onClick={this.handleDeleteComment.bind(this)}>删除</span>
      </div>
    </div>
  }
}

export default Comment
