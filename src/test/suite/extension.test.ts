import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Should start extension @integration", async () => {
    await vscode.commands.executeCommand("jwt.decode");
    const started = vscode.extensions.getExtension("florian.jwt")?.isActive;
    assert.strictEqual(started, true);
  });
});
