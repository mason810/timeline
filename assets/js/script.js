$(document).ready(function () {
	console.log("ready!");
	const exampleURL = 'https://docs.google.com/spreadsheets/d/1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk/edit#gid=0';
	const myTimelineURL = 'https://docs.google.com/spreadsheets/d/1I5sWfkDfclgYVtMZmSBKXBSVQ6x8Ml99-cB591MZZE0/edit#gid=0';

	var additionalOptions = {
		start_at_end: false,
		timenav_height: 250
	}
	var timeline = new TL.Timeline('timeline', myTimelineURL, additionalOptions);

	// showGenerateModal();
	specialImport();

	$("#generateBtn").on('click', function () {
		var input = $('#spreadsheetURL').val();
		// console.log(input);
		if (!$.isEmptyObject(input)) {
			input = input.trim();
			var sortNewest = $('#sortNewest').val() == 'on';
			additionalOptions.start_at_end = sortNewest;
			timeline = new TL.Timeline('timeline', input, additionalOptions);
		}
		$.modal.close();
		document.title = 'Your Timeline';
	});
	$("#closeModalBtn").on('click', function () {
		if ($.modal.isActive()) {
			$.modal.close();
		}
	});
	$("#changeBtn").on('click', function () {
		showGenerateModal();
	});

	$("#cardImport").on('click', function (event) {
		event.preventDefault();
		specialImport();
	});

	function specialImport() {
		console.log('special import');
		// updated data: 27-07-1029
		const dataSourceURL = 'assets/datasource/mtcc_tl.json';
		// const dataSourceURL = 'selenium/mtcc_tl_26_7_2019.json';
		$.ajax(dataSourceURL, {
			success: function (data, textStatus, jqXHR) {
				// console.log(textStatus, jqXHR);
				// console.log(data);
				var specialData = {
					"title": {
						"media": {
							"url": "https://scontent.fdad5-1.fna.fbcdn.net/v/t1.0-9/51278337_725271027859359_6675724675273719808_n.jpg?_nc_cat=108&_nc_oc=AQnHL6HeFk_6_dP5fvCTPQu17tCRcEcnRNi0yEJUOstIU_BNgZv-qLJHMnC6kPpv-N0&_nc_ht=scontent.fdad5-1.fna&oh=5facb74e946212f3b4c86c4378b96696&oe=5DE440AD",
							"caption": "Mai Thị Cẩm Cát"
						},
						"text": {
							"headline": "Mai Thị Cẩm Cát",
							"text": ""
						}
					},
					"events": []
				};
				specialData.events = data;
				var sortNewest = $('#sortNewest').val() == 'on';
				additionalOptions.start_at_end = sortNewest;

				timeline = new TL.Timeline('timeline', specialData, additionalOptions);
				if ($.modal.isActive()) {
					$.modal.close();
				}
				document.title = 'Your Timeline - Mai Thị Cẩm Cát';
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
				console.log(jqXHR);
				document.title = 'Your Timeline';
			},
			// complete: function(jqXHR, textStatus) {
			// 	console.log(textStatus, jqXHR);
			// }
		});
	}

	function showGenerateModal() {
		if (!$.modal.isActive()) {
			$("#importSheet").modal({
				fadeDuration: 100,
				escapeClose: false,
				clickClose: false,
				showClose: false
			});
		}
	}
});