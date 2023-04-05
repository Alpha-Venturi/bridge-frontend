import { FC } from 'react';

export type Role = 'Buyer' | 'Prosumer' | 'City';


export interface RouteProp {
  name?: string;
  layout?: string;
  path?: string | string[];
  component?: FC;
  redirect?: boolean;
  collapse?: boolean;
  views?: RouteProp[];
}



export interface TokenTransfer {
  txHash: string;
  tokenContract: string;
  fungible: boolean;
  value?: number;
  tokenId?: number;
  from: string;
  to: string;
  timestamp: Date;
  blockNumber: number;
  blockHash: string;
  currency: string
}

export interface Token {
  contractAddress: string;
  fungible: boolean;
  symbol: string;
  name: string;
  leftToken?: Token;
}

export interface ERC20Token extends Token {
  fungible: true;
  decimals: number;
}

export interface PaginationType {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
