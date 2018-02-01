export const byTimestamp = (item1, item2) => 
  new Date(item2.timestamp) - new Date(item1.timestamp);

export const byVotes = (item1, item2) => item2.voteScore - item1.voteScore;