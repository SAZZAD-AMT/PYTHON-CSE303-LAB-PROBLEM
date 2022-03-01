# New to WSL? Create a project

You can create a new project on the Linux file system through VS Code directly or an external WSL terminal.

## Create a project through VS Code

1. Connect to a [WSL Window](command:remote-wsl.newWindow). You can access all remote commands through the remote indicator.

![Remote indicator](https://microsoft.github.io/vscode-remote-release/images/remote-dev-status-bar.png)

2. [Create your new file or project](command:explorer.newFile).

3. Choose **File** -> **Save as**, and notice the quick pick lets you pick a location on the Linux file system rather than your local Windows file system.

## Create a project through an external WSL terminal

1. Open a terminal for a WSL distro.

2. Create a new folder and project via the command line, i.e.:

```
mkdir helloWorld && cd helloWorld
echo 'print("hello from python on ubuntu on windows!")' >> hello.py
```