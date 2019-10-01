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
			// Entity[]
			this.voters = data.voters;
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
			this.voters = [];
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
			voters: []
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
		return {
			children: [],
			creationDate: new Date(Math.floor(Math.random() * 10000000000)),
			description: "group desc",
			href: id,
			name: "group " + id,
			parent: null

		};
	}
})();

Vue.component('nav-bar', {
	methods: {
		showDecisions: function () {
			this.$emit("showdecisions");
		},
		showGroups: function () {
			this.$emit("showgroups");
		},
		showEntities: function () {
			this.$emit("showentities");
		}

	},
	template: $("#tmpNavBar").html()
});

Vue.component('data-table', {
	model: {
		event: "change"
	},
	props: ["columns", "data", "header"],
	methods: {

		setupDataTable: function () {

			var selector = "#tblList";

			if (this.dt) {
				this.dt.destroy(false);
				$(selector).empty();
				// $(selector).html(this.$options.template);
			}
			this.dt = $(selector).DataTable({
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
			data: {}
		};
	},
	props: ["decision", "editable"],
	methods: {},
	computed: {},
	watch: {
		comment: {
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
	methods: {},
	computed: {},
	watch: {
		comment: {
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
	methods: {},
	computed: {},
	watch: {
		comment: {
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
				decisions: testDecisions,
				decisionsColumns: [{
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

				],

				areDecisionsRendered: false,
				groups: testGroups,
				groupsColumns: [{
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
				],
				areGroupsRendered: false,
				entities: testEntities,
				entitiesColumns: [{
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

				],
				areEntitiesRendered: false,
			};
		},
		methods: {
			showDecisions: function () {
				this.areDecisionsRendered = true;
				this.areGroupsRendered = false;
				this.areEntitiesRendered = false;
			},
			showGroups: function () {
				this.areDecisionsRendered = false;
				this.areGroupsRendered = true;
				this.areEntitiesRendered = false;
			},
			showEntities: function () {
				this.areDecisionsRendered = false;
				this.areGroupsRendered = false;
				this.areEntitiesRendered = true;
			}
		}
	});
