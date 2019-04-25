# Express Mongoose Quiz

Create an RESTful API for colors (name, hex, rgb).

Make sure to use **lean** when appropriate.

## Model

* Color fields
  * name is a required string
  * hex is a required string
  * red is a required number
    * min is 0
    * max is 255
  * green is a required number
    * min is 0
    * max is 255
  * blue is a required number
    * min is 0
    * max is 255

## Routes

* POST /api/v1/colors
  * create a new color
  * respond with the created color
* GET /api/v1/colors
  * respond with a list of colors
    * only send the color `_id` and `name`
* GET /api/v1/colors/:id
  * respond with the color by id
    * don't send the `__v`
* PATCH /api/v1/colors/:id
  * update only a colors name
  * respond with the updated color
    * only send the color `_id` and `name`
* DELETE /api/v1/colors/:id
  * delete a color by id
  * respond with the deleted color
    * only send the color `_id`
