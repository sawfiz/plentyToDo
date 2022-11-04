const taskFactory = (
  number,
  focus,
  state,
  description,
  group,
  project,
  startDate,
  dueDate
) => {
  return { number, focus, state, description, group, project, startDate, dueDate };
};

export default taskFactory;
