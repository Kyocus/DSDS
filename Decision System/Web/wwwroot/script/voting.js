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
    getGroups: function () {
        //success(testGroups);
        return $.ajax({
            url: window.location.origin + "/Group",
            type: "GET"
        });
    },
    getGroup: function (id) {
        //success(testGroups.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/group/" + id,
            type: "GET"
        });
    },
    getDecisions: function () {
        //success(testDecisions);
        return $.ajax({
            url: window.location.origin + "/Decision",
            type: "GET"
        });
    },
    getDecision: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "GET"
        });
    },
    postVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/voter",
            type: "POST",
            data: JSON.stringify(new PersistVoter(voter)),
            contentType: "application/json"
        });
    },
    postGroup: function (group) {
        return $.ajax({
            url: window.location.origin + "/group",
            type: "POST",
            data: JSON.stringify(new PersistGroup(group)),
            contentType: "application/json"
        });
    },
    postDecision: function (decision) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "POST",
            data: JSON.stringify(new PersistDecision(decision)),
            contentType: "application/json"
        });
    },
    putGroup: function (group) {
        return $.ajax({
            url: window.location.origin + "/group",
            type: "PUT",
            data: JSON.stringify(new PersistGroup(group)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/voter",
            type: "PUT",
            data: JSON.stringify(new PersistVoter(voter)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putDecision: function (decision) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision",
            type: "PUT",
            data: JSON.stringify(new PersistDecision(decision)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteDecision: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/decision/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteGroup: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/group/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    deleteVoter: function (id) {
        //success(testDecisions.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/voter/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    getVoters: function () {
        //success(testEntities);
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "GET"
        });
    },
    getVoter: function (id) {
        //success(testEntities.filter(function (x) {
        //    return x.id === id;
        //}));
        return $.ajax({
            url: window.location.origin + "/Voter/" + id,
            type: "GET"
        });
    }
};

var Vote = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.voterId = data.voterId ? data.voterId : null;
        this.selectedIndex = data.selectedIndex ? data.selectedIndex : 0;
        this.time = data.time ? data.time : 0;
    }

    return constructor;

})();

var Comment = (function () {

    function constructor(data) {
        this.id = data.id ? data.id : generateId();
        this.voterId = data.voterId ? data.voterId : null;
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
            this.decisions = data.decisions ? data.decisions : [];
            this.groups = data.groups ? data.groups : [];
            this.voters = data.voters ? data.voters : [];
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : 0;
            this.name = data.name ? data.name : "";
            this.parentId = data.parentId ? data.parentId : null;
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE;
        } else {
            this.groups = [];
            this.voters = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = 0;
            this.name = "";
            this.parentId = null;
            this.type = ENTITY_GROUP_TYPE;
        }
    }

    return constructor;
})();

