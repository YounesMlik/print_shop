import { FastFlavor } from "@coderspirit/nominal"
import { pipe, map, entries, flatMap, unique, uniqueBy, keys, omit, flat, groupBy } from "remeda";

type ItemName = FastFlavor<string, "ItemName">
type DimensionName = FastFlavor<string, "DimensionName">
type Value = FastFlavor<string, "Value">
type ItemId = FastFlavor<number, "ItemId">
type DimensionId = FastFlavor<number, "DimensionId">
type ValueId = FastFlavor<number, "ValueId">

type RawItem<
    Id extends ItemId = ItemId,
    Name extends ItemName = ItemName,
    DimName extends DimensionName = DimensionName,
    V extends Value = Value,
>
    = { id: Id, name: Name, v: Record<DimName, V> }

type Item<Name extends ItemName = ItemName, Id extends ItemId = ItemId>
    = { id: Id, name: Name }
type Dimension<Name extends DimensionName = DimensionName, Id extends DimensionId = DimensionId,>
    = { id: Id, name: Name }
type ValueRow<V extends Value = Value, Id extends ValueId = ValueId, DimId extends DimensionId = DimensionId>
    = { dimension_id: DimId, value_id: Id, value: V }
type ItemValue<I extends ItemId = ItemId, D extends DimensionId = DimensionId, V extends ValueId = ValueId>
    = { item_id: I, dimension_id: D, value_id: V }

type NormalizedData<I extends Item = Item, D extends Dimension = Dimension, V extends ValueRow = ValueRow, IV extends ItemValue = ItemValue> = {
    items: I[]
    dimensions: D[]
    values: V[]
    itemValues: IV[]
}

export function normalizeData<
    GItemName extends ItemName,
    DimName extends DimensionName,
    V extends Value,
    GItemId extends ItemId,
    DimId extends DimensionId,
    ValId extends ValueId,
>
    (denormalizedItems: RawItem<GItemId, GItemName, DimName, V>[])
    : NormalizedData<
        Item<GItemName, GItemId>,
        Dimension<DimName, DimId>,
        ValueRow<V, ValId, DimId>,
        ItemValue<GItemId, DimId, ValId>
    > {

    const items: Item<GItemName, GItemId>[] = pipe(
        denormalizedItems satisfies RawItem[],
        map(({ id, name }) => ({ id, name })),
    );

    const dimensions: Dimension<DimName, DimId>[] = pipe(
        denormalizedItems,
        map(item => keys(item.v) as DimName[]),
        flat(),
        unique(), // unique dimension names
        map((dimName, idx) => ({ id: (idx + 1) as DimId, name: dimName } satisfies Dimension<DimName, DimId>))
    );

    const dimensionsMap = new Map(dimensions.map(d => [d.name, d])) satisfies Map<DimName, Dimension<DimName, DimId>>;

    const values: ValueRow<V, ValId, DimId>[] = pipe(
        denormalizedItems,
        flatMap(item => entries(item.v) satisfies [DimName, V][]),
        uniqueBy(([dimName, val]) => `${dimName}:${val}`), // unique per dimension+value
        map(([dimName, val], idx) => {
            const dim = dimensionsMap.get(dimName)!;
            return { value_id: (idx + 1) as ValId, dimension_id: dim.id, value: val } satisfies ValueRow<V, ValId, DimId>;
        })
    );

    const valueMap = new Map(values.map(v => [`${v.dimension_id}:${v.value}`, v])) satisfies Map<`${DimId}:${V}`, ValueRow<V, ValId, DimId>>;

    const itemValues = pipe(
        denormalizedItems,
        flatMap(item =>
            entries(item.v).map(([dimName, val]) => {
                const dim = dimensionsMap.get(dimName)!;
                const valueRow = valueMap.get(`${dim.id}:${val}`)!;
                return { item_id: item.id, dimension_id: dim.id, value_id: valueRow.value_id } satisfies ItemValue<GItemId, DimId, ValId>;
            })
        )
    );

    return {
        items,
        dimensions,
        values,
        itemValues,
    };
}
