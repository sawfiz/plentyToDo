const taskFactory = (
  focus,
  complete,
  state,
  description,
  group,
  project,
  startDate,
  dueDate
) => {
  return { focus, complete, state, description, group, project, startDate, dueDate };
};

export default taskFactory;
