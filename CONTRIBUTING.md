# Contributing

> #### Table of Contents
> - [Learning About Tracers](#learning-about-tracers)
> - [Running on Scratch Paper](#running-on-scratch-paper)
> - [Directory Structures](#directory-structures)
> - [Creating a Pull Request](#creating-a-pull-request)

Are you a first-timer in contributing to open source? [These guidelines](https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution) from GitHub might help!

## Learning About Tracers

The project [Algorithm Visualizer](https://github.com/algorithm-visualizer) has a visualization library in each supported language ([JavaScript](https://github.com/algorithm-visualizer/tracers.js), [C++](https://github.com/algorithm-visualizer/tracers.cpp), and [Java](https://github.com/algorithm-visualizer/tracers.java)) to visualize codes.

There are five tracers in the library to visualize different types of data:

- [Array1DTracer](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki/Array1DTracer)
- [Array2DTracer](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki/Array2DTracer)
- [ChartTracer](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki/ChartTracer)
- [GraphTracer](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki/GraphTracer)
- [LogTracer](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki/LogTracer)

There are also randomizers to help you create random data.

Check out the [API reference](https://github.com/algorithm-visualizer/algorithm-visualizer/wiki) for more information.

## Running on Scratch Paper

At the bottom left corner of [algorithm-visualizer.org](https://algorithm-visualizer.org/), there is Scratch Paper where you can visualize your own code.

We highly encourage you to test your visualization on Scratch Paper several times before creating a pull request.

## Directory Structures

- **Category A/**
    - **Algorithm A/**
        - **code.js**
        - **code.cpp**
        - **code.java**
        - **README.md**
    - **Algorithm B/**
    - **Algorithm C/**
    - ...
- **Category B/**
- **Category C/**
- ...

## Creating a Pull Request

1. Fork this repository.

    ![](https://raw.githubusercontent.com/algorithm-visualizer/algorithms/master/.images/contributing/fork.png)
    > 'Fork' button is at the top right corner of this page.

2. Create a branch named the algorithm you'd like to add/improve.

    ![](https://raw.githubusercontent.com/algorithm-visualizer/algorithms/master/.images/contributing/create_branch.png)
    > 'Branch' button is below the header of your forked repository.
    
3. Make changes.

    Understand the [directory structure](#directory-structures), and create or edit files accordingly.
    
    If you want to create a directory, check out this [Stack Overflow answer](https://stackoverflow.com/questions/18773598/creating-folders-inside-github-com-repo-without-using-git).
    
    ![](https://raw.githubusercontent.com/algorithm-visualizer/algorithms/master/.images/contributing/commit_changes.png)
    > Input a commit message addressing your changes, and make sure you are committing to the branch you created.

4. Create a pull request.

    ![](https://raw.githubusercontent.com/algorithm-visualizer/algorithms/master/.images/contributing/compare_and_pull_request.png)
    > 'Compare & pull request' button is below the header of the main page of your forked repository.

    ![](https://raw.githubusercontent.com/algorithm-visualizer/algorithms/master/.images/contributing/open_pull_request.png)
    > Make sure you are merging to `algorithm-visualizer/algorithms`'s `master` branch from your forked repository's branch you created.
    
5. Thanks for your contribution! Once we review and merge your pull request, your changes will be reflected on [algorithm-visualizer.org](https://algorithm-visualizer.org/).
