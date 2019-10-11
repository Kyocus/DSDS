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
			this.id = data.id;
			this.creationDate = data.creationDate;
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.expirationDate = data.expirationDate;
			this.href = data.href;
			this.name = data.name;
			this.groupId = data.groupId;
			this.status = data.status;
			this.statusDate = data.statusDate;
		} else {
			this.id = null;
			this.attachments = null;
			this.creationDate = null;
			this.description = "";
			this.expirationDate = null;
			this.href = "";
			this.name = "";
			this.groupId = null;
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
			this.id = data.id;
			// Entity[] or Group[]
			this.type = data.type; // "group" or "entity"
			this.children = data.children;
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.href = data.href;
			this.name = data.name;
			// Group
			this.parentId = data.parentId;
		} else {
			this.id = null;
			this.children = [];
			this.creationDate = null;
			this.description = "";
			this.href = "";
			this.name = "";
			this.parentId = null;
		}
	}

	return constructor;
})();

var Entity = (function () {

	function constructor(data) {

		if (data) {
			this.id = data.id;
			this.creationDate = data.creationDate;
			this.description = data.description;
			this.href = data.href;
			this.name = data.name;
			// Group
			this.groupId = data.groupId;
		} else {
			this.id = null;
			this.creationDate = null;
			this.description = "";
			this.href = "";
			this.name = "";
			this.groupId = null;
		}
	}

	return constructor;
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
		data: "groupId",
		className: "group",
		render: function (value, renderType, row) {
			var group = getItemById(value, groups);
			return "<a href=\"" + group.href + "\">" + group.name + "</a>";
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

var groupsColumns = [{
		data: "name",
		className: "name",
		render: function (value, renderType, row) {
			return "<a href=\"" + row.href + "\">" + value + "</a>";
		},
		title: "Name"
	}, {
		data: "parentId",
		className: "parent",
		render: function (value, renderType, row) {
			var parent = getItemById(value, groups);
			console.log("parent", parent);
			if (parent) {
				return "<a href=\"" + parent.href + "\">" + parent.name + "</a>";
			} else {
				return "<a>no parent selected</a>";
			}
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

var groups = [];
var decisions = [];
var entities = [];

(function getTestData() {
	var testGroups = [];
	var testDecisions = [];
	var testEntities = [];

	for (let i = 0; i < Math.random() * 50; i++) {
		testEntities.push(getTestEntity());
		// returnMe.push(getTestGroup());
		// returnMe.push(getTestDecision());

	}

	// generate ENTITY groups
	for (let i = 0; i < 5; i++) {
		var group = getTestGroup(ENTITY_GROUP_TYPE);

		var max = 3 + Math.floor(Math.random() * 7);

		// put a random number of entities in each group
		for (let j = 0; j < max; j++) {

			var n = Math.floor(Math.random() * testEntities.length);

			testEntities[n].groupId = group.id;
			group.children.push(testEntities[n].id);
		}
		testGroups.push(group);
	}

	// generate GROUP groups
	for (let i = 0; i < 2; i++) {
		var group = getTestGroup(GROUP_GROUP_TYPE);

		var max = 1 + Math.floor(Math.random() * 1);

		// put a random number of groups in each group
		for (let j = 0; j < max; j++) {

			var n = Math.floor(Math.random() * testGroups.length);

			testGroups[n].parentId = group.id;
			group.children.push(testGroups[n].id);
		}
		testGroups.push(group);
	}

	// generate decisions
	for (let i = 0; i < 10; i++) {
		var decision = getTestDecision();
		var n = Math.floor(Math.random() * testGroups.length);
		decision.groupId = testGroups[n].id;
		testDecisions.push(decision);
	}

	groups = testGroups;
	decisions = testDecisions;
	entities = testEntities;

	function getTestGroup(type) {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		return new Group({
			id: id,
			attachments: [],
			children: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "group desc",
			href: id,
			name: "group " + id,
			parentId: null,
			type: type
		});
	}

	function getTestDecision() {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		return new Decision({
			id: id,
			attachments: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "description",
			expirationDate: new Date(Math.floor(Math.random() * 10000000000)),
			href: id,
			name: "decision " + id,
			groupId: null,
			status: Math.floor(Math.random() * 5),
			statusDate: new Date(Math.floor(Math.random() * 10000000000))
		});
	}

	function getTestEntity() {
		var id = (new Date().getTime() * 1000) + Math.floor(Math.random() * 999);
		// var parentId = Math.floor(Math.random() * groups.length);
		return new Entity({
			id: id,
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "description",
			href: id,
			name: "entity " + id,
			groupId: null
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
	// selectMode === "single" || "multi"
	props: ["columns", "data", "header", "selectMode"],
	methods: {

		select: function (row) {
			console.log("data-table emitting select", row);
			this.$emit("select", row);
		},
		setupDataTable: function () {

			var selector = ".data-table";

			if (this.dt) {
				this.dt.destroy(false);
				$(selector).empty();
				// $(selector).html(this.$options.template);
			}
			this.dt = $(this.$el).find(selector).DataTable({
					data: this.data,
					columns: this.columnsDisplay
				});

			$("button.select-single").click(this.select);
			$("button.select-multi").click(this.select);
		}
	},
	computed: {
		columnsDisplay: function () {

			var mode = this.selectMode;
			if (mode === "single" || mode === "multi") {

				var returnMe = this.columns;
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
			decisionsColumns: decisionsColumns,
			groupsColumns: groupsColumns,
			isSelectingGroup: false,
			decision: {}
		};
	},
	props: ["value", "editable"],
	methods: {
		save: function (event) {},
		save: function () {
			decisions.find(function (x) {
				return x.id === this.data.id;
			}) = this.data;

		},
		setGroup: function (group) {
			this.decision.group = group;
		},
		selectGroup: function () {
			this.isSelectingGroup = true;
			Vue.nextTick(function () {
				$(".modal").dialog({
					modal: true,
					width: "70%"
				});

			});
		}
	},
	computed: {
		groups: function () {
			return groups;
		},
		group: function () {
			try {
				return getItemById(this.decision.groupId, groups);
			} catch (e) {
				console.log(e);
				return null;
			}
		},

	},
	watch: {
		decision: {
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
			return groups;
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
			return groups;
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
				decisions: decisions,
				decisionsColumns: decisionsColumns,
				isDecisionListDisplayed: false,
				isDecisionDetailDisplayed: false,
				currentGroup: new Group(),
				groups: groups,
				groupsColumns: groupsColumns,
				isGroupListDisplayed: false,
				isGroupDetailDisplayed: false,
				currentEntity: new Entity(),
				entities: entities,
				entitiesColumns: entitiesColumns,
				isEntityListDisplayed: false,
				isEntityDetailDisplayed: false,
			};
		},
		methods: {
			onchange: function (value) {
				this.data = value;
			},
			createDecision: function () {
				this.currentDecision = new Decision();
				this.showDecisionDetail();
			},
			createGroup: function () {
				this.currentGroup = new Group();
				this.showGroupDetail();
			},
			createEntity: function () {
				this.currentEntity = new Entity();
				this.showEntityDetail();
			},
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

function getItemById(id, collection) {
	var item = collection.find(function (x) {
			return x.id === id;
		});

	return item ? item : null;
}
