import { demo_data } from "@/components/vector-search-data"
import { buildIndexes, normalizeData } from "@/components/vector-search-normalized"
import { Bench } from "tinybench"

export const bench = new Bench({ time: 100 }) // 100ms per test
const normalized_data =  normalizeData(demo_data)

bench
  .add("normalizeData", () => {
    normalizeData(demo_data)
  })
  .add("buildIndexes", () => {
    buildIndexes(normalized_data)
  })

await bench.run()

console.table(bench.table())
