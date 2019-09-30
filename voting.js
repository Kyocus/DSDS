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
			this.scope = data.scope;
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
			this.scope = null;
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

Vue.component('nav-bar', {
	methods: {},
	template: $("#tmpNavBar").html()
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
	methods: {

		function () {
			var dt = $("#tblDecisions").DataTable({
					data: [{
							attachments: [],
							creationDate: new Date(),
							description: "description",
							expirationDate: new Date(),
							name: "decision 4",
							scope: 234,
							status: 1,
							statusDate: new Date(),
							voters: []
						}, {
							attachments: [],
							creationDate: new Date(),
							description: "description",
							expirationDate: new Date(),
							name: "decision 5",
							scope: 156,
							status: 4,
							statusDate: new Date(),
							voters: []
						}, {
							attachments: [],
							creationDate: new Date(),
							description: "description",
							expirationDate: new Date(),
							name: "decision 6354",
							scope: 1895,
							status: 2,
							statusDate: new Date(),
							voters: []
						}
					],
					columns: [{
							data: "name",
							className: "name",
							render: function (a, b, c) {
								return "<a href=\"/LOCUS/Travel/TravelRequestDetail?id=" + c.travelRequestId + "\">" + name + "</a>";
							},
							title: "Name"
						}, {
							data: "status",
							className: "status",
							render: function (a, b, c) {
								return statuses.get(a);
							},
							title: "Status"
						}, {
							data: "scope",
							className: "scope",
							render: $.fn.dataTable.render.text(),
							title: "Scope"
						}, {
							data: "creationDate",
							className: "created",
							render: function (a, b, c) {
								return new Date(a).toLocaleString("en-us", dateTimeOptions);
							},
							title: "Created"
						}, {
							data: "expirationDate",
							className: "expiration",
							render: function (a, b, c) {
								return new Date(a).toLocaleString("en-us", dateTimeOptions);
							},
							title: "Expires"
						}, {
							data: "attachments",
							className: "attachments",
							render: function (a, b, c) {
								return "<a href=\"/LOCUS/Travel/TravelRequestDetail?id=" + c.travelRequestId + "\">" + name + "</a>";
							},
							title: "Attachments"
						}

					]
				});
		}

	},
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

Vue.component('data-table', {
	model: {
		event: "change"
	},
	data: function () {
		return {
			data: {}
		};
	},
	props: ["columns", "query", "header"],
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
	template: $("#tmpDataTable").html()
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
	});
