# Vue Enterprise Boilerplate - Typescript

> First, a big thank you to [Chris Fritz](https://github.com/chrisvfritz) who is the original author of this boilerplate. I just converted it to typescript and I will do my best to track changes that Chris does with the original. I have changed the name so that people can find the repo. I see a number of people asking about a good boilerplate for Vue and typescript, so there is interest. It just isn't that easy.

**As of right now, the typescript repo is based off of commit: [980438c](https://github.com/chrisvfritz/vue-enterprise-boilerplate/commit/890438c3b898d6ed921fd2d0e3b84f2fe7162d89).**

**To see [what's missing from Chris' repo, click here](https://github.com/chrisvfritz/vue-enterprise-boilerplate/compare/890438c3b898d6ed921fd2d0e3b84f2fe7162d89...master) since then.**

> This is from Chris' page: This is an ever-evolving, very opinionated architecture and dev environment for new Vue SPA projects using [Vue CLI](https://github.com/vuejs/vue-cli). Questions, feedback, and for now, even bikeshedding are welcome. 😄 If you'd like to increase the time I can spend on this project, as well as other Vue resources, **please consider becoming a [sponsor on Patreon](https://www.patreon.com/chrisvuefritz)**. :pray:

## Features

- [**Thorough documentation**](#documentation): Written with the same care as Vue's core docs to quickly train new team members and consolidate knowledge.
- [**Guaranteed consistency**](docs/linting.md): Opinionated linting for Vue, JavaScript/JSON, SCSS, and Markdown, integrated into Visual Studio Code and run against staged files on pre-commit.
- [**First-class tests**](docs/tests.md): Practice test-driven development with both unit and end-to-end tests. Unit tests with Jest live as first-class citizens alongside your source files, while Cypress provides reliable end-to-end tests in an intuitive GUI for development.
- [**Speedy development**](docs/development.md): Between [configurable generators](docs/development.md#generators), [handy aliases](docs/development.md#aliases), and [global base components](docs/development.md#base-components), your productivity will skyrocket.

## Getting started

Follow the documentation on Chris' page for getting started. And all his other documentation.

## What I changed to convert this project to typescript

1.  vue add @vue/typescript
1.  removed a couple of lint rules about imports that were messing things up and going against my view of import order
1.  changed prettier to use semi-colons
1.  converted all the code and unit tests to typescript

## My Biases

Typescript

I do not agree with Chris' point of view on Typescript. I have been using TS exclusively for the past 4 years and found my productivity to be much higher. I can refactor with complete confidence. It's not just about mismatched types, it is about seeing new code for the first time and being able to understand it easily amoung other benefits. So for me, I will never use raw javascript again. It will always be typescript.

Vuex on the other hand, is very difficult to use with Typescript. So I believe at this point it is best to stick to the "expected" format for Vuex code. More about Vuex later.

Unit Testing

I am also a very big proponent of unit testing. It is an absolute must in production software. If you are doing something for others to consume, then do them a favour and create automated tests for your code. I am learning Vue to convert a 25,000 line TS front end from Knockout.js to Vue/Vuetify. That code base has almost 7000 unit tests. I would say that 80%-90% of the time when writing the unit tests, either before or after the code, I have discovered bugs or cases I didn't think of and the code got better because of it. When I do TDD (actually BDD), I believe it is easier to write the code and produces better results. I have spent 2 months (on and off) learning Vue and most of it was wrestling with figuring out how to implement Vue in Typescript with proper unit tests. I completely agree with Chris in putting unit test files adjacent to the source files. In the project I mentioned above the unit tests were in a test directory. After living with that for 4 years, I do not recommend it. It was always a hassle to chase down the unit test file, and it is much more difficult to determine that a file isn't being unit tested because you now have to compare directories.

Read the section on unit testing. I have added some useful tips for setting up your VS Code environment. There is an extension called [Jest](https://github.com/jest-community/vscode-jest) that is worth checking out.

Vuex

For a typescript developer, Vuex is difficult to work with. I first tried vuex-module-decorators, but that didn't work well for actions that used axios and unit testing. I noticed that others were having similar problems and that the author of the package doesn't seem to be that active. As a result I went looking for an alternative and decided transform Chris' boilerplate as a starting point and to not use vuex-module-decorators. Given how difficult it is to work with Vuex in typescript, I have decided that we should use vuex in a more typescript approach with small objects for state, getters, etc. I have heard that Vuex 5 will be rewritten with typescript support as a goal.

Vue Components

I converted Chris' components' unit tests to typescript to illustrate how to test components in typescript. I didn't touch the \_base components because I doubt anybody doing an enterprise application will use them. I would assume that most applications will use a component library like Vuetify. But there still may be a need to build our own base components that wrap a Vuetify component to alter default behaviour. My previous code base did not use a component library and my productivity suffered because of it. I highly recommend using a component library.

The other nice touch that I like from Chris' boilerplate is that the script section of the Vue file is listed first in his snippet and in his code. I had already started laying out my Vue files this way because I believe that the script is generally the most important part of the component and when you are in the debugger, webpack presents you with a number of parts to your file. The part that contains the code has all the other parts of the file replaced with blank lines. This means that if you have a large template section, you will have to scroll down quite a ways in the file to find your code in the debugger. Having the script section at the top means that your code in the debugger is right at the top of the file.

As we are on the edge of Vue 3 and this is a typescript boilerplate, all the components should use the composition API. This boilerplate sets up all new components to be composition API based components.

**This isn't exactly what I'm looking for. Where can I find other boilerplates and similar projects?**

See the [awesome-vue](https://github.com/vuejs/awesome-vue#scaffold) repo for other great projects in the Vue ecosystem. You can check the other typescript boilerplates for typescript, but I didn't find one that was being maintained or ws newer than early 2018.
