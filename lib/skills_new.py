#!/usr/bin/env python3

# New skills data
new_skills = [
    # Bitbucket skills
    ("create-repository", "Create repository", "Start a new code repository", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "folder", "Software", "color.icon.accent.lime", ["repository", "git", "code"]),
    ("create-pull-request", "Create pull request", "Submit code changes for review", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "git-pull-request", "Software", "color.icon.accent.lime", ["pull-request", "review", "merge"]),
    ("merge-pull-request", "Merge pull request", "Integrate approved changes into main branch", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "branch-merge", "Software", "color.icon.accent.lime", ["merge", "pull-request", "integration"]),
    ("set-branch-permissions", "Set branch permissions", "Control who can push to branches", "security-compliance", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "lock", "Software", "color.icon.accent.lime", ["permissions", "branch", "security"]),
    ("configure-pipeline", "Configure pipeline", "Set up CI/CD automation", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "workflow", "Software", "color.icon.accent.lime", ["pipeline", "ci-cd", "automation"]),
    ("view-deployment-status", "View deployment status", "Check deployment progress", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "chart-area", "Software", "color.icon.accent.lime", ["deployment", "status", "pipeline"]),
    ("review-code-diff", "Review code diff", "Analyze code changes line by line", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "edit", "Software", "color.icon.accent.lime", ["review", "diff", "code"]),
    ("approve-pull-request", "Approve pull request", "Approve code changes", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "check", "Software", "color.icon.accent.lime", ["approve", "review", "pull-request"]),
    ("add-code-comment", "Add code comment", "Leave feedback on code", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "comment", "Software", "color.icon.accent.lime", ["comment", "review", "feedback"]),
    ("trigger-build", "Trigger build", "Start pipeline build manually", "software-development", "Bitbucket", "/app-logo/Bitbucket.svg", "atlassian", "play", "Software", "color.icon.accent.lime", ["build", "trigger", "pipeline"]),
    
    # Goals skills
    ("create-goal", "Create goal", "Set a new team goal", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "target", "Strategy", "color.icon.accent.orange", ["goal", "okr", "target"]),
    ("align-goals", "Align goals", "Connect goals to strategy", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "link", "Strategy", "color.icon.accent.orange", ["align", "goal", "strategy"]),
    ("track-goal-progress", "Track goal progress", "Monitor goal completion", "analysis", "Goals", "/app-logo/Goals.svg", "atlassian", "dashboard", "Strategy", "color.icon.accent.orange", ["progress", "tracking", "goal"]),
    ("add-key-result", "Add key result", "Define measurable outcomes", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "key-result", "Strategy", "color.icon.accent.orange", ["key-result", "okr", "outcome"]),
    ("update-goal-status", "Update goal status", "Mark goal progress", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "status", "Strategy", "color.icon.accent.orange", ["status", "update", "goal"]),
    ("share-goal", "Share goal", "Communicate goals with team", "communication", "Goals", "/app-logo/Goals.svg", "atlassian", "share", "Strategy", "color.icon.accent.orange", ["share", "goal", "communication"]),
    ("review-quarterly-goals", "Review quarterly goals", "Evaluate quarterly goal performance", "analysis", "Goals", "/app-logo/Goals.svg", "atlassian", "calendar", "Strategy", "color.icon.accent.orange", ["review", "quarterly", "goal"]),
    ("cascade-goals", "Cascade goals", "Link team goals to company goals", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "hierarchy", "Strategy", "color.icon.accent.orange", ["cascade", "alignment", "goal"]),
    ("create-goal-initiative", "Create initiative", "Plan work to achieve goals", "project-management", "Goals", "/app-logo/Goals.svg", "atlassian", "roadmap", "Strategy", "color.icon.accent.orange", ["initiative", "planning", "goal"]),
    ("analyze-goal-metrics", "Analyze metrics", "Review goal performance metrics", "analysis", "Goals", "/app-logo/Goals.svg", "atlassian", "graph-bar", "Strategy", "color.icon.accent.orange", ["metrics", "analysis", "goal"]),
    
    # Projects skills
    ("create-project-plan", "Create project plan", "Plan project timeline and scope", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "roadmap", "Teamwork", "color.icon.accent.blue", ["project", "plan", "scope"]),
    ("assign-project-team", "Assign project team", "Allocate team members to project", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "people-group", "Teamwork", "color.icon.accent.blue", ["team", "assign", "project"]),
    ("track-project-timeline", "Track project timeline", "Monitor project schedule and milestones", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "calendar", "Teamwork", "color.icon.accent.blue", ["timeline", "schedule", "project"]),
    ("manage-project-budget", "Manage project budget", "Control project costs and resources", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "chart-pie", "Strategy", "color.icon.accent.orange", ["budget", "cost", "project"]),
    ("update-project-status", "Update project status", "Report project health and progress", "communication", "Projects", "/app-logo/Projects.svg", "atlassian", "status", "Teamwork", "color.icon.accent.blue", ["status", "report", "project"]),
    ("manage-project-risks", "Manage project risks", "Identify and mitigate project risks", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "alert", "Strategy", "color.icon.accent.orange", ["risk", "management", "project"]),
    ("manage-project-dependencies", "Manage dependencies", "Track task and project dependencies", "project-management", "Projects", "/app-logo/Projects.svg", "atlassian", "link", "Teamwork", "color.icon.accent.blue", ["dependencies", "link", "project"]),
    ("share-project-reports", "Share project reports", "Communicate project metrics to stakeholders", "communication", "Projects", "/app-logo/Projects.svg", "atlassian", "share", "Teamwork", "color.icon.accent.blue", ["report", "share", "project"]),
    ("collaborate-project-team", "Collaborate on project", "Enable team collaboration and communication", "communication", "Projects", "/app-logo/Projects.svg", "atlassian", "chat-widget", "Teamwork", "color.icon.accent.blue", ["collaborate", "team", "project"]),
    ("export-project-data", "Export project data", "Export project information for reporting", "administrative-tools", "Projects", "/app-logo/Projects.svg", "atlassian", "cloud-arrow-up", "General", "color.icon.subtlest", ["export", "data", "project"]),
    
    # Additional Loom skills
    ("add-interactive-buttons", "Add interactive buttons", "Create clickable CTAs in video", "content-communication", "Loom", "/app-logo/Loom.svg", "third-party", "cursor-click", "General", "color.icon.subtlest", ["interactive", "button", "cta"]),
    ("customize-video-player", "Customize video player", "Brand and customize video player", "administrative-tools", "Loom", "/app-logo/Loom.svg", "third-party", "pen", "General", "color.icon.subtlest", ["customize", "player", "branding"]),
    ("set-video-permissions", "Set video permissions", "Control who can view and access video", "security-compliance", "Loom", "/app-logo/Loom.svg", "third-party", "lock", "General", "color.icon.subtlest", ["permissions", "access", "security"]),
    ("add-video-chapters", "Add video chapters", "Create chapters for easy navigation", "content-management", "Loom", "/app-logo/Loom.svg", "third-party", "list", "General", "color.icon.subtlest", ["chapters", "navigation", "video"]),
]