var PersistGroup = (function () {

    function constructor(data) {

        if (data) {
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : 0;
            this.name = data.name ? data.name : "";
            this.parentId = data.parentId ? data.parentId : null; // Group
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE; // group or voter
        } else {
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

var PersistVoter = (function () {

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
            this.description = "";
            this.name = "";
            this.groupId = null;
        }
    }

    return constructor;
})();

var decisionColumns = [{
    value: "name",
    text: "Name"
}, {
    value: "statusId",
    text: "Status"
}, {
    value: "groupId",
    text: "Group"
}, {
    value: "creationDate",
    text: "Created"
}, {
    value: "expirationDate",
    text: "Expires"
}, {
    value: "attachments",
    text: "Attachments"
}

];

var groupColumns = [{
    value: "name",
    text: "Name"
}, {
    value: "parentId",
    text: "Parent"
}, {
    value: "type",
    text: "Type"
}, {
    value: "creationDate",
    text: "Created"
}, {
    data: "attachments",
    text: "Attachments"
}
];

var voterColumns = [{
    value: "name",
    //className: "name linked",
    //render: function (value, renderType, row) {
    //    return "<div @click=\"showDetail\">" + value + "</div>"
    //},
    text: "Name"
}, {
    data: "groupId",
    //className: "group linked",
    //render: function (value, renderType, row) {
    //    if (parent) {
    //        return "<div @click=\"showGroupDetail\">" + value + "</div>"
    //    } else {
    //        return "<div>no parent selected</div>";
    //    }
    //},
    text: "Group"
}, {
    data: "creationDate",
    //className: "created",
    //render: function (value, renderType, row) {
    //    return new Date(value).toLocaleString("en-us", dateTimeOptions);
    //},
    text: "Created"
}

];

var votesColumns = [{
    data: "name",
    //className: "name linked",
    //render: function (value, renderType, row) {
    //    return "<div @click=\"showDetail(row.id, 'Voters')\">" + value + "</div>"
    //},
    text: "Name"
}, {
    data: "choice",
    //className: "choice",
    //render: function (value, renderType, row) {
    //    return value;
    //},
    text: "Group"
}, {
    data: "time",
    //className: "created",
    //render: function (value, renderType, row) {
    //    return new Date(value).toLocaleString("en-us", dateTimeOptions);
    //},
    text: "Created"
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
        showVoterList: function () {
            this.$emit("showvoterlist");
        }

    },
    template: $("#tmpNavBar").html()
});

Vue.component('data-table', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            search: ""

            , slots: [
                'body',
                'body.append',
                'body.prepend',
                'footer',
                'header.data-table-select',
                'header',
                'progress',
                'item.data-table-select',
                'item.<name>',
                'no-data',
                'no-results',
                'top',
            ]
        };
    },
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
        dateDisplay: function (value) {
            return new Date(value).toLocaleString("en-us", dateTimeOptions);
        }
    },
    computed: {
        statusDisplay: function () {
            return statuses.get(value);
        }
        , headers: function () {
            return this.header === "Voters"
                ? [
                    { text: 'Name', value: 'name' },
                    { text: 'Group', value: 'groupId' },
                    { text: 'Created', value: 'creationDate' }
                ]
                : this.header === "Decisions"
                    ? [
                        { text: 'Name', value: 'name' },
                        { text: 'Status', value: 'statusId' },
                        { text: 'Group', value: 'groupId' },
                        { text: 'Created', value: 'creationDate' },
                        { text: 'Expires', value: 'expirationDate' },
                        { text: 'Attachments', value: 'attachments' }
                    ]
                    : this.header === "Groups"
                        ? [
                            { text: 'Name', value: 'name' },
                            { text: 'Group', value: 'parentId' },
                            { text: 'Type', value: 'type' },
                            { text: 'Created', value: 'creationDate' },
                            { text: 'Attachments', value: 'attachments' }
                        ]
                        : [];
        }

    },
    watch: {
    },
    mounted: function () {
    },
    template: $("#tmpDataTable").html()
});

Vue.component('decision-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            search: "",
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
        group: function () {
            return getItemById(this.value.groupId, this.groups);
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
                        name: getItemById(x.voterId, voters)
                        , id: x.voterId
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
        removeGroup: function (index) {
            this.group.groups.splice(index, 1);
        },
        addGroup: function (data) {
            this.group.groups.push(data);
        },
        removeVoter: function (index) {
            this.group.voters.splice(index, 1);
        },
        addVoter: function (data) {
            this.group.voters.push(data);
        },
        removeChild: function (index) {
            return self.group.type === GROUP_GROUP_TYPE
                ? self.removeGroup(index)
                : self.removeVoter(index);
        },
        addChild: function (data) {
            return self.group.type === GROUP_GROUP_TYPE
                ? self.addGroup(data)
                : self.addVoter(data);
            //this.group.voters.push(data);
        }
        , save_onclick: function () {
            this.$emit("change", this.group);
            console.log("group-detail save_onclick emitting change", this.group.id);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.group);
            console.log("group-detail delete_onclick emitting change", this.group);
        }

    },
    computed: {
        parent: function () {
            return getItemById(this.group.parentId, this.groups);
        },
        groupColumns: function () {
            return groupColumns;
        },
        decisionsColumns: function () {
            return decisionColumns;
        },
        columns: function () {
            return this.group.type === GROUP_GROUP_TYPE ? groupColumns : voterColumns;
        },
        header: function () {
            return this.group.type === GROUP_GROUP_TYPE ? "Groups" : "Voters";
        },
        groupsDisplay: function () {
            var self = this;
            return self.group.groups.map(function (c) {
                return getItemById(c, self.groups);
            });
        },
        votersDisplay: function () {
            var self = this;
            if (self.group.voters) {
                return self.group.voters.map(function (c) {
                    return getItemById(c, self.voters);
                });
            } else {
                return [];
            }
        },
        childrenDisplay: function () {
            var self = this;
            return self.group.type === GROUP_GROUP_TYPE
                ? self.groupsDisplay
                : self.votersDisplay;
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
                if (self.group.children) {
                    return self.group.children.findIndex(function (y) {
                        return y === x.id;
                    }) === -1;
                } else {
                    return true;
                }
            });
        }
    },
    watch: {
        //group: {
        //    handler: function (current, old) {
        //        this.$emit("change", current);
        //        console.log("group-detail watch emitting change", current);
        //    },
        //    deep: true
        //},
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
    props: ["value", "editable", "groups"],
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
        , save_onclick: function () {
            this.$emit("change", this.voter);
            console.log("group-detail save_onclick emitting change", this.voter.id);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.voter);
            console.log("group-detail delete_onclick emitting change", this.voter);
        }
    },
    computed: {
        groupColumns: function () {
            return groupColumns;
        },
        group: function () {
            return getItemById(this.voter.groupId, this.groups);
        },
    },
    watch: {
        //voter: {
        //    handler: function (current, old) {
        //        this.$emit("change", current);
        //        console.log("voter-detail emitting change", current, this.index);
        //    },
        //    deep: true
        //}
    },
    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.voter = new Voter(this.value);
    },
    template: $("#tmpVoterDetail").html()
});

