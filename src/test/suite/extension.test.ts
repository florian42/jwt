import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as sinon from "sinon";
import Jwt from "../../jwt";
import { afterEach } from "mocha";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  const validJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  afterEach(function () {
    sinon.restore();
  });

  test("starts extension @integration", async () => {
    await vscode.commands.executeCommand("jwt.decode");
    const started = vscode.extensions.getExtension("florian.jwt")?.isActive;
    assert.strictEqual(started, true);
  });

  test("decodes valid jwt input", async () => {
    const showInputBox = sinon.stub(vscode.window, "showInputBox");
    const showInformationMessage = sinon.stub(
      vscode.window,
      "showInformationMessage"
    );
    showInputBox.resolves(validJwt);
    const expectedMessage = JSON.stringify(
      new Jwt(
        '{"alg":"HS256","typ":"JWT"}',
        '{"sub":"1234567890","name":"John Doe","iat":1516239022}'
      )
    );

    await vscode.commands.executeCommand("jwt.decode");

    assert(showInputBox.calledOnce);
    assert(showInformationMessage.calledOnce);
    //@ts-ignore
    sinon.assert.calledWith(showInformationMessage, expectedMessage);
  });

  test("shows error message when no input given", async () => {
    const showInputBox = sinon.stub(vscode.window, "showInputBox");
    const showErrorMessage = sinon.stub(vscode.window, "showErrorMessage");
    showInputBox.resolves(undefined);

    await vscode.commands.executeCommand("jwt.decode");

    assert(showInputBox.calledOnce);
    assert(showErrorMessage.calledOnce);
    console.log(showErrorMessage.firstCall.lastArg);
    //@ts-ignore
    sinon.assert.calledWith(showErrorMessage, "Forgot to paste your JWT?");
  });

  test("shows error message when input is invalid", async () => {
    const showInputBox = sinon.stub(vscode.window, "showInputBox");
    const showErrorMessage = sinon.stub(vscode.window, "showErrorMessage");
    showInputBox.resolves("123");

    await vscode.commands.executeCommand("jwt.decode");

    assert(showInputBox.calledOnce);
    assert(showErrorMessage.calledOnce);
    console.log(showErrorMessage.firstCall.lastArg);
    //@ts-ignore
    sinon.assert.calledWith(
      showErrorMessage,
      "Make sure your JWT has a valid format"
    );
  });
});
