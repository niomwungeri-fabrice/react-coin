import React from "react";
export const responseHandler = response => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
};
/**
 * Return jsx element
 * @param {jsx} percent - table data
 */
export const onPercentChange = percent => {
  if (percent > 0) {
    return <span className="percent-raised">{percent}% &uarr;</span>;
  } else if (percent < 0) {
    return <span className="percent-fallen">{percent}% &darr;</span>;
  } else {
    return <span>{percent}</span>;
  }
};
