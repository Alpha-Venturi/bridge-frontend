import React from 'react';
import { TokenTransfer } from '../../../util/types';

const TokenTransferRow = ({ tokenTransfer, ownAccount }: { tokenTransfer: TokenTransfer, ownAccount: string }) => {

  return (
    <tr data-cy="transferTableRow">
      <td>{tokenTransfer.timestamp.toLocaleString()}</td>
      <td>{tokenTransfer.from === ownAccount ? "out" : "in"}</td>
      <td>{tokenTransfer.from === ownAccount ? tokenTransfer.to : tokenTransfer.from}</td>
      <td>{tokenTransfer.value?.toString()}</td>
      <td>{tokenTransfer.currency}</td>
    </tr>
  );
};

export default TokenTransferRow;
