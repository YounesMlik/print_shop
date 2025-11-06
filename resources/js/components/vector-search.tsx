import { Button } from "@/components/ui/button";
import { useState } from "react";
import { entries, filter, find, flat, fromEntries, groupBy, map, omit, pipe, sortBy, sum, values, prop, piped, reduce, keys } from "remeda";
import { ArrayValues, PartialDeep, ValueOf } from "type-fest";
// @ts-ignore
import { assocPath, path } from "ramda";
import { FastFlavor } from "@coderspirit/nominal"
import { DropFirst } from "type-plus";
import { demo_data, demo_dimensions, demo_dimension_index } from "@/components/vector-search-data";
import { buildIndexes, normalizeData } from "@/components/vector-search-normalized";
import { bench } from "@/components/vector-search-benchmark";

const query: Query<typeof demo_data> = { race: "elf", class: "mage" };

type Query<D extends readonly Item[]> = Partial<ArrayValues<D>["v"]>

function categoricalSimilarity<D extends DimensionName>(vector: FullVector<D, any>, query: PartialVector<D, any>): number {
    return pipe(
        vector,
        entries(),
        map(([k, v]) =>
            typeof query[k] === "number" && typeof v === "number"
                ? (query[k] === v ? 1 : 0)
                : (query[k] === v ? 1 : 0)
        ),
        sum(),
        score => score / Math.min(values(vector).length, values(query).length)
    )
};

function extractDimensions(data: Item[]): Dimension[] {
    return pipe(
        data,
        map(item => pipe(
            item,
            item => item.v,
            entries(),
            map(([dimension_name, value]) => ({ dimension_name, value, item })),
        )),
        flat(),
        groupBy(({ dimension_name }) => dimension_name),             // group by dimension_name
        entries(),
        map(
            ([name, rows]) =>
            ({
                name: name,
                values: pipe(
                    rows,
                    groupBy(({ value }) => value),             // group by value
                    entries(),
                    map(([value, rows]) => ({
                        value: value,
                        items: rows.map(({ item }) => item),
                    })),
                    sortBy(v => v.value),
                ),
            }),
        ),
        sortBy(d => d.name),
    );
}

function BuildDimensionIndex(dimensions: Dimension[]): DimensionIndex {
    return pipe(
        dimensions,
        map(
            ({ name, values }) =>
                [
                    name,
                    pipe(
                        values,
                        map(({ value, items }) => [value, items] as const),
                        fromEntries(),
                    )
                ] as const
        ),
        fromEntries(),
    );
}

function orderBySimilarity(data: Item[], query: Vector): Item[] {
    return pipe(
        data,
        map(o => ({ ...o, score: categoricalSimilarity(o.v, query) })),
        sortBy(o => -o.score)
    );
}

function availableOptions(
    variants: Item[],
    selected: Vector
): Dimension[] {
    return pipe(
        variants,
        filter(item => pipe(
            selected,
            entries(),
            (s) => s.every(([key, value]) => item.v[key] === value),
        )),
        extractDimensions,
    )
}

// function displayDimensions(
//     data: Item[],
//     dimensions: Dimension[],
//     selected: FullVector,
// ): Dimension[] {
//     return pipe(
//         dimensions,
//         map(dimension => selected[dimension.name]),
//     )
// }

// function filterDimension<D extends Dimension[], N extends DimensionName>(
//     data: Item[],
//     dimensions: D,
//     dimension_name: N,
//     selected: FullVector<ArrayValues<D>["name"]>,
// ): Dimension<N> {
//     const original_dimension = dimensions.find(dimension => dimension.name === dimension_name)
//     const search_vector = omit(selected, [dimension_name])
//     return pipe(
//         data,
//         data => filterData(data, search_vector),
//         extractDimensions,
//         find(dimension => dimension.name === dimension_name),
//         dimension => original_dimension
//     )!
// }

function filterData(
    data: Item[],
    selected: Vector,
): Item[] {
    return pipe(
        data,
        filter(
            item => categoricalSimilarity(item.v, selected) === 1
        )
    )
}

function BuildRecursiveIndex(
    data: Item[],
    order: Order
): RecursiveIndex {
    if (order.length === 0) {
        throw new Error("empty dimension order")
    }

    return pipe(
        data,
        map(
            item => ({
                arr: order.map(dimension_name => item.v[dimension_name]),
                item: item,
            })
        ),
        reduce(
            (acc, { arr, item }) =>
                assocPath(
                    arr,
                    [...path(arr, acc) ?? [], item],
                    acc
                ),
            {} as object,
        ),
    ) as RecursiveIndex;
}

const order = [
    "class",
    "guild",
    "race",
    "region",
    "weapon",
] as const
export type DimensionName = FastFlavor<string, "DimensionName">
export type Value = FastFlavor<string, "Value">
type ItemId = FastFlavor<number, "ItemId">

