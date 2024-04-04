/**
 * ===========================================================================================
 * Component of page, depend module.js
 * ===========================================================================================
 */
(function() {
    "use strict";

    const SCRIPT = document.currentScript;

    class Com extends app.Helper {

        static get type() { return 'com'; };
        static get name() { return 'Com'; };

        constructor(config) {
            super();

            this.script = SCRIPT;
            this.setConfig(config);

            this.containerId = "bl-" + Com.random(5);
            this.eid = this.containerId; // short
        }

        getHtml() {
            var self = this;

            let html = '';
            html += '<div id="' + self.eid + '" class="' + self.constructor.name + '">';
            html += '</div>';

            return html;
        }

        loadComponent(callback) {
            var self = this;
            callback = callback || function() {};

            if (self.__reload) {
                // is reloaded -> don't need add template and register event again.
                return callback();
            }
            self.__reload = true;

            var lastTemplate = document.getElementById(self.containerId);
            self.addTemplate(self.containerId, () => {
                if (!self.__eventRegisted) {
                    self.eventListener();
                    self.__eventRegisted = true;
                }
                callback();
            });
        }

        repaint() {
            // update gui
        }

        eventListener() {
            var self = this;
            event.on("ChangeDisplay", (eventName, msg, src) => {
                self.repaint();
            });
        }

        /**
         * ===========================================================================================
         * Utilities functions
         * ===========================================================================================
         */

        setConfig(config) {

            if (this.name && this.name !== this.config.name) {
                return console.warn('Wrong block config type');
            }

            this.config = config || {};
            // this.name = config.name;
            // this.module = this.config.module;
        }

        addTemplate(elementId, callback) {
            var self = this;

            if (!self.script) {
                console.warn('can not load block', self.name);
                return callback();
            }

            var src = self.script.src;
            self.getFile(src.replace('index.js', 'style.css'), (css) => {
                self.getFile(src.replace('index.js', 'index.html'), (html) => {

                    var str = "";
                    str += '<style type="text/css">' + css + '</style>';
                    str += html;

                    var block = document.getElementById(elementId);
                    if (!block) {
                        return callback();
                    }

                    block.innerHTML = ""; // clean
                    block.insertAdjacentHTML("beforeend", str);

                    //-----> Todo: set id for all child element.
                    // consider to remove this feature later.
                    self.setSubElmentIds(block);
                    //----> End

                    callback();
                });
            });
        }

        setSubElmentIds(blockElement) {
            var blockId = this.eid;
            var el, childs = blockElement.getElementsByTagName("*");

            for (var i = childs.length - 1; i >= 0; i--) {
                el = childs[i];
                if (el.id) {
                    el.id = blockId + '-' + el.id;
                }
            }
        }

        getSubElementId(id) {
            return this.eid + '-' + id;
        }

        getSubElementById(id) {
            return document.getElementById(this.eid + '-' + id);
        }

        getFile(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE) {
                    return callback(this.responseText);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
    }

    // export
    app.Com = Com;
})();