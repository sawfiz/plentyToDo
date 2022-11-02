const taskFactory = (
  focus,
  state,
  description,
  group,
  project,
  startDate,
  dueDate
) => {
  return { focus, state, description, group, project, startDate, dueDate };
};

export default taskFactory;
