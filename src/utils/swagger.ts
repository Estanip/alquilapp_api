import expressOasGenerator from 'express-oas-generator';
import mongoose from 'mongoose';
import _ from 'lodash';

export async function setSwaggerResponse(app) {
    expressOasGenerator.handleResponses(app, {
        predefinedSpec: (spec) => {
            _.set(spec, 'securityDefinitions.authorization', {
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
            });

            /* LOGIN */
            _.set(spec, "paths['/auth/login'].post.tags", ['User']);
            _.set(spec, "paths['/auth/login'].post.parameters", [
                {
                    in: 'body',
                    name: 'user',
                    schema: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string', example: 'test@test.com' },
                            password: { type: 'string', example: 'Test12345' },
                        },
                    },
                },
            ]);
            _.set(spec, "paths['/auth/login'].post.security", []);

            /* REGISTER */
            _.set(spec, "paths['/auth/register'].post.tags", ['User']);
            _.set(spec, "paths['/auth/register'].post.parameters", [
                {
                    in: 'body',
                    name: 'user',
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'first_name',
                            'last_name',
                            'identification_number',
                            'birth_date',
                            'type_of_user',
                            'member_status',
                        ],
                        properties: {
                            email: { type: 'string', example: 'test@test.com' },
                            password: { type: 'string', example: 'Test12345' },
                            first_name: { type: 'string', example: 'Test' },
                            last_name: { type: 'string', example: 'Test' },
                            identification_number: { type: 'string', example: '11111111' },
                            birth_date: {
                                type: 'string',
                                format: 'date',
                                example: '1988-08-24',
                            },
                            type_of_user: { type: 'string', example: 'Socio' },
                            member_status: { type: 'string', example: 'Verificado' },
                        },
                    },
                },
            ]);
            _.set(spec, "paths['/auth/register'].post.security", []);

            _.set(spec, "paths['/user-type'].post.tags", ['UserType']);
            _.set(spec, "paths['/user-type'].post.parameters", [
                {
                    in: 'body',
                    name: 'user_type',
                    schema: {
                        type: 'object',
                        required: ['name', 'status'],
                        properties: {
                            name: { type: 'string', example: 'Socio' },
                            status: { type: 'string', example: 'enabled' },
                        },
                    },
                },
            ]);
            _.set(spec, "paths['/user-type'].post.security", [{ authorization: [] }]);

            _.set(spec, "paths['/member'].get.tags", ['Member']);
            _.set(spec, "paths['/member'].get.security", [{ authorization: [] }]);

            _.set(spec, "paths['/member/filter'].get.tags", ['Member']);
            _.set(spec, "paths['/member/filter'].get.parameters", [
                {
                    in: 'path',
                },
            ]);
            _.set(spec, "paths['/member/filter'].get.security", [{ authorization: [] }]);

            _.set(spec, "paths['/reservation'].post.tags", ['Reservation']);
            _.set(spec, "paths['/reservation'].post.parameters", [
                {
                    in: 'body',
                    name: 'reservation',
                    schema: {
                        type: 'object',
                        required: ['day', 'from', 'to', 'court', 'players', 'total_price'],
                        properties: {
                            day: { type: 'string', format: 'date', example: '1988-08-24' },
                            from: { type: 'string', example: '10' },
                            to: { type: 'string', example: '11' },
                            court: { type: 'string', example: '4' },
                            players: [{ type: 'array', example: ['id1', 'id2'] }],
                            total_price: { type: 'number', example: 100 },
                        },
                    },
                },
            ]);
            _.set(spec, "paths['/reservation'].post.security", [{ authorization: [] }]);

            _.set(spec, "paths['/court'].get.tags", ['Court']);
            _.set(spec, "paths['/court'].get.security", [{ authorization: [] }]);

            return spec;
        },
        specOutputPath: './src/api-docs/swagger.json',
        mongooseModels: mongoose.modelNames(),
        alwaysServeDocs: true,
        specOutputFileBehavior: '',
        swaggerDocumentOptions: undefined,
    });
}

export async function setSwaggerRequest() {
    expressOasGenerator.handleRequests();
}
