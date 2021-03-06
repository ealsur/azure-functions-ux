// This is a temporary file until we move this to the template gallery

export class Templates{
    public static readonly templatesJson = JSON.stringify([
        {
            'id': 'SyncTrigger-CSharp',
            'runtime': '1',
            'files': {
                'readme.md': '# HttpTrigger -on',
                'run.csx': '#r \'..\\bin\\Microsoft.Xrm.Sdk.dll\'\nusing Microsoft.Xrm.Sdk;\n\npublic static Entity Run(Entity entity, TraceWriter log)\n{\n\tentity.Attributes[\'name\'] = entity.Attributes[\'name\'].ToString().ToUpper();\n\treturn entity;\n}',
                'sample.dat': '{}'
            },
            'function': {
                'disabled': false,
                'bindings': [
                    {
                        'name': 'entity',
                        'message': 'create',
                        'type': 'synctrigger',
                        'direction': 'in'
                    }
                ]
            },
            'metadata': {
                'defaultFunctionName': 'SyncTriggerCSharp',
                'description': '$SyncTrigger_description',
                'name': 'Sync trigger',
                'language': 'C#',
                'trigger': 'SyncTrigger',
                'category': [
                    '$temp_category_core'
                ],
                'categoryStyle': 'http',
                'enabledInTryMode': true,
                'userPrompt': [
                    'message'
                ]
            }
        },
        {
            'id': 'SyncTrigger-JavaScript',
            'runtime': '1',
            'files': {
                'index.js': 'module.exports',
                'sample.dat': '{}'
            },
            'function': {
                'disabled': false,
                'bindings': [
                    {
                        'name': 'entity',
                        'message': 'create',
                        'type': 'synctrigger',
                        'direction': 'in'
                    }
                ]
            },
            'metadata': {
                'defaultFunctionName': 'SyncTriggerJS',
                'description': '$SyncTrigger_description',
                'name': 'Sync trigger',
                'language': 'JavaScript',
                'trigger': 'SyncTrigger',
                'category': [
                    '$temp_category_core'
                ],
                'categoryStyle': 'http',
                'enabledInTryMode': true,
                'userPrompt': [
                    'message'
                ]
            }
        }
    ]);

    public static readonly bindingsJson = JSON.stringify({
        'bindings': [
            {
                'type': 'syncTrigger',
                'displayName': 'Sync',
                'direction': 'trigger',
                'settings': [
                    {
                        'name': 'message',
                        'value': 'enum',
                        'enum': [
                            {
                                'value': 'Create',
                                'display': 'Create'
                            },
                            {
                                'value': 'Destroy',
                                'display': 'Destroy'
                            },
                            {
                                'value': 'Update',
                                'display': 'Update'
                            },
                            {
                                'value': 'Retrieve',
                                'display': 'Retrieve'
                            }
                        ],
                        'label': 'Event',
                        'help': 'Event help'
                    }
                ]

            }
        ]
    });
}
