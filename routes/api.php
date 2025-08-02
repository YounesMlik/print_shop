<?php

use App\Http\Controllers\FormSchemaController;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;


Route::post('/form-schema', [FormSchemaController::class, 'update']);