git add -A
git commit -m "%%DATE%% %%TIME%% GitPolled"
git pull origin master
git push origin master
git merge upstream/master

PowerShell.exe -ExecutionPolicy Bypass -File ".\pull.ps1"