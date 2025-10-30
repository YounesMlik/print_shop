import { Button } from "@/components/ui/button";
import { useState } from "react";
import { countBy, entries, filter, find, flat, groupBy, isDeepEqual, map, mapValues, omit, pipe, piped, sortBy, sum, uniqueWith, values, } from "remeda";
import { SimplifyDeep, ArrayValues, ReadonlyDeep } from "type-fest";

const query: Partial<ArrayValues<typeof demo_data>["v"]> = { race: "elf", class: "mage" };

function categoricalSimilarity(vector: Vector, query: Vector): number {
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
        map(d => entries(d.v)),
        flat(),         // flatten {v} to key-value pairs
        groupBy(([key, _]) => key),             // group by key
        entries(),
        map(
            ([name, pairs]) => ({
                name: name,
                values: pipe(pairs,
                    map(pair => pair[1]),
                    countBy(v => v),
                    entries(),
                    map(([value, cardinality]) => ({ value: value, cardinality: cardinality })),
                    sortBy(v => v.value),
                ),
            }),
        ),
        sortBy(d => d.name),
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

function filteredDimensionCardinality(
    data: Item[],
    dimensions: Dimension[],
    dimension_name: string,
    selected: FullVector,
): Dimension {
    const original_dimension = dimensions.find(dimension => dimension.name === dimension_name)
    return pipe(
        data,
        data => filterData(data, omit(selected, [dimension_name])),
        extractDimensions,
        find(dimension => dimension.name === dimension_name),
        dimension => original_dimension
    )!
}

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

type Vector = Record<string, string>
type Dimension = { name: string, values: Value[] }
type Value = { value: string, cardinality: number }
type Value1 = { value: string, items: Item[], }
type Item = { id: number, v: Vector }

type FullVector = Vector

export function VectorSearchDemo({ data }: { data: Item[] }) {
    const [selectedItem, setSelectedOption] = useState(() => data[0])
    const dimensions = extractDimensions(data)
    const available_data = data
    const available_dimensions = extractDimensions(available_data)

    console.log(orderBySimilarity(data, query));
    console.log(extractDimensions(data));
    // console.log(availableOptions(data, query));
    // console.log(displayDimensions(data, dimensions, selectedItem.v));
    // console.log(filteredDimensionCardinality(data, dimensions, "class", selectedItem.v));


    return (
        <table>
            <tbody>
                {dimensions.map(({ name, values }) => (
                    <tr key={name}>
                        <td>{name} :</td>
                        {values.map(({ value, cardinality }) => (
                            <td key={value}>
                                <Button variant={selectedItem.v[name] === value ? "default" : "secondary"}>
                                    {value} : {cardinality}
                                </Button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export const demo_data = [
    {
        "id": 1,
        "name": "Aeliryn the Swift",
        "v": {
            "race": "elf",
            "class": "rogue",
            "weapon": "dagger",
            "region": "east",
            "guild": "Shadow Veil"
        }
    },
    {
        "id": 2,
        "name": "Throg Ironfist",
        "v": {
            "race": "dwarf",
            "class": "warrior",
            "weapon": "axe",
            "region": "north",
            "guild": "Stoneheart Clan"
        }
    },
    {
        "id": 3,
        "name": "Mira of the Flame",
        "v": {
            "race": "human",
            "class": "mage",
            "weapon": "staff",
            "region": "south",
            "guild": "Crimson Circle"
        }
    },
    {
        "id": 4,
        "name": "Gruk the Butcher",
        "v": {
            "race": "orc",
            "class": "warrior",
            "weapon": "club",
            "region": "west",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 5,
        "name": "Selene Whisperwind",
        "v": {
            "race": "elf",
            "class": "mage",
            "weapon": "wand",
            "region": "east",
            "guild": "Crimson Circle"
        }
    },
    {
        "id": 6,
        "name": "Drogan Blackeye",
        "v": {
            "race": "human",
            "class": "rogue",
            "weapon": "sword",
            "region": "south",
            "guild": "Shadow Veil"
        }
    },
    {
        "id": 7,
        "name": "Fjor Stormcaller",
        "v": {
            "race": "dwarf",
            "class": "mage",
            "weapon": "hammer",
            "region": "north",
            "guild": "Runeforge"
        }
    },
    {
        "id": 8,
        "name": "Kara the Huntress",
        "v": {
            "race": "human",
            "class": "ranger",
            "weapon": "bow",
            "region": "west",
            "guild": "Silver Arrows"
        }
    },
    {
        "id": 9,
        "name": "Varg Skullsplitter",
        "v": {
            "race": "orc",
            "class": "barbarian",
            "weapon": "axe",
            "region": "north",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 10,
        "name": "Elandra Moonglow",
        "v": {
            "race": "elf",
            "class": "cleric",
            "weapon": "staff",
            "region": "east",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 11,
        "name": "Tarin Nightstep",
        "v": {
            "race": "human",
            "class": "rogue",
            "weapon": "dagger",
            "region": "east",
            "guild": "Shadow Veil"
        }
    },
    {
        "id": 12,
        "name": "Brunna Stonehelm",
        "v": {
            "race": "dwarf",
            "class": "cleric",
            "weapon": "hammer",
            "region": "north",
            "guild": "Runeforge"
        }
    },
    {
        "id": 13,
        "name": "Lura Windwhisper",
        "v": {
            "race": "elf",
            "class": "ranger",
            "weapon": "bow",
            "region": "east",
            "guild": "Silver Arrows"
        }
    },
    {
        "id": 14,
        "name": "Korvak Doomblade",
        "v": {
            "race": "orc",
            "class": "rogue",
            "weapon": "dagger",
            "region": "west",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 15,
        "name": "Darian Fireheart",
        "v": {
            "race": "human",
            "class": "mage",
            "weapon": "wand",
            "region": "south",
            "guild": "Crimson Circle"
        }
    },
    {
        "id": 16,
        "name": "Thalric the Wise",
        "v": {
            "race": "elf",
            "class": "mage",
            "weapon": "staff",
            "region": "east",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 17,
        "name": "Morra Bonecrusher",
        "v": {
            "race": "orc",
            "class": "warrior",
            "weapon": "axe",
            "region": "north",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 18,
        "name": "Vela Starborn",
        "v": {
            "race": "elf",
            "class": "cleric",
            "weapon": "wand",
            "region": "east",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 20,
        "name": "Seren Ashleaf",
        "v": {
            "race": "human",
            "class": "druid",
            "weapon": "staff",
            "region": "south",
            "guild": "Circle of Roots"
        }
    },
    {
        "id": 21,
        "name": "Krag the Cruel",
        "v": {
            "race": "orc",
            "class": "barbarian",
            "weapon": "club",
            "region": "west",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 22,
        "name": "Lyra Dawnpetal",
        "v": {
            "race": "elf",
            "class": "druid",
            "weapon": "wand",
            "region": "east",
            "guild": "Circle of Roots"
        }
    },
    {
        "id": 23,
        "name": "Torren Emberforge",
        "v": {
            "race": "dwarf",
            "class": "blacksmith",
            "weapon": "hammer",
            "region": "north",
            "guild": "Stoneheart Clan"
        }
    },
    {
        "id": 25,
        "name": "Nira Dreamsong",
        "v": {
            "race": "elf",
            "class": "bard",
            "weapon": "harp",
            "region": "east",
            "guild": "Silver Arrows"
        }
    },
    {
        "id": 27,
        "name": "Elric the Scholar",
        "v": {
            "race": "human",
            "class": "mage",
            "weapon": "book",
            "region": "south",
            "guild": "Crimson Circle"
        }
    },
    {
        "id": 28,
        "name": "Brenna Stoneshield",
        "v": {
            "race": "dwarf",
            "class": "paladin",
            "weapon": "mace",
            "region": "north",
            "guild": "Runeforge"
        }
    },
    {
        "id": 29,
        "name": "Arin Leafblade",
        "v": {
            "race": "elf",
            "class": "ranger",
            "weapon": "sword",
            "region": "east",
            "guild": "Silver Arrows"
        }
    },
    {
        "id": 31,
        "name": "Lysa Brightwind",
        "v": {
            "race": "human",
            "class": "cleric",
            "weapon": "staff",
            "region": "south",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 32,
        "name": "Dorin Ironroot",
        "v": {
            "race": "dwarf",
            "class": "druid",
            "weapon": "hammer",
            "region": "north",
            "guild": "Circle of Roots"
        }
    },
    {
        "id": 33,
        "name": "Eryndor the Calm",
        "v": {
            "race": "elf",
            "class": "monk",
            "weapon": "staff",
            "region": "east",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 34,
        "name": "Korr Bloodspear",
        "v": {
            "race": "orc",
            "class": "barbarian",
            "weapon": "spear",
            "region": "north",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 38,
        "name": "Urthok the Loud",
        "v": {
            "race": "orc",
            "class": "bard",
            "weapon": "drum",
            "region": "west",
            "guild": "Bloodmaw"
        }
    },
    {
        "id": 39,
        "name": "Darin Flameward",
        "v": {
            "race": "human",
            "class": "paladin",
            "weapon": "sword",
            "region": "south",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 40,
        "name": "Runa Frostaxe",
        "v": {
            "race": "dwarf",
            "class": "barbarian",
            "weapon": "axe",
            "region": "north",
            "guild": "Stoneheart Clan"
        }
    },
    {
        "id": 41,
        "name": "Elyse Moonleaf",
        "v": {
            "race": "elf",
            "class": "druid",
            "weapon": "staff",
            "region": "east",
            "guild": "Circle of Roots"
        }
    },
    {
        "id": 43,
        "name": "Tessa Sunheart",
        "v": {
            "race": "human",
            "class": "cleric",
            "weapon": "mace",
            "region": "south",
            "guild": "Sunspire Order"
        }
    },
    {
        "id": 44,
        "name": "Bael Ironforge",
        "v": {
            "race": "dwarf",
            "class": "blacksmith",
            "weapon": "hammer",
            "region": "north",
            "guild": "Runeforge"
        }
    },
    {
        "id": 50,
        "name": "Urgath Doomhammer",
        "v": {
            "race": "orc",
            "class": "warrior",
            "weapon": "hammer",
            "region": "west",
            "guild": "Bloodmaw"
        }
    }
] as const

const demo_dimensions = [
    {
        "name": "class",
        "values": [
            {
                "value": "barbarian",
                "cardinality": 4
            },
            {
                "value": "bard",
                "cardinality": 2
            },
            {
                "value": "blacksmith",
                "cardinality": 2
            },
            {
                "value": "cleric",
                "cardinality": 5
            },
            {
                "value": "druid",
                "cardinality": 4
            },
            {
                "value": "mage",
                "cardinality": 6
            },
            {
                "value": "monk",
                "cardinality": 1
            },
            {
                "value": "paladin",
                "cardinality": 2
            },
            {
                "value": "ranger",
                "cardinality": 3
            },
            {
                "value": "rogue",
                "cardinality": 4
            },
            {
                "value": "warrior",
                "cardinality": 4
            }
        ]
    },
    {
        "name": "guild",
        "values": [
            {
                "value": "Bloodmaw",
                "cardinality": 8
            },
            {
                "value": "Circle of Roots",
                "cardinality": 4
            },
            {
                "value": "Crimson Circle",
                "cardinality": 4
            },
            {
                "value": "Runeforge",
                "cardinality": 4
            },
            {
                "value": "Shadow Veil",
                "cardinality": 3
            },
            {
                "value": "Silver Arrows",
                "cardinality": 4
            },
            {
                "value": "Stoneheart Clan",
                "cardinality": 3
            },
            {
                "value": "Sunspire Order",
                "cardinality": 7
            }
        ]
    },
    {
        "name": "race",
        "values": [
            {
                "value": "dwarf",
                "cardinality": 8
            },
            {
                "value": "elf",
                "cardinality": 11
            },
            {
                "value": "human",
                "cardinality": 10
            },
            {
                "value": "orc",
                "cardinality": 8
            }
        ]
    },
    {
        "name": "region",
        "values": [
            {
                "value": "east",
                "cardinality": 12
            },
            {
                "value": "north",
                "cardinality": 11
            },
            {
                "value": "south",
                "cardinality": 8
            },
            {
                "value": "west",
                "cardinality": 6
            }
        ]
    },
    {
        "name": "weapon",
        "values": [
            {
                "value": "axe",
                "cardinality": 4
            },
            {
                "value": "book",
                "cardinality": 1
            },
            {
                "value": "bow",
                "cardinality": 2
            },
            {
                "value": "club",
                "cardinality": 2
            },
            {
                "value": "dagger",
                "cardinality": 3
            },
            {
                "value": "drum",
                "cardinality": 1
            },
            {
                "value": "hammer",
                "cardinality": 6
            },
            {
                "value": "harp",
                "cardinality": 1
            },
            {
                "value": "mace",
                "cardinality": 2
            },
            {
                "value": "spear",
                "cardinality": 1
            },
            {
                "value": "staff",
                "cardinality": 7
            },
            {
                "value": "sword",
                "cardinality": 3
            },
            {
                "value": "wand",
                "cardinality": 4
            }
        ]
    }
]