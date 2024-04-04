(function() {
    "use strict";

    class Render extends app.Helper {
        constructor() {
            super();
            this.regions = [];
            this.components = {};
        }

        renderBlocks(callback) {
            var self = this;

            var scName = Render.getParameterByName('page') || Object.keys(app.pages)[0];
            self.components = new app.pages[scName]() || {};

            self.regions.forEach((region) => {
                var list = self.components[region] || [];

                if (list.length) {
                    self.showRegion(region, list);
                } else {
                    // has no block --> hide region.
                    self.hideRegion(region);
                }
            });

            if (callback) { callback(); }
        }

        showRegion(name, configs) {
            var self = this;

            try {

                // 1) move old blocks to temporary
                var container = document.getElementById(name + '-region');
                var temporary = document.createDocumentFragment();
                while (container.children.length) {
                    temporary.appendChild(container.children[0]);
                }

                var oldBlocks = self.regions[name] || [];
                self.regions[name] = [];

                // 2) add all blocks in config list to region.

                var bl, element;
                configs.forEach((cfg) => {

                    // if block is already exist --> add it back and reload.
                    for (var i = oldBlocks.length - 1; i >= 0; i--) {
                        bl = oldBlocks[i];

                        if (cfg.name === bl.name) {
                            element = temporary.children[bl.eid];

                            container.appendChild(element);

                            oldBlocks.splice(i, 1);
                            self.regions[name].push(bl);

                            bl.setConfig(cfg);
                            bl.loadComponent();

                            // break;
                            return;
                        }
                    }

                    // else create new block then add.

                    bl = new app.coms[cfg.com](cfg);
                    element = bl.getHtml();
                    container.insertAdjacentHTML('beforeend', element);
                    container.removeAttribute('style');


                    self.regions[name].push(bl);

                    bl.loadComponent();
                });

            } catch (e) {
                console.warn(e);
            }
        }

        hideRegion(name) {
            // console.log("hide", name)
            try {
                var self = this;

                // remove DOM of blocks
                var region = document.getElementById(name + '-region');
                if (region) {
                    region.innerHTML = "";
                    region.style.display = "none";
                }

                // remove data of blocks
                if (self.regions) {
                    delete self.regions[name];
                }

            } catch (e) {
                console.warn(e);
            }
        }

        //-------

        addPagesDefine(callback) {
            var self = this;

            var list = self.regions;
            document.body.querySelectorAll('[id]').forEach(el => {
                var id = el.id || "";
                if (id.endsWith('-region')) {
                    list.push(id.split('-')[0]);
                }
            });

            var url = 'page.js';

            if (app.address) {
                url = `${app.address}/${url}`;
            }

            Render.addScript([url], () => {
                callback();
            });
        }

        addBlocksDependency(callback) {
            var self = this;

            var list = [];
            var pages = app.pages;
            Object.keys(pages).forEach(p => {
                var page = new pages[p]();
                self.regions.forEach(rg => {
                    var blocks = page[rg] || [];
                    blocks.forEach(bl => {

                        var com = `${bl.com}/index.js`;

                        if ((bl.url || app.address)) {
                            com = `${(bl.url || app.address)}/${com}`;
                        }                                                

                        if (list.indexOf(com) < 0) {
                            list.push(com);
                        }

                    });
                });
            });

            Render.addScript(list, () => {
                callback();
            });
        }
    }

    function loadPage(callback) {
        var render = new Render();
        render.addPagesDefine(() => {
            render.addBlocksDependency(() => {
                render.renderBlocks(() => {
                    if (callback) callback();
                    // event.fire();
                });
            });
        });
    }





    // export
    app.loadPage = loadPage;
})();