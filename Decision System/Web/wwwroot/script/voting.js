
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

//todo pass in the controller and the action and build the url
//not sure if this is better than passing the url from the caller
class RequestBuilder {
    #isCacheEnabled = false;
    // include, *same-origin, omit
    #credentials = "same-origin";
    // no-cors, *cors, same-origin
    #mode = "cors";
    // *default, no-cache, reload, force-cache, only-if-cached
    #cache = "default";
    // manual, *follow, error
    #redirect = 'follow';
    // no-referrer, *client
    #referrerPolicy = 'no-referrer';

    #headers = {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    };

    constructor(isCacheEnabled, credentials, mode, cache, redirect, refer, headers) {
        this.#isCacheEnabled = isCacheEnabled ? true : false;
        this.#credentials = credentials ? credentials : this.#credentials;
        this.#mode = mode ? mode : this.#mode;
        this.#cache = cache ? cache : this.#cache;
        this.#redirect = redirect ? redirect : this.#redirect;
        this.#referrerPolicy = refer ? refer : this.#referrerPolicy;
        this.#headers = headers ? headers : this.#headers;
    }

    async Get(url) {
        return await this.#send(url, "GET");
    }

    async Put(url, data) {
        return await this.#send(url, data, "PUT");
    }

    async Post(url, data) {
        return await this.#send(url, data, "POST");
    }

    async Delete(url) {
        return await this.#send(url, "DELETE");
    }

