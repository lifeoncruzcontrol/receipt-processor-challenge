# receipt-processor-challenge
For Fetch's take home assignment

## Get started
* Clone the repo
* Run **docker-compose up --build** to fire up the backend
* Query the backend either via browser, cURL requests, Postman, or equivalent tools.

---
Test cases ran:

1. Case 1: Fetch provided case 1
`{
      "retailer": "Target",
      "purchaseDate": "2022-01-01",
      "purchaseTime": "13:01",
      "items": [
        {
          "shortDescription": "Mountain Dew 12PK",
          "price": "6.49"
        },
        {
          "shortDescription": "Emils Cheese Pizza",
          "price": "12.25"
        },
        {
          "shortDescription": "Knorr Creamy Chicken",
          "price": "1.26"
        },
        {
          "shortDescription": "Doritos Nacho Cheese",
          "price": "3.35"
        },
        {
          "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
          "price": "12.00"
        }
      ],
      "total": "35.35"
}'`
   
- Expected: 28 points
- Response: 28 points

2. Case 2: Fetch provided case 2
`{
      "retailer": "M&M Corner Market",
      "purchaseDate": "2022-03-20",
      "purchaseTime": "14:33",
      "items": [
        {
          "shortDescription": "Gatorade",
          "price": "2.25"
        },
        {
          "shortDescription": "Gatorade",
          "price": "2.25"
        },
        {
          "shortDescription": "Gatorade",
          "price": "2.25"
        },
        {
          "shortDescription": "Gatorade",
          "price": "2.25"
        }
      ],
      "total": "9.00"
}'`
   
- Expected: 109 points
- Response: 109 points

3. Case 3: Empty items list:

`{
      "retailer": "Empty Store",
      "purchaseDate": "2024-09-01",
      "purchaseTime": "09:00",
      "items": [],
      "total": "0.00"
}`
         
- Expected: 91
- Response: 91

4. Case 4: Invalid date format:

`{
      "retailer": "Date Error Shop",
      "purchaseDate": "01-2024-09",
      "purchaseTime": "10:45",
      "items": [
        {
          "shortDescription": "Milk",
          "price": "1.99"
        }
      ],
      "total": "1.99"
}`
         
- Expected: return error. Needs to be YYYY-MM-DD
- Response: 
`{"errors":[{"type":"field","value":"01-2024-09","msg":"Invalid date format. Expected yyyy-mm-dd","path":"purchaseDate","location":"body"},{"type":"field","value":"01-2024-09","msg":"Invalid ISO date format","path":"purchaseDate","location":"body"}]}`

5. Case 5: purchaseTime and total are missing

`{
      "retailer": "Incomplete Store",
      "purchaseDate": "2024-09-01",
      "items": [
        {
          "shortDescription": "Bread",
          "price": "2.50"
        }
      ]
}`

- Expected: error for missing fields
- Response: `{"errors":[{"type":"field","msg":"Purchase time is required","path":"purchaseTime","location":"body"},{"type":"field","msg":"Invalid time format","path":"purchaseTime","location":"body"},{"type":"field","msg":"Total is required","path":"total","location":"body"},{"type":"field","msg":"Total must be a string","path":"total","location":"body"},{"type":"field","msg":"Total must be a valid decimal","path":"total","location":"body"}]}`

6. Case 6: Invalid price format

`{
      "retailer": "Price Error Mart",
      "purchaseDate": "2024-09-01",
      "purchaseTime": "15:20",
      "items": [
        {
          "shortDescription": "Juice",
          "price": "three fifty"
        }
      ],
      "total": "3.50"
}`
         
- Expected: error due to invalid price of Juice
- Response: `{"errors":[{"type":"field","value":[{"shortDescription":"Juice","price":"three fifty"}],"msg":"Item at index 0 must have a valid 'price'","path":"items","location":"body"}]}`

7. Case 7: Extra spaces in fields

`{
      "retailer": "   Spaced Out Store   ",
      "purchaseDate": "2024-09-01",
      "purchaseTime": "16:45",
      "items": [
        {
          "shortDescription": "  Soda  ",
          "price": "1.75"
        }
      ],
      "total": "1.75"
}`

- Expected: 
14 pts for retailer
25 since total is multiple of 0.25
6 since purchase date is odd
= 45
- Response: 45

8. Case 8: Large list of items
`{
     "retailer": "Big Store",
     "purchaseDate": "2024-09-01",
     "purchaseTime": "17:00",
     "items": [
       {"shortDescription": "Item 1", "price": "1.00"},
       {"shortDescription": "Item 2", "price": "2.00"},
       {"shortDescription": "Item 3", "price": "3.00"},
       {"shortDescription": "Item 4", "price": "4.00"},
       {"shortDescription": "Item 5", "price": "5.00"},
       {"shortDescription": "Item 6", "price": "6.00"},
       {"shortDescription": "Item 7", "price": "7.00"},
       {"shortDescription": "Item 8", "price": "8.00"},
       {"shortDescription": "Item 9", "price": "9.00"},
       {"shortDescription": "Item 10", "price": "10.00"}
     ],
     "total": "55.00"
}`

- Expected:<br />
+8 for retailer<br />
+50 for round dollar amount<br />
+25 for multiple of 0.25<br />
+25 for number of items (5 per 2 items)<br />
For the items in the array, items 1-9 are trimmed are multiples of 3, so:<br />
1 * 0.2 = +1<br />
2 * 0.2 = +1<br />
3 * 0.2 = +1<br />
4 * 0.2 = +1<br />
5 * 0.2 = +1<br />
6 * 0.2 = +2<br />
7 * 0.2 = +2<br />
8 * 0.2 = +2<br />
9 * 0.2 = +2<br />
+6 for odd purchase date<br />
= 127
- Response: 127

9. Case 9: Special characters in shortDescriptions
`{
     "retailer": "Special Char Store",
     "purchaseDate": "2024-09-01",
     "purchaseTime": "18:30",
     "items": [
       {
         "shortDescription": "Café au lait",
         "price": "3.75"
       },
       {
         "shortDescription": "Tiramisu @ Home",
         "price": "4.50"
       }
     ],
     "total": "8.25"
}`
- Expected:
+16 for retailer<br />
+25 for total multiple of 0.25<br />
+5 for there being 2 items on receipt<br />
Café au lait is 12 characters and a multiple of 3, so +1<br />
Tiramisu @ Home is 15 characters, so +1<br />
+6 for odd purchase date<br />
= 54
- Response: 54
