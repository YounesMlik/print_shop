import { FastFlavor } from "@coderspirit/nominal"
import { pipe, map, entries, flatMap, unique, uniqueBy, keys, omit, flat, groupBy, mapValues, fromEntries, groupByProp, reduce, isDeepEqual } from "remeda";
import { stringify } from "safe-stable-stringify";
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
    = {
        id: Id,  // primary
        name: Name,
        v: Record<DimName, V>,
    }

type Item<Name extends ItemName = ItemName, Id extends ItemId = ItemId>
    = {
        id: Id,  // primary
        name: Name,
    }
type Dimension<Name extends DimensionName = DimensionName, Id extends DimensionId = DimensionId,>
    = {
        id: Id,  // primary
        name: Name,
    }
type ValueRow<V extends Value = Value, ValId extends ValueId = ValueId, DimId extends DimensionId = DimensionId>
    = {
        dimension_id: DimId,  // primary
        value_id: ValId,  // primary
        value: V,
    }
type ItemValue<I extends ItemId = ItemId, D extends DimensionId = DimensionId, V extends ValueId = ValueId>
    = {
        item_id: I,  // primary
        dimension_id: D,  // primary
        value_id: V,
    }

type NormalizedData<
    I extends Item = Item,
    D extends Dimension = Dimension,
    V extends ValueRow = ValueRow,
    IV extends ItemValue = ItemValue
> = {
    items: I[],
    dimensions: D[],
    values: V[],
    itemValues: IV[],
}

type ItemVector<D extends DimensionId = DimensionId, V extends ValueId = ValueId> = Record<D, V>

type DataIndexes<
    I extends Item = Item,
    D extends Dimension = Dimension,
    V extends ValueRow = ValueRow,
    IV extends ItemValue = ItemValue,
    Iid extends I["id"] = I["id"],
    Did extends D["id"] = D["id"],
    Vid extends V["value_id"] = V["value_id"],
> = {
    items: Record<Iid, I>,
    dimensions: Record<Did, D>,
    values: Map<{ dimension_id: Did, value_id: Vid }, V>,
    itemValues: Map<{ item_id: Iid, dimension_id: Did }, IV>,

    valuesByDimension: Record<Did, V[]>,
    itemValuesByItem: Record<Iid, IV[]>,
    itemValuesByDimension: Record<Did, IV[]>,
    itemsByValue: Map<{ dimension_id: Did, value_id: Vid }, Iid[]>,

    itemVectors: Record<Iid, ItemVector<Did, Vid>>,
    valuesByDim: Record<Did, Vid[]>,
};


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

    type CounterState = Record<DimId, ValId>;
    const my_values: ValueRow<V, ValId, DimId>[] = pipe(
        denormalizedItems,
        flatMap(item => entries(item.v) as [DimName, V][]),
        vectors => uniqueBy(vectors, ([dimName, val]) => `${dimName}:${val}`) satisfies [DimName, V][],
        vals =>
            vals.reduce(
                ({ counters, values }, [dimName, val]) => {
                    const dim = dimensionsMap.get(dimName)!;
                    const id = (counters[dim.id] ?? 0) + 1;

                    return {
                        counters: { ...counters, [dim.id]: id } satisfies CounterState,
                        values: [...values, { value_id: id as ValId, dimension_id: dim.id, value: val }]
                    };
                },
                { counters: {} as CounterState, values: [] as ValueRow<V, ValId, DimId>[] }
            ).values
    );

    const valueMap = new Map(my_values.map(v => [`${v.dimension_id}:${v.value}`, v])) satisfies Map<`${DimId}:${V}`, ValueRow<V, ValId, DimId>>;

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
        values: my_values,
        itemValues,
    };
}

export function buildIndexes<
    I extends Item = Item,
    D extends Dimension = Dimension,
    V extends ValueRow = ValueRow,
    IV extends ItemValue = ItemValue
