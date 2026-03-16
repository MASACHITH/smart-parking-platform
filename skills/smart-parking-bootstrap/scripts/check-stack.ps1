$tools = @(
    @{ Name = "node"; Command = "node"; Args = @("--version"); Required = $true; Notes = "Backend and frontend runtime" },
    @{ Name = "npm"; Command = "npm"; Args = @("--version"); Required = $true; Notes = "Default package manager" },
    @{ Name = "git"; Command = "git"; Args = @("--version"); Required = $true; Notes = "Source control" },
    @{ Name = "docker"; Command = "docker"; Args = @("--version"); Required = $false; Notes = "Recommended for local infra" },
    @{ Name = "docker compose"; Command = "docker"; Args = @("compose", "version"); Required = $false; Notes = "Recommended for multi-service local startup" },
    @{ Name = "psql"; Command = "psql"; Args = @("--version"); Required = $false; Notes = "Useful PostgreSQL client" },
    @{ Name = "redis-cli"; Command = "redis-cli"; Args = @("--version"); Required = $false; Notes = "Useful Redis client" }
)

$results = foreach ($tool in $tools) {
    try {
        $output = & $tool.Command @($tool.Args) 2>&1
        [pscustomobject]@{
            Tool = $tool.Name
            Status = "FOUND"
            Required = $tool.Required
            Version = ($output | Select-Object -First 1)
            Notes = $tool.Notes
        }
    }
    catch {
        [pscustomobject]@{
            Tool = $tool.Name
            Status = "MISSING"
            Required = $tool.Required
            Version = ""
            Notes = $tool.Notes
        }
    }
}

$results | Format-Table -AutoSize

$missingRequired = $results | Where-Object { $_.Required -and $_.Status -eq "MISSING" }
$missingOptional = $results | Where-Object { -not $_.Required -and $_.Status -eq "MISSING" }

Write-Host ""

if ($missingRequired.Count -eq 0) {
    Write-Host "Required tools: OK"
} else {
    Write-Host "Required tools missing:"
    $missingRequired | ForEach-Object { Write-Host ("- " + $_.Tool) }
}

if ($missingOptional.Count -gt 0) {
    Write-Host ""
    Write-Host "Optional tools missing:"
    $missingOptional | ForEach-Object { Write-Host ("- " + $_.Tool) }
}
