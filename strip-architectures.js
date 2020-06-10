
const fs = require('fs');
const path = require("path");
const xcode = require("xcode");

module.exports = function (ctx) {
    // Find project file path
    const xcodeProjPath = searchRecursiveFromPath('platforms/ios', '.xcodeproj', false);
    const projectPath = xcodeProjPath + '/project.pbxproj';

    // Open the project
    const proj = xcode.project(projectPath);
    // Needs to be parsed, else it's plaintext
    proj.parseSync();

    // Proper options found by comparing the diff after manually adding correct paths, script and inputPaths
    const options = {
        shellPath: '/bin/sh',
        shellScript: 'bash \"$BUILT_PRODUCTS_DIR/$FRAMEWORKS_FOLDER_PATH/ScanbotSDK.framework/strip-SBSDK-Framework.sh\"',
        inputPaths: ['"$(SRCROOT)/../../plugins/cordova-plugin-scanbot-sdk/src/ios/Frameworks/ScanbotSDK.framework.dSYM"']
    };

    // Add the actual via the magic of cordova-node-xcode (https://github.com/apache/cordova-node-xcode)
    proj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Run a script', proj.getFirstTarget().uuid, options);
    // Finally, overwrite the actual file
    fs.writeFileSync(projectPath, proj.writeSync());
};

function searchRecursiveFromPath(startPath, filter, rec) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory() && rec) {
            fromDir(filename, filter); //recurse
        }
        if (filename.indexOf(filter) >= 0) {
            return filename;
        }
    }
}
