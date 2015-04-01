'use strict';

edulect.factory('Twitter', function ($resource) {
	'use strict';

	return $resource('/api/twitter', null, {});
});
