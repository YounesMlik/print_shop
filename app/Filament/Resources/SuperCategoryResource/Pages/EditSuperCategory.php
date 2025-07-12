<?php

namespace App\Filament\Resources\SuperCategoryResource\Pages;

use App\Filament\Resources\SuperCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSuperCategory extends EditRecord
{
    protected static string $resource = SuperCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
