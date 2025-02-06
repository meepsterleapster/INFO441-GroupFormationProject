# Group Finder Web Application

## Overview
Group Finder is a web application designed to help students efficiently form teams based on their skills, goals, and interests. This platform improves upon the traditional group-making mixer by providing an intuitive interface for profile creation, team discovery, and team management.

## Current Demo
https://groupin-1fb78.web.app

## Features
### Student Profiles
- Users can create and edit personal profiles
- Profiles include skills, interests, and availability

### Group Creation
- Users can create teams and specify requirements for team members
- Team leaders can manage their teams, including inviting or removing members

### Search 
- Users can search for teams based on interests, required skills, and availability
- Filtering options allow students to find the best match for their needs

## Architecture
### Front-End
- Interactive UI for user engagement
- Pages include:
  - **Login/Signup Page**: User authentication and registration
  - **Students Pool Page**: Shows all registered students for browsing
  - **Profile Detail Page**: Displays and manages student profiles
  - **Project Pool Page**: Lists available project ideas to join and search options
  - **Project Detail Page**: Displays information about specific projects
  - **Create Project Page**: Allows users to create and customize their own projects
  - **My project Page**: Lists all projects created by current user
  - **My group Page**: List the project the user currently in

### Back-End
- Manages user authentication, team creation, and data storage
- API handles:
  - Student registration, login, and authentication
  - Team creation, editing, and deletion
  - Team join requests and notifications

### Database (Firebase)
- Stores user login credentials
- Stores student profiles
- Stores team details and requests
- Stores notifications for team join requests

### Currently implemented functions
- student search
- student upload
- project search
- project upload
- my_project(demo)
  
# group name:JJYK
Member：Kevin Tran, Jihan Yang, Jinchuan Wu, Yujie Hu 
