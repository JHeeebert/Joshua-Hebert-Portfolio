/**
 * Case Studies — 4 entries, sequenced as a story arc:
 * Concept → Build → Scale → Apply
 *
 * Fields:
 *   label    — short category tag shown on the card
 *   title    — case study name
 *   problem  — the delivery problem being solved
 *   approach — what was designed or built
 *   shows    — what this demonstrates about delivery thinking
 *   stack    — concrete, verifiable specifics shown as a tag strip
 *   image    — (optional) path to a screenshot/diagram in /public/assets;
 *              add one per card to turn claims into visible evidence,
 *              e.g. image: '/assets/case-sprint-intelligence.png'
 */

export const caseStudies = [
  {
    label: 'Systems Design',
    title: 'Delivery Signal Routing',
    problem:
      'Delivery signals — blockers, aging work, at-risk items, dependency shifts, decision needs — exist across every tool the team uses: Jira, Teams, Confluence, email, meetings. They are rarely synthesized, rarely routed to the right audience, and rarely surfaced before they become escalations.',
    approach:
      'Designed a signal-routing model that categorizes delivery signals by type and urgency, maps them to the appropriate audience (team, tech lead, PM, engineering director), and builds in explainability and audit trail. Sensitivity rules ensure individual performance is never surfaced inappropriately. This conceptual architecture directly informed the Sprint Intelligence System built to implement it.',
    shows:
      'Strategic systems thinking — the delivery problem being solved and the point of view that shaped the solution. This is where the thinking starts.',
    stack: ['Signal taxonomy', 'Audience routing', 'Audit trail + explainability', 'Sensitivity rules'],
  },
  {
    label: 'Delivery Infrastructure',
    title: 'Sprint Intelligence System',
    problem:
      'Sprint data in Jira tells a story, but assembling it requires manual effort across boards, reports, and contexts. Risk stays buried. Blockers compound. Planning gaps surface too late to course-correct.',
    approach:
      'Built a 42+ script library that pulls live sprint data from Jira, analyzes it, and produces structured outputs across five delivery categories: sprint health, blockers and risk, backlog readiness, planning readiness, and dependency tracking. One command. Under 2 minutes. Full picture. Paired with a lightweight browser-accessible Delivery Home Base for delivery leads who need the outputs without terminal access — decoupled from the script layer so both can evolve independently. Includes a templates layer (story, epic, capability templates) built from real Jira tickets.',
    shows:
      'The ability to design and build delivery infrastructure — not just manage through it. Systems thinking made operational.',
    stack: ['42+ scripts', 'Live Jira API', '5 output categories', 'Browser Delivery Home Base', 'Templates layer'],
  },
  {
    label: 'AI-Assisted Delivery',
    title: 'Delivery Skill Library',
    problem:
      'Delivery leads spend disproportionate time on recurring admin work — status updates, planning prep, health checks, working agreement audits. That time comes out of thinking and judgment, not just bandwidth.',
    approach:
      'Built 10+ Claude skills covering the full delivery lifecycle: Working Agreement Health (pulls live Jira data, compares against team working agreement, surfaces DoD/DoR and charter signals), Confluence Homepage Refresh, Performance Review Workflow, Run the Full Delivery Flow, Quarterly Review and Planning (6 skills), and additional team health and backlog readiness tools. Started as personal tooling. Used with my own team. Now being shared with and adopted by other delivery teams, with active feedback coming in.',
    shows:
      'AI-assisted program leadership in practice — not advocacy for using GenAI, but demonstrated tooling that other delivery practitioners are adopting organically.',
    stack: ['10+ Claude skills', 'Full delivery lifecycle', 'Live Jira data', 'Adopted by other teams'],
  },
  {
    label: 'Program Leadership',
    title: 'Cross-Team Execution Visibility',
    problem:
      'When delivery spans product, UI, API, analytics, and platform-adjacent workstreams, status fragments. Each team has its own view. Leadership gets a summary that is already stale. Decisions wait on information that exists but hasn\'t been synthesized. Coordination drag compounds.',
    approach:
      'Designed execution visibility systems that turn scattered Jira data, Teams conversations, planning docs, and delivery checkpoints into a synthesized, decision-ready picture for engineering leadership and stakeholders. Covers sprint planning, refinement, release readiness, dependency tracking, and stakeholder communication — with a deliberate focus on reducing manual status chasing rather than adding process overhead.',
    shows:
      'Delivery operating model design across complex multi-team environments. The real-world program leadership context that the tooling in the previous case studies was built to serve.',
    stack: ['Multi-team coordination', 'Release readiness', 'Dependency tracking', 'Decision-ready reporting'],
  },
]
