export const idGen = () => {
  let id = Date.now().toString();
  let idGen = parseInt(id.slice(id.length - 8, id.length));
  return idGen;
};