    #send = async function (url = '', data = {}, method) {
        // Default options are marked with *
        const response = await fetch(url, {
            // *GET, POST, PUT, DELETE, etc.
            method: method,
            mode: this.#mode,
            cache: this.#cache,
            credentials: this.#credentials,
            headers: this.#headers,
            redirect: this.#redirect,
            referrerPolicy: this.#referrerPolicy,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}

var dataAccess = {
    queryGroups: function (text) {
        return $.ajax({
            url: window.location.origin + "/Group/Find/" + text,
            type: "GET"
        });
    },
    getGroupsByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Group/User/" + userId,
            type: "GET"
        });
    },
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
    getDecisionsByGroupId: function (groupId) {
        return $.ajax({
            url: window.location.origin + "/Decision/Group/" + groupId,
            type: "GET"
        });
    },
    getDecisionsByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Decision/User/" + userId,
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
    postUser: function (user) {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "POST",
            data: JSON.stringify(new User(user)),
            contentType: "application/json"
        });
    },
    postVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/Voter",
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
    putUser: function (user) {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "PUT",
            data: JSON.stringify(new User(user)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putGroupVoter: function (groupId, voterId) {
        return $.ajax({
            url: window.location.origin + "/group/" + groupId + "/AddVoter/" + voterId,
            type: "PUT",
            datatype: "json",
            contentType: "application/json"
        });
    },
    putGroupGroup: function (groupId, childId) {
        return $.ajax({
            url: window.location.origin + "/group/" + groupId + "/AddGroup/" + childId,
            type: "PUT",
            datatype: "json",
            contentType: "application/json"
        });
    },
    putVoter: function (voter) {
        return $.ajax({
            url: window.location.origin + "/Voter",
            type: "PUT",
            data: JSON.stringify(new Voter(voter)),
            datatype: "json",
            contentType: "application/json"
        });
    },
    putDecision: function (decision) {
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
    deleteUser: function (id) {
        return $.ajax({
            url: window.location.origin + "/User/" + id,
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
            url: window.location.origin + "/Voter/" + id,
            type: "DELETE",
            datatype: "json",
            contentType: "application/json"
        });
    },
    getVotesByUserId: function (userId) {
        return $.ajax({
            url: window.location.origin + "/Vote/User/" + userId,
            type: "GET"
        });
    },
    getVotes: function () {
        return $.ajax({
            url: window.location.origin + "/Vote",
            type: "GET"
        });
    },
    getVote: function (id) {
        return $.ajax({
            url: window.location.origin + "/Vote/" + id,
            type: "GET"
        });
    },
    getUsers: function () {
        return $.ajax({
            url: window.location.origin + "/User",
            type: "GET"
        });
    },
    getUser: function (id) {
        return $.ajax({
            url: window.location.origin + "/User/" + id,
            type: "GET"
        });
    },
    getUserByName: function (name) {
        return $.ajax({
            url: window.location.origin + "/User/Find/" + name,
            type: "GET"
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
            this.statusId = data.statusId ? data.statusId : 0;
            this.groupId = data.groupId ? data.groupId : 0;
            this.status = data.statusId ? statuses.get(data.statusId) : statuses.get(0);
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
            this.statusId = 0;
            this.groupId = 0;
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
            this.groupId = data.groupId ? data.groupId : 0;
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
var PersistGroup = (function () {

    function constructor(data) {
        if (data) {
            this.decisions = data.decisions ? data.decisions : [];
            this.childGroups = data.childGroups ? data.childGroups : [];
            this.parentGroups = data.parentGroups ? data.parentGroups : [];
            this.voters = data.voters ? data.voters.map(x => x.id) : [];
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : 0;
            this.name = data.name ? data.name : "";
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE;
        } else {
            this.childGroups = [];
            this.parentGroups = [];
            this.voters = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = 0;
            this.name = "";
            this.type = ENTITY_GROUP_TYPE;
        }
    }

    return constructor;
})();

var Group = (function () {

    function constructor(data) {
        if (data) {
            this.decisions = data.decisions ? data.decisions : [];
            this.childGroups = data.childGroups ? data.childGroups : [];
            this.parentGroups = data.parentGroups ? data.parentGroups : [];
            this.voters = data.voters ? data.voters.map(x => new Voter(x)) : [];
            this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            this.description = data.description ? data.description : "";
            this.id = data.id ? data.id : 0;
            this.name = data.name ? data.name : "";
            this.type = data.type ? data.type : ENTITY_GROUP_TYPE;
        } else {
            this.decisions = [];
            this.childGroups = [];
            this.parentGroups = [];
            this.voters = [];
            this.creationDate = new Date().getTime();
            this.description = "";
            this.id = 0;
            this.name = "";
            this.type = ENTITY_GROUP_TYPE;
        }
    }

    return constructor;
})();

var User = (function () {

    function constructor(data) {
        var self = this;
        if (data) {
            self.id = data.id ? data.id : 0;
            self.firstName = data.firstName ? data.firstName : "";
            self.lastName = data.lastName ? data.lastName : "";
            self.middleName = data.middleName ? data.middleName : "";
            self.address = data.address ? data.address : "";
            self.city = data.city ? data.city : "";
            self.state = data.state ? data.state : "";
        }
        else {
            self.id = 0;
            self.firstName = "";
            self.lastName = "";
            self.middleName = "";
            self.address = "";
            self.city = "";
            self.state = "";
        }

        self.name = self.lastName + ", " + self.firstName + " " + self.middleName;
    }

    return constructor;
})();

var Voter = (function () {

    function constructor(data) {
        var self = this;
        if (data) {
            self.id = data.id ? data.id : 0;
            self.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
            self.groups = data.groups ? data.groups.map(x => new Group(x)) : [];
            self.user = data.user ? new User(data.user) : new User();
        } else {
            self.id = 0;
            self.creationDate = new Date().getTime();
            self.groups = [];
            self.user = new User();
        }
    }

    return constructor;
})();

var PersistVoter = (function () {

    function constructor(data) {
        var self = this;
        if (data) {
            self.id = data.id ? data.id : 0;
            self.creationDate = data.creationDate ? data.creationDate : new Date().getTime();

            if (!!data.user) {
                self.userId = data.user.id ? data.user.id : 0;
            }
            else if (!!data.userId) {
                self.userId = data.userId ? data.userId : 0;
            }
        } else {
            self.id = 0;
            self.creationDate = new Date().getTime();
            self.userId = 0;
        }
    }

    return constructor;
})();



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
    props: {
        showActions: { type: Boolean }
        , header: { type: String }
        , data: { type: Array }
        , query: { type: Function }
    },
    methods: {
        search_onchange: function (text) {
            console.log("data-table emitting search_onchange");
            this.$emit("search_onchange", text);
        },
        row_onclick: function (item) {
            console.log("data-table emitting row_onclick", item);
            this.$emit("row_onclick", item, this.header);
        },
        deleteItem: function (id) {
            console.log("data-table emitting deleteItem");
            this.$emit("delete_item", id);
        },
        //showVoterDetail: function (id) {
        //    console.log("data-table emitting showDetail", id);
        //    this.$emit("show-detail", id, "Voters");
        //},
        //showDecisionDetail: function (id) {
        //    console.log("data-table emitting showDetail");
        //    this.$emit("show-detail", id, "Decisions");
        //},
        //showGroupDetail: function (id) {
        //    console.log("data-table emitting showGroupDetail");
        //    this.$emit("show-detail", id, "Groups");
        //},
        select: function (id) {
            console.log("data-table emitting select", id);
            this.$emit("select", id);
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
            var returnMe = [];

            switch (this.header) {
                case "Voters":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Groups', value: 'groups' },
                        { text: 'Created', value: 'creationDate' }
                    ];
                    break;

                case "Decisions":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Status', value: 'statusId' },
                        { text: 'Created', value: 'creationDate' },
                        { text: 'Expires', value: 'expirationDate' },
                    ];
                    break;

                case "Groups":
                    returnMe = [
                        { text: 'Name', value: 'name' },
                        { text: 'Group', value: 'parentId' },
                        { text: 'Type', value: 'type' },
                        { text: 'Created', value: 'creationDate' },
                        { text: 'Attachments', value: 'attachments' }
                    ];
                    break;

                default:
                    returnMe = [];
                    break;

            }

            if (this.showActions) {
                returnMe.push({ text: 'Actions', value: 'action', sortable: false });
            }

            return returnMe;
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
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
    },
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
        showVoterDetail: function (voter) {
            console.log("decision-detail emitting showDetail");
            this.$emit("show-detail", voter, "Voter");
        },
        showDetail: function (data) {
            console.log("decision-detail emitting showDetail");
            this.$emit("show-detail", data, "Decision");
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
            console.log("decision-detail save_onclick emitting change", this.decision);
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
        value: function (current, old) {
            this.decision = new Decision(current);
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
            group: new Group()
        };
    },
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
        , voters: { type: Array }
        , groups: { type: Array }
    },
    methods: {
        search_onchange: function (text) {
            console.log("group-detail emitting search_onchange");
            this.$emit("search_onchange", text);
        },
        makeDecision_onclick: function () {
            var d = new Decision();
            d.groupId = this.group.id;

            this.$emit("decisions_loaded", [d]);
            this.showDecisionDetail(d);
        },
        showChildDetail: function (item) {
            console.log("group-detail emitting showChildDetail");
            this.$emit("show-detail", item, this.header);
        },
        showGroupDetail: function (group) {
            console.log("group-detail emitting showGroupDetail");
            this.$emit("show-detail", group, "Groups");
        },
        showDecisionDetail: function (decision) {
            console.log("group-detail emitting showDecisionDetail", decision);
            this.$emit("show-detail", decision, "Decisions");
        },
        setGroup: function (id) {
            console.log("group-detail setGroup");
            this.value.parentId = id;

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
            this.$emit("removeGroup", index);
            //this.group.groups.splice(index, 1);
        },
        addGroup: function (data) {
            this.$emit("addGroup", data);
            //this.group.groups.push(data);
        },
        removeVoter: function (index) {
            this.$emit("removeVoter", index);
            //this.group.voters.splice(index, 1);
        },
        addVoter: function (data) {
            this.$emit("addVoter", data);
            //this.group.voters.push(data);
        },
        childrenQuery: function () {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? dataAccess.getGroups
                : dataAccess.getVoters;
        },
        removeChild: function (index) {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? self.removeGroup(index)
                : self.removeVoter(index);
        },
        addChild: function (data) {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? self.addGroup(data)
                : self.addVoter(data);
            //this.group.voters.push(data);
        }
        , save_onclick: function () {
            this.$emit("change", this.group);
            console.log("group-detail save_onclick emitting change", this.group);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.group.id);
            console.log("group-detail delete_onclick emitting change", this.group);
        }

    },
    computed: {
        parentsDisplay: function () {
            return this.group.parentGroups.map(x => getItemById(x.id, this.groups));
        },
        header: function () {
            return this.value.type === GROUP_GROUP_TYPE ? "Groups" : "Voters";
        },
        groupsDisplay: function () {
            var self = this;
            return self.value.groups.map(function (c) {
                return getItemById(c, self.groups);
            });
        },
        votersDisplay: function () {
            var self = this;
            if (self.value.voters) {
                return self.value.voters;
                //    .map(function (c) {
                //    //todo maybe not store all the voters in one collection
                //    //and instead just use the ones sent back from the server
                //    return getItemById(c, self.voters);
                //});
            } else {
                return [];
            }
        },
        childrenDisplay: function () {
            var self = this;
            return self.value.type === GROUP_GROUP_TYPE
                ? self.groupsDisplay
                : self.votersDisplay;
        },
        decisionsDisplay: function () {
            return this.group.decisions;

            //return this.value.decisions ? this.value.decisions.map(function (c) {
            //    return getItemById(c, decisions);
            //}) : [];
        },
        childSelectionList: function () {
            var self = this;
            var list = self.value.type === 0 ? self.voters : self.groups;
            var exclusionList = self.value.type === 0 ? self.value.voters : self.value.groups;
            return list.filter(function (x) {
                return !exclusionList ||
                    (exclusionList &&
                        exclusionList.findIndex(function (y) {
                            return y.id === x.id;
                        }) === -1);
            });
        }
    },
    watch: {
        value: {
            handler: function (current, old) {
                this.group = new Group(current);
            },
            deep: true
        }
    },
    mounted: function () {
        let self = this;
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        self.group = new Group(this.value);

        dataAccess.getDecisionsByGroupId(self.group.id).then(function (result) {
            self.group.decisions = result.map(x => new Decision(x));
            self.$emit("decisions_loaded", result);
        });
    },
    template: "#tmpGroupDetail"
});

Vue.component('voter-detail', {
    model: {
        event: "change"
    },
    data: function () {
        return {
            isSelectingGroup: false,
            voter: new Voter()
            , isLoading: false
            , search: ""
            , timeout: null
            , user: new User()
        };
    },
    props: {
        value: { type: Object }
        , editable: { type: Boolean }
        , groups: { type: Array }
        , users: { type: Array }
    },
    methods: {
        findUser: function (text) {
            console.log("voter-detail emitting findUser");
            this.$emit("find-user", text);
            this.isLoading = true;
        },
        showDetail: function (voter, header) {
            console.log("voter-detail emitting showDetail");
            this.$emit("show-detail", voter, header);
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
            this.voter.groups.push(id);
        },
        removeParent: function (id) {
            this.voter.groups.splice(this.voter.groups.findIndex(x => x.id === id));
        }
        , save_onclick: function () {
            this.$emit("change", this.voter);
            console.log("group-detail save_onclick emitting change", this.voter);
        }
        , delete_onclick: function () {
            this.$emit("delete", this.voter);
            console.log("group-detail delete_onclick emitting delete", this.voter);
        }
        , user_onchange: function (user) {
            console.log("user_onchange", user);
            this.voter.user = user;
        }
    },
    computed: {
        groupsDisplay: function () {
            return this.voter.groups
                .map(x => getItemById(x.id, this.groups));
        },
        group: function () {

            //what to do here
            return getItemById(this.voter.groups, this.groups);
        },
        usersDisplay: function () {
            return this.users.map(x => x.lastName + ", " + x.firstName + " " + x.middleName);
        }
    },
    watch: {
        value: {
            handler: function (current, old) {
                //this.$emit("change", current);
                this.voter = new Voter(current);
                this.user = new User(current);
                //console.log("voter-detail emitting change", current, this.index);
            },
            deep: true
        }
        , users: {
            handler: function (current, old) {
                this.isLoading = false;
            },
            deep: false
        }
        , search: {
            handler: function (current, old) {
                let self = this;
                clearTimeout(this.timeout);

                this.timeout = setTimeout(function () {
                    if ((current != null) && (current.length > 2)) {
                        self.isLoading = true;
                        self.findUser(current);
                    }
                }, 1000);
            },
            deep: false
        }
    },
    mounted: function () {
        // for some reason we need this to establish reactivity,
        // without it, we don't get reactivity until an emit is triggered
        this.voter = new Voter(this.value);
        this.search = this.voter.user.name;
        this.user = this.users.find(x => x.id === this.voter.user.id);
        if (!this.user) {
            this.user = new User();
        }
    },
    template: $("#tmpVoterDetail").html()
});

var vue = new Vue({
    el: "#vue",
    vuetify: new Vuetify(),
    data: function () {
        return {

            currentComponent: "",
            currentData: "",
            currentDecision: new Decision(),
            currentVoter: new Voter(),
            currentGroup: new Group(),
            currentHeader: "",
            decisions: [],
            voters: [],
            groups: [],
            users: []
        };
    },
    methods: {
        union: function (set, cacheMe) {
            cacheMe.forEach(x => {
                if (!set.some(d => d.id === x.id)) {
                    set.push(x);
                }
            });
            return set;
        },
        cacheDecisions: function (decisions) {
            var self = this;

            self.decisions = self.union(self.decisions, decisions);
        },
        cacheGroups: function (groups) {
            var self = this;

            self.groups = self.union(self.groups, groups);
        },
        cacheUsers: function (users) {
            var self = this;

            self.users = self.union(self.users, users);
        },
        cacheVoters: function (voters) {
            var self = this;

            self.voters = self.union(self.voters, voters);
        },
        search_onchange: function (query) {
            if (this.currentHeader.indexOf("Decision") > -1) {
                this.queryDecisions(query);
            }
            else if (this.currentHeader.indexOf("Group") > -1) {
                this.queryGroups(query);
            }
            else /*if (this.currentHeader === "Voters")*/ {
                this.queryVoters(query);
            }
        },

        create_onclick: function (event) {
            if (this.currentHeader.indexOf("Decision") > -1) {
                this.createDecision();
            }
            else if (this.currentHeader.indexOf("Group") > -1) {
                this.createGroup();
            }
            else /*if (this.currentHeader === "Voters")*/ {
                this.createVoter();
            }
        },
        deleteDecision: function (id) {
            var self = this;
            console.log("deleteDecision", id);
            this.currentDecision = null;
            dataAccess.deleteDecision(id).then(function (result) {
                self.decisions.splice(self.decisions.findIndex(x => x.id === id), 1);
            })
                .catch(function () {
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
                    self.cacheDecisions([d]);
                    self.currentDecision = d;
                }).catch(function (err) {
                    console.log("error during insert");
                });
        },
        updateDecision: function (id, data) {
            var self = this;
            console.log("updateDecision", data);
            this.currentDecision = data;
            dataAccess.putDecision(id, data)
                .then(function (result) {
                    self.decisions[self.decisions.findIndex(x => x.id === result.id)] = new Decision(result);
                    self.currentDecision = new Decision(result);
                })
                .catch(function () {
                    console.log("error during update");
                });
        },
        deleteGroup: function (id) {
            var self = this;
            console.log("deleteGroup", id);
            this.currentGroup = new Group();

            dataAccess.deleteGroup(id)
                .then(function (result) {
                    self.groups.splice(self.groups.findIndex(x => x.id === id), 1);
                })
                .catch(function () {
                    console.log("error during delete");
                });
        },
        deleteVoter: function (voter) {
            var self = this;
            console.log("deleteVoter", voter);
            this.currentVoter = null;
            dataAccess.deleteVoter(voter.id)
                .then(function (result) {
                    self.voters.splice(self.voters.findIndex(x => x.id === voter.id), 1);
                })
                .catch(function () {
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
                    self.cacheGroup(g);
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

            dataAccess.postVoter(new PersistVoter(data))
                .then(function (result) {
                    var v = new Voter(result);
                    self.cacheVoter(v);
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
        queryUsers: function (text) {
            console.log("queryUsers", text)
            var self = this;

            dataAccess.getUserByName(text)
                .then(function (result) {
                    self.cacheUsers(result.map(x => new User(x)));
                });
        },
        queryGroups: function (text) {
            let self = this;
            console.log("queryGroups", text);
            dataAccess.queryGroups(text)
                .then(function (result) {
                    self.cacheGroups(result.map(x => new Group(x)));
                });
        },
        createVoter: function () {
            //this.currentVoter = new Voter();
            //this.voters.push(this.currentVoter);
            this.showVoterDetail(null, false, false);
        },

        showDecisionList: function () {
            this.currentData = this.decisions;
            this.currentHeader = "Decisions";
            this.currentComponent = "data-table";
        },
        showDetail: function (item, header) {
            if (header.indexOf("Group") > -1) {
                this.showGroupDetail(item);
            }
            else if (header.indexOf("Decision") > -1) {
                this.showDecisionDetail(item);
            }
            else /*if (header === "Voters")*/ {
                this.showVoterDetail(item);
            }
        },
        showDecisionDetail: function (item, showVotes, showDiscussion) {
            if (item && item.id) {
                this.currentDecision = this.decisions.find(function (x) {
                    return x.id === item.id;
                });
            }
            else {
                this.currentDecision = item;
            }

            this.showVotes = showVotes;
            this.showDiscussion = showDiscussion;

            // this.currentData = this.currentDecision;
            this.currentHeader = "Decision";
            this.currentComponent = "decision-detail";
        },
        showGroupList: function () {
            this.currentData = this.groups;
            this.currentHeader = "Groups";
            this.currentComponent = "data-table";
        },
        showGroupDetail: function (item) {
            this.currentGroup = null;
            if (item && item.id) {
                this.currentGroup =
                    this.groups.find(function (x) {
                        return x.id === item.id;
                    });
            }
            else {
                this.currentGroup = item;
            }

            // this.currentData = this.currentGroup;
            this.currentHeader = "Group";
            this.currentComponent = "";
            this.currentComponent = "group-detail";
        },
        showVoterList: function () {
            this.currentData = this.voters;
            this.currentHeader = "Voters";
            this.currentComponent = "data-table";
        },
        showVoterDetail: function (voter) {

            if ((voter != null) && (voter.id)) {
                this.currentVoter =
                    this.voters.find(function (x) {
                        return x.id === voter.id;
                    });
            } else {
                this.currentVoter = new Voter(voter);
            }

            //this.currentData = this.currentVoter;
            this.currentHeader = "Voters";
            this.currentComponent = "";
            this.currentComponent = "voter-detail";
        },
        removeGroupFromGroup: function (index) {
            this.currentGroup.groups.splice(index, 1);
        },
        addGroupToGroup: function (id) {
            if (this.currentGroup.groups.findIndex(x => x.id === id) === -1) {
                this.groups[this.groups.findIndex(x => x.id === id)].groups.push(this.currentGroup.id);
                this.currentGroup.groups.push(id);
                dataAccess.putGroupGroup(this.currentGroup.id, id);
            }
            else {
                //tell the user they can't add the same thing twice
            }
        },
        removeVoterFromGroup: function (index) {
            this.currentGroup.voter.splice(index, 1);
        },
        addVoterToGroup: function (item) {
            if (this.currentGroup.voters.findIndex(x => x.id === item.id) === -1) {
                this.voters[this.voters.findIndex(x => x.id === item.id)].groups.push(this.currentGroup.id);
                this.currentGroup.voters.push(item);
                dataAccess.putGroupVoter(this.currentGroup.id, item.id);
            }
            else {
                //tell the user they can't add the same thing twice
            }
        },
        rowSelect: function (id) {
            showDetail(id, header);
        }
    },
    computed: {

        currentEvents: function () {
            switch (this.currentComponent) {
                case "decision-detail":
                    return {
                        "delete": this.deleteDecision,
                        "change": this.persistDecision,
                        "show-detail": this.showDetail,
                    };
                case "group-detail":
                    return {
                        "voters": this.voters,
                        "groups": this.groups,
                        "change": this.persistGroup,
                        "search_onchange": this.queryGroups,
                        "delete": this.deleteGroup,
                        "show-detail": this.showDetail,
                        "removeGroup": this.removeGroupFromGroup,
                        "addGroup": this.addGroupToGroup,
                        "removeVoter": this.removeVoterFromGroup,
                        "addVoter": this.addVoterToGroup,
                        "decisions_loaded": this.cacheDecisions
                    };
                case "voter-detail":
                    return {
                        "change": this.persistVoter,
                        "delete": this.deleteVoter,
                        "show-detail": this.showDetail,
                        "search_onchange": this.queryUsers,
                        "find-user": this.queryUsers
                    };
                case "data-table":
                    return {
                        "row_onclick": this.showDetail,
                        "search_onchange": this.search_onchange
                    };
                default: return {};
            }
        },
        currentProperties: function () {
            switch (this.currentComponent) {
                case "decision-detail":
                    return {
                        "value": this.currentDecision,
                        "editable": true
                    };
                case "group-detail":
                    return {
                        "value": this.currentGroup,
                        "groups": this.groups,
                        "voters": this.voters,
                        "editable": true
                    };
                case "voter-detail":
                    return {
                        "value": this.currentVoter,
                        "groups": this.groups,
                        "users": this.users,
                        "editable": true
                    };
                case "data-table":
                    return {
                        "data": this.currentData,
                        "header": this.currentHeader
                    };
                default: return {};
            }
        }
    }
    , watch: {

        decisions: function (current, old) {
            if (this.currentHeader.indexOf("Decision") > -1) {
                this.currentData = current;
            }
        },
        voters: function (current, old) {
            if (this.currentHeader === "Voters") {
                this.currentData = current;
            }
        },
        groups: function (current, old) {
            if (this.currentHeader.indexOf("Group") > -1) {
                this.currentData = current;
            }
        }
    }
    , mounted: function () {
        var self = this;
        dataAccess.getDecisionsByUserId(1)
            .then(function (data) {
                self.decisions = data.map(x => new Decision(x));
            })
            .catch(function (err) {
                console.log("failed to get decisions");
            });

        dataAccess.getGroupsByUserId(1)
            .then(function (data) {
                self.groups = data.map(x => new Group(x));
            })
            .catch(function (err) {
                console.log("failed to get groups");
            });

        dataAccess.getVoters()
            .then(function (data) {
                self.voters = data.map(x => new Voter(x));
            })
            .catch(function (err) {
                console.log("failed to get voters");
            });

        dataAccess.getUsers()
            .then(function (data) {
                self.users = data.map(x => new User(x));
            })
            .catch(function (err) {
                console.log("failed to get users");
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
