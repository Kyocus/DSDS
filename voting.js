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
		success(testGroups);
		// $.ajax({
		// url: window.location.origin + "/groups",
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	},
	getGroup: function (id, success, failure) {
		success(testGroups.filter(function (x) {
				return x.id === id;
			}));
		// $.ajax({
		// url: window.location.origin + "/group/" + id,
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	},
	getDecisions: function (success, failure) {
		success(testDecisions);
		// $.ajax({
		// url: window.location.origin + "/decisions",
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	},
	getDecision: function (id, success, failure) {
		success(testDecisions.filter(function (x) {
				return x.id === id;
			}));
		// $.ajax({
		// url: window.location.origin + "/decision/" + id,
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	},
	getEntities: function (success, failure) {
		success(testEntities);
		// $.ajax({
		// url: window.location.origin + "/entities",
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	},
	getEntity: function (id, success, failure) {
		success(testEntities.filter(function (x) {
				return x.id === id;
			}));
		// $.ajax({
		// url: window.location.origin + "/entity/" + id,
		// type: "GET",
		// success: function (data) {
		// success(data);
		// },
		// failure: function (err) {
		// failure(err);
		// }
		// });
	}
};

var Decision = (function () {

	function constructor(data) {

		if (data) {
			this.attachments = data.attachments;
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.expirationDate = data.expirationDate;
			this.href = data.href;
			this.name = data.name;
			this.group = data.group;
			this.status = data.status;
			this.statusDate = data.statusDate;
		} else {
			this.attachments = null;
			this.creationDate = null;
			this.description = "";
			this.expirationDate = null;
			this.href = "";
			this.name = "";
			this.group = null;
			this.status = null;
			this.statusDate = null;
		}
	}

	return constructor;
})();

// this can be a group of Entities or a group of Groups
var Group = (function () {

	function constructor(data) {

		if (data) {
			// Entity or Group
			this.children = data.children;
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.href = data.href;
			this.name = data.name;
			// Group
			this.parent = data.parent;
		} else {
			this.children = [];
			this.creationDate = null;
			this.description = "";
			this.href = "";
			this.name = "";
			this.parent = null;
		}
	}

	return constructor;
})();

var Entity = (function () {

	function constructor(data) {

		if (data) {
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.href = data.href;
			this.name = data.name;
			// Group
			this.parent = data.parent;
		} else {
			this.creationDate = null;
			this.description = "";
			this.href = "";
			this.name = "";
			this.parent = null;
		}
	}

	return constructor;
})();

var testDecisions = (function () {

	var returnMe = [];

	for (let i = 0; i < Math.random() * 50; i++) {

		returnMe.push(getTestDecision());
	}

	return returnMe;

	function getTestDecision() {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		return {
			attachments: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "description",
			expirationDate: new Date(),
			href: id,
			name: "decision " + id,
			group: Math.floor(Math.random() * 10000),
			status: Math.floor(Math.random() * 5),
			statusDate: new Date(Math.floor(Math.random() * 10000000000)),
			entities: []
		};
	}

})();

var testEntities = (function () {

	var returnMe = [];

	for (let i = 0; i < Math.random() * 50; i++) {

		returnMe.push(getTestEntity());
	}

	return returnMe;

	function getTestEntity() {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		return {
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "description",
			href: id,
			name: "entity " + id,
			parent: null
		};
	}

})();

var testGroups = (function () {

	var returnMe = [];

	for (let i = 0; i < Math.random() * 50; i++) {

		returnMe.push(getTestGroup());
	}

	return returnMe;

	function getTestGroup() {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		var id2 = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		return {
			attachments: [],
			children: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "group desc",
			href: id,
			name: "group " + id,
			parent: {
				id: id2,
				name: "group " + id2,
				href: id2
			}

		};
	}
})();

