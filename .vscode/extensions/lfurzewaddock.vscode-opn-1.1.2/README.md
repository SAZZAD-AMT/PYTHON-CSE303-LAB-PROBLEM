# vscode-opn

![vscode-opn](https://github.com/lfurzewaddock/vscode-opn/raw/master/public/assets/images/vscode-opn.png)

> Microsoft Visual Studio Code extension integrating node.js module: opn
 
> Opens files directly by default, or on your local web server using the default app set by the OS, or an app set by you.

> Great for rapid prototyping!

## Install

### Easiest from the Extension Gallery

1. Start VS Code.

2. From within VS Code press `F1`, then type `ext install`.

3. Select `Extensions: Install Extension` and click or press `Enter`.

4. Wait a few seconds for the list to populate and type `Open File in App`.

5. Click the install icon next to the `Open File in App` extension.

6. Restart VS Code to complete installing the extension.

### Alternatively, with the Packaged Extension (.vsix) file

Download the latest `vscode-opn.vsix` from [GitHub Releases](https://github.com/lfurzewaddock/vscode-opn/blob/master/../../releases). 

You can manually install the VS Code extension packaged in a .vsix file. 

Option 1) 

Execute the VS Code command line below providing the path to the .vsix file;

    code myExtensionFolder\vscode-opn.vsix  

Depending on your platform replace `myExtensionFolder\` with;

- Windows:- `%USERPROFILE%\.vscode\extensions\`
- Mac:- `$HOME/.vscode/extensions/`
- Linux:- `$HOME/.vscode/extensions/`

Option 2)

Start VS Code. 

From within VS Code open the 'File' menu, select 'Open File...' or press Ctrl+O, navigate to the .vsix file location and select it to open.

The extension will be installed under your user .vscode/extensions folder.

## Usage

Execute the extension with the keyboard shortcut;

- **Mac**: `Command` + `Alt` + `O`
- **Windows/Linux**: `Ctrl` + `Alt` + `O`

### Customise behaviour per language (optional)

By default plain text based files will open directly in the app set by your OS.

To change this default behaviour you will need to edit 'Workspace Settings' or 'User Settings'.

From within VS Code open the 'File' menu, select 'Preferences', and then select either 'Workspace Settings' or 'User Settings'.

Options are set per 'language', not per file type, so for example setting options for the language 'plaintext', will change the behaviour of several file types including '.txt' and '.log'.

The minimum JSON to change the behaviour of a single language, e.g. html is;

```javascript
"vscode-opn.perLang": {
    "opnOptions": [
      {
        "forLang": "html",
        "openInApp": "chrome"
      }
    ]
  }
```

#### forLang

*Required*  
Type: `string`  
Examples include;
- "html"
- "plaintext"
- "css"
- "json"
- "javascript"

#### openInApp

*Required*  
Type: `string`  
Examples include;
- "chrome"
- "firefox"
- "iexplore"
- "notepad"
- "notepad++"
- "wordpad"
- "winword"
- "winmerge"

*Notes:* The app name examples above are platform dependent and valid for an MS Windows environment. For Google's Chrome web browser for example, you would use `google chrome` on OS X, `google-chrome` on Linux and `chrome` on Windows.  
 

The following example sets all available options for `html` and `plaintext` languages;

```javascript
"vscode-opn.perLang": {
    "opnOptions": [
      {
        "forLang": "html",
        "openInApp": "chrome",
        "openInAppArgs": ["--incognito"],
        "isUseWebServer": true,
        "isUseFsPath": false,
        "isWaitForAppExit": true
      },
      {
        "forLang": "plaintext",
        "openInApp": "notepad++",
        "openInAppArgs": [],
        "isUseWebServer": false,
        "isUseFsPath": true,
        "isWaitForAppExit": true
      }
    ]
  },
  "vscode-opn.webServerProtocol": "http",
  "vscode-opn.webServerHostname": "localhost",
  "vscode-opn.webServerPort": 8080
```

#### openInAppArgs

*Optional*  
Type: `array`  
Examples include: ["--incognito", "-private-window"]

*Notes:* A string array of arguments to pass to the app. For example, `--incognito` will tell Google Chrome to open a new window in "Private Browsing Mode", whereas `-private-window` will do something similar in Mozilla Firefox.

#### isUseWebServer

*Optional*  
Type: `boolean`  
Default: `false`

*Notes:* If you set up a site on your local web server such as MS Windows IIS and your VS Code project folder is within the site root, you can open file URLs instead of URIs. This is useful for code that requires a server environment to run, such as AJAX. You will first need to update the vscode-opn default web server settings with your own.

#### isUseFsPath

*Optional*  
Type: `boolean`  
Default: `false`

*Notes:* During testing in an MS Win 10 environment both Notepad++ and MS WordPad did not support file URIs. This option will use the local file system path instead. This issue may affect other apps and other platforms too.

#### isWaitForAppExit

*Optional*  
Type: `boolean`  
Default: `true`

*Notes:* See node.js module [**opn option: wait**](https://github.com/sindresorhus/opn/blob/master/readme.md#wait) for more info.


### Web server settings (applies to all languages)

Required by the per language option: `isUseWebServer`.
  
#### vscode-opn.webServerProtocol

*Optional*  
Type: `string`  
Default: `"http"`

*Notes:* Enter a protocol, e.g. "http" or "https".

#### vscode-opn.webServerHostname

*Optional*  
Type: `string`  
Default: `"localhost"`

*Notes:* Enter the hostname or IP of your local web server.

#### vscode-opn.webServerPort

*Optional*  
Type: `number`  
Default: `8080`

*Notes:* Enter the port of your local web server.


## Tested

- Tested in MS Win 10 environment.

- Works with plain text based file types including;
 - `.html` 
 - `.htm` 
 - `.xml` 
 - `.json`
 - `.log`
 - `.txt` 
 
- Does not work with other file types including;
  - `.png`
  - `.gif`
  - `.jpg`
  - `.docx`
  - `.xlsx`
  - `.pdf`
  
## Release notes

Version 1.1.2   
Date: 25 Feb 2016

- Set original feature as the default behaviour.
- NEW FEATURE: Setting per language for which app to use
- NEW FEATURE: Setting per language to pass argument(s) to app
- NEW FEATURE: Setting per language to open file URL in local web server
- NEW FEATURE: Setting per language to use file system path, instead of URI
- NEW FEATURE: Setting per language to wait for the opened app to exit before calling the callback

Version 1.0.2   
Date: 17 Feb 2016

- FEATURE: Open file URIs directly in the default application for the file type set in the OS.

   
## Contributions

- Please use [Github Issues](https://github.com/lfurzewaddock/vscode-opn/blob/master/../../issues), for feedback, feature suggestions, comments and reporting bugs.
- Feel free to fork this project and create pull requests with new features and/or bug fixes.
- Help with bugs/issues specific to other platforms such as OSX and Linux is particularly welcome.

## Dependencies

- [opn](https://github.com/sindresorhus/opn)

## License
[MIT](https://github.com/lfurzewaddock/vscode-opn/blob/master/LICENSE.txt)
