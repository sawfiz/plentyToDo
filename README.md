# plentyToDo
A project based on the Project: Todo List in the Javascript course, the Odin Project
[Project: To Do List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) from the [Javascript Course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript), [the Odin Project](https://www.theodinproject.com/)

## Things I leaned
### HTML
- [Material Design Icons](https://materialdesignicons.com/)
  - Include the following line in the head of an HTML file
    - `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css">`
  - Use the webfonts as a classe. e.g.
    - `<div class="view mdi mdi-calendar-today"> Today</div>`

### CSS
- `Display: grid`
  - Use `.` or `....` in a grid template to represent that grid is empty
- [Creating a better todo app - the HTML and CSS](https://www.youtube.com/watch?v=IhmSidOJSeE) by Kevin Powell


### JS
- [How to Code A Better To-Do List - Tutorial](https://www.youtube.com/watch?v=W7FaYfuwu70&t=0s) by WDS

### Webpack
- Include my HTML code into the dist/index.html
- [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
  - The following is what's needed to make it work from [here](https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md)
  ```js
  {
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        }],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
  }
  ```

## To do
- How to add a favicon

## Resources


## Live site
https://sawfiz.github.io/Odin-Projects-Dashboard/
