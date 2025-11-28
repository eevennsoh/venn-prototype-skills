# Skills Naming Guidelines

This document outlines naming conventions for internal teams building tools and skills, focusing on discoverability and user-friendliness.

## Name Guidelines

### Format
- **Structure**: `[Verb] [Object]`
- **Length**: 4-6 words on average
- **Articles**: Don't use "a" or "the"
- **Context**: Add context if needed to differentiate from similar tools
  - Example: "Create work item in Azure" if "Create work item" exists for Jira
- **Skill Tags**: The skill name also functions as the skill tag
  - Example: "Create work item" becomes `/create-work-item`

## Description Guidelines

### Format
- **Structure**: `[Verb] [object] [context/qualifier]`
- **Length**: Under 15 words
- **Articles**: Do use "a" or "the"
- **Sentences**: Use complete sentences with a period at the end
- **Context**: Include necessary context not in the tool/skill name
- **Qualifying Information**: Add in parentheses if it describes functionality
  - Example: "Add content to a Google doc (it will always insert to the bottom of the page)."

## Recommended Verbs

| Verb | Description | Example Prompts | Non-examples |
|------|-------------|----------------|--------------|
| Create | Generate new items, documents, or resources | "Create a new document", "Create a project plan", "Create a user story" | "Make a document", "Build a plan", "Generate a story" |
| Add | Insert or append content to existing items | "Add a comment to the ticket", "Add content to the document", "Add a task to the board" | "Insert a comment", "Append content", "Put a task" |
| Update | Modify or change existing items | "Update the status", "Update the description", "Update the deadline" | "Change the status", "Modify the description", "Edit the deadline" |
| Delete | Remove items or content | "Delete the comment", "Delete the file", "Delete the task" | "Remove the comment", "Get rid of the file", "Erase the task" |
| Get | Retrieve or fetch information | "Get the latest report", "Get user details", "Get project status" | "Retrieve the report", "Fetch details", "Obtain status" |
| Search | Look for specific items or information | "Search for tickets", "Search by keyword", "Search the database" | "Look for tickets", "Find items", "Query the database" |
| Send | Transmit messages, notifications, or requests | "Send an email", "Send a notification", "Send the report" | "Transmit an email", "Deliver a notification", "Mail the report" |
| Schedule | Set up meetings, appointments, or reminders | "Schedule a meeting", "Schedule a reminder", "Schedule the review" | "Set up a meeting", "Book a time", "Arrange the review" |
| Approve | Give permission or authorization | "Approve the request", "Approve the changes", "Approve the budget" | "Authorize the request", "Permit the changes", "Accept the budget" |
| Reject | Deny or decline requests or changes | "Reject the proposal", "Reject the changes", "Reject the application" | "Deny the proposal", "Decline the changes", "Refuse the application" |

## Examples

### Good Examples
- **Name**: "Create work item"
- **Description**: "Create a new work item in the project tracker."

- **Name**: "Add comment to ticket"
- **Description**: "Add a comment to an existing support ticket."

- **Name**: "Search for documents"
- **Description**: "Search for documents by title or content."

### Bad Examples
- **Name**: "Make a new work item" ❌ (Uses "make" instead of "create")
- **Name**: "Create the work item" ❌ (Uses "the" instead of no article)
- **Name**: "Create" ❌ (Too generic, missing object)
- **Description**: "Creates work item" ❌ (Not a complete sentence, missing article)

## Best Practices

1. **Be Specific**: Use precise verbs that clearly indicate the action
2. **Stay Consistent**: Follow the same naming pattern across similar skills
3. **Think Like a User**: Consider how users would naturally describe the action
4. **Avoid Jargon**: Use common language that's easily understood
5. **Test Discoverability**: Ensure users can easily find the skill through search

## Skill Interface Metadata

All skills must include the following interface metadata:

```typescript
export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "atlassian" | "non-atlassian";
  icon: string; // Icon identifier from ADS icon library
  collection: string; // Collection name (Teamwork, Strategy, Service, Software, Product, General)
  fill: string; // Color token for icon fill (e.g., "color.icon.accent.blue")
  appLogo: string; // App logo URL (SVG or image file path)
  tags: string[]; // Array of tags for search and categorization
  appName: string; // App/product name (e.g., Jira, Confluence, Slack, GitHub); fallback to Atlassian when no specific product applies
  rating: number; // Rating out of 5 (e.g., 4.5)
  usageCount: number; // Total number of times skill has been used (e.g., 1432)
  mcpServer?: string; // MCP server name if skill is from MCP (e.g., "GitHub", "HubSpot", "Figma", "Box", "Asana")
}
```

### Field Guidelines

