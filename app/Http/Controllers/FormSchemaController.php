<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FormSchemaController extends Controller
{
    // Show the builder page with the existing schema
    public function index()
    {
        $json = Storage::get('form_schema.json');
        $schema = json_decode($json, true);

        return Inertia::render('CustomOrder/Index', [
            'schema' => $schema,
        ]);
    }

    public function edit()
    {
        $json = Storage::get('form_schema.json');
        $schema = json_decode($json, true);

        return Inertia::render('CustomOrder/Edit', [
            'schema' => $schema,
        ]);
    }

    // Save an updated schema
    public function update(Request $request)
    {

        $payload = $request->get("schema");

        abort_if(!$payload, 400);

        $success = Storage::put('form_schema.json', json_encode($payload, JSON_PRETTY_PRINT));

        return response()->json(["success" => $success]);
    }
}
