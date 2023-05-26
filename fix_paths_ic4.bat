cd models
rmdir /s /q --ignore-fail-on-non-empty loras embeddings controlnet checkpoints vae style_models hypernetworks upscale_models

mklink /j vae "F:\Progz\stable-diffusion-webui\models\VAE"
mklink /j loras F:\Progz\stable-diffusion-webui\models\Lora
mklink /J embeddings F:\Progz\stable-diffusion-webui\embeddings
mklink /J controlnet F:\Progz\stable-diffusion-webui\models\ControlNet
mklink /j checkpoints "F:\Progz\stable-diffusion-webui\models\Stable-diffusion"
mklink /j style_models "F:\Progz\stable-diffusion-webui\models\ControlNet\T2I"
mklink /j hypernetworks "F:\Progz\stable-diffusion-webui\models\hypernetworks"
mklink /j upscale_models "F:\Progz\stable-diffusion-webui\models\ESRGAN"
for %%f in (F:\Progz\stable-diffusion-webui\models\RealESRGAN\*) do mklink .\upscale_models\%%~nxf %%f
for %%f in (F:\Progz\stable-diffusion-webui\models\SwinIR\*) do mklink .\upscale_models\%%~nxf %%f