const ENTITY_GROUP_TYPE = 0;
const GROUP_GROUP_TYPE = 1;

var dateTimeOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: "h24"
};

var statuses = new Map();
statuses.set(0, "Draft");
statuses.set(1, "Voting");
statuses.set(2, "Confirmed");
statuses.set(3, "Denied");
statuses.set(4, "Archived");

var dataAccess = {
    getGroups: function (success, failure) {
        //success(testGroups);
        return $.ajax({
            url: window.location.origin + "/Group",
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    getGroup: function (id, success, failure) {
        //success(testGroups.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/group/" + id,
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    getDecisions: function (success, failure) {
        //success(testDecisions);
        return $.ajax({
            url: window.location.origin + "/Decision",
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    getDecision: function (id, success, failure) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    postDecision: function (decision, success, failure) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "POST",
            data: JSON.stringify(new PersistDecision(decision)),
            contentType: "application/json",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    putDecision: function (id, decision, success, failure) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "PUT",
            data: JSON.stringify(new PersistDecision(decision)),
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    deleteDecision: function (id, success, failure) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    getVoters: function (success, failure) {
        //success(testEntities);
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    },
    getVoter: function (id, success, failure) {
        //success(testEntities.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/Voter/" + id,
            type: "GET",
            success: function (data) {
                success(data);
            },
            failure: function (err) {
                failure(err);
            }
        });
    }
};

var Vote = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.entityId = data.entityId ? data.entityId : null;
        this.selectedIndex = data.selectedIndex ? data.selectedIndex : 0;
        this.time = data.time ? data.time : 0;
    }

    return constructor;

})();

var Comment = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.entityId = data.entityId ? data.entityId : null;
        this.time = data.time ? data.time : new Date();
        this.upvotes = data.upvotes ? data.upvotes : 0;
        this.downvotes = data.downvotes ? data.downvotes : 0;
        this.narrative = data.narrative ? data.narrative : "";
    }

    return constructor;

})();

var Decision = (function () {

    function constructor(data) {

        if (data) {
            this.id = data.id ? data.id : 0;
            this.votes = data.votes ? data.votes : [];
            this.options = data.options ? data.options : [];
            this.comments = data.comments ? data.comments : [];
            this.attachments = data.attachments ? data.attachments : [];
            this.creationDate = data.creationDate ? data.creationDate : null;
            this.description = data.description ? data.description : "";
            this.expirationDate = data.expirationDate ? data.expirationDate : "";
            this.name = data.name ? data.name : "";
            // this.groupId = data.groupId ? data.groupId : "";
            this.statusId = data.statusId ? data.statusId : 0;
            this.statusDate = data.statusDate ? data.statusDate : "";
        } else {
            this.id = 0;
            this.votes = [];
            this.options = [];
            this.comments = [];
            this.attachments = [];
            this.creationDate = null;
            this.description = "";
            this.expirationDate = null;
            this.name = "";
            // this.groupId = null;
            this.statusId = 0;
            this.statusDate = null;
        }
    }

    return constructor;
})();

var PersistDecision = (function () {

    function constructor(data) {

        if (data) {
            this.id = data.id ? data.id : generateId();
            this.description = data.description ? data.description : "";
            this.name = data.name ? data.name : "";
            this.statusId = data.statusId ? data.statusId : 0;
        } else {
            this.id = generateId();
            this.description = "";
            this.name = "";
            this.statusId = 0;
        }
    }

    return constructor;
})();

// this can be a group of Voters or a group of Groups
var Group = (function () {

    function constructor(data) {

        if (data) {
            this.decisions = data.decisions ? data.decisions : []; // Voter[] or Group[]
            this.children = data.children ? data.children : []; // Voter[] or Group[]
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : 0;
            this.name = data.name ? data.name : "";
            this.parentId = data.parentId ? data.parentId : null; // Group
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE; // group or voter
        } else {
            this.children = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = 0;
            this.name = "";
            this.parentId = null;
            this.type = ENTITY_GROUP_TYPE; // group or voter
        }
    }

    return constructor;
})();

