<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SuperCategoryResource\Pages;
use App\Filament\Resources\SuperCategoryResource\RelationManagers;
use App\Models\SuperCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;

class SuperCategoryResource extends Resource
{
    protected static ?string $model = SuperCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required(),
            Textarea::make('description')->rows(3),

            Select::make('children')
                ->relationship('children', 'name')
                ->multiple()
                ->preload()
                ->disabled()
                ->helperText('Categories managed from the Category resource.'),
        ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSuperCategories::route('/'),
            'create' => Pages\CreateSuperCategory::route('/create'),
            'edit' => Pages\EditSuperCategory::route('/{record}/edit'),
        ];
    }
}
