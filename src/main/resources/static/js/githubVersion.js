function compareVersions(version1, version2) {
	const v1 = version1.split('.');
	const v2 = version2.split('.');

	for (let i = 0; i < v1.length || i < v2.length; i++) {
		const n1 = parseInt(v1[i]) || 0;
		const n2 = parseInt(v2[i]) || 0;

		if (n1 > n2) {
			return 1;
		} else if (n1 < n2) {
			return -1;
		}
	}

	return 0;
}

async function getLatestReleaseVersion() {
	const url = "https://api.github.com/repos/Frooodle/Stirling-PDF/releases/latest";
	const response = await fetch(url);
	const data = await response.json();
	return data.tag_name.substring(1);
}


async function checkForUpdate() {
	const latestVersion = await getLatestReleaseVersion();
	console.log("latestVersion=" + latestVersion)
	console.log("currentVersion=" + currentVersion)
	console.log("compareVersions(latestVersion, currentVersion) > 0)=" + compareVersions(latestVersion, currentVersion))
	if (latestVersion != null && latestVersion != "" && compareVersions(latestVersion, currentVersion) > 0) {
		document.getElementById("update-btn").style.display = "block";
		console.log("visible")
	} else {
		document.getElementById("update-btn").style.display = "none";
		console.log("hidden")
	}
}

checkForUpdate();