var Voter = (function () {

    function constructor(data) {

        if (data) {
            this.id = data.id ? data.id : 0;
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.name = data.name ? data.name : "";
            // Group
            this.groupId = data.groupId ? data.groupId : null;
        } else {
            this.id = 0;
            this.creationDate = new Date().getTime();
            this.description = "";
            this.name = "";
            this.groupId = null;
        }
    }

    return constructor;
})();

var decisionColumns = [{
    data: "name",
    className: "name linked",
    render: function (value, renderType, row) {
        return "<div>" + value + "</div>"
    },
    title: "Name"
}, {
    data: "statusId",
    className: "status",
    render: function (value, renderType, row) {
        return statuses.get(value);
    },
    title: "Status"
}, {
    data: "groupId",
    className: "group linked",
    render: function (value, renderType, row) {
        if (parent) {
            return "<div>" + value + "</div>"
        } else {
            return "<div>no parent selected</div>";
        }
    },
    title: "Group"
}, {
    data: "creationDate",
    className: "created",
    render: function (value, renderType, row) {
        return new Date(value).toLocaleString("en-us", dateTimeOptions);
    },
    title: "Created"
}, {
    data: "expirationDate",
    className: "expiration",
    render: function (value, renderType, row) {
        return new Date(value).toLocaleString("en-us", dateTimeOptions);
    },
    title: "Expires"
}, {
    data: "attachments",
    className: "attachments",
    render: function (value, renderType, row) {
        return "<a href=\"" + row.href + "\">" + value + "</a>";
    },
    title: "Attachments"
}

];

var groupColumns = [{
    data: "name",
    className: "name linked",
    render: function (value, renderType, row) {
        return "<div @click=\"showDetail\">" + value + "</div>"
    },
    title: "Name"
}, {
    data: "parentId",
    className: "group linked",
    render: function (value, renderType, row) {
        if (parent) {
            return "<div>" + value + "</div>"
        } else {
            return "<a>no parent selected</a>";
        }
    },
    title: "Parent"
}, {
    data: "type",
    className: "children",
    render: function (value, renderType, row) {
        return value === 1 ? "Groups" : "Voters";
    },
    title: "Type"
}, {
    data: "creationDate",
    className: "created",
    render: function (value, renderType, row) {
        return new Date(value).toLocaleString("en-us", dateTimeOptions);
    },
    title: "Created"
}, {
    data: "attachments",
    className: "attachments",
    render: function (value, renderType, row) {
        return "<a href=\"" + row.href + "\">" + value + "</a>";
    },
    title: "Attachments"
}
];

var entityColumns = [{
    data: "name",
    className: "name linked",
    render: function (value, renderType, row) {
        return "<div @click=\"showDetail\">" + value + "</div>"
    },
    title: "Name"
}, {
    data: "groupId",
    className: "group linked",
    render: function (value, renderType, row) {
        if (parent) {
            return "<div @click=\"showGroupDetail\">" + value + "</div>"
        } else {
            return "<div>no parent selected</div>";
        }
    },
    title: "Group"
}, {
    data: "creationDate",
    className: "created",
    render: function (value, renderType, row) {
        return new Date(value).toLocaleString("en-us", dateTimeOptions);
    },
    title: "Created"
}

];

var votesColumns = [{
    data: "name",
    className: "name linked",
    render: function (value, renderType, row) {
        return "<div @click=\"showDetail(row.id, 'Voters')\">" + value + "</div>"
    },
    title: "Name"
}, {
    data: "choice",
    className: "choice",
    render: function (value, renderType, row) {
        return value;
    },
    title: "Group"
}, {
    data: "time",
    className: "created",
    render: function (value, renderType, row) {
        return new Date(value).toLocaleString("en-us", dateTimeOptions);
    },
    title: "Created"
}

];


Vue.component('nav-bar', {
    methods: {
        showDecisionList: function () {
            this.$emit("showdecisionlist");
        },
        showGroupList: function () {
            this.$emit("showgrouplist");
        },
        showEntityList: function () {
            this.$emit("showentitylist");
        }

    },
    template: $("#tmpNavBar").html()
});

