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
			this.id = data.id ? data.id : generateId();
			this.votes = data.votes ? data.votes : [];
			this.options = data.options ? data.options : [];
			this.comments = data.comments ? data.comments : [];
			this.attachments = data.attachments ? data.attachments : [];
			this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
			this.description = data.description ? data.description : "";
			this.expirationDate = data.expirationDate ? data.expirationDate : "";
			this.name = data.name ? data.name : "";
			// this.groupId = data.groupId ? data.groupId : "";
			this.status = data.status ? data.status : 0;
			this.statusDate = data.statusDate ? data.statusDate : "";
		} else {
			this.id = generateId();
			this.votes = [];
			this.options = [];
			this.comments = [];
			this.attachments = [];
			this.creationDate = new Date().getTime();
			this.description = "";
			this.expirationDate = new Date().getTime();
			this.name = "";
			// this.groupId = null;
			this.status = 0;
			this.statusDate = new Date().getTime();
		}
	}

	return constructor;
})();

// this can be a group of Entities or a group of Groups
var Group = (function () {

	function constructor(data) {

		if (data) {
			this.decisions = data.decisions ? data.decisions : []; // Entity[] or Group[]
			this.children = data.children ? data.children : []; // Entity[] or Group[]
			this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
			this.description = data.description ? data.description : "";
			this.id = data.id ? data.id : generateId();
			this.name = data.name ? data.name : "";
			this.parentId = data.parentId ? data.parentId : null; // Group
			this.type = data.type ? data.type : ENTITY_GROUP_TYPE; // group or entity
		} else {
			this.children = [];
			this.creationDate = new Date().getTime();
			this.description = "";
			this.id = generateId();
			this.name = "";
			this.parentId = null;
			this.type = ENTITY_GROUP_TYPE; // group or entity
		}
	}

	return constructor;
})();

