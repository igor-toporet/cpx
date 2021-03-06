/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

const Cpx = require("./cpx")

module.exports = {
    Cpx,

    /**
     * Copies the files which match with a given glob pattern.
     *
     * @param {string} source - The glob pattern of source files.
     * @param {string} outDir - The path of an output directory.
     * @param {object} [options = null] - Omittable. An option object.
     * @param {boolean} [options.clean = false] - A flag to remove files that have
     *      been copied previously before copy.
     * @param {boolean} [options.dereference = false] - A flag to follow symbolic
     *      links.
     * @param {function[]} [options.transform = null] - Functions to make transform
     *      streams for each file.
     * @param {function} [cb = null] - A callback function to be called after done.
     * @returns {Cpx} A Cpx instance.
     */
    copy(source, outDir, options = null, cb = null) {
        if (typeof options === "function") {
            /* eslint-disable no-param-reassign */
            cb = options
            options = null
            /* eslint-enable no-param-reassign */
        }

        const cpx = new Cpx(source, outDir, options)
        if (options && options.clean) {
            cpx.clean(err => {
                if (err == null) {
                    cpx.copy(cb)
                }
                else if (cb != null) {
                    cb(err)
                }
            })
        }
        else {
            cpx.copy(cb)
        }

        return cpx
    },

    /**
     * Copies the files which match with a given glob pattern.
     *
     * @param {string} source - The glob pattern of source files.
     * @param {string} outDir - The path of an output directory.
     * @param {object} [options = null] - Omittable. An option object.
     * @param {boolean} [options.clean = false] - A flag to remove files that have
     *      been copied previously before copy.
     * @param {boolean} [options.dereference = false] - A flag to follow symbolic
     *      links.
     * @returns {Cpx} A Cpx instance.
     */
    copySync(source, outDir, options = null) {
        const cpx = new Cpx(source, outDir, options)
        if (options && options.clean) {
            cpx.cleanSync()
        }
        cpx.copySync()
    },

    /**
     * Copies the files which match with a given glob pattern.
     * Then this observes the files and copies when modified them.
     *
     * @param {string} source - The glob pattern of source files.
     * @param {string} outDir - The path of an output directory.
     * @param {object} [options = null] - Omittable. An option object.
     * @param {boolean} [options.clean = false] - A flag to remove files that have
     *      been copied previously before copy.
     * @param {boolean} [options.dereference = false] - A flag to follow symbolic
     *      links.
     * @returns {Cpx} A Cpx instance.
     */
    watch(source, outDir, options = null) {
        const cpx = new Cpx(source, outDir, options)
        if (options && options.clean) {
            cpx.clean(err => {
                if (err == null) {
                    cpx.watch()
                }
                else {
                    cpx.emit("watch-error", err)
                }
            })
        }
        else {
            cpx.watch()
        }

        return cpx
    },
}
