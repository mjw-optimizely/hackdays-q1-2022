#!/bin/bash

if [ $# -lt 2 ]; then
  echo "Usage: $0 [path] [branch_names]"
  exit 1
fi

dir=$1

pushd $dir > /dev/null 2>&1
if [ $? -eq 1 ]; then
  echo "Couldn't change directory to \"$dir\""
  exit 1
fi

pickBranch=`git branch | grep ^* | cut -c 3-`
read -p "The current branch is \"$pickBranch\". Is this the branch you're cherry-picking to? "
if [ $REPLY != "y" -a $REPLY != "Y" ]; then
  echo "Well, check out the right branch and try again"
  popd > /dev/null 2>&1
  exit 1
fi

git branch -a | sed 's/remotes\/origin\///' | sort | uniq > available_branches.out
branchesExist=1

shift

for branch in $*
do
  grep --silent $branch available_branches.out
  if [ $? -eq 1 ]; then
    echo "\"$branch\" doesn't seem to be a branch"
    branchesExist=0
  fi
done

rm -f available_branches.out

if [ $branchesExist -eq 0 ]; then
  popd > /dev/null 2>&1
  exit 1
fi

for branch in $*
do
  git checkout --quiet $branch 
  safeBranch=`echo $branch | sed 's/\//_/g'`
  git log --oneline --reverse | grep $branch # | grep -v "Merge branch" | grep -v "Merge pull" > ${safeBranch}_pickable_commits.out
  # git checkout --quiet $pickBranch
  exit 1
done

popd > /dev/null 2>&1