>
    (data: NormalizedData<I, D, V, IV>)
    : DataIndexes<I, D, V, IV> {
    const items = mapBy(data.items, i => i.id);
    const dimensions = mapBy(data.dimensions, d => d.id);
    const my_values = mapByPair(data.values, v => ({ dimension_id: v.dimension_id, value_id: v.value_id }));
    const itemValues = mapByPair(data.itemValues, iv => ({ item_id: iv.item_id, dimension_id: iv.dimension_id }));
    const valuesByDimension = groupBy(data.values, v => v.dimension_id);
    const itemValuesByItem = groupBy(data.itemValues, iv => iv.item_id);
    const itemValuesByDimension = groupBy(data.itemValues, iv => iv.dimension_id);
    type Key = { dimension_id: D["id"]; value_id: V["value_id"] };

    const itemsByValue = pipe(
        data.itemValues satisfies IV[],
        reduce(
            (state, iv) => {
                const key: Key = { dimension_id: iv.dimension_id, value_id: iv.value_id };
                const hash = `${key.dimension_id}:${key.value_id}`;
                let realKey = state.index.get(hash);
                if (!realKey) {
                    // first time seeing this combination
                    realKey = key;
                    state.index.set(hash, realKey);
                    state.map.set(realKey, []);
                }
                state.map.get(realKey)!.push(iv.item_id);
                return state;
            },
            {
                map: new Map<Key, I["id"][]>(),
                index: new Map<string, Key>(), // internal lookup table
            }
        ),
        state => state.map
    );
    const itemValuesByValue = groupByCompositeKey(
        data.itemValues,
        iv => ({ dimension_id: iv.dimension_id, value_id: iv.value_id }),
        iv => iv.item_id,
    );
    // console.log(itemValuesByValue);
    console.log(isDeepEqual(itemsByValue.entries().toArray(), itemValuesByValue.entries().toArray()));


    const itemVectors = pipe(
        data.itemValues,
        groupBy(iv => iv.item_id),
        mapValues(ivs =>
            pipe(
                ivs,
                map(iv => [iv.dimension_id, iv.value_id] as const),
                Object.fromEntries
            )
        )
    );

    const valuesByDim = pipe(
        data.values,
        groupBy(v => v.dimension_id),
        mapValues(vs => vs.map(v => v.value_id))
    );

    return {
        items,
        dimensions,
        values: my_values,
        itemValues,
        valuesByDimension,
        itemValuesByItem,
        itemValuesByDimension,
        itemVectors,
        itemsByValue,
        valuesByDim,
    };
};

function mapBy<T, K extends PropertyKey>(list: readonly T[], keyFn: (item: T) => K): Record<K, T> {
    return Object.fromEntries(list.map(item => [keyFn(item), item])) as Record<K, T>;
}

function mapByPair<T, K>(list: readonly T[], keyFn: (item: T) => K): Map<K, T> {
    return new Map(list.map(item => [keyFn(item), item]));
}

export function groupByCompositeKey<T, K extends object, O = T>(
    list: readonly T[],
    keyFn: (item: T) => K,
    mapFn: (item: T) => O = (item => item as unknown as O),
): Map<K, O[]> {
    type State = {
        groupMap: Map<K, O[]>;
        index: Map<string, K>;
    };

    return pipe(
        list,
        reduce<T, State>(
            (state, item) => {
                const key = keyFn(item);
                const hash = stringify(key);

                const realKey = getOrCreateMapEntry(state.index, hash, key);
                const group = getOrCreateMapEntry(state.groupMap, realKey, []);
                group.push(mapFn(item));

                return state;
            },
            {
                groupMap: new Map<K, O[]>(),
                index: new Map<string, K>(),
            }
        ),
        state => state.groupMap
    );
}

function getOrCreateMapEntry<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    let entry = map.get(key);
    if (!entry) {
        entry = defaultValue;
        map.set(key, entry);
    }
    return entry;
}