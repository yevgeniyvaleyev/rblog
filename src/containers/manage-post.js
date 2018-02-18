import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addPost, fetchPost, updatePost } from '../actions';
import { EditPost } from '../components/edit-post';
import { getCategories, getPost } from '../reducers'

class ManagePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };
  }

  addNewPost (newPostData) {
    const data = {
      id: 'a' + Math.random(),
      timestamp: Date.now(),
      author: 'Any author'
    }
    this.props.addPost({
      ...data, 
      ...newPostData
    }).then(() => {
      this.props.history.push(`/category/${newPostData.category}`)
    })
  }

  updatePost (postData, postId) {
    this.props.updatePost({
      ...postData
    }, postId).then(() => {
      this.props.history.push(`/post/${postId}`)
    })
  }

  managePost (filledData) {
    const { postId } = this.props.match.params;
    
    postId 
      ? this.updatePost(filledData, postId)
      : this.addNewPost(filledData)
  }

  cancelEdit () {
    const { postId } = this.props.match.params;

    postId
      ? this.props.history.push(`/post/${postId}`)
      : this.props.history.goBack()
  }

  getPost (id) {
    const { postId } = this.props.match.params;
    
    this.props.fetchPost(postId);
  }

  componentDidMount () {
    const { postId } = this.props.match.params;
    const { post } = this.props;

    if (!post && postId) {
      this.getPost(postId);
    }
  }

  shouldRender (props) {
    const { postId } = props.match.params;
    const { post } = props;

    return postId ? !!post : true;
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldRender(nextProps)
  }

  render() {
    const post = this.props.post || {};
    const { 
      title, 
      body, 
      category 
    } = post;

    if (!this.shouldRender(this.props)) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <EditPost 
        title={title || ''}
        body={body || ''}
        category={category || ''}
        categories={this.props.categories}
        onCancel={this.cancelEdit.bind(this)}
        onUpdate={this.managePost.bind(this)} />
    )
  }
}

const mapStateToProps = (state, props) => ({
  categories: getCategories(state),
  post: getPost(state, props.match.params.postId)
}); 

ManagePost = withRouter(connect(
  mapStateToProps,
  { 
    addPost,
    updatePost,
    fetchPost
  }
)(ManagePost));

export default ManagePost;