#### Required Fields
- **id**: Unique identifier for the skill
- **name**: Must follow the naming conventions outlined above
- **description**: Must follow the description guidelines outlined above
- **category**: High-level category grouping
- **type**: Either "atlassian" for Atlassian products or "non-atlassian" for external integrations
- **icon**: Use appropriate icons from the Atlassian Design System (ADS) icon library
- **collection**: Assign to one of the 10 predefined categories
- **fill**: Use ADS color tokens for consistent icon styling
- **appLogo**: Path to the application's logo asset. Use `Atlassian.svg` if no specific product applies.
- **tags**: Relevant tags for search and categorization
- **appName**: Required for all types of skills. For Atlassian skills, use the specific Atlassian product name (e.g., "Jira", "Confluence", "Bitbucket"). For non-atlassian skills, use the external app name. If the skill applies broadly or lacks a clear product owner, fallback to "Atlassian" and `Atlassian.svg`.
- **rating**: Numeric rating out of 5 (e.g., 4.5). Represents user satisfaction or quality score. Use 0 if not yet rated.
- **usageCount**: Numeric value representing total usage count (e.g., 1432). Helps indicate skill popularity and adoption. Use 0 if not yet tracked.

#### Conditional Fields
- **mcpServer**: Optional, include only if skill comes from an MCP server

### App Assignment Rules

Every skill **must** be tied to exactly one application, and that application has to come from one of the approved lists below. Always set `appName` and `appLogo` using the values provided here to keep naming consistent across the catalog. If you're unsure which product a skill belongs to, default to "Atlassian" with `Atlassian.svg` until ownership is clarified.

#### Atlassian Apps (specific products)
- Bitbucket (`Bitbucket.svg`)
- Confluence (`Confluence.svg`)
- Customer Service Management (`CSM.svg`)
- Goals (`Goals.svg`)
- Jira (`Jira.svg`)
- Jira Service Management (`JSM.svg`)
- Loom (`Loom.svg`)
- Projects (`Projects.svg`)
- Talent (`Talent.svg`)
- Trello (`Trello.svg`)

#### General Atlassian App
- Atlassian (`Atlassian.svg`) — use this when the skill applies to Atlassian broadly rather than to a single product above.

#### Non-Atlassian Apps
- Google Drive (`GDrive.svg`)
- GitLab (`GitLab.svg`)
- Loom (`Loom.svg`)
- Microsoft Outlook (`Outlook.svg`)
- Salesforce (`Salesforce.svg`)
- Microsoft SharePoint (`SharePoint.svg`)
- Slack (`Slack.svg`)
- Microsoft Teams (`Teams.svg`)

#### Non-Atlassian MCP Server Apps
- Asana (`Asana.svg`)
- Box (`Box.svg`)
- Figma (`Figma.svg`)
- GitHub (`GitHub.svg`)
- HubSpot (`HubSpot.svg`)

If a skill integrates with an MCP server, set both `app`/`appLogo` using the values above **and** populate `mcpServer` with the matching server name (e.g., `GitHub`).

### Categories
All skills must be assigned to one of these 10 categories:

1. **Content Management**: Skills for creating, editing, organizing, and managing content across documents, wikis, and knowledge bases
2. **Communication & Collaboration**: Skills for team communication, meetings, notifications, and collaborative workflows
3. **Productivity & Automation**: Skills for automating repetitive tasks, workflows, and improving personal/team productivity
4. **Data & Analytics**: Skills for retrieving, analyzing, visualizing, and reporting on data from various sources
5. **Project Management**: Skills for planning, tracking, and managing projects, tasks, timelines, and resources
6. **Software Development**: Skills for code management, development workflows, CI/CD, and technical operations
7. **Design & Visualization**: Skills for creating designs, mockups, diagrams, and visual representations
8. **Security & Compliance**: Skills for security monitoring, compliance checks, access management, and audit processes
9. **Business Operations**: Skills for business processes, HR, finance, and operational workflows
10. **Infrastructure & Support**: Skills for IT infrastructure, monitoring, support tickets, and system maintenance

### Atlassian Customer Relevance
All skills must be relevant to Atlassian's customers and address common use cases in:
- Software development teams
- Project management workflows  
- IT operations and support
- Business and product teams
- Cross-functional collaboration
- Enterprise-scale organizations

Skills should solve real problems that Atlassian customers face in their daily work using Atlassian products and integrated third-party tools.

## Review Process

Before finalizing a skill name and description:

1. ✅ Check if it follows the `[Verb] [Object]` format
2. ✅ Verify length guidelines (4-6 words for name, under 15 for description)
3. ✅ Ensure proper article usage
4. ✅ Confirm it's a complete sentence with punctuation
5. ✅ Test searchability and discoverability
6. ✅ Check for conflicts with existing skills
7. ✅ Verify all required metadata fields are populated
8. ✅ Ensure icon and color tokens follow ADS guidelines
9. ✅ Validate category assignment from the 10 predefined categories
10. ✅ Check tags are relevant and comprehensive
11. ✅ Verify skill addresses real Atlassian customer use cases
