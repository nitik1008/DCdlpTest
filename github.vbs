Set objShell = WScript.CreateObject("WScript.Shell")

' Path to git-bash.exe.
' You might need to adjust this path based on your Git installation.
' Common paths include:
' "C:\Program Files\Git\git-bash.exe"
' "C:\Program Files (x86)\Git\git-bash.exe"
' "C:\Users\<YourUsername>\AppData\Local\Programs\Git\git-bash.exe"
GitBashPath = """C:\Program Files\Git\git-bash.exe""" ' Use triple quotes for paths with spaces

' The .Run method takes three arguments:
' 1. Command string: The path to the executable, optionally with arguments.
' 2. WindowStyle (optional): How the window should appear (0=hide, 1=normal, 3=maximized, 7=minimized, etc.).
'    Using 1 (normal) is usually what you want.
' 3. WaitOnReturn (optional): Boolean. True to wait for the program to exit, False to run and continue.
'    False is the default, and what you usually want for opening an app.
objShell.Run GitBashPath, 1, False

Set objShell = Nothing ' Release the object