var Entity = (function () {

	function constructor(data) {

		if (data) {
			this.id = data.id ? data.id : generateId();
			this.creationDate = data.creationDate ? data.creationDate : new Date().getTime();
			this.description = data.description ? data.description : "";
			this.name = data.name ? data.name : "";
			// Group
			this.groupId = data.groupId ? data.groupId : null;
		} else {
			this.id = generateId();
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
		data: "status",
		className: "status",
		render: function (value, renderType, row) {
			return statuses.get(value);
		},
		title: "Status"
	}, {
		data: "groupId",
		className: "group linked",
		render: function (value, renderType, row) {
			var parent = getItemById(value, groups);
			// console.log("parent", parent);
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
			var parent = getItemById(value, groups);
			// console.log("parent", parent);
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
			return value === 1 ? "Groups" : "Entities";
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
			var parent = getItemById(value, groups);
			// console.log("parent", parent);
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
			return "<div @click=\"showDetail(row.id, 'Entities')\">" + value + "</div>"
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
		var date = decision.creationDate.getTime();
		var n = Math.floor(Math.random() * testGroups.length);

		for (let i = 0; i < 10; i++) {
			date += Math.floor(Math.random() * 1000000000);
			decision.comments.push(getTestComment(date));
		}

		testGroups[n].decisions.push(decision.id);
		testDecisions.push(decision);
	}

	groups = testGroups;
	decisions = testDecisions;
	entities = testEntities;

	function getTestComment(date) {
		return {
			entityId: testEntities[Math.floor(Math.random() * testEntities.length)].id,
			time: date,
			upvotes: Math.floor(Math.random() * 1000),
			downvotes: Math.floor(Math.random() * 1000),
			narrative: "lorem ipsum dolor sit amet adipising"
		};

	}

	function getTestGroup(type) {
		var id = generateId();
		return new Group({
			id: id,
			attachments: [],
			children: [],
			decisions: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "group desc",
			href: id,
			name: "group " + id,
			parentId: null,
			type: type
		});
	}

	function getTestDecision() {
		var id = generateId();
		var creationTime = Math.floor(Math.random() * 10000000000);
		return new Decision({
			id: id,
			attachments: [],
			comments: [],
			creationDate: new Date(creationTime),
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
		var id = generateId();
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
			decision: {}
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
			return this.decision.votes.map(function (x) {
				return {
					name: getItemById(x.entityId, entities)
					,id: x.entityId
					,choice: this.choices[x.selectedIndex]
					,time: x.time
				};
			});
		}
	},
	watch: {
		decision: {
			handler: function (current, old) {
				this.$emit("change", current);
				console.log("decision-detail watch emitting change", current);
			},
			deep: true
		},
		// value: {
		// handler: function (current, old) {
		// this.decision = new Decision(current);
		// },
		// deep: true
		// }
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
	props: ["value", "editable"],
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
		groups: function () {
			return groups;
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
			return this.group.type === GROUP_GROUP_TYPE ? "Groups" : "Entities";
		},
		childrenDisplay: function () {
			return this.group.type === GROUP_GROUP_TYPE
			 ? this.group.children.map(function (c) {
				return getItemById(c, groups);
			})
			 : this.group.type === ENTITY_GROUP_TYPE
			 ? this.group.children.map(function (c) {
				return getItemById(c, entities);
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
			var list = this.group.type === 0 ? entities : groups;
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

Vue.component('entity-detail', {
	model: {
		event: "change"
	},
	data: function () {
		return {
			isSelectingGroup: false,
			entity: {}
		};
	},
	props: ["value", "editable"],
	methods: {
		save: function () {
			throw ("not implemented");
		},
		showDetail: function (id, header) {
			console.log("entity-detail emitting showDetail");
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
			this.entity.groupId = id;
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
			return getGroupById(this.entity.groupId);
		},
	},
	watch: {
		entity: {
			handler: function (current, old) {
				this.$emit("change", current);
				console.log("entity-detail emitting change", current, this.index);
			},
			deep: true
		}
	},
	mounted: function () {
		// for some reason we need this to establish reactivity,
		// without it, we don't get reactivity until an emit is triggered
		this.entity = new Entity(this.value);
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
				currentEntity: new Entity(),
				currentGroup: new Group(),
				currentHeader: "",
				decisions: decisions,
				entities: entities,
				groups: groups,
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
				if (this.currentHeader === "Entities") {
					this.createEntity();
				}
			},
			saveDecision: function (data) {
				console.log("saveDecision", data);
				this.currentDecision = data;
				decisions[decisions.findIndex(function (x) {
						return x.id === data.id;
					})] = data;

			},
			saveGroup: function (data) {
				console.log("saveGroup", data);
				this.currentGroup = data;
				groups[groups.findIndex(function (x) {
						return x.id === data.id;
					})] = data;

			},
			saveEntity: function (data) {
				console.log("saveEntity", data);
				this.currentEntity = data;
				entities[entities.findIndex(function (x) {
						return x.id === data.id;
					})] = data;

			},
			onchange: function (value) {
				this.data = value;
				console.log("this probably isn't working");
			},
			createDecision: function () {
				this.currentDecision = new Decision();
				decisions.push(this.currentDecision);
				this.showDecisionDetail();
			},
			createGroup: function () {
				this.currentGroup = new Group();
				groups.push(this.currentGroup);
				this.showGroupDetail();
			},
			createEntity: function () {
				this.currentEntity = new Entity();
				entities.push(this.currentEntity);
				this.showEntityDetail();
			},

			showDecisionList: function () {
				this.currentColumns = decisionColumns;
				this.currentData = decisions;
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
				if (header === "Entities") {
					this.showEntityDetail(id);
				}
			},
			showDecisionDetail: function (id) {
				this.currentDecision = null;

				if (id) {
					this.currentDecision = decisions.find(function (x) {
							return x.id === id;
						});
				} else {
					this.currentDecision = new Decision();
				}

				this.currentColumns = "";
				// this.currentData = this.currentDecision;
				this.currentHeader = "";
				this.currentComponent = "decision-detail";
			},
			showGroupList: function () {
				this.currentColumns = groupColumns;
				this.currentData = groups;
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
				this.currentData = entities;
				this.currentHeader = "Entities";
				this.currentComponent = "data-table";
			},
			showEntityDetail: function (id) {
				this.currentEntity = null;
				if (id) {
					this.currentEntity = entities.find(function (x) {
							return x.id === id;
						});
				} else {
					this.currentEntity = new Entity();
				}

				this.currentColumns = "";
				this.currentData = this.currentEntity;
				this.currentHeader = "";
				this.currentComponent = "entity-detail";
			}
		},
		computed: {

			currentEvents: function () {
				return this.currentComponent === "decision-detail"
				 ? {
					"change": this.saveDecision,
					"show-detail": this.showDetail,

				}
				 : this.currentComponent === "group-detail"
				 ? {
					"change": this.saveGroup,
					"show-detail": this.showDetail,
				}
				 : this.currentComponent === "entity-detail"
				 ? {
					"change": this.saveEntity,
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
					"editable": "true"

				}
				 : this.currentComponent === "entity-detail"
				 ? {
					"value": this.currentEntity,
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
