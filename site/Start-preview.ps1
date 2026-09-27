$previewNode = (Get-Command node -ErrorAction Stop).Source
$previewServer = Join-Path $PSScriptRoot 'server.cjs'
Start-Process -FilePath $previewNode -ArgumentList @('"' + $previewServer + '"', '"' + $PSScriptRoot + '"', '4178') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