Vue.component('data-table', {
    model: {
        event: "change"
    },
    // selectMode === "single" || "multi"
    props: ["columns", "data", "header", "selectMode"],
    methods: {
        showDetail: function (data) {
            console.log("data-table emitting showDetail");
            this.$emit("show-detail", data, this.header);
        },
        showGroupDetail: function (data) {
            console.log("data-table emitting showGroupDetail");
            this.$emit("show-detail", data, "Groups");
        },
        select: function (data) {
            console.log("data-table emitting select", data);
            this.$emit("select", data.id);
        },
        setupDataTable: function () {

            var selector = ".data-table";
            var self = this;

            if (self.dt) {
                self.dt.destroy(false);
                $(this.$el).find(selector).empty();
            }
            self.dt = $(self.$el).find(selector).DataTable({
                data: self.data,
                columns: self.columnsDisplay
            });

            $(self.$el).off();

            $(self.$el).on('click', 'button.select-single', function () {
                var data = self.dt.row($(this).closest("tr")).data();
                self.select(data);
            });
            $(self.$el).on('click', 'td.name', function () {
                var data = self.dt.row($(this).closest("tr")).data();
                self.showDetail(data.id, this.header);
            });
            $(self.$el).on('click', 'td.group', function () {
                // var data = self.dt.row($(this).closest("tr")).data();
                self.showGroupDetail(parseInt($(this).text()));
            });
        }
    },
    computed: {
        columnsDisplay: function () {

            var mode = this.selectMode;
            if (mode === "single" || mode === "multi") {

                var returnMe = this.columns.slice();
                returnMe.unshift({
                    data: null,
                    className: "actions",
                    render: function (value, renderType, row) {
                        return "<button class=\"select-" + mode + "\">Select</button>";
                    },
                    title: "Actions"
                });
                return returnMe;
            } else {
                return this.columns;
            }
        }

    },
    watch: {
        data: function (current, old) {
            this.setupDataTable();
        }
    },
    mounted: function () {
        this.setupDataTable();
    },
    template: $("#tmpDataTable").html()
});

Vue.component('decision-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            currentSorting: 'none',
            isSelectingGroup: false,
            showDiscussion: false,
            showVotes: false,
            decision: new Decision()
        };
    },
    props: ["value", "editable"],
    methods: {
        sortComments: function (key) {
            this.currentSorting = key;
            this.comments.sort(function (a, b) {
                return a[key] < b[key]
                    ? -1
                    : a[key] > b[key]
                        ? 1
                        : 0;
            });
        },
        voteYes: function () {
            throw ("not implemented");
        },
        voteNo: function () {
            throw ("not implemented");
        },
        addComment: function () {
            throw ("not implemented");
        },
        uploadAttachment: function () {
            throw ("not implemented");
        },
        showDetail: function (data, header) {
            console.log("decision-detail emitting showDetail");
            this.$emit("show-detail", data, header);
        },
        setGroup: function (id) {
            console.log("decision-detail setGroup");
            this.decision.groupId = id;

        },
        selectGroup: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.group").dialog({
                    modal: true,
                    width: "70%"
                });

            });
        },
        getDate: function (date) {
            return new Date(date).toLocaleString();
        }
        , save_onclick: function () {
            this.$emit("change", this.decision);
            console.log("decision-detail save_onclick emitting change", this.decision.id);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.decision);
            console.log("decision-detail delete_onclick emitting change", this.decision);
        }
    },
    computed: {
        votable: function () {
            return this.decision.status === 1;
        },
        groups: function () {
            return groups;
        },
        group: function () {
            return getGroupById(this.value.groupId);
        },
        groupColumns: function () {
            return groupColumns;
        },
        votesColumns: function () {
            return votesColumns;
        },
        votesDisplay: function () {
            if (this.decision) {
                return this.decision.votes.map(function (x) {
                    return {
                        name: getItemById(x.entityId, voters)
                        , id: x.entityId
                        , choice: this.choices[x.selectedIndex]
                        , time: x.time
                    };
                });
            } else {
                return [];
            }
        }
    },
    watch: {
        value: function (oldValue, newValue) {
            console.log("watch", JSON.stringify(this.decision.id), JSON.stringify(newValue.id));
            this.decision = newValue;
        }
        //decision: {
        //    handler: function (current, old) {
        //        this.$emit("change", current);
        //        console.log("decision-detail watch emitting change", current);
        //    },
        //    deep: true
        //}
    },

    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.decision = new Decision(this.value);
    },
    template: $("#tmpDecisionDetail").html()
});

