import projectFactory from './project';

const groupFactory = (name, projectList) => {
  return { name, projectList };
};

export default groupFactory;
