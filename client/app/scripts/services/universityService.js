'use strict';

edulect.factory('University', function ($resource) {
	'use strict';

	return $resource('/api/unis', null, {});
});