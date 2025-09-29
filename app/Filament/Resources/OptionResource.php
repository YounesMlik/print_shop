<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OptionResource\Pages;
use App\Filament\Resources\OptionResource\RelationManagers;
use App\Models\Option;
use App\Support\TranslatableFields;
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
use Filament\Tables\Filters\SelectFilter;
use Filament\Forms\Components\Repeater;

class OptionResource extends Resource
{
    protected static ?string $model = Option::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('product_id')
                ->relationship('product', 'name')
                ->required()
                ->preload(),

            TranslatableFields::tabs([
                ['text', 'name'],
                ['textarea', 'description', ['rows' => 3]],
            ]),

            TextInput::make('price')
                ->label('Price')
                ->numeric()
                ->step('0.01')
                ->required()
                ->default(0),

            Repeater::make('optionAttributeLinks')
                ->relationship()
                ->schema([
                    Select::make('option_attribute_id')
                        ->label('Attribute')
                        ->options(\App\Models\OptionAttribute::pluck('name', 'id'))
                        ->required(),

                    TranslatableFields::tabs([
                        ['text', 'value'],
                        ['textarea', 'description', ['label' => 'Override Description', 'rows' => 2]],
                    ]),
                ])
                ->defaultItems(0)
                ->columns(1)
                ->label("Attributes"),
        ]);
    }



    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('product.name')->label('Product')->sortable(),
                TextColumn::make('price')->label('Price')->money('mad')->sortable(),
                TextColumn::make('description')->limit(50)->wrap(),
                TextColumn::make('optionAttributes.name')
                    ->label('Attributes')
                    ->badge()
                    ->separator(', ')
                    ->limit(3),
            ])
            ->filters([
                SelectFilter::make('product_id')
                    ->label('Product')
                    ->relationship('product', 'name'),
            ])
            ->defaultSort('name')
            ->actions([
                // Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListOptions::route('/'),
            'create' => Pages\CreateOption::route('/create'),
            'edit' => Pages\EditOption::route('/{record}/edit'),
        ];
    }
}
