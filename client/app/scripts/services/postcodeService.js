'use strict';

edulect.factory('Postcode', function ($resource) {
	'use strict';

	return $resource('/api/constituency', null, {});
});