export type Vector<D extends DimensionName = DimensionName, V extends Value = Value> = Record<D, V>
export type FullVector<D extends DimensionName, V extends Value = Value> = Vector<D, V>
export type PartialVector<D extends DimensionName, V extends Value = Value> = Partial<Vector<D, V>>
export type Order<D extends DimensionName = DimensionName> = readonly D[]
export type DimensionIndex<N extends DimensionName = DimensionName, V extends Value = Value, I extends Item = Item> = Record<N, Record<V, I[]>>
export type DimensionValueIndex<N extends DimensionName = DimensionName, V extends Value = Value> = Record<N, V[]>
export type DisplayIndex = Record<DimensionName, RecursiveIndex>
export type RecursiveIndex = { [K: Value]: RecursiveIndex | Item[] }
export type ItemIndex = Record<Value, Item[]>
export type Dimension<N extends DimensionName = DimensionName, V extends Value = Value, I extends Item = Item> = {
    name: N,
    values: { value: V, items: I[] }[]
}
export type Item<V extends Vector = Vector, I extends ItemId = ItemId> = { id: I, name: string, v: V, [key: string]: any }


export function VectorSearchDemo({ data }: { data: Item[] }) {
    const [selectedItem, setSelectedOption] = useState(() => data[0])
    const dimensions = extractDimensions(data)
    const available_data = data
    const available_dimensions = extractDimensions(available_data)


    console.log(normalizeData(data));
    console.log(buildIndexes(normalizeData(data)));
    // console.table(bench.table())

    // console.log(orderBySimilarity(data, query));
    // console.log(extractDimensions(data));
    // console.log(BuildDimensionIndex(dimensions));
    // console.log(BuildRecursiveIndex(data, order));
    // console.log(availableOptions(data, query));
    // console.log(displayDimensions(data, dimensions, selectedItem.v));
    // console.log(filteredDimensionCardinality(data, dimensions, "class", selectedItem.v));


    return (
        <table>
            <tbody>
                {dimensions.map(({ name, values }) => (
                    <tr key={name}>
                        <td>{name} :</td>
                        {values.map(({ value, items }) => (
                            <td key={value}>
                                <Button variant={selectedItem.v[name] === value ? "default" : "secondary"}>
                                    {value} : {items.length}
                                </Button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


type RecursiveIndex1<O extends Order = Order, D extends DimensionIndex = DimensionIndex> =
    [...O] extends [infer Head extends DimensionName, ...infer Rest extends Order]
    ? { [K in DimensionValueIndexFromDimensionIndex<D>[Head]]: RecursiveIndex1<Rest, D> }
    : Item[]

const arr = ["a", "b"] as const
type A1 = RecursiveIndex1<["a", "b"], { a: { a1: [], a2: [] }, b: { b1: [], b2: [] } }>
type A2 = RecursiveIndex1<typeof arr, { a: { a1: [], a2: [] }, b: { b1: [], b2: [] } }>
type A3 = RecursiveIndex1<typeof order, typeof demo_dimension_index>

const a: PartialDeep<A3> = { barbarian: { Runeforge: { dwarf: { east: { axe: [{ id: 5, name: "waa", v: {} }] } } } } }


type DimensionValueIndexFromDimensionIndex<DI extends DimensionIndex> = { [K in keyof DI]: keyof DI[K] }

type B = DimensionValueIndexFromDimensionIndex<{ a: { a1: [], a2: [] }, b: { b1: [], b2: [] } }>

type Cons<T extends readonly unknown[]> =
    T extends [infer Head, ...infer Tail]
    ? [Head, Cons<Tail>]
    : "end"


// type GenericRecursiveIndex<V, O extends readonly string[], D extends Record<string, string[]>> =
//     [...O] extends [infer Head extends keyof D, ...infer Tail extends readonly string[]]
//     ? { [K in D[Head][number]]: GenericRecursiveIndex<V, Tail, D> }
//     : V
type GenericRecursiveIndex<
    V,
    O extends readonly string[],
    D extends Record<string, string[]>,
    Path extends string[] = []
> =
    [...O] extends [infer Head extends keyof D, ...infer Tail extends readonly (string)[]]
    ? Tail extends []
    ? { [K in D[Head][number]]: [[...Path, K], V] }
    : { [K in D[Head][number]]: GenericRecursiveIndex<V, Tail, D, [...Path, K]> }
    : never;
type GenericRecursiveIndex1<
    V,
    O extends readonly (keyof D)[],
    D extends Record<string, string[]>,
    Path extends string[] = []
> =
    [...O] extends [infer Head extends keyof D, ...infer Tail extends readonly (keyof D)[]]
    ? Tail extends []
    // base case — include full path
    ? { [K in D[Head][number]]: [...Path, K, V] }
    // recursive case — accumulate path
    : { [K in D[Head][number]]: GenericRecursiveIndex1<V, Tail, D, [...Path, K]> }
    : never;

type Foo = GenericRecursiveIndex<number, ["a", "b"], { a: ["a1", "a2"], b: ["b1", "b2"] }>


