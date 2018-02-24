import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVote, hasVoted } from '../reducers';
import { withRouter } from 'react-router';
import { voteForPost, voteForComment } from '../actions';
import { Voter } from '../components/voter';
import PropTypes from 'prop-types';

const VOTE_TYPES = {
  UNVOTE: 0,
  UPVOTE: 1,
  DOWNVOTE: -1
}

const VOTER_TYPES = {
  POST: 'post',
  COMMENT: 'comment'
}

class ManageVotes extends Component {

  constructor(props) {
    const {vote, hasVoted, type} = props;
    super(props);
     
    if (!this.isValidType(type)) {
      throw new Error(`Invalid type - ${type}`);
    }

    this.state = { 
      current: this.getNumericVote(vote, hasVoted)
    };
  }

  isValidType (type) {
    return Object.keys(VOTER_TYPES)
      .some((_type) => VOTER_TYPES[_type] === type)
  }

  getNumericVote (vote, hasVoted) {
    const numericVote = vote ? VOTE_TYPES.UPVOTE : VOTE_TYPES.DOWNVOTE;
    return hasVoted ? numericVote : VOTE_TYPES.UNVOTE;
  }

  vote = (isUpAction) => {
    const {id, type} = this.props;
    const resolvedVote = this.resolveVote(this.state.current, isUpAction);
    const isUnchangedVote = this.state.current === resolvedVote;
    const isUnvote = resolvedVote === VOTE_TYPES.UNVOTE;
    const isUp = isUnvote ? !isUpAction : isUpAction
    const isInversiveVote = Math.abs(this.state.current) === Math.abs(resolvedVote);
    
    if (isUnchangedVote) {
      return;
    }
    const voter = this.getVoter(type, this.props);

    voter(isUp, id, isUnvote, isInversiveVote).then(() => {
      this.setState({
        current: resolvedVote
      });
    })
  }

  getVoter (type, {voteForPost, voteForComment}) {
    const voters = {
      [VOTER_TYPES.POST]: voteForPost, 
      [VOTER_TYPES.COMMENT]: voteForComment 
    }
    return voters[type]
  }

  resolveVote (current, isUp) {
    const {UPVOTE, DOWNVOTE, UNVOTE} = VOTE_TYPES;
    const up = current < UPVOTE ? UPVOTE : UNVOTE;
    const down = current > DOWNVOTE ? DOWNVOTE : UNVOTE;

    return isUp ? up : down;
  }

  render() {
    return (
      <Voter 
        onUp={this.vote.bind(this, true)} 
        onDown={this.vote.bind(this, false)} 
        current={this.state.current} />
      )
    }
}

ManageVotes.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = (state, {id}) => ({
  vote: getVote(state, id),
  hasVoted: hasVoted(state, id)
}); 

ManageVotes = withRouter(connect(
  mapStateToProps,
  { 
    voteForPost,
    voteForComment
  }
)(ManageVotes));

export default ManageVotes;
