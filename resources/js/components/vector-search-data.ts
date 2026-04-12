import { Dimension, DimensionIndex, Item } from "@/components/vector-search"

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
] as const satisfies Item[]

export const demo_dimensions = [
    {
        "name": "class",
        "values": [
            {
                "value": "barbarian",
                "items": [
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
                        "id": 40,
                        "name": "Runa Frostaxe",
                        "v": {
                            "race": "dwarf",
                            "class": "barbarian",
                            "weapon": "axe",
                            "region": "north",
                            "guild": "Stoneheart Clan"
                        }
                    }
                ]
            },
            {
                "value": "bard",
                "items": [
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
                        "id": 38,
                        "name": "Urthok the Loud",
                        "v": {
                            "race": "orc",
                            "class": "bard",
                            "weapon": "drum",
                            "region": "west",
                            "guild": "Bloodmaw"
                        }
                    }
                ]
            },
            {
                "value": "blacksmith",
                "items": [
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
                        "id": 44,
                        "name": "Bael Ironforge",
                        "v": {
                            "race": "dwarf",
                            "class": "blacksmith",
                            "weapon": "hammer",
                            "region": "north",
                            "guild": "Runeforge"
                        }
                    }
                ]
            },
            {
                "value": "cleric",
                "items": [
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
                        "id": 43,
                        "name": "Tessa Sunheart",
                        "v": {
                            "race": "human",
                            "class": "cleric",
                            "weapon": "mace",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "druid",
                "items": [
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
                        "id": 41,
                        "name": "Elyse Moonleaf",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "staff",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            },
            {
                "value": "mage",
                "items": [
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
                        "id": 27,
                        "name": "Elric the Scholar",
                        "v": {
                            "race": "human",
                            "class": "mage",
                            "weapon": "book",
                            "region": "south",
                            "guild": "Crimson Circle"
                        }
                    }
                ]
            },
            {
                "value": "monk",
                "items": [
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
                    }
                ]
            },
            {
                "value": "paladin",
                "items": [
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
                        "id": 39,
                        "name": "Darin Flameward",
                        "v": {
                            "race": "human",
                            "class": "paladin",
                            "weapon": "sword",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "ranger",
                "items": [
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
                        "id": 29,
                        "name": "Arin Leafblade",
                        "v": {
                            "race": "elf",
                            "class": "ranger",
                            "weapon": "sword",
                            "region": "east",
                            "guild": "Silver Arrows"
                        }
                    }
                ]
            },
            {
                "value": "rogue",
                "items": [
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
                        "id": 14,
                        "name": "Korvak Doomblade",
                        "v": {
                            "race": "orc",
                            "class": "rogue",
                            "weapon": "dagger",
                            "region": "west",
                            "guild": "Bloodmaw"
                        }
                    }
                ]
            },
            {
                "value": "warrior",
                "items": [
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
                ]
            }
        ]
    },
    {
        "name": "guild",
        "values": [
            {
                "value": "Bloodmaw",
                "items": [
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
                ]
            },
            {
                "value": "Circle of Roots",
                "items": [
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
                        "id": 41,
                        "name": "Elyse Moonleaf",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "staff",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            },
            {
                "value": "Crimson Circle",
                "items": [
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
                        "id": 27,
                        "name": "Elric the Scholar",
                        "v": {
                            "race": "human",
                            "class": "mage",
                            "weapon": "book",
                            "region": "south",
                            "guild": "Crimson Circle"
                        }
                    }
                ]
            },
            {
                "value": "Runeforge",
                "items": [
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
                        "id": 44,
                        "name": "Bael Ironforge",
                        "v": {
                            "race": "dwarf",
                            "class": "blacksmith",
                            "weapon": "hammer",
                            "region": "north",
                            "guild": "Runeforge"
                        }
                    }
                ]
            },
            {
                "value": "Shadow Veil",
                "items": [
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
                        "id": 11,
                        "name": "Tarin Nightstep",
                        "v": {
                            "race": "human",
                            "class": "rogue",
                            "weapon": "dagger",
                            "region": "east",
                            "guild": "Shadow Veil"
                        }
                    }
                ]
            },
            {
                "value": "Silver Arrows",
                "items": [
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
                        "id": 29,
                        "name": "Arin Leafblade",
                        "v": {
                            "race": "elf",
                            "class": "ranger",
                            "weapon": "sword",
                            "region": "east",
                            "guild": "Silver Arrows"
                        }
                    }
                ]
            },
            {
                "value": "Stoneheart Clan",
                "items": [
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
                        "id": 40,
                        "name": "Runa Frostaxe",
                        "v": {
                            "race": "dwarf",
                            "class": "barbarian",
                            "weapon": "axe",
                            "region": "north",
                            "guild": "Stoneheart Clan"
                        }
                    }
                ]
            },
            {
                "value": "Sunspire Order",
                "items": [
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
                        "id": 43,
                        "name": "Tessa Sunheart",
                        "v": {
                            "race": "human",
                            "class": "cleric",
                            "weapon": "mace",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            }
        ]
    },
    {
        "name": "race",
        "values": [
            {
                "value": "dwarf",
                "items": [
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
                        "id": 44,
                        "name": "Bael Ironforge",
                        "v": {
                            "race": "dwarf",
                            "class": "blacksmith",
                            "weapon": "hammer",
                            "region": "north",
                            "guild": "Runeforge"
                        }
                    }
                ]
            },
            {
                "value": "elf",
                "items": [
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
                        "id": 41,
                        "name": "Elyse Moonleaf",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "staff",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            },
            {
                "value": "human",
                "items": [
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
                        "id": 43,
                        "name": "Tessa Sunheart",
                        "v": {
                            "race": "human",
                            "class": "cleric",
                            "weapon": "mace",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "orc",
                "items": [
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
                ]
            }
        ]
    },
    {
        "name": "region",
        "values": [
            {
                "value": "east",
                "items": [
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
                        "id": 41,
                        "name": "Elyse Moonleaf",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "staff",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            },
            {
                "value": "north",
                "items": [
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
                        "id": 44,
                        "name": "Bael Ironforge",
                        "v": {
                            "race": "dwarf",
                            "class": "blacksmith",
                            "weapon": "hammer",
                            "region": "north",
                            "guild": "Runeforge"
                        }
                    }
                ]
            },
            {
                "value": "south",
                "items": [
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
                        "id": 43,
                        "name": "Tessa Sunheart",
                        "v": {
                            "race": "human",
                            "class": "cleric",
                            "weapon": "mace",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "west",
                "items": [
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
                ]
            }
        ]
    },
    {
        "name": "weapon",
        "values": [
            {
                "value": "axe",
                "items": [
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
                        "id": 40,
                        "name": "Runa Frostaxe",
                        "v": {
                            "race": "dwarf",
                            "class": "barbarian",
                            "weapon": "axe",
                            "region": "north",
                            "guild": "Stoneheart Clan"
                        }
                    }
                ]
            },
            {
                "value": "book",
                "items": [
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
                    }
                ]
            },
            {
                "value": "bow",
                "items": [
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
                        "id": 13,
                        "name": "Lura Windwhisper",
                        "v": {
                            "race": "elf",
                            "class": "ranger",
                            "weapon": "bow",
                            "region": "east",
                            "guild": "Silver Arrows"
                        }
                    }
                ]
            },
            {
                "value": "club",
                "items": [
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
                        "id": 21,
                        "name": "Krag the Cruel",
                        "v": {
                            "race": "orc",
                            "class": "barbarian",
                            "weapon": "club",
                            "region": "west",
                            "guild": "Bloodmaw"
                        }
                    }
                ]
            },
            {
                "value": "dagger",
                "items": [
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
                        "id": 14,
                        "name": "Korvak Doomblade",
                        "v": {
                            "race": "orc",
                            "class": "rogue",
                            "weapon": "dagger",
                            "region": "west",
                            "guild": "Bloodmaw"
                        }
                    }
                ]
            },
            {
                "value": "drum",
                "items": [
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
                    }
                ]
            },
            {
                "value": "hammer",
                "items": [
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
                ]
            },
            {
                "value": "harp",
                "items": [
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
                    }
                ]
            },
            {
                "value": "mace",
                "items": [
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
                        "id": 43,
                        "name": "Tessa Sunheart",
                        "v": {
                            "race": "human",
                            "class": "cleric",
                            "weapon": "mace",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "spear",
                "items": [
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
                    }
                ]
            },
            {
                "value": "staff",
                "items": [
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
                        "id": 41,
                        "name": "Elyse Moonleaf",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "staff",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            },
            {
                "value": "sword",
                "items": [
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
                        "id": 39,
                        "name": "Darin Flameward",
                        "v": {
                            "race": "human",
                            "class": "paladin",
                            "weapon": "sword",
                            "region": "south",
                            "guild": "Sunspire Order"
                        }
                    }
                ]
            },
            {
                "value": "wand",
                "items": [
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
                        "id": 22,
                        "name": "Lyra Dawnpetal",
                        "v": {
                            "race": "elf",
                            "class": "druid",
                            "weapon": "wand",
                            "region": "east",
                            "guild": "Circle of Roots"
                        }
                    }
                ]
            }
        ]
    }
] as const satisfies Dimension[]

