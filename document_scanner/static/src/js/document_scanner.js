openerp.document_scanner = function (instance) {
    _t = instance.web._t;
    instance.web.Sidebar.include({

        start: function () {
            this._super();
            self = this;
            this.$el.on('click', '.oe_sidebar_scan_attachment_select', function (event) {
                ids = self.getParent().get_selected_ids()
                var context = {
                    active_id: ids[0],
                    active_ids: ids,
                    active_model: self.getParent().dataset.model
                };
                new instance.web.Model('ir.attachment')
                    .call('scan', [context])
                    .then(function (data) {
                        if (data && data.error != undefined) {
                            console.log(data);
                            alert(_t("The request has not been sent") + '\n' + data.error);
                        } else {
                            self.do_notify(_t("Scanning information"), _t("The request has been sent to the scanner :") + data.scan_name);
                        }
                    });
            });
        }
    });
};
