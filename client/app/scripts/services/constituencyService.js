'use strict';

edulect.factory('Constituencies', function ($resource) {
	'use strict';

	return $resource('/api/constituencies', null, {});
});
