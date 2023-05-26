git add -A
git commit -m "%%DATE%% %%TIME%% GitPolled"
git push origin master
git merge upstream/master

.\pull.ps1