Vue.component('group-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            isAddingChild: false,
            isSelectingGroup: false,
            group: {}
        };
    },
    props: ["value", "editable", "voters", "groups"],
    methods: {
        makeDecision: function () {
            var d = new Decision();
            decisions.push(d);
            this.group.decisions.push(d);
            this.showDetail(d.id, "Decisions");
        },
        showDetail: function (data, header) {
            console.log("group-detail emitting showDetail");
            this.$emit("show-detail", data, header ? header : "Groups");
        },
        setGroup: function (id) {
            console.log("group-detail setGroup");
            this.group.parentId = id;

        },
        selectGroup: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.parent").dialog({
                    modal: true,
                    width: "70%"
                });

            });
        },
        showAddChild: function () {
            var self = this;
            this.isAddingChild = true;

            if (self._modal) {
                $(self._modal).show();
            } else {

                Vue.nextTick(function () {
                    self._modal = $(self.$el).find(".modal.children").dialog({
                        modal: true,
                        width: "70%"
                    });

                });
            }
        },
        removeChild: function (index) {
            this.group.children.splice(index, 1);
        },
        addChild: function (data) {
            this.group.children.push(data);
        }

    },
    computed: {
        parent: function () {
            return getGroupById(this.group.parentId);
        },
        groupColumns: function () {
            return groupColumns;
        },
        decisionsColumns: function () {
            return decisionColumns;
        },
        columns: function () {
            return this.group.type === GROUP_GROUP_TYPE ? groupColumns : entityColumns;
        },
        header: function () {
            return this.group.type === GROUP_GROUP_TYPE ? "Groups" : "Voters";
        },
        childrenDisplay: function () {
            return this.group.type === GROUP_GROUP_TYPE
                ? this.group.children.map(function (c) {
                    return getItemById(c, groups);
                })
                : this.group.type === ENTITY_GROUP_TYPE
                    ? this.group.children.map(function (c) {
                        return getItemById(c, voters);
                    })
                    : null;
        },
        decisionsDisplay: function () {

            return this.group.decisions ? this.group.decisions.map(function (c) {
                return getItemById(c, decisions);
            }) : [];
        },
        childSelectionList: function () {
            var self = this;
            var list = this.group.type === 0 ? self.voters : self.groups;
            return list.filter(function (x) {
                return self.group.children.findIndex(function (y) {
                    return y === x.id;
                }) === -1;
            });
        }
    },
    watch: {
        group: {
            handler: function (current, old) {
                this.$emit("change", current);
                console.log("group-detail watch emitting change", current);
            },
            deep: true
        },
        // value: function (current, old) {
        // this.group = new Group(current);
        // }
    },
    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.group = new Group(this.value);
    },
    template: $("#tmpGroupDetail").html()
});

Vue.component('voter-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            isSelectingGroup: false,
            voter: {}
        };
    },
    props: ["value", "editable"],
    methods: {
        save: function () {
            throw ("not implemented");
        },
        showDetail: function (id, header) {
            console.log("voter-detail emitting showDetail");
            this.$emit("show-detail", id, header);
        },
        setupParentSelect: function () {
            var self = this;
            this.isSelectingGroup = true;
            Vue.nextTick(function () {
                $(self.$el).find(".modal.group").dialog({
                    modal: true,
                    width: "70%"
                });

            });
        },
        selectParent: function (id) {
            this.voter.groupId = id;
        }
    },
    computed: {
        groupColumns: function () {
            return groupColumns;
        },
        groups: function () {
            return groups;
        },
        group: function () {
            return getGroupById(this.voter.groupId);
        },
    },
    watch: {
        voter: {
            handler: function (current, old) {
                this.$emit("change", current);
                console.log("voter-detail emitting change", current, this.index);
            },
            deep: true
        }
    },
    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.voter = new Voter(this.value);
    },
    template: $("#tmpEntityDetail").html()
});

