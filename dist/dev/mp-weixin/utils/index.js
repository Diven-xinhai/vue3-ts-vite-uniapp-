"use strict";
const extractHttpFromString = (str) => {
  const reg = /http[s]?:\/\/\S+/;
  return str.match(reg);
};
exports.extractHttpFromString = extractHttpFromString;
