# Visual Studio Code Remote - WSL

The **Remote - WSL extension** lets you use VS Code on Windows to build Linux applications that run on the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl). You get all the productivity of Windows while developing with Linux-based tools, runtimes, and utilities.

**Remote - WSL** lets you use VS Code in WSL just as you would from Windows.

## Why do I need **Remote - WSL**?

### Why WSL? 

WSL lets you run a Linux environment -- including command-line tools and applications -- directly on Windows, without the overhead of a traditional virtual machine or dualboot setup. WSL especially helps web developers and those working with Bash and Linux-first tools (i.e. Ruby, Python) to use their toolchain on Windows and ensure consistency between development and production environments.

When you install a version of Linux on Windows, you’re getting a full Linux environment. It's isolated from Windows- the UI is the terminal, and you can install tools, languages, and compilers into the Linux environment without modifying or disrupting your Windows installation.

We recommend using WSL 2 as you will benefit from significant [performance advantages](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) over WSL 1. 

### Why Remote – WSL in VS Code?

While you can edit files in Linux using Windows-based tools, you can’t easily run or debug on Windows: you'd have to install all the same tools on Windows as you did on Linux, defeating the purpose of having an isolated Linux environment. You could view files from your `\\wsl$\` share, but you wouldn't have access to features such as autocomplete, debugging, or linting.

![View and modify files from WSL share](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-share-path.PNG)

With VS Code and the **Remote - WSL extension** combined, VS Code’s UI runs on Windows, and all your commands, extensions, and even the terminal, run on Linux. You get the full VS Code experience, including autocomplete and debugging, powered by the tools and compilers installed on Linux. 

## Getting started

You can launch a new instance of VS Code connected to WSL by opening a WSL terminal, navigating to the folder of your choice, and typing `code .`:

![Gif opening VS Code from terminal to connect to WSL](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-open-code.gif)

To get started with your first app using **Remote – WSL**, check out the step-by-step WSL tutorial in docs:

### [Remote - WSL Getting Started Tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial)

## Commands

The extension adds several commands to VS Code. You can bring them up by pressing `F1` to open the Command Palette and typing in **Remote-WSL**, or by selecting the green remote indicator in the lower left corner of the status bar: 

![Quick actions status bar item](https://microsoft.github.io/vscode-remote-release/images/remote-dev-status-bar.png)

**Remote-WSL: New Window**

A new VS Code window will open, connected to your default WSL distro. 

![Command palette](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-command-palette-update.png)

Notice the green remote indicator updates to the WSL distro to which you are now connected (in this case, Ubuntu). You can select the **Open Folder** button to view the contents of your remote Linux distro's file system: 

![VS Code connected to Ubuntu](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-new-window.png)

When you select a folder, VS Code will set up the environment, and a new VS Code window will appear with the contents of that WSL folder. 

When you hover over any of the files within your folder, notice they have the correct Linux paths: 

![Hover over file in explorer to see Linux path](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-path.PNG)

To open a Terminal, you can use the Ctrl+` keyboard shortcut. Notice that when you run “uname,” it shows you’re on a Linux machine: 

![Integrated terminal uname shows Linux](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-command-uname.png)

**Remote-WSL: New Window Using Distro...**

Like **Remote-WSL: New Window**, this command opens a new VS Code window connected to WSL. But first, it opens a quick pick so that you can select a specific WSL distro:

![New window using distro](https://microsoft.github.io/vscode-remote-release/images/remote-wsl-new-window-using-distro.png)

**Remote-WSL: Reopen Folder in WSL**

Reopen a folder in WSL that is currently open in a VS Code instance connected to Windows.  

If your folder resides in the WSL file system, hovering over it will display a Linux path. If your folder resides in Windows, you’ll see the mount point that was automatically created by WSL, i.e. `/mnt/c/<file_path>`.

> **Note:**  To optimize for the fastest performance speed, store your project files in the Linux file system (i.e. `\\wsl$\Ubuntu-18.04\home\<user name>\Project)`, not the Windows file system (i.e. `C:\Users\<user name>\Project`). If your files currently reside on Windows, we recommend copying them to the Linux file system. See the [WSL documentation](https://docs.microsoft.com/en-us/windows/wsl/faq) for more information about working with files. 

## Additional configuration

**Using an Alpine Linux based distro?** Extensions may not work due to `glibc` dependencies in native code inside the extension. See the [Remote Development and Linux](https://aka.ms/vscode-remote/linux) article for details.

**Working with Git?** Here are two tips to consider:

- If you are working with the same repository from both Linux and Windows, be sure to set up consistent line endings. See [tips and tricks](https://aka.ms/vscode-remote/wsl/troubleshooting/crlf) to learn how.
- You can avoid setting up passwords on Linux by configuring WSL to use the Windows Git credential manager. See [tips and tricks](https://aka.ms/vscode-remote/wsl/troubleshooting/cred-manager) for details.

## Further reading

You can check out the [Remote - WSL extension documentation](https://aka.ms/vscode-remote/wsl) to learn more about working within WSL in VS Code, and the [WSL docs](https://docs.microsoft.com/en-us/windows/wsl/) to learn more about WSL in general.

## Release Notes

While an optional install, this extension releases with VS Code. [VS Code release notes](https://code.visualstudio.com/updates/) include a summary of changes to all three Remote Development extensions with a link to [detailed release notes](https://github.com/microsoft/vscode-docs/tree/master/remote-release-notes).

As with VS Code itself, the extensions update during a development iteration with changes that are only available in [VS Code Insiders Edition](https://code.visualstudio.com/insiders/).

## Questions, Feedback, Contributing

Have a question or feedback?

- See the [documentation](https://aka.ms/vscode-remote) or the [troubleshooting guide](https://aka.ms/vscode-remote/troubleshooting).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new).
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs)
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.

Or connect with the community...

[![Twitter](https://microsoft.github.io/vscode-remote-release/images/Twitter_Social_Icon_24x24.png)](https://aka.ms/vscode-remote/twitter) [![Stack Overflow](https://microsoft.github.io/vscode-remote-release/images/so-image-24x24.png)](https://stackoverflow.com/questions/tagged/vscode) [![VS Code Dev Community Slack](https://microsoft.github.io/vscode-remote-release/images/Slack_Mark-24x24.png)](https://aka.ms/vscode-dev-community) [![VS CodeGitter](https://microsoft.github.io/vscode-remote-release/images/gitter-icon-24x24.png)](https://gitter.im/Microsoft/vscode)

## Telemetry

Visual Studio Code Remote - WSL and related extensions collect telemetry data to help us build a better experience working remotely from VS Code. We only collect data on which commands are executed. We do not collect any information about image names, paths, etc. The extension respects the `telemetry.enableTelemetry` setting which you can learn more about in the [Visual Studio Code FAQ](https://aka.ms/vscode-remote/telemetry).

## License

By downloading and using the Visual Studio Remote - WSL extension and its related components, you agree to the product [license terms](https://go.microsoft.com/fwlink/?linkid=2077057) and [privacy statement](https://www.microsoft.com/en-us/privacystatement/EnterpriseDev/default.aspx).
