/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateRecordController } from './../src/controllers/records/updateRecord';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetRecordsController } from './../src/controllers/records/getRecords';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetRecordByIdController } from './../src/controllers/records/getRecordById';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteRecordController } from './../src/controllers/records/deleteRecord';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AddRecordController } from './../src/controllers/records/addRecord';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Pick_Record.Exclude_keyofRecord.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"firstName":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"age":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"dateOfBirth":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true},"street":{"dataType":"string","required":true},"city":{"dataType":"string","required":true},"state":{"dataType":"string","required":true},"zip":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Record.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Record.Exclude_keyofRecord.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "age": {"dataType":"double","required":true},
            "description": {"dataType":"string","required":true},
            "dateOfBirth": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "street": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "zip": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUpdateRecordController_updateRecordController: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"record":{"ref":"Omit_Record.id_","required":true}}},
        };
        app.put('/app/records/:id',
            ...(fetchMiddlewares<RequestHandler>(UpdateRecordController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateRecordController.prototype.updateRecordController)),

            async function UpdateRecordController_updateRecordController(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUpdateRecordController_updateRecordController, request, response });

                const controller = new UpdateRecordController();

              await templateService.apiHandler({
                methodName: 'updateRecordController',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGetRecordsController_getRecordsController: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/app/records',
            ...(fetchMiddlewares<RequestHandler>(GetRecordsController)),
            ...(fetchMiddlewares<RequestHandler>(GetRecordsController.prototype.getRecordsController)),

            async function GetRecordsController_getRecordsController(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGetRecordsController_getRecordsController, request, response });

                const controller = new GetRecordsController();

              await templateService.apiHandler({
                methodName: 'getRecordsController',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGetRecordByIdController_getRecordByIdController: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/app/records/:id',
            ...(fetchMiddlewares<RequestHandler>(GetRecordByIdController)),
            ...(fetchMiddlewares<RequestHandler>(GetRecordByIdController.prototype.getRecordByIdController)),

            async function GetRecordByIdController_getRecordByIdController(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGetRecordByIdController_getRecordByIdController, request, response });

                const controller = new GetRecordByIdController();

              await templateService.apiHandler({
                methodName: 'getRecordByIdController',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeleteRecordController_deleteRecordController: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/app/records/:id',
            ...(fetchMiddlewares<RequestHandler>(DeleteRecordController)),
            ...(fetchMiddlewares<RequestHandler>(DeleteRecordController.prototype.deleteRecordController)),

            async function DeleteRecordController_deleteRecordController(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeleteRecordController_deleteRecordController, request, response });

                const controller = new DeleteRecordController();

              await templateService.apiHandler({
                methodName: 'deleteRecordController',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAddRecordController_addRecordController: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"record":{"ref":"Record","required":true}}},
        };
        app.post('/app/records',
            ...(fetchMiddlewares<RequestHandler>(AddRecordController)),
            ...(fetchMiddlewares<RequestHandler>(AddRecordController.prototype.addRecordController)),

            async function AddRecordController_addRecordController(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAddRecordController_addRecordController, request, response });

                const controller = new AddRecordController();

              await templateService.apiHandler({
                methodName: 'addRecordController',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
