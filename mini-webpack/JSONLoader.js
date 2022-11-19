const JSONLoader = (source) => {
  return `export default ${JSON.stringify(source)}`;
};

export default JSONLoader;
