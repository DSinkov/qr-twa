export const noop = () => {
  //empty function
};

export const devLog = (...props: any) => {
  process.env.NODE_ENV === 'development' && console.log(...props);
};
