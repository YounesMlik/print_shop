<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OptionAttributeResource\Pages;
use App\Filament\Resources\OptionAttributeResource\RelationManagers;
use App\Models\OptionAttribute;
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
use Filament\Tables\Columns\TextColumn;

class OptionAttributeResource extends Resource
{
    protected static ?string $model = OptionAttribute::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required(),
            Textarea::make('description')->rows(3),

            Select::make('options')
                ->relationship('options', 'name')
                ->multiple()
                ->preload(),
        ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('description')->limit(50)->wrap(),
                TextColumn::make('options_count')
                    ->counts('options')
                    ->label('Options')
                    ->sortable(),
            ])
            ->defaultSort('name')
            ->actions([
                // Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListOptionAttributes::route('/'),
            'create' => Pages\CreateOptionAttribute::route('/create'),
            'edit' => Pages\EditOptionAttribute::route('/{record}/edit'),
        ];
    }
}
