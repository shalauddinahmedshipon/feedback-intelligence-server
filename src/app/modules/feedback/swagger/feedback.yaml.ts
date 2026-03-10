import yaml from 'yaml';

const raw=`
openapi: 3.0.3

tags:
  - name: Feedback
    description: Feedback management APIs

paths:
  /api/feedback/create-feedback:
    post:
      summary: Create new feedback
      tags: [Feedback]
      description: Submit a new feedback which will be automatically classified by AI (category, priority, sentiment, team).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - message
              properties:
                message:
                  type: string
                  minLength: 10
                  example: 'The payment page crashes when I try to checkout'
                userName:
                  type: string
                  example: 'John Doe'
      responses:
        '201':
          description: Feedback created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success: { type: boolean }
                  statusCode: { type: integer }
                  message: { type: string }
                  data: { $ref: '#/components/schemas/Feedback' }

  /api/feedback:
    get:
      summary: Get all feedbacks with pagination, filtering, and search
      tags: [Feedback]
      description: |
        Retrieve a paginated list of user feedbacks.
        - Exact filters: category, priority
        - Free-text search: message, userName, category, priority (case-insensitive partial match)
        Results sorted by createdAt descending.
      parameters:
        - in: query
          name: page
          schema:
            type: integer
            minimum: 1
          example: 1
          description: Page number (starts at 1)
        - in: query
          name: limit
          schema:
            type: integer
            minimum: 1
            maximum: 100
          example: 10
          description: Number of items per page
        - in: query
          name: category
          schema:
            type: string
            enum: [bug, feature, billing, ux, security, performance, other]
          example: bug
        - in: query
          name: priority
          schema:
            type: string
            enum: [low, medium, high, urgent]
          example: high
        - in: query
          name: search
          schema:
            type: string
          example: payment crash
          description: Search across message, user name, category, priority
      responses:
        '200':
          description: Feedback list retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  meta:
                    type: object
                    properties:
                      page: { type: integer }
                      limit: { type: integer }
                      total: { type: integer }
                      totalPage: { type: integer }
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Feedback'
        '400':
          description: Invalid query parameters
        '500':
          description: Server error

  /api/feedback/stats:
    get:
      summary: Get feedback statistics
      tags: [Feedback]
      description: Aggregated counts grouped by category and priority.
      responses:
        '200':
          description: Feedback statistics retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  byCategory:
                    type: array
                    items:
                      type: object
                      properties:
                        _id: { type: string, example: bug }
                        count: { type: integer, example: 12 }
                  byPriority:
                    type: array
                    items:
                      type: object
                      properties:
                        _id: { type: string, example: high }
                        count: { type: integer, example: 5 }

  /api/feedback/{id}:
    get:
      summary: Get a single feedback by ID
      tags: [Feedback]
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
          description: MongoDB ObjectId (24-character hex string)
          example: 507f1f77bcf86cd799439011
      responses:
        '200':
          description: Feedback retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success: { type: boolean }
                  statusCode: { type: integer }
                  message: { type: string }
                  data: { $ref: '#/components/schemas/Feedback' }
        '400':
          description: Invalid ID format
        '404':
          description: Feedback not found
        '500':
          description: Server error

    delete:
      summary: Delete a feedback by ID
      tags: [Feedback]
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
          description: MongoDB ObjectId to delete
          example: 507f1f77bcf86cd799439011
      responses:
        '200':
          description: Feedback deleted successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success: { type: boolean }
                  statusCode: { type: integer }
                  message: { type: string }
                  data: { type: object, example: { success: true } }
        '400':
          description: Invalid ID format
        '404':
          description: Feedback not found
        '500':
          description: Server error

components:
  schemas:
    Feedback:
      type: object
      properties:
        _id:
          type: string
        message:
          type: string
        category:
          type: string
          enum: [bug, feature, billing, ux, security, performance, other]
        priority:
          type: string
          enum: [low, medium, high, urgent]
        sentiment:
          type: string
          enum: [positive, neutral, negative]
        team:
          type: string
          enum: [engineering, product, support, billing, security, design]
        userName:
          type: string
        createdAt:
          type: string
          format: date-time

`

export default yaml.parse(raw);