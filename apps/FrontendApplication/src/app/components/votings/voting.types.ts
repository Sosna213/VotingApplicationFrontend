export interface VotingToSend {
  votingName: string;
  restricted: boolean;
  explicit: boolean;
  endDate: string;
  question: string;
}

export interface Voting extends VotingToSend {
  votingId: number;
  active: boolean;
}

export type Vote = {
  votingId: number;
  answerId: number;
  username: string;
};

export type Answer = {
  answerId: number;
  answer: string;
};

export interface VotingInfo extends VotingToSend {
  votingId: number;
  active: boolean;
  answers: Answer[];
}

export interface VotingAdd extends VotingToSend {
  userId: number;
  answers: string[];
}

export type VotingToken = {
  token: string;
};

export type VotingShared = {
  votingDTO: Voting;
  voted: boolean;
};
export type VotingResult = {
  answerId: number;
  name: string;
  value: number;
  usernames: string[];
};
