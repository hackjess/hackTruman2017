# hackTruman2017
Submissions for the HackTruman2017

# To Submit

This directory is formatted with a submission subfolder. Within this subfolder, each team's submission will be their own subfolder with the contents of their project.

1. Fork the repo by clicking the button at the top right

2. Clone your fork

`git clone <your-fork-here>`

3. Add this repo as a the upstream remote to your forked repo

`git remote add upstream https://github.com/HackTrumanState/hackTruman2017.git`

4. Create a branch `<your-project-name>-branch`

```bash
git checkout master
git pull upstream master # check for updates to avoid conflicts
git push origin master # push updates to your fork to make sure its updated
git checkout -b project-branch
```

4. In the `submissions` subfolder, create a new folder with the name of your project. Copy your project's contents into it.

5. Commit those changes and push to your fork

```bash
git add .
git commit -am "submission commit for <projectname>"
git push -u origin <your-project-name>-branch
```
6. Go to your fork and click `Create pull request`, you're done!
