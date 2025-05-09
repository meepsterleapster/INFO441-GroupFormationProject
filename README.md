# GroupIn

## Overview
  Forming groups as a student is an always awkward experience. Finding potential collaborators with matching skill sets, and working on a project one actually enjoys is always a present challenge.  GroupIn is **THE** solution to this problem. Aimed at students looking to plan out a project group, GroupIn allows them to seamlessly define their skill sets, present their ideas, share their ideas, and gain support from their peers, allowing them to dive into the real core of their project without delay.
  Students have clear reasons to gravitate towards our app. Individually asking students in classes of 50, 100, or even more students is just not a realistic task. With an easy profile finder, and communicative project tags, students can find projects that directly interest them. Group leaders also benefit from this exchange, potential students must all create unique profiles, so there’s full transparency on who their partners are and what skills they bring to the table.
  As students with over 10+ years of combined university experience, we have repeatedly encountered the challenge of forming project groups, and we recognize a clear gap that can be addressed. Building it ourselves was always the next clear step. 

## Technical Description
| Priority | User                         | Description                                                                        | Technical Implementation                                                                                                                        |
| -------- | ---------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | As a user                    | I want to be able to sign in and create a profile that reflects my skill set.      | Authenticate through UW Auth; create-and-edit profile; send edits via **POST** to a MongoDB *users* collection.                                 |
| P0       | As a student                 | I want to find other students to work with on a project based on their skill sets. | Search bar issues **GET** to MongoDB; returns matching profiles (name, role, project) for display.                                              |
| P0       | A student without a group    | I want to view current projects that I could potentially join.                     | “Groups” tab triggers **GET** to MongoDB *groups* collection; results rendered as HTML cards with project title, description, and member names. |
| P0       | As a student joining a group | I want to request to join a group and receive notification if accepted.            | “Join” button sends **POST** to MongoDB; group documents track requests by `_id`, updating status (accepted/denied) and notifying applicant.    |
| P1       | As a group leader            | I want to be able to accept or deny potential group requests.                      | Accept/deny buttons update request status via **POST** to MongoDB; trigger notification to requester.                                           |
| P2       | As a professor               | I want to see what groups my students are in.                                      | Navigation view queries MongoDB and lists all student groups with associated members.                                                           |
| P3       | As a group leader            | I want to be able to delete my project.                                            | “Delete” action issues **DELETE** request to remove project document from MongoDB.                                                              |

## Architectural Diagram 
![Screenshot 2025-05-09 150916](https://github.com/user-attachments/assets/c40db3e5-235e-4a40-8139-f436fced653e)

## API Endpoints

GET /user/login - Allows users to log into their account.
POST /user/register - Allows users to register for an account.
POST /project/create - Allows users to create a project
DELETE /project/delete - Allows users to delete a project
GET /user/:id/profile - Allows users to view their own profile depending on an ID.
GET /project/view - Allows users to view available projects
POST /project/interaction - Updates counter for number of people in group project 
GET /project/:id - Allows users to view a specific group project depending on an ID.

## Database Schemas:
### Users
| Field             | Type                             |
| ----------------- | -------------------------------- |
| `userID`          | Number                           |
| `email`           | String                           |
| `phone`           | String                           |
| `roles`           | String / List                    |
| `description`     | String                           |
| `profile_picture` | Image                            |
| `group`           | Reference → `Projects.projectID` |

### Projects
| Field             | Type                                |
| ----------------- | ----------------------------------- |
| `projectID`       | Number                              |
| `title`           | String                              |
| `starterUserID`   | Reference → `Users.userID`          |
| `description`     | String                              |
| `total_members`   | Number                              |
| `max_members`     | Number                              |
| `project_members` | List of References → `Users.userID` |
| `join_request`    | List of References → `Users.userID` |