var decisionsColumns = [{
		data: "name",
		className: "name",
		render: function (value, renderType, row) {
			return "<a href=\"" + row.href + "\">" + value + "</a>";
		},
		title: "Name"
	}, {
		data: "status",
		className: "status",
		render: function (value, renderType, row) {
			return statuses.get(value);
		},
		title: "Status"
	}, {
		data: "group",
		className: "group",
		render: $.fn.dataTable.render.text(),
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

var groupsColumns = [{
		data: "name",
		className: "name",
		render: function (value, renderType, row) {
			return "<a href=\"" + row.href + "\">" + value + "</a>";
		},
		title: "Name"
	}, {
		data: "parent",
		className: "parent",
		render: function (value, renderType, row) {
			console.log(value);
			return "<a href=\"" + value.href + "\">" + value.name + "</a>";
		},
		title: "Parent"
	}, {
		data: "children",
		className: "children",
		render: function (value, renderType, row) {
			return value.length + " " + row.children ? "Groups" : "Entities";
		},
		title: "Children"
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

var entitiesColumns = [{
		data: "name",
		className: "name",
		render: function (value, renderType, row) {
			return "<a href=\"" + row.href + "\">" + value + "</a>";
		},
		title: "Name"
	}, {
		data: "parent",
		className: "parent",
		render: function (value, renderType, row) {
			return "<a href=\"" + row.href + "\">" + value + "</a>";
		},
		title: "Parent"
	}, {
		data: "creationDate",
		className: "created",
		render: function (value, renderType, row) {
			return new Date(value).toLocaleString("en-us", dateTimeOptions);
		},
		title: "Created"
	}

];

var groupsKey = new Date().getTime() + Math.floor(Math.random() * 999).toString();
var decisionsKey = new Date().getTime() + Math.floor(Math.random() * 999).toString();
var entitiesKey = new Date().getTime() + Math.floor(Math.random() * 999).toString();

(function () {

	if (!window.localStorage.getItem(groupsKey)) {
		return dataAccess.getGroups(function (data) {
			window.localStorage.setItem(groupsKey, data);
		}, function (err) {
			console.log("failure", err);
		});
	}
	if (!window.localStorage.getItem(decisionsKey)) {
		return dataAccess.getDecisions(function (data) {
			window.localStorage.setItem(decisionsKey, data);
		}, function (err) {
			console.log("failure", err);
		});
	}
	if (!window.localStorage.getItem(entitiesKey)) {
		return dataAccess.getEntities(function (data) {
			window.localStorage.setItem(entitiesKey, data);
		}, function (err) {
			console.log("failure", err);
		});
	}
})();

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
	props: ["columns", "data", "header", "createHandler"],
	methods: {

		setupDataTable: function () {

			var selector = ".data-table";

			if (this.dt) {
				this.dt.destroy(false);
				$(selector).empty();
				// $(selector).html(this.$options.template);
			}
			this.dt = $(this.$el).find(selector).DataTable({
					data: this.data,
					columns: this.columns
				});
		}

	},
	computed: {},
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
			decisionsColumns: decisionsColumns,
			groupsColumns: groupsColumns,
			data: {}
		};
	},
	props: ["decision", "editable"],
	methods: {
		save: function () {
			throw ("not implemented");
		}
	},
	computed: {
		groups: function () {
			window.localStorage.getItem(groupsKey);
		}

	},
	watch: {
		data: {
			handler: function (current, old) {
				this.$emit("change", current);
				//console.log("travel-entry watch emitting change", current, this.index);
			},
			deep: true
		}
	},
	mounted: function () {
		// for some reason we need this to establish reactivity,
		// without it, we don't get reactivity until an emit is triggered
		this.data = new Decision(this.decision);
	},
	template: $("#tmpDecisionDetail").html()
});

