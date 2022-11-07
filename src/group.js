import projectFactory from './project';

const groupFactory = (number, name, projectList) => {
  return { number, name, projectList };
};

export default groupFactory;
