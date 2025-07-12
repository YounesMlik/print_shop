<?php

namespace App\Filament\Resources\OptionAttributeResource\Pages;

use App\Filament\Resources\OptionAttributeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOptionAttributes extends ListRecords
{
    protected static string $resource = OptionAttributeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
