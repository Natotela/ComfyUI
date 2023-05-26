git add -A
git commit -m "%%DATE%% %%TIME%% GitPolled"
git push origin master
git merge upstream/master

for /d %%G in (".\custom_nodes\*") do (
    cd "%%G"
    git pull
)