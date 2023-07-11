module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a controller, view, and model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the component name (e.g., Garage):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: 'templates/Controller.txt',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.view.ts',
        templateFile: 'templates/View.txt',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.model.ts',
        templateFile: 'templates/Model.txt',
      },
    ],
  });
};
