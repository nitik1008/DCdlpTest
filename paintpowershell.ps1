<#
.SYNOPSIS
    Opens the Windows Paint application (mspaint.exe).

.DESCRIPTION
    This script uses the Start-Process cmdlet to launch the executable for Windows Paint.
    It's a simple way to open the application programmatically.

.NOTES
    Author: Gemini
    Date: June 27, 2025
    Version: 1.0
#>

# Define the executable name for Windows Paint.
# mspaint.exe is the standard executable name for Paint on Windows.
$paintExecutable = "mspaint.exe"

# Use Start-Process to launch the Paint application.
# Start-Process is a cmdlet that starts one or more processes on the local computer.
# -FilePath specifies the executable to run.
Write-Host "Attempting to open Windows Paint..."
try {
    Start-Process -FilePath $paintExecutable

    # Inform the user that Paint has been launched.
    Write-Host "Windows Paint has been launched successfully."
}
catch {
    # If there's an error (e.g., mspaint.exe not found or permission issues),
    # catch the exception and display an error message.
    Write-Error "Failed to open Windows Paint. Error: $($_.Exception.Message)"
    Write-Host "Please ensure 'mspaint.exe' is available in your system's PATH or its default location."
}

