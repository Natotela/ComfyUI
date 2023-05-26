$backto = $PWD.Path
$custNodes = "F:\Progz\ComfyUI_windows_portable\ComfyUI\custom_nodes\"
$subfolders = Get-ChildItem -Path $custNodes -Directory
cd $custNodes
ForEach ($subfolder in $subfolders) { cd $subfolder ; git pull; cd.. }
cd $backto