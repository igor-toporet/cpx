/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {exec} = require("child_process")
const {dirname} = require("path")
const {readFileSync, writeFileSync} = require("fs")
const {sync: mkdirSync} = require("mkdirp")
const {sync: rimrafSync} = require("rimraf")
const {exec: execSync} = require("shelljs")

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Writes specific data to a specific file.
 *
 * @param {string} path - A path to write.
 * @param {string} contentText - A text to write.
 * @returns {void}
 */
const writeFile = module.exports.writeFile = function writeFile(path, contentText) {
    mkdirSync(dirname(path))
    writeFileSync(path, contentText)
}

/**
 * Removes a specific file.
 *
 * @param {string} path - A path to write.
 * @returns {void}
 */
module.exports.removeFile = function removeFile(path) {
    rimrafSync(path)
}

/**
 * Sets up test files.
 *
 * @param {object} dataset - Test data to write.
 * @returns {void}
 */
module.exports.setupTestDir = function setupTestDir(dataset) {
    for (const path in dataset) {
        if (dataset[path] == null) {
            mkdirSync(path)
        }
        else {
            writeFile(path, dataset[path])
        }
    }
}

/**
 * Removes test data.
 *
 * @param {string} testRootPath - A path to write.
 * @returns {void}
 */
module.exports.teardownTestDir = function teardownTestDir(testRootPath) {
    rimrafSync(testRootPath)
}

/**
 * Gets the content of a specific file.
 *
 * @param {string} path - A path to read.
 * @returns {string|null} The content of the file, or `null` if not found.
 */
module.exports.content = function content(path) {
    try {
        return readFileSync(path, {encoding: "utf8"})
    }
    catch (_err) {
        return null
    }
}

/**
 * Execute cpx command.
 * @param {string} args - Command arguments.
 * @returns {child_process.ChildProcess} A child process object.
 */
module.exports.execCommand = function execCommand(args) {
    return exec(`babel-node -- src/bin/index.js ${args}`)
}

/**
 * Execute cpx command.
 * @param {string} args - Command arguments.
 * @returns {void}
 */
module.exports.execCommandSync = function execCommandSync(args) {
    return execSync(`babel-node -- src/bin/index.js ${args}`, {silent: true})
}
