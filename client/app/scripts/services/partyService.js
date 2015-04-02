'use strict';

edulect.factory('Parties', function ($resource) {
	'use strict';

	return $resource('/api/party', null, {});
});
