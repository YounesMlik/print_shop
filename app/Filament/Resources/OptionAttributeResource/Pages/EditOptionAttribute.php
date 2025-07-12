<?php

namespace App\Filament\Resources\OptionAttributeResource\Pages;

use App\Filament\Resources\OptionAttributeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOptionAttribute extends EditRecord
{
    protected static string $resource = OptionAttributeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
