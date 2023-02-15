// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const JSki = require('jsonski')
const path = require("path");
const fs =  require('fs');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


async function CreateBoilerPlate(){
	const htmlContent = `const JSki = require('jsonski');
	const fs = require('fs');
	console.time();
	console.log('JsonSki Runtime', JSki.JSONSkiParser("$[*].entities.urls[*].url", "dataset/twitter_sample_large_record.json"));
	console.timeEnd();
	file_contents = fs.readFileSync('dataset/twitter_sample_large_record.json')
	str = file_contents.toString()
	console.log("Javascript Runtime")
	console.time();
	var json = JSON.parse(str);
	console.timeEnd();`;
	
	if (!vscode.workspace) {
		return vscode.window.showErrorMessage('Please open a project folder first');
		}
	
		const folderPath = vscode.workspace.workspaceFolders[0].uri
		.toString()
		.split(':')[1];


		fs.writeFile(path.join(folderPath, 'index.js'), htmlContent, (err) => {
			if (err) {
				return vscode.window.showErrorMessage(
				'Failed to create boilerplate file!'
				);
			}
			vscode.window.showInformationMessage('Created boilerplate files');
			});
}


 async function JSONSkiQuery() {
	let f = await vscode.window.activeTextEditor.document.uri.path;
	const query_result = await vscode.window.showInputBox({
		value: '',
		valueSelection: [2, 4],
		placeHolder: 'Enter JSON Query',
		validateInput: text => {
		
			return text === '123' ? 'Not 123!' : null;
		}
	});
	
	let temp_result = await JSki.JSONSkiParser(query_result, f);
	await fs.writeFile(path.join(vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1], 'result.json'),temp_result, (err) => {
		if (err) {
		  return vscode.window.showErrorMessage(
			'Failed to write result'
		  );
		}
		 vscode.window.showInformationMessage('Result written to file');
	  });

	await vscode.window.showInformationMessage("Query result here",temp_result);

}

/**
 * Shows an input box using window.showInputBox().
 */


function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jski" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('Jsonski.JSONSkiParse', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('JSONSki - A streaming Parser');
		
		const options = {
			JSONSkiQuery,
			CreateBoilerPlate
		};
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
					.catch();
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();



	});





	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



/**
 * Shows a pick list using window.showQuickPick().
 * 
 * 
 * 
 * 
 * 
 */