var vue = new Vue({
    el: "#vue",
    vuetify: new Vuetify(),
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
                this.createVoter();
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
                this.updateDecision(data);
            }
        },
        persistGroup: function (data) {
            if (data.id === 0) {
                this.saveGroup(data);
            }
            else {
                this.updateGroup(data);
            }
        },
        persistVoter: function (data) {
            if (data.id === 0) {
                this.saveVoter(data);
            }
            else {
                this.updateVoter(data);
            }
        },
        saveDecision: function (data) {
            var self = this;
            console.log("saveDecision", data.id);
            this.currentDecision = data;
            dataAccess.postDecision(data)
                .then(function (result) {
                    var d = new Decision(result);
                    self.decisions.push(d);
                    self.currentDecision = d;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        updateDecision: function (id, data) {
            var self = this;
            console.log("updateDecision", data);
            this.currentDecision = data;
            dataAccess.putDecision(id, data, function (result) {
                self.decisions[self.decisions.findIndex(x => x.id === result.id)] = new Decision(result);
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
            dataAccess.deleteVoter(id, function (result) {
                self.voters.splice(self.voters.findIndex(x => x.id === id), 1);
            }, function () {
                console.log("error during delete");
            });

        },
        saveGroup: function (data) {

            console.log("saveGroup", data);
            var self = this;
            this.currentGroup = data;

            dataAccess.postGroup(data)
                .then(function (result) {
                    var g = new Group(result);
                    self.groups.push(g);
                    self.currentGroup = g;
                    //console.log("result", g.id);
                }).catch(function (err) {
                    console.log("error during insert");
                });

        },
        updateGroup: function (data) {
            console.log("updateGroup", data);
            var self = this;
            this.currentGroup = data;

            dataAccess.putGroup(data)
                .then(function (result) {
                    self.currentGroup = new Group(result);
                    self.groups[self.groups.findIndex(x => x.id === result.id)] = self.currentGroup;
                    //getItemById(result.id, self.groups) = result;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        saveVoter: function (data) {
            console.log("saveVoter", data);
            var self = this;
            this.currentVoter = data;

            dataAccess.postVoter(data)
                .then(function (result) {
                    var v = new Voter(result);
                    self.voters.push(v);
                    self.currentVoter = v;
                    //console.log("result", v.id);
                }).catch(function (err) {
                    console.log("error during insert");
                });

        },
        updateVoter: function (data) {
            console.log("updateVoter", data);
            var self = this;
            this.currentVoter = data;

            dataAccess.putVoter(data)
                .then(function (result) {
                    self.currentVoter = new Voter(result);
                    self.voters[self.voters.findIndex(x => x.id === result.id)] = self.currentVoter;
                    //getItemById(result.id, self.voters) = result;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        onchange: function (value) {
            this.data = value;
            console.log("this probably isn't working");
        },
        createDecision: function () {
            //this.currentDecision = new Decision();
            //this.decisions.push(this.currentDecision);
            this.showDecisionDetail(null, false, false);
        },
        createGroup: function () {
            //this.currentGroup = new Group();
            //this.groups.push(this.currentGroup);
            this.showGroupDetail(null, false, false);
        },
        createVoter: function () {
            //this.currentVoter = new Voter();
            //this.voters.push(this.currentVoter);
            this.showVoterDetail(null, false, false);
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
                this.showVoterDetail(id);
            }
        },
        showDecisionDetail: function (id, showVotes, showDiscussion) {
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
                this.currentGroup = this.groups.find(function (x) {
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
        showVoterList: function () {
            this.currentColumns = voterColumns;
            this.currentData = this.voters;
            this.currentHeader = "Voters";
            this.currentComponent = "data-table";
        },
        showVoterDetail: function (id) {
            if (id) {
                this.currentVoter = this.voters.find(function (x) {
                    return x.id === id;
                });
            } else {
                this.currentVoter = new Voter();
            }

            this.currentColumns = "";
            //this.currentData = this.currentVoter;
            this.currentHeader = "Voters";
            this.currentComponent = "";
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
                            "groups": this.groups,
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

function getItemById(id, collection) {
    var item = collection.find(function (x) {
        return x.id === id;
    });

    return item ? item : null;
}

function generateId() {
    return (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
}
