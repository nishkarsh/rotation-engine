## Rotation Engine

This is a typescript based node project for demonstration purposes to stream a given input CSV file in a specific format, parse it's content and
execute an algorithm to rotate the elements specified in the CSV file (see format below) considering it as a 2-D table
of elements.

## Requirements

- **npm  >= 8.11.0**
- **node >= 16.16.0**

## Usage

- Install the dependencies using `npm install`
- Build project using `npm run build`
- Change directory to `dist/`
- Use command `node cli.js <input.csv> > <output.csv>` to process the entries in `<input.csv>` and write the output to `<output.csv>`

**Try Out:**

```
   npm install
   npm run build
   cd dist/
   node cli.js samples/sample-input.csv > test-output.csv
```

## Functioning

- The input CSV file is streamed through a CSV parser (from `csv-parse` lib) to generate CSV entries.
- The JSON array present in the `json` column of the CSV entries are then validated for a square table using a custom `Validator`.
- The valid tables are then passed through a `SingleElementRotator` that rotates the elements of the imaginary 2-D `Table` according to the necessary given logic (specified below).
- The final `OutputRow` is finally formatted using `csv-stringify` lib and written to `stdout`.

## Sample Input/Output CSV

**Input CSV:**
```
id,json
1,"[1,2,3,4]"
2,"[1,2,3,4,5,6,7,8,9]"
3,"[1,2]"
4,"[]"
5,"[1]"
```

**Output CSV:**
```
id,json,is_valid
1,"[3,1,4,2]",true
2,"[4,1,2,7,5,3,8,9,6]",true
3,"[]",false
4,"[]",true
5,"[1]",true
```

## Handled Cases
- An empty JSON array in input CSV.
- A single element JSON array in input CSV.
- A 9801 (99 x 99) elements JSON array in input CSV.
- An invalid table (i.e. a non-square table).

## Out of Scope Cases
- Handling invalid JSON in input CSV, e.g. `""`
- Processing the streams in parallel

## Things kept in mind
- Splitting the logic across entities ensuring each module has a single responsibility.
- Streaming through the data to ensure proper usage of memory.
- Each component with business logic is Unit tested.
- An integration test hooks all the components and test the processing of `sample-input.csv`.
- The design is Object-Oriented with the scope to extend the functionality by replacing the injected components with their replacements.