

# JsonSki VSCode Extension 

JSONSki is **a streaming JSONPath processor** with **fast-forward** functionality. During the streaming, it can automatically fast-forward over certain JSON substructures that are irrelavent to the query evaluation, without parsing them in detail. To make the fast-forward efficient, JSONSki features a highly bit-parallel solution that intensively utilizes bitwise and SIMD operations that are prevelent on modern CPUs to implement the fast-forward APIs. 

## How to use

https://user-images.githubusercontent.com/55717003/219509188-986f8260-4bd6-4aa3-b419-0f3b0b38ea0e.mp4

1. Open a JSON file in the active Editor and Type JSONSKI.

2. Open the Input box (CMD + SHIFT + P) on your VSCode editor.

3. Choose between creating a boiler Plate and Querying JSON.

4. Enter the JSONSki Query

5. Find your results in results.json

## Queries supported by JSONSki

### JSONPath
JSONPath is the basic query language of JSON data. It refers to substructures of JSON data in a similar way as XPath queries are used for XML data. For the details of JSONPath syntax, please refer to [Stefan Goessner's article](https://goessner.net/articles/JsonPath/index.html#e2). 

#### Supported Operators (to be updated)
| Operator                  |   Description     |
| :-----------------------: |:-----------------:|
| `$`                       | root object              |
| `.`                       | child object      |
| `[]`                       | child array      |
| `*`                       | wildcard, all objects or array members          |
| `[index]`             | array index      |
| `[start:end]`             | array slice operator      |


#### Path Examples
Consider a piece of geo-referenced tweet in JSON
```javascript
{
    "coordinates": [
        40.74118764, -73.9998279
    ],
    "user": {
        "id": 6253282
    },
    "place": {
        "name": "Manhattan",
        "bounding_box": {
            "type": "Ploygon",
            "pos": [
                [-74.026675, 40.683935],
                ......
            ]
        }
    }
}
```
| JsonPath | Result |
| :------- | :----- |
| `$.coordinates[*]` | all coordinates     |
| `$.place.name` | place name   |
| `$.place.bounding_box.pos[0]`| first position of the bounding box in place                      |
| `$.place.bounding_box.pos[0:2]`| first two positions of the bounding box in place                      |

## Requirements

### Hardware requirements

- CPUs: 64-bit ALU instructions, 256-bit SIMD instruction set, and the carry-less multiplication instruction (pclmulqdq)

- Operating System: Linux, MacOs (Intel Chips only) 

- C++ Compiler: g++ (7.4.0 or higher)



### Software requirements

Before using the JSONSki VSCode Extension you need to assure you have the following prerequisites:

- Node.JS (v14 or higher) see: [Installing Node.js](https://nodejs.org/)

- Python (v3.7 or higher) see: [Installing Python](https://www.python.org/downloads/release/python-3100/)

- C++ : g++ (v7.4.0 or higher) see: [Installing C++](https://gcc.gnu.org/install/)




