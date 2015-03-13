OpenDispatch
============

A MEBN Stack for requesting, dispatching, and tracking drivers and rides.

VIEWS
=====

API Documentation
-----------------
`/swaggerui`

The REST API is documented with Swagger.

Ride Request
------------
`/`

A simple set of views that allow riders to request rides. A user enters their ID #,
their location is collected using HTML5 Location APIs, and submitted to dispatch.
The user will be notified when a driver is found for them and can see the driver's progress
on a map.

Dispatch
--------
`/dispatch`

Lists outstanding rides, and a list of all current drivers. Dispatchers match drivers with riders.
