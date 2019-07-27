$(document).ready(function () {
	console.log("ready!");
	const exampleURL = 'https://docs.google.com/spreadsheets/d/1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk/edit#gid=0';
	const myTimelineURL = 'https://docs.google.com/spreadsheets/d/1I5sWfkDfclgYVtMZmSBKXBSVQ6x8Ml99-cB591MZZE0/edit#gid=0';

	var additionalOptions = {
		start_at_end: false,
		timenav_height: 250
	}
	var timeline = new TL.Timeline('timeline', myTimelineURL, additionalOptions);

	showGenerateModal();

	$("#generateBtn").on('click', function () {
		var input = $('#spreadsheetURL').val();
		// console.log(input);
		if (!$.isEmptyObject(input)) {
			input = input.trim();
			timeline = new TL.Timeline('timeline', input);
		}
		$.modal.close();
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
		console.log('special import');
		// updated data: 27-07-1029
		const dataSourceURL = 'assets/datasource/mtcc_tl.json';
		// const dataSourceURL = 'selenium/mtcc_tl_26_7_2019.json';
		$.ajax(dataSourceURL, {
			success: function (data, textStatus, jqXHR) {
				// console.log(textStatus, jqXHR);
				// console.log(data);
				timeline = new TL.Timeline('timeline', data, additionalOptions);
				if ($.modal.isActive()) {
					$.modal.close();
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
				console.log(jqXHR);
			},
			// complete: function(jqXHR, textStatus) {
			// 	console.log(textStatus, jqXHR);
			// }
		});
	});

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