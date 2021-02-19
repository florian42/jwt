// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Jwt from "./jwt";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("jwt.decode", async () => {
    // The code you place here will be executed every time your command is executed
    try {
      const input = await vscode.window.showInputBox();
      const jwt = Jwt.getJwt(input);
      vscode.window.showInformationMessage(`${JSON.stringify(jwt)}`);
    } catch (error) {
      vscode.window.showErrorMessage(error.message);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