export const demo_dimension_index = {
    "class": {
        "barbarian": [
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
                "id": 40,
                "name": "Runa Frostaxe",
                "v": {
                    "race": "dwarf",
                    "class": "barbarian",
                    "weapon": "axe",
                    "region": "north",
                    "guild": "Stoneheart Clan"
                }
            }
        ],
        "bard": [
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
                "id": 38,
                "name": "Urthok the Loud",
                "v": {
                    "race": "orc",
                    "class": "bard",
                    "weapon": "drum",
                    "region": "west",
                    "guild": "Bloodmaw"
                }
            }
        ],
        "blacksmith": [
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
                "id": 44,
                "name": "Bael Ironforge",
                "v": {
                    "race": "dwarf",
                    "class": "blacksmith",
                    "weapon": "hammer",
                    "region": "north",
                    "guild": "Runeforge"
                }
            }
        ],
        "cleric": [
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
                "id": 43,
                "name": "Tessa Sunheart",
                "v": {
                    "race": "human",
                    "class": "cleric",
                    "weapon": "mace",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "druid": [
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
                "id": 41,
                "name": "Elyse Moonleaf",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "staff",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ],
        "mage": [
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
                "id": 27,
                "name": "Elric the Scholar",
                "v": {
                    "race": "human",
                    "class": "mage",
                    "weapon": "book",
                    "region": "south",
                    "guild": "Crimson Circle"
                }
            }
        ],
        "monk": [
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
            }
        ],
        "paladin": [
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
                "id": 39,
                "name": "Darin Flameward",
                "v": {
                    "race": "human",
                    "class": "paladin",
                    "weapon": "sword",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "ranger": [
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
                "id": 29,
                "name": "Arin Leafblade",
                "v": {
                    "race": "elf",
                    "class": "ranger",
                    "weapon": "sword",
                    "region": "east",
                    "guild": "Silver Arrows"
                }
            }
        ],
        "rogue": [
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
                "id": 14,
                "name": "Korvak Doomblade",
                "v": {
                    "race": "orc",
                    "class": "rogue",
                    "weapon": "dagger",
                    "region": "west",
                    "guild": "Bloodmaw"
                }
            }
        ],
        "warrior": [
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
        ]
    },
    "guild": {
        "Bloodmaw": [
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
        ],
        "Circle of Roots": [
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
                "id": 41,
                "name": "Elyse Moonleaf",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "staff",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ],
        "Crimson Circle": [
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
                "id": 27,
                "name": "Elric the Scholar",
                "v": {
                    "race": "human",
                    "class": "mage",
                    "weapon": "book",
                    "region": "south",
                    "guild": "Crimson Circle"
                }
            }
        ],
        "Runeforge": [
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
                "id": 44,
                "name": "Bael Ironforge",
                "v": {
                    "race": "dwarf",
                    "class": "blacksmith",
                    "weapon": "hammer",
                    "region": "north",
                    "guild": "Runeforge"
                }
            }
        ],
        "Shadow Veil": [
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
                "id": 11,
                "name": "Tarin Nightstep",
                "v": {
                    "race": "human",
                    "class": "rogue",
                    "weapon": "dagger",
                    "region": "east",
                    "guild": "Shadow Veil"
                }
            }
        ],
        "Silver Arrows": [
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
                "id": 29,
                "name": "Arin Leafblade",
                "v": {
                    "race": "elf",
                    "class": "ranger",
                    "weapon": "sword",
                    "region": "east",
                    "guild": "Silver Arrows"
                }
            }
        ],
        "Stoneheart Clan": [
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
                "id": 40,
                "name": "Runa Frostaxe",
                "v": {
                    "race": "dwarf",
                    "class": "barbarian",
                    "weapon": "axe",
                    "region": "north",
                    "guild": "Stoneheart Clan"
                }
            }
        ],
        "Sunspire Order": [
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
                "id": 43,
                "name": "Tessa Sunheart",
                "v": {
                    "race": "human",
                    "class": "cleric",
                    "weapon": "mace",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ]
    },
    "race": {
        "dwarf": [
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
                "id": 44,
                "name": "Bael Ironforge",
                "v": {
                    "race": "dwarf",
                    "class": "blacksmith",
                    "weapon": "hammer",
                    "region": "north",
                    "guild": "Runeforge"
                }
            }
        ],
        "elf": [
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
                "id": 41,
                "name": "Elyse Moonleaf",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "staff",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ],
        "human": [
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
                "id": 43,
                "name": "Tessa Sunheart",
                "v": {
                    "race": "human",
                    "class": "cleric",
                    "weapon": "mace",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "orc": [
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
        ]
    },
    "region": {
        "east": [
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
                "id": 41,
                "name": "Elyse Moonleaf",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "staff",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ],
        "north": [
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
                "id": 44,
                "name": "Bael Ironforge",
                "v": {
                    "race": "dwarf",
                    "class": "blacksmith",
                    "weapon": "hammer",
                    "region": "north",
                    "guild": "Runeforge"
                }
            }
        ],
        "south": [
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
                "id": 43,
                "name": "Tessa Sunheart",
                "v": {
                    "race": "human",
                    "class": "cleric",
                    "weapon": "mace",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "west": [
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
        ]
    },
    "weapon": {
        "axe": [
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
                "id": 40,
                "name": "Runa Frostaxe",
                "v": {
                    "race": "dwarf",
                    "class": "barbarian",
                    "weapon": "axe",
                    "region": "north",
                    "guild": "Stoneheart Clan"
                }
            }
        ],
        "book": [
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
            }
        ],
        "bow": [
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
                "id": 13,
                "name": "Lura Windwhisper",
                "v": {
                    "race": "elf",
                    "class": "ranger",
                    "weapon": "bow",
                    "region": "east",
                    "guild": "Silver Arrows"
                }
            }
        ],
        "club": [
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
                "id": 21,
                "name": "Krag the Cruel",
                "v": {
                    "race": "orc",
                    "class": "barbarian",
                    "weapon": "club",
                    "region": "west",
                    "guild": "Bloodmaw"
                }
            }
        ],
        "dagger": [
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
                "id": 14,
                "name": "Korvak Doomblade",
                "v": {
                    "race": "orc",
                    "class": "rogue",
                    "weapon": "dagger",
                    "region": "west",
                    "guild": "Bloodmaw"
                }
            }
        ],
        "drum": [
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
            }
        ],
        "hammer": [
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
        ],
        "harp": [
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
            }
        ],
        "mace": [
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
                "id": 43,
                "name": "Tessa Sunheart",
                "v": {
                    "race": "human",
                    "class": "cleric",
                    "weapon": "mace",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "spear": [
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
            }
        ],
        "staff": [
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
                "id": 41,
                "name": "Elyse Moonleaf",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "staff",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ],
        "sword": [
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
                "id": 39,
                "name": "Darin Flameward",
                "v": {
                    "race": "human",
                    "class": "paladin",
                    "weapon": "sword",
                    "region": "south",
                    "guild": "Sunspire Order"
                }
            }
        ],
        "wand": [
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
                "id": 22,
                "name": "Lyra Dawnpetal",
                "v": {
                    "race": "elf",
                    "class": "druid",
                    "weapon": "wand",
                    "region": "east",
                    "guild": "Circle of Roots"
                }
            }
        ]
    }
} as const satisfies DimensionIndex