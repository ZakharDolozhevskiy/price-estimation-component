Cars search component
=====================

The component allow to find cars by different params.

Table of Contents
-----------------
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Structure](#structure)

Requirements
------------

React `^0.14.7`
ReactDOM `^0.14.7`

Getting Started
---------------

To start development:

```shell
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```

To use component on your website:

Don't forget to add dependencies

```html
    <script src="../widget/vendor/react.min.js"></script>
    <script src="../widget/vendor/react-dom.min.js"></script>
```

Add component

```html
  <script src="../widget/build/index.js"></script>
```

Then render component

```html
    <script>
        var component = React.createFactory(EstimationComponent)({});

        ReactDOM.render(component, document.getElementById('box'));
    </script>
```

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── build                    # Builded application
├── src                      # Application source code
│    ├── api                 # API describe client-server iteraction
│    ├── components          # Generic React Components
│    └── containers          # Components that provide context
└── vendor                   # Reauired libs
```
