## Background and Goal
For planning of installation of ceiling panels we ask our customers to provide us with all necessary measures of the rooms. In order to assist our customers with measuring the room, we planned to develop a simple app where customers can draw the rough shape of the room and input the measured distance data. 

The app should guide the customer through the measuring process by asking to measure all necessary distances to define the room. When the room is fully defined, data of the room shape will be saved (e.g. as json file).

## Requirements
- JavaScript based frontend
- simple to use by non-expert users
- only needed functions are visible
- editor assists taking the measurements of the room

## Approach
A p5 prototype with basic functionality has been developed. Required features and functions have to be added or consolidated.

## Required Features
- After filling out the first editor line of measurement proposals, there should be 3 options:
  - An accept button will take over the edited line
  - A delete button will delete the line
  - A plus button will add a new empty line
- Each accepted entry should be handled as follows:
  - When a measure point is fully defined, the measure point on the canvas should change color
  - Dependent points should be corrected
  - Fully defined walls should change color
  - The distances between all points so far set or calculated should be shown in a matrix table
- A clear comment should be shown when given input data is not plausible 
- Only physically possible and useful measure proposals should be shown
- Editor lines should only show “from” / “to” combinations that are not yet defined and that are useful
- A function to delete created lines at the canvas by mouseclick has to be implemented
- A function to manually mark walls as “external”, “internal heated” and “internal not heated” at the canvas by mouseclick has to be implemented

## Calculation
Missing values will be calculated and shown in the matrix when possible.

Example:

![image](https://github.com/xbln/measurement/assets/27554937/496f6717-b2ff-4f78-97e7-98c001f388ca)

Once we have the distance values for P1 to P2 and P2 to P3 we can calculate distances P3 to P4 and P4 to P1 (90° angles assumed).

## Possible Extensions
- Add doors, windows and radiators
- Columns or poles can be placed within the room
- Arcs and round walls can be placed
- distances are displayed along the walls
- distances defined or calculated are pushed to a server via REST API 

## Prototype
![image](https://github.com/xbln/measurement/assets/27554937/7ea7f761-b3d5-4d89-89e0-b71cf212cd18)
