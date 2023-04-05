import React from "react";

const Loader = ({ colspan }) => {
  return (
    <tr className="loader-row">
      <td colSpan={colspan} className="text-center">
        &nbsp;
      </td>
    </tr>
  );
};

export default Loader;
