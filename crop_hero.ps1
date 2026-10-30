Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\LENOVO\.gemini\antigravity-ide\scratch\apex-crest-roofing-and-restoration\src\assets\images\user_hero_template.jpg"
$destPhotoPath = "C:\Users\LENOVO\.gemini\antigravity-ide\scratch\apex-crest-roofing-and-restoration\src\assets\images\hero_roofer_drill.jpg"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Output "Source Dimensions: Width=$($src.Width) Height=$($src.Height)"

# In user_hero_template.jpg:
# Let's see the roofer photo bounds:
# Navbar is at top (approx 0 to 95px out of 1080)
# Hero starts at y ≈ 95
# The roofer image is on the right side:
# Roughly x starts at 0.49 * Width, goes to Width
# y starts at 0.12 * Height, goes to Height
$xStart = [int]($src.Width * 0.490)
$yStart = [int]($src.Height * 0.125)
$cropWidth = $src.Width - $xStart
$cropHeight = $src.Height - $yStart

Write-Output "Cropping: x=$xStart y=$yStart w=$cropWidth h=$cropHeight"

$rect = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)
$cropped = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$g = [System.Drawing.Graphics]::FromImage($cropped)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle($xStart, $yStart, $cropWidth, $cropHeight)
$g.DrawImage($src, $rect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$src.Dispose()

$cropped.Save($destPhotoPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()

Write-Output "Successfully cropped and saved to $destPhotoPath"
