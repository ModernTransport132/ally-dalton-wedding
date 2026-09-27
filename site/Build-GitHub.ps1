$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot 'tools/build.cjs')
if ($LASTEXITCODE -ne 0) { throw 'The website build failed. See the validation results above.' }
