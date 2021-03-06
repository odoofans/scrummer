// Copyright 2017 - 2018 Modoolar <info@modoolar.com>
// License LGPLv3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.en.html).

odoo.define("scrummer_git", function (require) {

    const TaskWidget = require('scrummer.widget.task').TaskWidget;
    const ModalWidget = require('scrummer.widget.modal').ModalWidget;
    const session = require('web.session');

    const CommitsModal = ModalWidget.extend({
        template: "scrummer.widget.modal.show_commits",
        init(parent, options) {
            this._super(parent, options);
            this._require_prop("commits");
        },
        addedToDOM() {
            this._super();
            this.$('.tooltipped').tooltip();
        }
    });

    TaskWidget.include({
        start() {
            $("#show_commits").click(() => {
                session.rpc(`/scrummer/git/${this.id}/commits`).then((commits) => {
                    const modal = new CommitsModal(this, {commits});
                    modal.appendTo($("body"));
                });

            });

            return this._super();
        }
    });

    return {
        CommitsModal
    };
});
