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

/*
cd C:\Users\Razer\CODE\BienVenidos\backend; 
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://aws-0-us-west-2.pooler.supabase.com:5432/postgres?user=postgres.glrnbhckujvrrlybewwt&password=bienvenidos";
$env:SPRING_DATASOURCE_USERNAME="postgres.glrnbhckujvrrlybewwt"; $env:SPRING_DATASOURCE_PASSWORD="bienvenidos";
$env:JWT_SECRET="73a84bc8-3027-40da-adf1-f767800a7116";
mvn spring-boot:run
*/