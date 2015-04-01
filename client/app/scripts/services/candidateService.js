'use strict';

edulect.factory('Candidate', function ($resource) {
	'use strict';

	return $resource('/api/candidate', null, {});
});
