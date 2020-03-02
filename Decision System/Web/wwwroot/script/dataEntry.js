var delay = 200;

var selectors = {
	navVoters: ".voters",
	navGroups: ".groups",
	navDecisions: ".decisions",
	createButton: ".create-button",
	saveButton: ".save-button",
	deleteButton: ".delete-button",
	addParentButton: ".add-parent-button",
	voterName: ".voter-name",
	voterDescription: ".voter-description",
	groupName: ".group-name",
	groupDescription: ".group-description",
	decisionName: ".decision-name",
	decisionDescription: ".decision-description"
};

var promises = [];

for (let i = 0; i < 10; i++) {
	promises = promises.concat(createVoter());
}

for (let i = 0; i < 2; i++) {
	promises = promises.concat(createGroup());
}

serializeTasks(promises);

// for (let i = 0; i < length; i++) {
// promise.then(function () {
// createDecision();
// });
// }

function createVoter() {

	var time = generateGuid();

	return [{
		selector: selectors.navVoters
	}, {
		selector: selectors.createButton
	}, {
		selector: selectors.voterName,
		value: "name " + time
	}, {
		selector: selectors.voterDescription,
		value: "description" + time
	}, {
		selector: selectors.saveButton
	}
	];
}

function createDecision() {

	var time = new Date().getTime();

	return [{
		selector: selectors.navDecisions
	}, {
		selector: selectors.createButton
	}, {
		selector: selectors.decisionName,
		value: "name " + time
	}, {
		selector: selectors.decisionDescription,
		value: "description" + time
	}, {
		selector: selectors.saveButton
	}
	];
}

function createGroup() {

	var time = generateGuid();

	return [{
		selector: selectors.navGroups
	}, {
		selector: selectors.createButton
	}, {
		selector: selectors.groupName,
		value: "name " + time
	}, {
		selector: selectors.groupDescription,
		value: "description" + time
	}, {
		selector: selectors.saveButton
	}
	];
}

function serializeTasks(tasks) {
	return tasks.reduce((a, c, i) => {
		return a.then(function () {
			return getTaskResolver(c);
		});
	}, new Promise(function (resolve, reject) {
		resolve();
	}));
}

function getTaskResolver(task) {
	if (task.value) {
		return setValue(task.selector, task.value);
	} else if (task.selector) {
		return tryClick(task.selector);
	} else {
		return task;
	}
}

function tryClick(selector) {
	console.log("tryClick", selector);
	return new Promise(function (resolve, reject) {
		$(selector).click();

		setTimeout(function () {
			resolve();
		}, delay);

	});

}

function setValue(selector, value) {
	console.log("setValue", selector);
	return new Promise(function (resolve, reject) {

		$(selector).val(value)
			.trigger("input")
			.trigger("change")
			.trigger("keyup")
			.trigger("keydown");

		setTimeout(function () {
			resolve();
		}, delay);

	});

}


function generateGuid() {
	var template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
	//    var template = "xxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxx";
	var returnMe = template.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == "x" ? r
                /*
                 * What we're doing here is bitwise operations :
                 * 0x3.toString(2) => 11
                 * 0x8.toString(2) => 1000
                 * first a and with 11 at the bit level (truncating to only the two last bits, that is doing %4),
                 * then a or with 1000 (setting one bit, adding 8).
                 */
				: (r & 0x3 | 0x8);
		return v.toString(16);
	});

	return returnMe;
}