Vue.component('group-detail', {
	model: {
		event: "change"
	},
	data: function () {
		return {
			data: {}
		};
	},
	props: ["group", "editable"],
	methods: {
		save: function () {
			throw ("not implemented");
		}

	},
	computed: {
		groups: function () {
			window.localStorage.getItem(groupsKey);
		}
	},
	watch: {
		data: {
			handler: function (current, old) {
				this.$emit("change", current);
				//console.log("travel-entry watch emitting change", current, this.index);
			},
			deep: true
		}
	},
	mounted: function () {
		// for some reason we need this to establish reactivity,
		// without it, we don't get reactivity until an emit is triggered
		this.data = new Group(this.group);
	},
	template: $("#tmpGroupDetail").html()
});

Vue.component('entity-detail', {
	model: {
		event: "change"
	},
	data: function () {
		return {
			data: {}
		};
	},
	props: ["entity", "editable"],
	methods: {
		save: function () {
			throw ("not implemented");
		}

	},
	computed: {
		groups: function () {
			window.localStorage.getItem(groupsKey);
		}
	},
	watch: {
		data: {
			handler: function (current, old) {
				this.$emit("change", current);
				//console.log("travel-entry watch emitting change", current, this.index);
			},
			deep: true
		}
	},
	mounted: function () {
		// for some reason we need this to establish reactivity,
		// without it, we don't get reactivity until an emit is triggered
		this.data = new Entity(this.entity);
	},
	template: $("#tmpEntityDetail").html()
});

var vue = new Vue({
		el: "#vue",
		data: function () {
			return {
				currentDecision: new Decision(),
				decisions: testDecisions,
				decisionsColumns: decisionsColumns,
				isDecisionListDisplayed: false,
				isDecisionDetailDisplayed: false,
				currentGroup: new Group(),
				groups: testGroups,
				groupsColumns: groupsColumns,
				isGroupListDisplayed: false,
				isGroupDetailDisplayed: false,
				currentEntity: new Entity(),
				entities: testEntities,
				entitiesColumns: entitiesColumns,
				isEntityListDisplayed: false,
				isEntityDetailDisplayed: false,
			};
		},
		methods: {
			showDecisionList: function () {
				this.isDecisionListDisplayed = true;
				this.isDecisionDetailDisplayed = false;
				this.isGroupListDisplayed = false;
				this.isGroupDetailDisplayed = false;
				this.isEntityListDisplayed = false;
				this.isEntityDetailDisplayed = false;
			},
			showDecisionDetail: function () {
				this.isDecisionListDisplayed = false;
				this.isDecisionDetailDisplayed = true;
				this.isGroupListDisplayed = false;
				this.isGroupDetailDisplayed = false;
				this.isEntityListDisplayed = false;
				this.isEntityDetailDisplayed = false;
			},
			showGroupList: function () {
				this.isDecisionListDisplayed = false;
				this.isDecisionDetailDisplayed = false;
				this.isGroupListDisplayed = true;
				this.isGroupDetailDisplayed = false;
				this.isEntityListDisplayed = false;
				this.isEntityDetailDisplayed = false;
			},
			showGroupDetail: function () {
				this.isDecisionListDisplayed = false;
				this.isDecisionDetailDisplayed = false;
				this.isGroupListDisplayed = false;
				this.isGroupDetailDisplayed = true;
				this.isEntityListDisplayed = false;
				this.isEntityDetailDisplayed = false;
			},
			showEntityList: function () {
				this.isDecisionListDisplayed = false;
				this.isDecisionDetailDisplayed = false;
				this.isGroupListDisplayed = false;
				this.isGroupDetailDisplayed = false;
				this.isEntityListDisplayed = true;
				this.isEntityDetailDisplayed = false;
			},
			showEntityDetail: function () {
				this.isDecisionListDisplayed = false;
				this.isDecisionDetailDisplayed = false;
				this.isGroupListDisplayed = false;
				this.isGroupDetailDisplayed = false;
				this.isEntityListDisplayed = false;
				this.isEntityDetailDisplayed = true;
			}
		}
	});