# Generate TypeScript code
skill_objects = []
for skill in new_skills:
    sid, sname, desc, cat, app, logo, stype, icon, coll, fill, tags = skill
    tags_str = ', '.join(f'"{t}"' for t in tags)
    skill_obj = f'''\t\t{{
\t\t\tid: "{sid}",
\t\t\tname: "{sname}",
\t\t\tdescription: "{desc}",
\t\t\tcategory: "{cat}",
\t\t\tapp: "{app}",
\t\t\tappLogo: "{logo}",
\t\t\ttype: "{stype}",
\t\t\ticon: "{icon}",
\t\t\tcollection: "{coll}",
\t\t\tfill: "{fill}",
\t\t\ttags: [{tags_str}],
\t\t}},'''
    skill_objects.append(skill_obj)

# Read the file
with open('lib/skills.ts', 'r') as f:
    content = f.read()

# Find the last skill and add comma to it if needed
last_skill_line = content.rfind('\t\t\t},\n\t\t],')
if last_skill_line != -1:
    # Already has the closing structure, just insert before it
    before = content[:content.rfind('\t\t],\n\t}')]
    after = '\n\t\t,' + '\n\t\t'.join(skill_objects) + '\n\t],\n\t};'
    content = before + '\n' + '\n\t\t'.join(skill_objects) + '\n\t],\n\t};'

with open('lib/skills.ts', 'w') as f:
    f.write(content)

print("✅ Added 40 new skills")
