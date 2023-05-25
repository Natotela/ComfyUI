git push origin master
git merge upstream/master https://github.com/comfyanonymous/ComfyUI.git
git fetch upstream
git merge upstream/master

for /d %%G in ("F:\progz\comfy\custom_nodes\*") do (
    cd "%%G"
    git pull
)