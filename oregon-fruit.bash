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

currentBranch=`git branch | grep ^* | cut -c 3-`
read -p "The current branch is \"$currentBranch\". Is this the branch you're cherry-picking to? "
if [ $REPLY != "y" -a $REPLY != "Y" ]; then
  echo "Well, check out the right branch and try again"
  popd > /dev/null 2>&1
  exit 1
fi

shift

git branch -a | sed 's/remotes\/origin\///' | sort | uniq > available_branches.out
branchesExist=1

for branch in $*
do
  grep --silent $branch available_branches.out
  if [ $? -eq 1 ]; then
    echo "\"$branch\" doesn't seem to be a branch"
    branchesExist=0
  fi
done

if [ $branchesExist -eq 0 ]; then
  popd > /dev/null 2>&1
  exit 1
fi

echo "Everything looks good. Would continue."