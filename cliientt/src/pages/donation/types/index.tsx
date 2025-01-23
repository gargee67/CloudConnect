export type Campaign = {
  creatorAddress: string;
  /*id: string;
  owner:String;
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
  raisedAmount: number;
  imageUrl: string;
  category: 'education' | 'social' | 'startup' | 'medical';
  documentUrl: string;
  donors: string[]; // Array of donor addresses
  donations: number[]; // Array of donation amounts in ETH  */
  id: string;
  owner: String;
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
  raisedAmount: number;
  imageUrl: string;
  category: string;
  documentUrl: string;
};