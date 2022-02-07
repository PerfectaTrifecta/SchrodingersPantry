# General Workflow
1. Fork the repo
2. Cut the namespaced feature branch from main
3. Make commits to your feature branch. Prefix each commit like so...
4. When you’ve finished with your fix or feature, pull upstream changes into your branch. Submit a [pull request][] directly to main. Include a description of your changes.
5. Your pull request will be reviewed by another maintainer. The point of code reviews is to help keep the codebase clean and of high quality and, equally as important, to help you grow as a programmer. If your code reviewer requests you make a change you don’t understand, ask them why.
6. Fix any issues raised by your code reviewer, and push your fixes as a single new commit.
7. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

# Detailed Workflow
Fork the repo.

Use github's interface to fork the repo into your profile, then add your organization's repo as an upstream remote:
```
git remote add upstream https://github.com/PerfectaTrifecta/SchrodingersPantry.git
```

## Cut a namespaced feature branch from main
Your branch should follow this naming convention:
* doc/...
* bug/...
* feat/...
* refactor/...
* test/...
These commands will help you do this:
```
# Creates you branch and brings you there
git checkout -b 'branch-name'
```

## Make commits to you feature branch.
Prefix each commit like so:
* (add) new feature
* (fix) inconsistent feature [Fixes #0]
* (refactor) ...
* (cleanup) ...
* (test) ...
* (doc) ...
Make changes and commits on your branch, and make sure that you only make changes that are relevant to this branch. If you find yourself making unrelated changes, make a new branch for these changes.

## Commit Message Guidelines:
* Commit messages should be written in present tense
* Your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max. Remember: This is a summary, not a detailed description of everything changed.

## Pull upstream changes into your branch
Once you are done making changes, you can begin the process of getting your code merged into the main repo. Step 1 is to pull upstream changes to the main branch into yours by running this command from your branch:
```
git pull upstream main
```
You must commit all of your changes before doing this. If there are no conflicts, this should just roll all of your changes back on top of the changes from upstream, leading to a nice, clean, linear commit history.
If there are conflicting changes, you solve merge conflicts by checking all of the files git says have been changed in both histories and picking the versions you want. Be aware that these changes will show up in your pull request, so try and incorporate upstream changes as much as possible.

Once you are done fixing all conflicts you should run the existing tests to make sure you didn’t break anything, then run your new tests (there are new tests, right?) and make sure they work also.
If merging broke anything, fix it, then repeat the above process until you get here again and nothing is broken and all the tests pass.

## Make a pull request
Make a clear pull request from your fork and branch to the upstream main branch, detailing exactly what changes you made and what feature this should add. The clearer your pull request is the faster you can get your changes incorporated into this repo.
At least one other person MUST give your changes a code review, and once they are satisfied they will merge your changes into upstream. Alternatively, they may have some requested changes. You should make more commits to your branch to fix these, then follow this process again from pulling upstream changes onwards.
Once you get back here, make a comment requesting further review and someone will look at your code again. If they like it, it will get merged, else, just repeat again.
Thanks for contributing!

# Guidelines:
1. Uphold the current code standard:
* keep your code [DRY][]
* apply the [boy scout rule][]
2. Uphold the tests before submitting a pull request.
3. Tests are very, very important. Submit tests if your pull request contains new, testable behavior.

# Checklist:
This is just to help you organize your process
* Did I cut my work branch off of main (don’t cut new branches from existing feature brances)?
* Did I follow the correct naming convention for my branch?
* Is my branch focused on a single main change?
* Do all of my changes directly relate to this change?
* Did I pull the upstream main branch after I finished all my work?
* Did I write a clear pull request message detailing what changes I made?
* Did I get a code review?
* Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have no problem getting your changes merged in.