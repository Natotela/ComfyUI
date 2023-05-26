git add -A
git commit -m "%%DATE%% %%TIME%% GitPolled"
git pull origin master
git pull upstream master
git merge upstream/master
git push origin master


PowerShell.exe -ExecutionPolicy Bypass -File ".\pull.ps1"