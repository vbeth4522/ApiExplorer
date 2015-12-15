'use strict';

require('angular').module('capi-ui')
.service('CredentialSvc', require('./credentials'))
.constant('CapiBaseDomain', require('./capiBaseDomain'))
.service('FlowSvc', require('./flows'))
.service('FieldSvc', require('./fields'))
.service('FieldMetaSvc', require('./fieldMeta'))
.service('FormSvc', require('./forms'))
.service('LocaleSvc', require('./locales'))
.service('SchemaSvc', require('./schemas'))
.service('HttpSvc', require('./http'))
.service('UtilsSvc', require('./utils'))