var vue = new Vue({
    el: "#vue",
    data: function () {
        return {

            currentColumns: "",
            currentComponent: "",
            currentData: "",
            currentDecision: new Decision(),
            currentVoter: new Voter(),
            currentGroup: new Group(),
            currentHeader: "",
            decisions: [],
            voters: [],
            groups: [],
        };
    },
    methods: {

        create_onclick: function (event) {

            if (this.currentHeader === "Decisions") {
                this.createDecision();
            }
            if (this.currentHeader === "Groups") {
                this.createGroup();
            }
            if (this.currentHeader === "Voters") {
                this.createEntity();
            }
        },
        deleteDecision: function (id) {
            var self = this;
            console.log("deleteDecision", id);
            this.currentDecision = null;
            dataAccess.deleteDecision(id, function (result) {
                self.decisions.splice(self.decisions.findIndex(x => x.id === id), 1);
            }, function () {
                console.log("error during delete");
            });
        },
        persistDecision: function (data) {
            if (data.id === 0) {
                this.saveDecision(data);
            }
            else {
                this.updateDecision(data.id, data);
            }
        },
        persistGroup: function (data) {
            if (data.id === 0) {
                this.saveGroup(data);
            }
            else {
                this.updateGroup(data.id, data);
            }
        },
        persistVoter: function (data) {
            if (data.id === 0) {
                this.saveVoter(data);
            }
            else {
                this.updateVoter(data.id, data);
            }
        },
        saveDecision: function (data) {
            var self = this;
            console.log("saveDecision", data.id);
            this.currentDecision = data;
            dataAccess.postDecision(data, function (result) {
                self.decisions.push(new Decision(result));
                self.currentDecision = new Decision(result);
                console.log("result", result.id);
            }, function () {
                console.log("error during insert");
            });
        },
        updateDecision: function (id, data) {
            var self = this;
            console.log("updateDecision", data);
            this.currentDecision = data;
            dataAccess.putDecision(id, data, function (result) {
                self.decisions[self.decisions.findIndex(x => x.id === id)] = new Decision(result);
                self.currentDecision = new Decision(result);
            }, function () {
                console.log("error during update");
            });
        },
        deleteGroup: function (id) {
            var self = this;
            console.log("deleteGroup", id);
            this.currentGroup = null;

            dataAccess.deleteGroup(id, function (result) {
                self.groups.splice(self.groups.findIndex(x => x.id === id), 1);
            }, function () {
                console.log("error during delete");
            });
        },
        deleteVoter: function (id) {
            var self = this;
            console.log("deleteVoter", id);
            this.currentVoter = null;
            dataAccess.deleteGroup(id, function (result) {
                self.voters.splice(self.voters.findIndex(x => x.id === id), 1);
            }, function () {
                console.log("error during delete");
            });

        },
        saveGroup: function (data) {

            console.log("saveGroup", data);
            var self = this;
            this.currentGroup = data;
            self.groups[self.groups.findIndex(function (x) {
                return x.id === data.id;
            })] = data;

        },
        saveVoter: function (data) {
            console.log("saveEntity", data);
            this.currentVoter = data;
            self.voters[self.voters.findIndex(function (x) {
                return x.id === data.id;
            })] = result;

        },
        onchange: function (value) {
            this.data = value;
            console.log("this probably isn't working");
        },
        createDecision: function () {
            this.currentDecision = new Decision();
            //this.decisions.push(this.currentDecision);
            this.showDecisionDetail(null, false, false);
        },
        createGroup: function () {
            this.currentGroup = new Group();
            //this.groups.push(this.currentGroup);
            this.showGroupDetail(null, false, false);
        },
        createEntity: function () {
            this.currentVoter = new Voter();
            this.voters.push(this.currentVoter);
            this.showEntityDetail(null, false, false);
        },

        showDecisionList: function () {
            this.currentColumns = decisionColumns;
            this.currentData = this.decisions;
            this.currentHeader = "Decisions";
            this.currentComponent = "data-table";
        },
        showDetail: function (id, header) {
            if (header === "Groups") {
                this.showGroupDetail(id);
            }
            if (header === "Decisions") {
                this.showDecisionDetail(id);
            }
            if (header === "Voters") {
                this.showEntityDetail(id);
            }
        },
        showDecisionDetail: function (id, showVotes, showDiscussion) {
            //todo find out why this is here
            //this.currentDecision = null;

            if (id) {
                this.currentDecision = this.decisions.find(function (x) {
                    return x.id === id;
                });
            }

            this.showVotes = showVotes;
            this.showDiscussion = showDiscussion;

            this.currentColumns = "";
            // this.currentData = this.currentDecision;
            this.currentHeader = "";
            this.currentComponent = "decision-detail";
        },
        showGroupList: function () {
            this.currentColumns = groupColumns;
            this.currentData = this.groups;
            this.currentHeader = "Groups";
            this.currentComponent = "data-table";
        },
        showGroupDetail: function (id) {
            this.currentGroup = null;
            if (id) {
                this.currentGroup = groups.find(function (x) {
                    return x.id === id;
                });
            } else {
                this.currentGroup = new Group();
            }

            this.currentColumns = "";
            // this.currentData = this.currentGroup;
            this.currentHeader = "Group";
            this.currentComponent = "";
            this.currentComponent = "group-detail";
        },
        showEntityList: function () {
            this.currentColumns = entityColumns;
            this.currentData = this.voters;
            this.currentHeader = "Voters";
            this.currentComponent = "data-table";
        },
        showEntityDetail: function (id) {
            this.currentVoter = null;
            if (id) {
                this.currentVoter = voters.find(function (x) {
                    return x.id === id;
                });
            } else {
                this.currentVoter = new Voter();
            }

            this.currentColumns = "";
            this.currentData = this.currentVoter;
            this.currentHeader = "";
            this.currentComponent = "voter-detail";
        }
    },
    computed: {

        currentEvents: function () {
            return this.currentComponent === "decision-detail"
                ? {
                    "delete": this.deleteDecision,
                    "change": this.persistDecision,
                    "show-detail": this.showDetail,
                }
                : this.currentComponent === "group-detail"
                    ? {
                        "change": this.persistGroup,
                        "delete": this.deleteGroup,
                        "show-detail": this.showDetail,
                    }
                    : this.currentComponent === "voter-detail"
                        ? {
                            "change": this.persistVoter,
                            "delete": this.deleteVoter,
                            "show-detail": this.showDetail,
                        }
                        : this.currentComponent === "data-table"
                            ? {
                                "show-detail": this.showDetail
                            }
                            : {};

        },
        currentProperties: function () {
            return this.currentComponent === "decision-detail"
                ? {
                    "value": this.currentDecision,
                    "editable": "true"

                }
                : this.currentComponent === "group-detail"
                    ? {
                        "value": this.currentGroup,
                        "groups": this.groups,
                        "voters": this.voters,
                        "editable": "true"

                    }
                    : this.currentComponent === "voter-detail"
                        ? {
                            "value": this.currentVoter,
                            "editable": "true"

                        }
                        : this.currentComponent === "data-table"
                            ? {
                                "columns": this.currentColumns,
                                "data": this.currentData,
                                "header": this.currentHeader,
                                "select-mode": "",

                            }
                            : {};

        }
    }
    , mounted: function () {
        var self = this;
        dataAccess.getDecisions(function (data) {
            self.decisions = data.map(x => new Decision(x));
        },
            function () {
                console.log("failed to get decisions");
            });
        dataAccess.getGroups(function (data) {
            self.groups = data.map(x => new Group(x));
        },
            function () {
                console.log("failed to get groups");
            });
        dataAccess.getVoters(function (data) {
            self.voters = data.map(x => new Voter(x));
        },
            function () {
                console.log("failed to get voters");
            });
    }
});

function getGroupById(id) {
    try {
        return getItemById(id, groups);
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getItemById(id, collection) {
    var item = collection.find(function (x) {
        return x.id === id;
    });

    return item ? item : null;
}

function generateId() {
    return (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
}
