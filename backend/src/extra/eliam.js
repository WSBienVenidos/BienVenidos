/** copy past in terminal
 * 
Get-Content .\.env | ForEach-Object {
  if ($_ -and -not $_.TrimStart().StartsWith('#')) {
    $parts = $_ -split '=', 2
    if ($parts.Count -eq 2) {
      $name = $parts[0].Trim()
      $value = $parts[1].Trim().Trim('"')
      Set-Item -Path ("Env:\" + $name) -Value $value
    }
  }
}
# verify
echo "JWT_SECRET = $env:JWT_SECRET"

# run app (same shell)
mvn spring-boot:run    

*/