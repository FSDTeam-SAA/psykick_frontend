# Target Match Challenge (TMC) Documentation

## Overview

The Target Match Challenge is a remote viewing exercise where users attempt to perceive and match hidden target images. The system consists of admin and user flows.

## Admin Flow

1. **Target Creation**
2. **Target Management**
   - Create targets via dashboard
   - Queue/unqueue targets
   - Monitor active targets
   - Set reveal and game timings
   - Manage target images and control images

## User Flow

1. **Challenge Participation**
   - User views active TMC challenge
   - Gets target code and remaining time
   - Draws impressions on canvas
   - Submits initial impression
2. **Target Selection**
   - User presented with multiple images (target + control images)
   - Makes two choices:
     - First choice: 25 points
     - Second choice: 15 points
     - Wrong choices: -10 points
3. **Results & Scoring**

## Key Endpoints

### Admin Endpoints

- `POST /TMCTarget/create-TMCTarget`: Create new target
- `GET /TMCTarget/get-allTMCTargets`: List all targets
- `PATCH /TMCTarget/update-TMCTarget-addToQueue/:id`: Queue target
- `GET /TMCTarget/get-activeTMCTarget`: Get current active target

### User Endpoints

- `POST /userSubmission/submit-TMCTarget`: Submit user choices
- `GET /userSubmission/get-TMCResult/:TMCTargetId`: Get result
- `GET /userSubmission/get-previousTMCResults`: View history

## Model Schema

### States

- **Inactive**: Created but not queued
- **Queued**: Ready for activation
- **Active**: Currently playable
- **Completed**: Game ended, results available

---

This system provides a structured approach to managing and participating in remote viewing challenges while maintaining fair gameplay and scoring.
